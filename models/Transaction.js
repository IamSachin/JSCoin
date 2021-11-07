export class Transaction {
  /**
   * @var {string}
   */
  fromAddres;

  /**
   * @var {string}
   */
  toAddress;

  /**
   * @var {number}
   */
  amount;

  constructor(model = {}) {
    this.fromAddres = model.fromAddres;
    this.toAddress = model.toAddress;
    this.amount = model.amount;
  }
}
