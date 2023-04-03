import { Component, OnInit, ViewChild } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { CheckboxCustomEvent, IonModal } from '@ionic/angular';

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

  budget = 450.50

  shoppingForm!: FormGroup

  items: Item[] = []

  modalIsOpen: boolean = false

  get subTotal(): number {
    const subTotal: number = this.items.reduce((prev, current) => prev + (current.price * current.quantity) ,0)
    return subTotal
  }

  get total(): number {
    return this.budget - this.subTotal
  }

  constructor(
    private fb: FormBuilder
  ) { }

  ngOnInit() {
    this.items = new Array<Item | null>(30).fill(null).map((_, i) => ({ nome: `Nome ${i}`, price: 3.25, quantity: i }))
    this.shoppingForm = this.fb.group({
      nome: this.fb.control(null, [Validators.required]),
      price: this.fb.control(null, [Validators.required]),
      quantity: this.fb.control(null, [Validators.required]),
    })
  }

  addNewItem(): void {
    const newItem = this.shoppingForm.value
    if (this.shoppingForm.valid) {
      this.items.push(newItem)
      this.shoppingForm.reset()
      this.closeModal()
    }
  }

  onTermsChanged(event: Event) {
    const ev = event as CheckboxCustomEvent;
    this.canDismiss = ev.detail.checked;
  }

  indexItemSelecionado: number | null = null
  edit(item: Item, index: number): void {
    this.indexItemSelecionado = index
    this.shoppingForm.setValue(item)
    this.modalIsOpen = true
  }

  removeItem(index: number): void {
    this.items.splice(index, 1)
    this.closeModal()
  }

  closeModal(): void {
    this.modalIsOpen = false
    this.indexItemSelecionado = null
  }

  get nomeItem(): string {
    const nome:string =  this.shoppingForm.get('nome')?.value
    return nome ?? 'Novo item'
  }

  get data(): Date {
    return this._data ?? new Date()
  }

}
