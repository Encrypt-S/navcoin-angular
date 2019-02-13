interface CFProposal {
  version: number;
  hash: string;
  blockHash: string;
  description: string;
  requestedAmount: number;
  notPaidYet: number;
  userPaidFee: number;
  paymentAddress: string;
  proposalDuration: number;
}

interface CFPaymentRequest extends CFProposal {
  paymentRequestHash: String;
}
