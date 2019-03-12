export class WalletModel {
  balance: number;
  coldStakingBalance: number;
  unconfirmedBalance: number;
  immatureBalance: number;
  addresses: Array<String>;
  mainAddress: String;
  currentBlock: number;
  highestKnownBlock: number;
}
