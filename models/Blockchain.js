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
    const [latestBlock] = this.chain.slice(-1);
    return latestBlock;
  }

  /**
   * @param {Block} block
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

  /**
   * @returns {boolean}
   */
  isChainValid() {
    for (let i = 1; i < this.chain.length; i++) {
      const currentBlock = this.chain[i];
      const previousBlock = this.chain[i - 1];

      if (currentBlock.hash !== currentBlock.calculateHash()) {
        return false;
      }

      if (currentBlock.previousHash !== previousBlock.hash) {
        return false;
      }
    }

    return true;
  }
}
