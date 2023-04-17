import { Component } from '@angular/core';
import { ModalController } from '@ionic/angular';
import { NgForm } from '@angular/forms';

@Component({
  selector: 'app-set-budget-modal',
  templateUrl: './set-budget-modal.component.html',
  styleUrls: ['./set-budget-modal.component.scss'],
})
export class SetBudgetModalComponent {

  budget?: number

  constructor(private modalController: ModalController) {}

  async setBudget() {
    this.modalController.dismiss(this.budget);
  }

  dismiss() {
    this.modalController.dismiss();
  }


}
