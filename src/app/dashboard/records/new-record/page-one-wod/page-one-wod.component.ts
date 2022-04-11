import { Component, OnInit } from '@angular/core';
import { NewRecordService } from '../../../../services/new-record.service';

@Component({
  selector: 'app-page-one-wod',
  templateUrl: './page-one-wod.component.html',
  styleUrls: ['./page-one-wod.component.scss'],
})
export class PageOneWodComponent implements OnInit {
  constructor(public newRecordService: NewRecordService) {}

  ngOnInit() {}
}
