export default class Ingredient {
  id: string;
  title: string;
  amount: number;
  constructor(enteredId: string, enteredTitle: string, enteredAmount: number) {
    this.id = enteredId;
    this.title = enteredTitle;
    this.amount = enteredAmount;
  }
}
