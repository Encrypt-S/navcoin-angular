class RPCCommunityFundVoteList {
  yes: Array<string>;
  no: Array<string>;
  null: Array<string>;
  getHash(voteString: string): string {
    const split = voteString.split(',');
    return split[0].split('=')[0];
  }
}

export default RPCCommunityFundVoteList;
