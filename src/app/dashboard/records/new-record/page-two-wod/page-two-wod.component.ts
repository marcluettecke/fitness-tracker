import { Component, OnInit } from '@angular/core';
import { NewRecordService } from '../../../../services/new-record.service';

@Component({
  selector: 'app-page-two-wod',
  templateUrl: './page-two-wod.component.html',
  styleUrls: ['./page-two-wod.component.scss'],
})
export class PageTwoWodComponent implements OnInit {
  constructor(public newRecordService: NewRecordService) {}

  ngOnInit() {}
}
