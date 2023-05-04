import Card from "./card.js";
import Mover from "./mover.js";
const TODO = "todo";

export default class App {
  constructor() {
    this.addCard = this.addCard.bind(this);
    this.form = document.querySelector("#addCard");
    this._submitForm = this._submitForm.bind(this);
    this.form.addEventListener("submit", this._submitForm);
    this.mover = new Mover();
  }

  // add card to todo column without refreshing page
  _submitForm(event) {
    event.preventDefault();
    let title = this.form.querySelector("#cardTitle").value;
    let color = this.form.querySelector("#cardColor").value;
    this.addCard(TODO, title, color);
    this.form.reset();
  }

  // add card to column using card class
  addCard(col, title, color) {
    // create a new card
    this.mover.stopMoving();
    let newCard = new Card(title, color);
    let column = document.querySelector(`#${col}`);
    newCard.addToCol(column, this.mover);
    return newCard;
  }
}
