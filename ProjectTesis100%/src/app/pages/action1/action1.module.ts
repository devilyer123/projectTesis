import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { Action1PageRoutingModule } from './action1-routing.module';

import { Action1Page } from './action1.page';
import { ComponentsModule } from '../../components/components.module';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    Action1PageRoutingModule,
    ComponentsModule
  ],
  declarations: [Action1Page]
})
export class Action1PageModule {}
