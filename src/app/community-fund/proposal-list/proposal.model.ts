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
  votesYes: number;
  votesNo: number;
  votingCycle: number;
  status: string;
  state: number;
  stateChangedOnBlock?: string;
  paymentRequests?: Array<CFPaymentRequest>;
}

interface CFPaymentRequest {
  version: number;
  hash: string;
  blockHash: string;
  description: string;
  requestedAmount: number;
  notPaidYet: number;
  userPaidFee: number;
  paymentAddress: string;
  proposalDuration: number;
  votesYes: number;
  votesNo: number;
  votingCycle: number;
  status: string;
  state: number;
  stateChangedOnBlock?: string;
  parentProposalHash: string;
}

interface CFVote {
  yes: Array<string>;
  no: Array<string>;
  null: Array<string>;
}

class CFVote implements CFVote {
  getHash(voteString: string): string {
    const split = voteString.split(',');
    return split[0].split('=')[0];
  }
}

class CFundStats {
  funds: {
    available: number;
    locked: number;
  };

  consensus: {
    blocksPerVotingCycle: number;
    minSumVotesPerVotingCycle: number;
    maxCountVotingCycleProposals: number;
    maxCountVotingCyclePaymentRequests: number;
    votesAcceptProposalPercentage: number;
    votesRejectProposalPercentage: number;
    votesAcceptPaymentRequestPercentage: number;
    votesRejectPaymentRequestPercentage: number;
    proposalMinimalFee: number;
  };

  votingPeriod: {
    starting: number;
    ending: number;
    current: number;
    votedProposals: Array<any>;
    votedPaymentrequests: Array<any>;
  };
}
