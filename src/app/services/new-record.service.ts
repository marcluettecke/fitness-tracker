import { Injectable } from '@angular/core';
import { Records } from '../models/benchmark.model';
import { Router } from '@angular/router';

@Injectable({
  providedIn: 'root',
})
export class NewRecordService {
  selection = {
    logType: 'lift',
    level: 2,
    workoutType: 'amrap',
    benchmarkWod: false,
    fixedSetsNumberSets: 5,
    fixedSetsNumberReps: 5,
    variableSets: [{ numberReps: 5 }],
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

  handleWodTypeSelection(type: 'amrap' | 'emom' | 'ft' | 'fq' | 'other') {
    this.selection.workoutType = type;
  }

  handleForwardLogRouting() {
    if (
      this.selection.logType === 'wod' &&
      this.selection.level === 1 &&
      this.selection.benchmarkWod === true
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

  handleFixedSetsNumberRepsChange(mode: 'add' | 'remove') {
    return mode === 'add'
      ? this.selection.fixedSetsNumberReps++
      : this.selection.fixedSetsNumberReps--;
  }

  handleFixedSetsNumberSetsChange(mode: 'add' | 'remove') {
    return mode === 'add'
      ? this.selection.fixedSetsNumberSets++
      : this.selection.fixedSetsNumberSets--;
  }

  handleVariableSetsNumberRepsChange(mode: 'add' | 'remove', index: number) {
    return mode === 'add'
      ? this.selection.variableSets[index].numberReps++
      : this.selection.variableSets[index].numberReps--;
  }

  clearSelection() {
    this.selection = {
      logType: '',
      level: 0,
      workoutType: '',
      benchmarkWod: null,
      fixedSetsNumberSets: 5,
      fixedSetsNumberReps: 5,
      variableSets: [{ numberReps: 5 }],
    };
  }

  addVariableSet() {
    this.selection.variableSets.push({ numberReps: 5 });
  }

  handleVariableSetChange(add: 'add' | 'remove') {
    return add === 'add'
      ? this.selection.variableSets.push({ numberReps: 5 })
      : this.selection.variableSets.pop();
  }
}
