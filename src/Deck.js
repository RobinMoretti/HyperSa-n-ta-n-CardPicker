import Card from "./Card";
import slugify from "slugify";
import { textChangeRangeIsUnchanged } from "typescript";

class Deck {
    constructor(cards, category){
        this.cards = cards;
        this.revealedCards = [];
        this.junkCards = [];
        this.category = category;
        this.element = null;
        this.slugName = slugify(this.category);

        this.render();

        this.shuffle();
    }

    render(){
        let parentTarget = document.getElementsByClassName("decks-container")[0];

        let mainDiv = document.createElement('div');
        mainDiv.classList.add("deck");
        mainDiv.setAttribute('id', `${this.slugName}-deck`);

        let stockDiv = document.createElement('div');
        stockDiv.classList.add('stock');
        mainDiv.appendChild(stockDiv);

        let categoryTitle = document.createElement('h2');
        categoryTitle.innerHTML = this.category
        mainDiv.appendChild(categoryTitle);

        let revealedDiv = document.createElement('div');
        revealedDiv.classList.add('revealed');
        mainDiv.appendChild(revealedDiv);

        let junkDiv = document.createElement('div');
        junkDiv.classList.add('junk');
        mainDiv.appendChild(junkDiv);

        parentTarget.appendChild(mainDiv);

        // parentTarget.innerHTML += div;
        this.element = document.getElementById(this.slugName + "-deck");
        let stockOfCards = this.element.getElementsByClassName("stock")[0];

        this.cards.forEach((card, index) => {
            card.init(stockOfCards);
        });

        this.element.getElementsByClassName("stock")[0].addEventListener('click', ()=>{
            console.log(this)
            this.drawCard();
        });
    }

    drawCard(){
        let revealedDiv = this.element.getElementsByClassName("revealed")[0];
        revealedDiv.appendChild(this.cards[0].element);
        this.revealedCards.push(this.cards[0]);
        this.cards.splice(0, 1);
    }

    shuffle() {
        let currentIndex = this.cards.length,  randomIndex;
      
        // While there remain elements to shuffle...
        while (currentIndex != 0) {
            randomIndex = Math.floor(Math.random() * currentIndex);
            currentIndex--;
        
            // And swap it with the current element.
            [this.cards[currentIndex], this.cards[randomIndex]] = [this.cards[randomIndex], this.cards[currentIndex]];
        }
    }

    junkRevealedCards(){
        console.log("junkRevealedCards")
        for (let i = 0; i < this.revealedCards.length; i++) {
            // const card = this.revealedCards[i];
            let junkDiv = this.element.getElementsByClassName("junk")[0];
            junkDiv.appendChild(this.revealedCards[0].element);
            this.junkCards.push(this.revealedCards[0]);
            this.revealedCards.splice(0, 1);
        }
    }
      
}

export default Deck;