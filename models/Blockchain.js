import { Block } from './Block';

export class Blockchain {
  /**
   * @var {Block[]}
   */
  chain;

  constructor(model = {}) {
    this.chain = [this.#createGenesisBlock()];
  }

  /**
   * @returns {Block}
   */
  getLatestBlock() {
    return this.chain.slice(-1);
  }

  /**
   * @param {Block} block
   * @returns {Block}
   */
  addBlock(block) {
    this.chain.push(this.#processNewBlock(block));
  }

  /**
   * @param {Block} block
   * @returns {Block}
   */
  #processNewBlock(block) {
    block.previousHash = this.getLatestBlock().hash;
    block.hash = block.calculateHash();
    return block;
  }

  /**
   * @returns {Block}
   */
  #createGenesisBlock() {
    return new Block({
      index: 0,
      timestamp: +new Date(),
      data: 'Genesis Block',
      previousHash: '0'
    });
  }
}
