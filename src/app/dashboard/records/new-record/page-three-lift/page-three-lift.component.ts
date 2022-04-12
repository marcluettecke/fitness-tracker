import { Component, OnInit } from '@angular/core';
import { NewRecordService } from '../../../../services/new-record.service';

@Component({
  selector: 'app-page-three-lift',
  templateUrl: './page-three-lift.component.html',
  styleUrls: ['./page-three-lift.component.scss'],
})
export class PageThreeLiftComponent implements OnInit {
  displayedSets: {
    numberReps: number;
    weight: number;
    success: boolean;
  }[] = [];

  constructor(public newRecordService: NewRecordService) {}

  ngOnInit() {
    if (this.newRecordService.selection.setType === 'constant') {
      for (const [idx, val] of Array(
        this.newRecordService.selection.fixedSets.numberSets
      ).entries()) {
        this.displayedSets.push({
          numberReps: this.newRecordService.selection.fixedSets.numberReps,
          weight: 100,
          success: this.newRecordService.selection.fixedSets.success[idx],
        });
      }
    } else {
      this.displayedSets = this.newRecordService.selection.variableSets;
    }
  }

  determineIfSetIsFailed(
    idx: number,
    styledObject: 'text' | 'icon' | 'buttonColor'
  ) {
    if (this.newRecordService.selection.setType === 'constant') {
      switch (styledObject) {
        case 'text':
          return this.newRecordService.selection.fixedSets.success[idx]
            ? ''
            : 'failed';
        case 'icon':
          return this.newRecordService.selection.fixedSets.success[idx]
            ? 'thumbs-up-outline'
            : 'thumbs-down-outline';
        case 'buttonColor':
          return this.newRecordService.selection.fixedSets.success[idx]
            ? 'success'
            : 'danger';
      }
    } else {
      switch (styledObject) {
        case 'text':
          return this.newRecordService.selection.variableSets[idx].success
            ? ''
            : 'failed';
        case 'icon':
          return this.newRecordService.selection.variableSets[idx].success
            ? 'thumbs-up-outline'
            : 'thumbs-down-outline';
        case 'buttonColor':
          return this.newRecordService.selection.variableSets[idx].success
            ? 'success'
            : 'danger';
      }
    }
  }
}
