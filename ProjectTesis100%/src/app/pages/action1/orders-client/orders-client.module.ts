import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { OrdersClientPageRoutingModule } from './orders-client-routing.module';

import { OrdersClientPage } from './orders-client.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    OrdersClientPageRoutingModule
  ],
  declarations: [OrdersClientPage]
})
export class OrdersClientPageModule {}
