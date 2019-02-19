import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { HttpClientModule } from '@angular/common/http';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

// app
import { AppComponent } from './app.component';
import { AppRoutingModule } from './/app-routing.module';

// auth
import { AuthGuardService as AuthGuard } from './auth/auth-guard.service';
import { JwtModule } from '@auth0/angular-jwt';

// pages
import { OverviewComponent } from './overview/overview.component';
import { LoginComponent } from './login/login.component';
import { WalletComponent } from './wallet/wallet.component';
import { SettingsComponent } from './settings/settings.component';
import { PageNotFoundComponent } from './not-found/not-found.component';

// modules
import { UiPasswordComponent } from './settings/ui-password/ui-password.component';

// materialize
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import {
  MzSidenavModule,
  MzButtonModule,
  MzSelectModule,
  MzCardModule,
  MzNavbarModule,
  MzModalModule,
  MzToastModule,
  MzToastService
} from 'ngx-materialize';

// services
import { ExplorerService } from './explorer/explorer.service';
import { WalletService } from './wallet/wallet.service';
import { AuthService } from './auth/auth.service';
import { UiPasswordService } from './settings/ui-password/ui-password.service';

// tools
import { QRCodeModule } from 'angular2-qrcode';
import { ClipboardModule } from 'ngx-clipboard';

// partials
import { NavbarComponent } from './navbar/navbar.component';
import { CFundPaymentRequestListComponent } from './overview/cfund-payment-req/cfund-payment-req-list.component';
import { CommunityFundComponent } from './community-fund/community-fund.component';
import { ProposalListComponent } from './community-fund/proposal-list/proposal-list.component';
import { PaymentRequestListComponent } from './community-fund/payment-request-list/payment-request-list.component';
import { ProposalCreatorComponent } from './community-fund/proposal-creator/proposal-creator.component';
import { CfundStatsComponent } from './community-fund/cfund-stats/cfund-stats.component';
import { ProposalsViewComponent } from './overview/proposals-view/proposals-view.component';
import { SendToViewComponent } from './overview/send-to-view/send-to-view.component';
import { DepositViewComponent } from './overview/deposit-view/deposit-view.component';
import { TransactionsViewComponent } from './overview/transactions-view/transactions-view.component';
import { WalletOverviewComponent } from './overview/wallet-overview/wallet-overview.component';
import { StatusViewComponent } from './overview/status-view/status-view.component';
import { PaymentRequestCreatorComponent } from './community-fund/payment-request-creator/payment-request-creator.component';


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
    UiPasswordComponent,
    PageNotFoundComponent,
    CFundPaymentRequestListComponent,
    CommunityFundComponent,
    ProposalListComponent,
    PaymentRequestListComponent,
    ProposalCreatorComponent,
    CfundStatsComponent,
    ProposalsViewComponent,
    SendToViewComponent,
    DepositViewComponent,
    TransactionsViewComponent,
    WalletOverviewComponent,
    StatusViewComponent,
  ],
  imports: [
    ReactiveFormsModule,
    BrowserModule,
    BrowserAnimationsModule,
    MzSidenavModule,
    MzButtonModule,
    MzCardModule,
    MzSelectModule,
    MzModalModule,
    MzNavbarModule,
    MzToastModule,
    AppRoutingModule,
    HttpClientModule,
    FormsModule,
    QRCodeModule,
    ClipboardModule,
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
    UiPasswordService
  ],
  bootstrap: [AppComponent]
})
export class AppModule {}
