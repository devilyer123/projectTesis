import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { CrearPedidoPageRoutingModule } from './crear-pedido-routing.module';

import { CrearPedidoPage } from './crear-pedido.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    CrearPedidoPageRoutingModule
  ],
  declarations: [CrearPedidoPage]
})
export class CrearPedidoPageModule {}
