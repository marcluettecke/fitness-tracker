import { Component, OnDestroy, OnInit } from '@angular/core';
import { Records } from '../../../../models/benchmark.model';
import { BenchmarkDataService } from '../../../../services/benchmark-data.service';
import { Subscription } from 'rxjs';
import { NewRecordService } from '../../../../services/new-record.service';
import { SelectCustomEvent } from '@ionic/angular';

@Component({
  selector: 'app-page-one-lift',
  templateUrl: './page-one-lift.component.html',
  styleUrls: ['./page-one-lift.component.scss'],
})
export class PageOneLiftComponent implements OnInit, OnDestroy {
  benchmarkData: Records[];
  singleGroupData: Records;
  private benchmarkSubscription: Subscription;

  constructor(
    private benchmarkService: BenchmarkDataService,
    public newRecordService: NewRecordService
  ) {}

  ngOnInit() {
    this.benchmarkSubscription = this.benchmarkService
      .getBenchmarkData('lifts')
      .subscribe((lifts) => {
        this.benchmarkData = lifts;
      });
  }

  ngOnDestroy() {
    if (this.benchmarkSubscription) {
      this.benchmarkSubscription.unsubscribe();
    }
  }

  handleLiftGroupChange(event: SelectCustomEvent) {
    this.newRecordService.selection.selectedLiftGroup = event.target.value;
    this.benchmarkSubscription = this.benchmarkService
      .getBenchmarkData('lifts')
      .subscribe((lifts) => {
        lifts.filter((lift) => {
          if (lift.groupName === event.target.value) {
            this.singleGroupData = lift;
          }
        });
      });
  }
}
