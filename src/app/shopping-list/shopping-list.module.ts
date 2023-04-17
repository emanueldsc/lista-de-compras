import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { ShoppingListPageRoutingModule } from './shopping-list-routing.module';

import { ShoppingListPage } from './shopping-list.page';
import { PanelComponent } from './panel/panel.component';
import { SetBudgetModalComponent } from '../set-budget-modal/set-budget-modal.component';
import { SetItemModalComponent } from '../set-item-modal/set-item-modal.component';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    IonicModule,
    ShoppingListPageRoutingModule
  ],
  declarations: [
    ShoppingListPage,
    PanelComponent,
    SetBudgetModalComponent,
    SetItemModalComponent
  ]
})
export class ShoppingListPageModule { }
