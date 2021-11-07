import { ChainConsant } from '../constants/chain.constants';
import { Block } from './Block';
import { Transaction } from './Transaction';

export class Blockchain {
  /**
   * @var {Block[]}
   */
  chain;

  /**
   * @var {array}
   */
  pendingTransactions;

  constructor() {
    this.chain = [this.#createGenesisBlock()];
    this.pendingTransactions = [];
  }

  /**
   * @param {Transaction} transaction
   */
  createTransaction(transaction) {
    this.pendingTransactions.push(transaction);
  }

  /**
   * @param {string} address
   * @returns {number}
   */
  getBalanceOfAddress(address) {
    let balance = 0;

    for (let block of this.chain) {
      for (let transaction of block.transactions) {
        if (transaction.fromAddress === address) {
          balance -= transaction.amount;
        }

        if (transaction.toAddress === address) {
          balance += transaction.amount;
        }
      }
    }

    return balance;
  }

  /**
   * @param {string} miningRewardAddress
   */
  minePendingTransactions(miningRewardAddress) {
    let block = new Block({
      timestamp: Date.now(),
      transactions: this.pendingTransactions
    });

    console.time('Mined in: ');
    block.mineBlock(ChainConsant.DIFFICULTY);
    console.timeEnd('Mined in: ');

    this.#addBlock(block);
    this.#resetPendingTransactions(miningRewardAddress);
  }

  /**
   * @param {Block} block
   */
  #addBlock(block) {
    this.chain.push(block);
  }

  /**
   * @param {string} miningRewardAddress
   */
  #resetPendingTransactions(miningRewardAddress) {
    this.pendingTransactions = [
      new Transaction({
        fromAddress: null,
        toAddress: miningRewardAddress,
        amount: ChainConsant.MINING_REWARD
      })
    ];
  }

  /**
   * @returns {Block}
   */
  #createGenesisBlock() {
    return new Block({
      timestamp: +new Date(),
      transactions: [],
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
