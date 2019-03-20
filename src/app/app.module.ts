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
import { HomepageComponent } from './homepage/homepage.component';
import { LoginComponent } from './login/login.component';
import { WalletPageComponent } from './wallet/wallet-page.component';
import { SettingsComponent } from './settings/settings.component';
import { PageNotFoundComponent } from './not-found/not-found.component';

// modules

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
  MzDropdownModule,
  MzTextareaModule,
  MzCheckboxModule,
  MzRadioButtonModule
} from 'ngx-materialize';

// services
import { ExplorerService } from './explorer/explorer.service';
import { WalletService } from './wallet/wallet.service';
import { AuthService } from './auth/auth.service';
import { UiPasswordService } from './settings/ui-password/ui-password.service';
import { NotificationService } from './notification-bar/notification.service';
import { CommunityFundService } from './services/community-fund.service';
import { DeviceUtilsService } from './settings/device-utils/device-utils.service';
import { WalletUtilsService } from './settings/wallet-utils/wallet-utils.service';

// tools
import { QRCodeModule } from 'angular2-qrcode';
import { ClipboardModule } from 'ngx-clipboard';

// partials
import { UiPasswordComponent } from './settings/ui-password/ui-password.component';
import { ChangeWalletPasswordComponent } from './settings/change-wallet-password/change-wallet-password.component';
import { NavbarComponent } from './navbar/navbar.component';
import { HomepagePaymentRequestListComponent } from './homepage/homepage-payment-request-list/homepage-payment-request-list.component';
import { CommunityFundComponent } from './community-fund/community-fund.component';
import { ProposalListComponent } from './community-fund/proposal-list/proposal-list.component';
import { PaymentRequestListComponent } from './community-fund/payment-request-list/payment-request-list.component';
import { ProposalCreatorComponent } from './community-fund/proposal-creator/proposal-creator.component';
import { CfundStatsComponent } from './community-fund/cfund-stats/cfund-stats.component';
import { HomepageProposalListComponent } from './homepage/homepage-proposal-list/homepage-proposal-list.component';
import { SendToViewComponent } from './homepage/send-to-view/send-to-view.component';
import { DepositViewComponent } from './homepage/deposit-view/deposit-view.component';
import { TransactionsViewComponent } from './homepage/transactions-view/transactions-view.component';
import { BalanceOverviewComponent } from './homepage/balance-overview/balance-overview.component';
import { StakingOverviewComponent } from './homepage/staking-overview/staking-overview.component';
import { WalletStatusComponent } from './homepage/wallet-status/wallet-status.component';
import { PaymentRequestCreatorComponent } from './community-fund/payment-request-creator/payment-request-creator.component';
import { GenericRpcFormComponent } from './generic-rpc-form/generic-rpc-form.component';
import { NotificationBarComponent } from './notification-bar/notification-bar.component';
import { NotificationMakerComponent } from './notification-maker/notification-maker.component';
import { DetailedTransactionsCardComponent } from './wallet/detailed-transactions-card/detailed-transactions-card.component';
import { SetMainAddressComponent } from './settings/set-main-address/set-main-address.component';
import { ConfigEditComponent } from './settings/config-edit/config-edit.component';
import { WalletUtilsComponent } from './settings/wallet-utils/wallet-utils.component';
import { DeviceUtilsComponent } from './settings/device-utils/device-utils.component';
import { ChangeRPCAuthComponent } from './settings/change-rpc-auth/change-rpc-auth.component';
import { SecondsToDays } from './common/pipes/secondsToDays.pipe';
import { NgxLinkifyjsModule } from 'ngx-linkifyjs';

export function tokenGetter() {
  return localStorage.getItem('access_token');
}

@NgModule({
  declarations: [
    AppComponent,
    HomepageComponent,
    NavbarComponent,
    WalletPageComponent,
    SettingsComponent,
    LoginComponent,
    UiPasswordComponent,
    PageNotFoundComponent,
    HomepagePaymentRequestListComponent,
    CommunityFundComponent,
    ProposalListComponent,
    PaymentRequestListComponent,
    ProposalCreatorComponent,
    CfundStatsComponent,
    HomepageProposalListComponent,
    SendToViewComponent,
    DepositViewComponent,
    TransactionsViewComponent,
    BalanceOverviewComponent,
    StakingOverviewComponent,
    WalletStatusComponent,
    PaymentRequestCreatorComponent,
    GenericRpcFormComponent,
    NotificationBarComponent,
    NotificationMakerComponent,
    DetailedTransactionsCardComponent,
    SetMainAddressComponent,
    ConfigEditComponent,
    WalletUtilsComponent,
    DeviceUtilsComponent,
    ChangeWalletPasswordComponent,
    ChangeRPCAuthComponent,
    SecondsToDays
  ],
  imports: [
    NgxLinkifyjsModule.forRoot(),
    ReactiveFormsModule,
    BrowserModule,
    MzCheckboxModule,
    BrowserAnimationsModule,
    MzSidenavModule,
    MzButtonModule,
    MzRadioButtonModule,
    MzCardModule,
    MzSelectModule,
    MzTextareaModule,
    MzModalModule,
    MzNavbarModule,
    MzToastModule,
    AppRoutingModule,
    HttpClientModule,
    FormsModule,
    QRCodeModule,
    MzDropdownModule,
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
    CommunityFundService,
    UiPasswordService,
    NotificationService,
    CommunityFundService,
    DeviceUtilsService,
    WalletUtilsService
  ],
  bootstrap: [AppComponent]
})
export class AppModule {}
