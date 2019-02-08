export class WalletModel {
  balance: number;
  address: String;
  mainAddress: string;
  staking: StakeReportData = {
    today: 1,
    week: 10,
    month: 100,
    year: 1000
  };
}
class StakeReportData {
  today: number;
  week: number;
  month: number;
  year: number;
}
