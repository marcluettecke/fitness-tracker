import { Component, OnInit } from '@angular/core';
import { UserDataService } from '../../services/user-data.service';
import { Subscription } from 'rxjs';
import { User } from '../../models/user.model';

@Component({
  selector: 'app-loggings',
  templateUrl: './loggings.page.html',
  styleUrls: ['./loggings.page.scss'],
})
export class LoggingsPage implements OnInit {
  totalLogs: number;
  userData: User;
  userDataSubscription: Subscription;

  constructor(private userService: UserDataService) {}

  ngOnInit() {
    this.userDataSubscription = this.userService
      .getUserData()
      .subscribe((userData) => {
        this.userData = userData;
        this.totalLogs = this.userData.history.length;
        console.log(this.userData);
      });
  }
}
