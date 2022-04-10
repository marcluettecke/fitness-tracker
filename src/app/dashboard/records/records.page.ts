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
import { ModalController, SegmentCustomEvent } from '@ionic/angular';
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
  filterIsSet = false;

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
    this.filterIsSet = this.filterValue.length > 0;
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

  handleFiltering(filters: {
    name: string;
    group: string[];
    type?: string;
    timecap?: number | string;
    exercises?: string[];
  }) {
    if (
      !filters.name &&
      !filters.timecap &&
      filters.exercises.length === 0 &&
      !filters.group &&
      (filters.type === 'all' || !filters.type)
    ) {
      this.clearFilter();
      return;
    } else {
      this.filterIsSet = true;
      // check group
      const filteredGroups = this.recordsData.filter(
        (group) =>
          filters.group.includes(group.groupName) || filters.group.length === 0
      );

      this.displayedData = filteredGroups.map((group) => {
        const filteredRecords = group.records.filter((record) => {
          const uniqueExercisesInWod = Array.from(
            new Set(record.exercises?.map((exercise) => exercise.exerciseName))
          );

          return (
            // check name
            record.recordName
              .toLowerCase()
              .includes(filters.name.toLowerCase()) &&
            // check type
            (record.type === filters.type ||
              filters.type === 'all' ||
              !filters.type) &&
            // check timecap
            (record.timecap <= (filters.timecap as number) * 60 ||
              !filters.timecap) &&
            // check if exercise is included
            (filters.exercises.every((exercise) =>
              uniqueExercisesInWod.includes(exercise)
            ) ||
              filters.exercises.length === 0)
          );
        });
        return {
          ...group,
          records: filteredRecords,
        };
      });
    }
  }

  async openFilterModal() {
    const filterModal = await this.modalCtrl.create({
      component: FilterRecordsComponent,
      componentProps: {
        selectedRecordType: this.selectedRecordType,
        groups: this.recordsData.map((group) => group.groupName),
      },
      id: 'filter-records-modal',
    });
    filterModal.onDidDismiss().then((data) => {
      if (data.role === 'confirm') {
        this.handleFiltering(data.data);
      }
    });
    return await filterModal.present();
  }

  clearFilter() {
    this.filterValue = '';
    this.displayedData = this.recordsData;
    this.filterIsSet = false;
  }
}
