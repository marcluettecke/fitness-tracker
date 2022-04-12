import { Component, OnInit } from '@angular/core';
import { SegmentCustomEvent } from '@ionic/angular';
import { NewRecordService } from '../../../../services/new-record.service';

@Component({
  selector: 'app-page-two-lift',
  templateUrl: './page-two-lift.component.html',
  styleUrls: ['./page-two-lift.component.scss'],
})
export class PageTwoLiftComponent implements OnInit {
  displayedMode = 'constant';
  constructor(public newRecordService: NewRecordService) {}

  ngOnInit() {}

  handleLiftRepModelChange(event: SegmentCustomEvent) {
    this.displayedMode = event.target.value;
  }
}
