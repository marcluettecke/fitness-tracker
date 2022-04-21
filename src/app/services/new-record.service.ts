import { Injectable } from '@angular/core';
import { Records } from '../models/benchmark.model';
import { Router } from '@angular/router';
import {InputCustomEvent, ToastController} from '@ionic/angular';

@Injectable({
  providedIn: 'root',
})
export class NewRecordService {
  selection = {
    logType: 'lift',
    level: 0,
    selectedLiftGroup: {
      groupName: '',
      records: [],
    } as Records,
    selectedExercise: '',
    workoutType: '',
    benchmarkWod: false,
    fixedSets: {
      numberSets: 5,
      numberReps: 5,
      weight: [100, 100, 100, 100, 100],
      success: [true, true, true, true, true],
    },
    variableSets: [{ numberReps: 5, weight: 100, success: true }],
    setType: 'constant',
  };

  constructor(private router: Router, private toastCtrl: ToastController) {}

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
      this.toastCtrl.create({
        message: 'Please enter Benchmark WOD in the list below',
        duration: 2000,
        position: 'middle',
      }).then(toast => toast.present());
    } else if (
      this.selection.logType === 'lift' &&
      this.selection.level === 3
    ) {
      console.log(this.selection);
      this.router.navigate(['/dashboard/tabs/records']).then();
    } else {
    }
    {
      this.selection.level++;
    }
  }

  handleBackwardLogRouting() {
    this.selection.level--;
  }

  handleFixedSetsNumberRepsChange(mode: 'add' | 'remove') {
    return mode === 'add'
      ? this.selection.fixedSets.numberReps++
      : this.selection.fixedSets.numberReps--;
  }

  handleFixedSetsNumberSetsChange(mode: 'add' | 'remove') {
    if (mode === 'add') {
      this.selection.fixedSets.numberSets++;
      this.selection.fixedSets.success.push(true);
    } else {
      this.selection.fixedSets.numberSets--;
    }
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
      selectedLiftGroup: {
        groupName: '',
        records: [],
      },
      selectedExercise: '',
      workoutType: '',
      benchmarkWod: null,
      fixedSets: {
        numberSets: 5,
        numberReps: 5,
        weight: [100, 100, 100, 100, 100],
        success: [true, true, true, true, true],
      },
      variableSets: [{ numberReps: 5, weight: 0, success: true }],
      setType: 'variable',
    };
  }

  handleVariableSetChange(add: 'add' | 'remove') {
    return add === 'add'
      ? this.selection.variableSets.push({
          numberReps: 5,
          weight: 100,
          success: true,
        })
      : this.selection.variableSets.pop();
  }

  toggleSetFail(idx: number) {
    if (this.selection.setType === 'constant') {
      this.selection.fixedSets.success[idx] =
        !this.selection.fixedSets.success[idx];
    } else {
      this.selection.variableSets[idx].success =
        !this.selection.variableSets[idx].success;
    }
  }

  handleLiftWeightChange(event: InputCustomEvent, idx: number) {
    if (this.selection.setType === 'constant') {
      this.selection.fixedSets.weight[idx] = +event.target.value;
    } else {
      this.selection.variableSets[idx].weight = +event.target.value;
    }
  }
}
