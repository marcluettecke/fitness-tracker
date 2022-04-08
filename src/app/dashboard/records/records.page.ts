import { Component, OnDestroy, OnInit } from '@angular/core';
import { BenchmarkDataService } from '../../services/benchmark-data.service';
import { Records } from '../../models/benchmark.model';
import { Subscription } from 'rxjs';
import { UserDataService } from '../../services/user-data.service';
import { User } from '../../models/user.model';
import {
  convertToMinutesString,
  displayAmrapResult,
  formatDateLikeDatePipe,
} from '../../utils/formatting.utilities';
import {
  InputCustomEvent,
  ModalController,
  SegmentCustomEvent,
} from '@ionic/angular';
import { FilterRecordsComponent } from './filter-records/filter-records.component';

@Component({
  selector: 'app-records',
  templateUrl: './records.page.html',
  styleUrls: ['./records.page.scss'],
})
export class RecordsPage implements OnInit, OnDestroy {
  recordsData: Records[];
  displayedData: Records[];
  userData: User;
  selectedRecordType = 'lifts';
  filterValue = '';
  liftsSubscription: Subscription;
  userDataSubscription: Subscription;
  convertSecondsToMinutesString = convertToMinutesString;
  displayAmrapResult = displayAmrapResult;

  constructor(
    private benchmarkService: BenchmarkDataService,
    private userDataService: UserDataService,
    private modalCtrl: ModalController
  ) {}

  ngOnInit() {
    this.liftsSubscription = this.benchmarkService
      .getBenchmarkData(this.selectedRecordType)
      .subscribe((records) => {
        this.recordsData = records;
        this.displayedData = this.recordsData;
      });

    this.userDataService.getUserData('total').subscribe((user) => {
      this.userData = user;
    });
  }

  handleDataDisplayChange(event: SegmentCustomEvent) {
    this.filterValue = '';
    this.selectedRecordType = event.detail.value;
    this.liftsSubscription = this.benchmarkService
      .getBenchmarkData(this.selectedRecordType)
      .subscribe((records) => {
        this.recordsData = records;
        this.displayedData = this.recordsData;
      });
  }

  findRecord(recordName: string) {
    if (this.selectedRecordType === 'lifts') {
      const oneRepMax = this.userData.personalBests.lifts.find(
        (lift) => lift.liftName === recordName
      )?.results.oneRepMax.result;
      const date = new Date(
        this.userData.personalBests.lifts.find(
          (lift) => lift.liftName === recordName
        )?.results.oneRepMax.date
      );
      return oneRepMax
        ? ` : ${oneRepMax}kg (${formatDateLikeDatePipe(date)})`
        : ' : -';
    } else {
      const result = this.userData.personalBests.workouts.find(
        (workout) => workout.workoutName === recordName
      )?.result;
      const date = new Date(
        this.userData.personalBests.workouts.find(
          (workout) => workout.workoutName === recordName
        )?.date
      );
      const type = this.userData.personalBests.workouts.find(
        (workout) => workout.workoutName === recordName
      )?.workoutType;

      return result
        ? ` : ${
            type === 'amrap'
              ? displayAmrapResult(result as string)
              : convertToMinutesString(result as number)
          } (${formatDateLikeDatePipe(date)})`
        : ' : -';
    }
  }

  ngOnDestroy() {
    this.liftsSubscription.unsubscribe();
    this.userDataSubscription.unsubscribe();
  }

  handleSearchChange() {
    this.displayedData = this.recordsData.map((group) => {
      const filteredRecords = group.records.filter((record) =>
        record.recordName.toLowerCase().includes(this.filterValue.toLowerCase())
      );
      return {
        ...group,
        records: filteredRecords,
      };
    });
  }

  openFilterModal() {
    this.modalCtrl
      .create({
        component: FilterRecordsComponent,
        componentProps: {
          selectedRecordType: this.selectedRecordType,
          groups: this.recordsData.map((group) => group.groupName),
        },
        id: 'filter-records-modal',
      })
      .then((modalEl) => {
        modalEl.present().then();
      });
  }
}
