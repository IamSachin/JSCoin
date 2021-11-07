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

  /**
   * Nonce is a number that is added to the hash to make it unique
   * @var {int}
   */
  nonce;

  constructor(model = {}) {
    this.index = model.index;
    this.timestamp = model.timestamp;
    this.data = model.data;
    this.previousHash = model.previousHash;
    this.hash = this.calculateHash();
    this.nonce = 0;
  }

  calculateHash() {
    return SHA256(
      `${this.index} \
      + ${this.timestamp} \
      + ${this.previousHash} \
      + ${JSON.stringify(this.data)}
      + ${this.nonce}`
    ).toString();
  }

  mineBlack(difficulty = 0) {
    // A difficult hash can be one that has a certain number of zeroes at the beginning
    // We keep recalculating the hash till me meet the condition
    while (this.hash.substring(0, difficulty) !== Array(difficulty + 1).join('0')) {
      this.nonce++;
      this.hash = this.calculateHash();
    }

    console.log('Block mined: ', this.hash);
  }
}
