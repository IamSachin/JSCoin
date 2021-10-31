import { Block } from './models/Block';
import { Blockchain } from './models/BlockChain';

const JSCoin = new Blockchain();

const firstBlock = new Block({
  index: 1,
  timestamp: +new Date(),
  data: {
    amount: 30
  }
});

const secondBlock = new Block({
  index: 2,
  timestamp: +new Date(),
  data: {
    amount: 50
  }
});

JSCoin.addBlock(firstBlock);
JSCoin.addBlock(secondBlock);

console.log(JSON.stringify(JSCoin, null, 2));

console.log('Is chain valid: ', JSCoin.isChainValid());

JSCoin.chain[1].data.amount = 100;
console.log('Is chain valid: ', JSCoin.isChainValid());
