import SHA256 from 'crypto-js/sha256';

export class Block {
  /**
   * The position of the block on the chain
   * @var {int}
   */
  index;

  /**
   * @var {int}
   */
  timestamp;

  /**
   * @var {object}
   */
  data;

  /**
   * Hash of the block before the current block
   * @var {string}
   */
  previousHash;

  /**
   * @var {string}
   */
  hash;

  constructor(model = {}) {
    this.index = model.index;
    this.timestamp = model.timestamp;
    this.data = model.data;
    this.previousHash = model.previousHash;
    this.hash = this.calculateHash();
  }

  calculateHash() {
    return SHA256(
      `${this.index} \
      + ${this.timestamp} \
      + ${this.previousHash} \
      + ${JSON.stringify(this.data)}`
    ).toString();
  }
}
