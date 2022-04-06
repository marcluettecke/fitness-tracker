import { Component, OnInit } from '@angular/core';
import { UserDataService } from '../../services/user-data.service';
import { Subscription } from 'rxjs';
import { User } from '../../models/user.model';
import {
  convertToLastSuccessfullStrengthSet,
  convertToMinutesString,
} from '../../utils/formatting.utilities';

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
  selectedTimeSpan: '7days' | '30days' | 'total' = '7days';

  constructor(private userService: UserDataService) {}

  ngOnInit() {
    this.userDataSubscription = this.userService
      .getUserData(this.selectedTimeSpan)
      .subscribe((userData) => {
        this.userData = userData;
        this.showDetails = new Array(this.userData.history.length).fill(false);
      });
  }

  handleShowMoreClick(workoutIdx: number) {
    this.showDetails[workoutIdx] = !this.showDetails[workoutIdx];
  }

  handleTimeSpanChange(event: any) {
    this.selectedTimeSpan = event.detail.value;
    this.userDataSubscription = this.userService
      .getUserData(this.selectedTimeSpan)
      .subscribe((userData) => {
        this.userData = userData;
      });
  }
}
