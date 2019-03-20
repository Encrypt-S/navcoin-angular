export default class RPCCFundPaymentRequestVote {
  version: number;
  hash: string;
  blockHash: string;
  description: string;
  requestedAmount: number;
  votesYes: number;
  votesNo: number;
  votingCycle: number;
  status: string;
  state: number;
  stateChangedOnBlock?: string;
}
