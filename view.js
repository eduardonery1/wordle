const guessList = document.getElementById("guessList");
const message = document.getElementById("message");
const dayWord = "ROMA";
const numGuesses = 5;


class LetterBox {
    constructor(id, row){
        this.letterBox = document.createElement("input");
        this.letterBox.setAttribute("id", id);
        this.letterBox.readOnly = true;  
        this.row = row;
        this.letterBox.oninput = (e) => {
            this.letterBox.value = e.data.toUpperCase();
            row.update();
        };
    }

    getInput(){
        return this.letterBox;
    }

    activate(){
        this.letterBox.readOnly = false;
    }

    deactivate(){
        this.letterBox.readOnly = true;
    }
}

class Guess {
    constructor(guessList, row, size){
        this.guessList = guessList;
        this.row = row;
        this.currentLetter = 0;
        this.active = false;
        this.size = size;
        this.guessSection = document.createElement("section");
        this.letterBoxes = [];
        this.#init();
    }

    #init(){
        this.guessSection.setAttribute("class", "guess");
        this.guessSection.setAttribute("id", this.row);
        for (let i = 0; i < this.size; i++){
            let letterBox = new LetterBox(i * this.row, this);
            this.letterBoxes.push(letterBox);
            this.guessSection.appendChild(letterBox.getInput());
        }
    }



    getSection() {
        return this.guessSection;
    }

    activate() {
        this.letterBoxes[this.currentLetter].activate();
        this.letterBoxes[this.currentLetter].letterBox.focus();
    }

    deactivate(){
        this.letterBoxes[this.currentLetter].deactivate();
    }

    update(){
        this.deactivate();
        this.currentLetter++;
        if (this.currentLetter === this.size){
            let s = "";
            for (let i = 0; i < this.size; i++){
                let c = this.letterBoxes[i].letterBox.value;
                console.log(c)
                s += c;
                if (c === dayWord[i]){
                    this.letterBoxes[i].letterBox.style.background = "green";
                }
                else if (dayWord.includes(c)){
                    console.log("here")
                    this.letterBoxes[i].letterBox.style.background = "yellow";
                }
                else{
                    console.log(c)
                    this.letterBoxes[i].letterBox.style.background = "red"
                }
            }

            let win = false;
            if (s === dayWord) win = true;
            
            this.guessList.update(win);
        } else { this.activate(); }
    }
}

class GuessList {
    constructor(guessList, word, numGuesses){
        this.size = numGuesses;
        this.word = word;
        this.guessListView = guessList;
        this.guessRows = [];
        this.currentRow = -1;
        this.#init();
    }

    #init(){
        for (let i = 0; i < this.size; i++){
            let guessRow = new Guess(this, i, this.word.length);
            this.guessListView.appendChild(guessRow.getSection());
            this.guessRows.push(guessRow);
        }

        this.update();
    }

    update(win){
        if (win){
            console.log("WIN");
            message.textContent = "VENCEU!"
            return;
        }
        this.currentRow++;
        if (this.currentRow === numGuesses){
            message.textContent = "PERDEU!"
            console.log("PERDEU");
            return;
        }
        this.guessRows[this.currentRow].activate();
    }
}


const guesses = new GuessList(guessList, dayWord, numGuesses);