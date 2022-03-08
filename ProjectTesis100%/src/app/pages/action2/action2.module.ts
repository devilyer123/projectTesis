import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { Action2PageRoutingModule } from './action2-routing.module';

import { Action2Page } from './action2.page';
import { ComponentsModule } from '../../components/components.module';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    Action2PageRoutingModule,
    ComponentsModule
  ],
  declarations: [Action2Page]
})
export class Action2PageModule {}
