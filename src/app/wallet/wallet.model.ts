export class WalletModel {
  balance: number;
  coldStakingBalance: number;
  unconfirmedBalance: number;
  immatureBalance: number;
  addresses: Array<String>;
  walletVersion: String;
  mainAddress: String;
  staking: StakeReportData;
}
class StakeReportData {
  today: number;
  week: number;
  month: number;
  year: number;
}
