export class WalletModel {
  balance: number;
  coldStakingBalance: number;
  unconfirmedBalance: number;
  immatureBalance: number;
  addresses: Array<String>;
  mainAddress: String;
  stakeData: StakeReportData;
  currentBlock: number;
  highestKnownBlock: number;
}
class StakeReportData {
  today: number;
  week: number;
  month: number;
  year: number;
}
