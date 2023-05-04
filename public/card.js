/* The text to use when description is empty */
const NO_DESCRIPTION_TEXT = "(No description)";

export default class Card {
  constructor(title, color) {
    // clone node
    let templateCard = document.querySelector(".template");
    this.card = templateCard.cloneNode(true);

    // set title and color
    this.card.querySelector(".title").textContent = title;
    this.card.style.backgroundColor = color;

    // remove template class and add card class
    this.card.classList.remove("template");
    this.card.classList.add("cardInstance");

    // set initial description
    this.card.setDescription = this.setDescription.bind(this);
    this.card.setDescription(NO_DESCRIPTION_TEXT);
    this.textArea = this.card.querySelector(".editDescription");

    // set delete button
    this.deleteCard = this.deleteCard.bind(this);
    this.deleteButton = this.card.querySelector(".delete");
    this.deleteButton.addEventListener("click", this.deleteCard);

    // set edit button
    this.editButton = this.card.querySelector(".edit");
    this.editCard = this.editCard.bind(this);
    this.editButton.addEventListener("click", this.editCard);

    // set move button
    this.moveButton = this.card.querySelector(".startMove");
  }

  // use edit button to edit description
  editCard() {
    // hide description and show text area
    this.textArea.value = this.description;
    let description = this.card.querySelector(".description");
    description.classList.add("hidden");
    this.textArea.classList.remove("hidden");
    this.textArea.select();
    this.textArea.focus();
    // blur & update description
    this.textArea.addEventListener("blur", () => {
      this.textArea.classList.add("hidden");
      this.setDescription(this.textArea.value);
      description.classList.remove("hidden");
    });
  }

  // delete this.card instance
  deleteCard() {
    this.mover.stopMoving();
    this.card.remove();
  }

  // add this.card to colElem
  addToCol(colElem, mover) {
    colElem.append(this.card);
    this.mover = mover;
    this.moveButton.addEventListener("click", () => {
      this.mover.startMoving(this.card);
    });
  }

  // set description to text
  setDescription(text) {
    this.description = text;
    this.card.querySelector(".description").textContent = text;
  }
}
