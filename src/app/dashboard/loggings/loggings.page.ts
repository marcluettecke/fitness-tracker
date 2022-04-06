import { Component, OnInit } from '@angular/core';
import { UserDataService } from '../../services/user-data.service';
import { Subscription } from 'rxjs';
import { User } from '../../models/user.model';
import {
  convertToLastSuccessfullStrengthSet,
  convertToMinutesString,
} from '../../utils/formatting.utilities';
import { SegmentCustomEvent } from '@ionic/angular';
import { LoggedWorkout } from '../../models/workout.model';
import { Exercise } from '../../models/exercise.model';

@Component({
  selector: 'app-loggings',
  templateUrl: './loggings.page.html',
  styleUrls: ['./loggings.page.scss'],
})
export class LoggingsPage implements OnInit {
  userData: User;
  userDataSubscription: Subscription;
  showDetails: boolean[] = [];
  convertSecondsToMinutesString = convertToMinutesString;
  convertStrengthLogs = convertToLastSuccessfullStrengthSet;
  workoutTypeMappings = {
    ft: 'For Time',
    strength: 'Strength',
    fq: 'For Quality',
    amrap: 'AMRAP',
    emom: 'EMOM',
  };
  selectedTimeSpan = 'total';

  constructor(private userService: UserDataService) {}

  ngOnInit() {
    this.userDataSubscription = this.userService
      .getUserData(this.selectedTimeSpan)
      .subscribe((userData) => {
        this.userData = userData;
        this.showDetails = new Array(this.userData.history.length).fill(false);
      });
  }

  countSuccessfulRounds(exercises: Exercise[]) {
    console.log(exercises);
    return exercises.filter((log) => log.success).length;
  }

  displayAmrapResult(result: string) {
    const [rounds, reps] = result.split('+');
    return `${rounds} rounds + ${reps} reps`;
  }

  handleShowMoreClick(workoutIdx: number) {
    this.showDetails[workoutIdx] = !this.showDetails[workoutIdx];
  }

  handleTimeSpanChange(event: SegmentCustomEvent) {
    this.selectedTimeSpan = event.detail.value;
    this.userDataSubscription = this.userService
      .getUserData(this.selectedTimeSpan)
      .subscribe((userData) => {
        this.userData = userData;
      });
  }
}
