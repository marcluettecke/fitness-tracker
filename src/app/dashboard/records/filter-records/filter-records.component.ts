import { Component, Input, OnDestroy, OnInit } from '@angular/core';
import { ModalController } from '@ionic/angular';
import { MovementsDataService } from '../../../services/movements-data.service';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-filter-records',
  templateUrl: './filter-records.component.html',
  styleUrls: ['./filter-records.component.scss'],
})
export class FilterRecordsComponent implements OnInit, OnDestroy {
  @Input() selectedRecordType: string;
  @Input() groups: string[];
  movements: string[] = [];
  selectedMovements: string[] = [];
  private movementsSubscription: Subscription;

  constructor(
    private modalCtrl: ModalController,
    private movementsService: MovementsDataService
  ) {}

  ngOnInit() {
    this.movementsSubscription = this.movementsService
      .getMovementData()
      .subscribe((movements) => {
        this.movements = movements.map((movement) => movement.name);
      });
  }

  onCancel() {
    this.modalCtrl.dismiss(null, 'cancel', 'filter-records-modal').then();
  }

  ngOnDestroy() {
    this.movementsSubscription.unsubscribe();
  }

  onSelection(event: any) {
    this.selectedMovements = [...event.target.value];
  }

  onDeleteMovement(selectedMovement: string) {
    this.selectedMovements = this.selectedMovements.filter(
      (movement) => movement !== selectedMovement
    );
  }
}
