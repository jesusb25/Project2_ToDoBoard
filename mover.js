/* Text to add to the move here button */
const MOVE_HERE_TEXT = "— Move here —";

export default class Mover {
  constructor() {
    this.moveText = MOVE_HERE_TEXT;
    this.movingCard = null;

    this.startMoving = this.startMoving.bind(this);
    this.stopMoving = this.stopMoving.bind(this);
  }

  // start moving card by adding buttons and event listeners
  startMoving(card) {
    this.stopMoving();
    this.movingCard = card;
    this.movingCard.classList.add("moving");
    const columnHeaders = document.querySelectorAll(".columnTitle");
    columnHeaders.forEach((header) => {
      const button = document.createElement("button");
      button.classList.add("moveHere");
      button.textContent = this.moveText;
      header.after(button);
    });

    // add button to each card
    const cards = document.querySelectorAll(".cardInstance");
    cards.forEach((card) => {
      const button = document.createElement("button");
      button.classList.add("moveHere");
      button.textContent = this.moveText;
      card.after(button);
    });

    // add event listeners to each button
    const buttons = document.querySelectorAll(".moveHere");
    buttons.forEach((button) => {
      button.addEventListener("click", () => {
        // move card to button location
        button.insertAdjacentElement("beforebegin", this.movingCard);
        // remove all buttons from page after moving
        this._deleteMoveButtons();
        this._clearMovingCards();
      });
    });
  }

  // delete all move buttons to cancel or finish moving
  _deleteMoveButtons() {
    const moveButtons = document.querySelectorAll(".moveHere");
    moveButtons.forEach((button) => {
      button.remove();
    });
  }

  // clear moving class from all cards
  _clearMovingCards() {
    const movingCards = document.querySelectorAll(".moving");
    movingCards.forEach((card) => {
      card.classList.remove("moving");
    });
  }

  // stop moving card state
  stopMoving() {
    this._deleteMoveButtons();
    this._clearMovingCards();
  }
}
