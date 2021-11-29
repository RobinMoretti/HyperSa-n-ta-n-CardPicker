// let cardTemplate = document.querySelector(".card").cloneNode(true);
// document.body.removeChild(document.querySelector(".card"));


class Card {
    constructor(category, content){
        this.category = category
        this.content = content
        this.element = null;
    }

    init(parentHtml){
        let cardElement = document.createElement("div");
        cardElement.classList.add("card");
        
        let front = document.createElement("div");
        front.classList.add("front");
        cardElement.appendChild(front);
        
        let back = document.createElement("div");
        back.classList.add("back");
        let cardTitle = document.createElement('h2');
        cardTitle.innerHTML = this.content;
        back.appendChild(cardTitle);

        cardElement.appendChild(back);
        this.element = parentHtml.appendChild(cardElement);
    }
}

export default Card;