import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { Action3Page } from './action3.page';

const routes: Routes = [
  {
    path: '',
    component: Action3Page
  },
  {
    path: 'cobrar-credito/:idcli',
    loadChildren: () => import('./cobrar-credito/cobrar-credito.module').then( m => m.CobrarCreditoPageModule)
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class Action3PageRoutingModule {}
