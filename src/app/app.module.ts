import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { HttpClientModule }    from '@angular/common/http';

import { AppComponent } from './app.component';
import { OverviewComponent } from './overview/overview.component';

import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { MzSidenavModule, MzButtonModule, MzCardModule, MzNavbarModule } from 'ngx-materialize';
import { NavbarComponent } from './navbar/navbar.component';
import { WalletComponent } from './wallet/wallet.component';
import { AppRoutingModule } from './/app-routing.module';
import { SettingsComponent } from './settings/settings.component';
import { ExplorerService } from './explorer/explorer.service';
import { WalletService } from './wallet/wallet.service';


@NgModule({
  declarations: [
    AppComponent,
    OverviewComponent,
    NavbarComponent,
    WalletComponent,
    SettingsComponent,
  ],
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    MzSidenavModule,
    MzButtonModule,
    MzCardModule,
    MzNavbarModule,
    AppRoutingModule,
    HttpClientModule,
  ],
  providers: [
    ExplorerService,
    WalletService
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
