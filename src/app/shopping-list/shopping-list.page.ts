import { Component, OnInit, ViewChild } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { CheckboxCustomEvent, IonModal, ModalController } from '@ionic/angular';
import { SetBudgetModalComponent } from '../set-budget-modal/set-budget-modal.component';
import { SetItemModalComponent } from '../set-item-modal/set-item-modal.component';

interface Item {
  nome: string,
  price: number,
  quantity: number
}

@Component({
  selector: 'app-shopping-list',
  templateUrl: './shopping-list.page.html',
  styleUrls: ['./shopping-list.page.scss'],
})
export class ShoppingListPage implements OnInit {

  @ViewChild(IonModal) modal!: IonModal;
  canDismiss = false
  presentingElement = null

  private _data?: Date

  budget: number = 0
  shoppingForm!: FormGroup
  items: Item[] = []

  modalIsOpen: boolean = false
  modalBudget: boolean = false

  get subTotal(): number {
    const subTotal: number = this.items.reduce((prev, current) => prev + (current.price * current.quantity), 0)
    return subTotal
  }

  get total(): number {
    return this.budget - this.subTotal
  }

  constructor(
    private fb: FormBuilder,
    private modalController: ModalController
  ) { }

  ngOnInit() {
    this.shoppingForm = this.fb.group({
      nome: this.fb.control(null, [Validators.required]),
      price: this.fb.control(null, [Validators.required]),
      quantity: this.fb.control(null, [Validators.required]),
    })
  }

  async openModalItem(): Promise<void> {
    const modal = await this.modalController.create({
      component: SetItemModalComponent
    })
    modal.onDidDismiss().then((item) => {
      if (item?.data) {
        this.items.push(item.data)
      }
    })
    return await modal.present();
  }

  async openModalBudget(): Promise<void> {
    const modal = await this.modalController.create({
      component: SetBudgetModalComponent
    })
    modal.onDidDismiss().then((item) => {
      if (item?.data) {
        this.items.push(item.data)
      }
    })
    return await modal.present();
  }

  onTermsChanged(event: Event) {
    const ev = event as CheckboxCustomEvent;
    this.canDismiss = ev.detail.checked;
  }

  indexItemSelected: number | null = null
  edit(item: Item, index: number): void {
    this.indexItemSelected = index
    this.shoppingForm.setValue(item)
    this.modalIsOpen = true
  }

  removeItem(index: number): void {
    this.items.splice(index, 1)
  }



  closeModal(): void {
    this.modalIsOpen = false
    this.indexItemSelected = null
  }

  get nomeItem(): string {
    const nome: string = this.shoppingForm.get('nome')?.value
    return nome ?? 'Novo item'
  }

  get data(): Date {
    return this._data ?? new Date()
  }

}
