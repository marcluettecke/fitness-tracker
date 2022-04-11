import { Component, OnInit } from '@angular/core';
import { NewRecordService } from '../../../services/new-record.service';

@Component({
  selector: 'app-new-record',
  templateUrl: './new-record.page.html',
  styleUrls: ['./new-record.page.scss'],
})
export class NewRecordPage implements OnInit {
  constructor(public newRecordService: NewRecordService) {}

  ngOnInit() {}
}
