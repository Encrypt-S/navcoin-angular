export class Transaction {
  account: String;
  address: String;
  category: String;
  amount: 2.0;
  canStake: Boolean;
  canSpend: Boolean;
  vout: Number;
  confirmations: Number;
  generated: Boolean;
  blockhash: String;
  blockindex: Number;
  blocktime: Number;
  txid: String;
  walletconflicts: Array<any>;
  time: Number;
  timereceived: Number;
  anonDestination: String;
  bip125Replaceable: String;
}
