import { Component, OnInit } from '@angular/core';
import { NewRecordService } from '../../../../services/new-record.service';

@Component({
  selector: 'app-page-zero',
  templateUrl: './page-zero.component.html',
  styleUrls: ['./page-zero.component.scss'],
})
export class PageZeroComponent implements OnInit {
  constructor(public newRecordService: NewRecordService) {}

  ngOnInit() {
    // this.newRecordService.clearSelection();
  }

  handleBenchmarkSelection(isBenchmark: boolean) {
    this.newRecordService.handleBenchmarkSelection(isBenchmark);
  }
}
