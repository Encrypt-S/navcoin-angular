class CFProposal {
  blockHash: string;
  description: string;
  hash: string;
  notPaidYet: number;
  paymentAddress: string;
  proposalDuration: number;
  requestedAmount: number;
  state: number;
  status: string;
  userPaidFee: number;
  version: number;
  votesNo: number;
  votesYes: number;
  votingCycle: number;

  stateChangedOnBlock?: string;
  paymentRequests?: Array<CFPaymentRequest>;
}

export default CFProposal;
