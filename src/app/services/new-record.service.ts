import { Injectable } from '@angular/core';
import { Records } from '../models/benchmark.model';
import { SelectCustomEvent } from '@ionic/angular';
import { Router } from '@angular/router';

@Injectable({
  providedIn: 'root',
})
export class NewRecordService {
  selection = {
    logType: '',
    level: 0,
    workoutType: '',
    benchmarkWod: null,
  };
  selectedLiftGroup: Records;
  selectedExercise: string;

  constructor(private router: Router) {}

  handleLogTypeSelection(type: 'wod' | 'lift') {
    this.selection.logType = type;
  }
  handleBenchmarkSelection(b: boolean) {
    this.selection.benchmarkWod = b;
  }

  handleWodTypeSelection(type: 'wod' | 'lift') {
    this.selection.logType = type;
  }

  handleForwardLogRouting() {
    if (
      this.selection.logType === 'wod' &&
      this.selection.level === 1 &&
      this.selection.benchmarkWod === false
    ) {
      this.clearSelection();
      this.router.navigate(['/dashboard/tabs/records']).then();
    } else {
      this.selection.level++;
    }
  }

  handleBackwardLogRouting() {
    this.selection.level--;
  }

  clearSelection() {
    this.selection = {
      logType: '',
      level: 0,
      workoutType: '',
      benchmarkWod: null,
    };
  }
}
