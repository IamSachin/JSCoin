import { Block } from './models/Block';
import { Blockchain } from './models/BlockChain';
import { Transaction } from './models/Transaction';

const JSCoin = new Blockchain();
JSCoin.createTransaction(
  new Transaction({
    fromAdddress: 'address1',
    toAddress: 'address2',
    amount: 100
  })
);

JSCoin.createTransaction(
  new Transaction({
    fromAdddress: 'address2',
    toAddress: 'address1',
    amount: 50
  })
);

console.log('Starting mining...');
JSCoin.minePendingTransactions('minerAddress');

console.log('Balance of miner: ', JSCoin.getBalanceOfAddress('minerAddress'));

// Now miner's reward is in pending transactions. So let's mine again

console.log('\nStarting mining...');
JSCoin.minePendingTransactions('minerAddress');

console.log('Balance of miner: ', JSCoin.getBalanceOfAddress('minerAddress'));
