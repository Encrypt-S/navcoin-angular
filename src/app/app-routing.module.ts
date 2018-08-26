import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Routes, RouterModule } from '@angular/router';

import { WalletComponent }      from './wallet/wallet.component';
import { OverviewComponent }      from './overview/overview.component';
import { SettingsComponent }      from './settings/settings.component';

const routes: Routes = [
  {
    path: '',
    component: OverviewComponent

  },
  {
    path: 'wallet',
    component: WalletComponent
  },
  {
    path: 'settings',
    component: SettingsComponent
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
  providers: []
})
export class AppRoutingModule {
}
