import VoteType from './VoteType.model';

class CFVote {
  type: VoteType;

  constructor(type: VoteType) {
    this.type = type;
  }

  public toString() {
    if (this.type === VoteType.NONE) {
      return 'none';
    }

    return this.type === VoteType.YES ? 'yes' : 'no';
  }
}

export { CFVote };
