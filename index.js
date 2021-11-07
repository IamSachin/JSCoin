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

const thirdBlock = new Block({
  index: 3,
  timestamp: +new Date(),
  data: {
    amount: 23
  }
});

console.log('Mining Block:');
console.time('Mining time:');
JSCoin.addBlock(firstBlock);
console.timeEnd('Mining time:');
console.log('===========================');

console.log('Mining Block:');
console.time('Mining time:');
JSCoin.addBlock(secondBlock);
console.timeEnd('Mining time:');
console.log('===========================');

console.log('Mining Block:');
console.time('Mining time:');
JSCoin.addBlock(thirdBlock);
console.timeEnd('Mining time:');
console.log('===========================');