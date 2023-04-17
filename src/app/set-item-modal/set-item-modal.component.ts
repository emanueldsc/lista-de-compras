import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ModalController } from '@ionic/angular';

@Component({
  selector: 'app-set-item-modal',
  templateUrl: './set-item-modal.component.html',
  styleUrls: ['./set-item-modal.component.scss'],
})
export class SetItemModalComponent implements OnInit {

  formItem!: FormGroup

  constructor(
    private modalController: ModalController,
    private fb: FormBuilder
  ) { }

  ngOnInit(): void {
    this.formItem = this.fb.group({
      nome: ['', [Validators.required]],
      price: [0.0, [Validators.required]],
      quantity: [0, [Validators.required]]
    })
  }

  get nomeItem(): string | undefined {
    return this.formItem.get('nome')?.value as string;
  }

  async closeModal() {
    await this.modalController.dismiss()
  }

  async confirm() {
    const newItem = this.formItem.value
    await this.modalController.dismiss(newItem)
  }


}
