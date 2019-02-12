export class WalletModel {
  balance: number;
  coldStakingBalance: number;
  unconfirmedBalance: number;
  immatureBalance: number;
  addresses: Array<String>;
  walletVersion: String;
  mainAddress: String;
  stakeData: StakeReportData;
  isSyncing: Boolean;
  isStaking: Boolean;
  isLocked: Boolean;
  currentBlock: number;
  highestKnownBlock: number;
  walletChain: String;
}
class StakeReportData {
  today: number;
  week: number;
  month: number;
  year: number;
}
