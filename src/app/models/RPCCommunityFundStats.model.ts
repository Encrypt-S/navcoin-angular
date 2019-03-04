class RPCDataCFundStats {
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

export default RPCDataCFundStats;
