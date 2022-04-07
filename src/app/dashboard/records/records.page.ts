import { Component, OnDestroy, OnInit } from '@angular/core';
import { BenchmarkDataService } from '../../services/benchmark-data.service';
import { Records } from '../../models/benchmark.model';
import { Subscription } from 'rxjs';
import { UserDataService } from '../../services/user-data.service';
import { User } from '../../models/user.model';
import { formatDateLikeDatePipe } from '../../utils/formatting.utilities';
import { SegmentCustomEvent } from '@ionic/angular';

@Component({
  selector: 'app-records',
  templateUrl: './records.page.html',
  styleUrls: ['./records.page.scss'],
})
export class RecordsPage implements OnInit, OnDestroy {
  recordsData: Records[];
  userData: User;
  selectedRecordType = 'lifts';
  liftsSubscription: Subscription;
  userDataSubscription: Subscription;

  constructor(
    private benchmarkService: BenchmarkDataService,
    private userDataService: UserDataService
  ) {}

  ngOnInit() {
    this.liftsSubscription = this.benchmarkService
      .getBenchmarkData(this.selectedRecordType)
      .subscribe((lifts) => {
        this.recordsData = lifts;
        console.log(this.recordsData);
      });

    this.userDataService.getUserData('total').subscribe((user) => {
      this.userData = user;
    });
  }
  handleDataDisplayChange(event: SegmentCustomEvent) {
    this.selectedRecordType = event.detail.value;
    this.liftsSubscription = this.benchmarkService
      .getBenchmarkData(this.selectedRecordType)
      .subscribe((recordsData) => {
        this.recordsData = recordsData;
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
      return result ? ` : ${result} (${formatDateLikeDatePipe(date)})` : ' : -';
    }
  }
  ngOnDestroy() {
    this.liftsSubscription.unsubscribe();
    this.userDataSubscription.unsubscribe();
  }
}
