import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { HttpClientModule }    from '@angular/common/http';
import { FormsModule } from '@angular/forms';

//app
import { AppComponent } from './app.component';
import { AppRoutingModule } from './/app-routing.module';

//auth
import { AuthGuardService as AuthGuard } from './auth/auth-guard.service';
import { JwtModule } from '@auth0/angular-jwt';

//pages
import { OverviewComponent } from './overview/overview.component';
import { LoginComponent } from './login/login.component';
import { WalletComponent } from './wallet/wallet.component';
import { SettingsComponent } from './settings/settings.component';
import { PageNotFoundComponent }      from './not-found/not-found.component';

//materialize
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { MzSidenavModule, MzButtonModule, MzCardModule, MzNavbarModule } from 'ngx-materialize';

//services
import { ExplorerService } from './explorer/explorer.service';
import { WalletService } from './wallet/wallet.service';
import { AuthService } from './auth/auth.service';

//partials
import { NavbarComponent } from './navbar/navbar.component';

import { QRCodeModule } from 'angularx-qrcode';

export function tokenGetter() {
  return localStorage.getItem('access_token');
}

@NgModule({
  declarations: [
    AppComponent,
    OverviewComponent,
    NavbarComponent,
    WalletComponent,
    SettingsComponent,
    LoginComponent,
    PageNotFoundComponent,
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
    FormsModule,
    QRCodeModule,
    JwtModule.forRoot({
      config: {
        tokenGetter: tokenGetter,
        whitelistedDomains: ['localhost:3001'],
        blacklistedRoutes: ['localhost:3001/auth/']
      }
    })
  ],
  providers: [
    ExplorerService,
    WalletService,
    AuthGuard,
    AuthService,
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
