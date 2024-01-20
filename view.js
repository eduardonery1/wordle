let guessList = document.getElementById("guessList");
const message = document.getElementById("message");
const numGuesses = 4;

let words = ["ROMA", "PARIS", "PIAUI", "MATRIZ", "IGREJA", "JOGAR", "PULAR", "PEQUI", "GATO"];


function random(max){
    return Math.floor(Math.random()*(max + 1));
}

const dayWord = words[random(words.length-1)];



class LetterBox {
    constructor(row){
        this.row = row;
        this.letterBox = document.createElement("input");
        this.letterBox.setAttribute("class", "letter");
        this.letterBox.readOnly = true;
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
    constructor(guessList, size){
        this.guessList = guessList;
        this.currentLetter = 0;
        this.size = size;
        this.guessSection = document.createElement("section");
        this.letterBoxes = [];
        this.#init();
    }

    #init(){
        this.guessSection.setAttribute("class", "guess");
        for (let i = 0; i < this.size; i++){
            let letterBox = new LetterBox(this);
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
                s += c;
                if (c === dayWord[i]){
                    this.letterBoxes[i].letterBox.style.background = "green";
                }
                else if (dayWord.includes(c)){
                    this.letterBoxes[i].letterBox.style.background = "yellow";
                }
                else{
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
            let guessRow = new Guess(this, this.word.length);
            this.guessListView.appendChild(guessRow.getSection());
            this.guessRows.push(guessRow);
        }

        this.update(false);
    }

    update(win){
        if (win){
            message.textContent = "VENCEU!"
            return;
        }
        this.currentRow++;
        if (this.currentRow === numGuesses){
            message.textContent = "PERDEU!"
            btn.style.visibility = "visible";
            return;
        }
        this.guessRows[this.currentRow].activate();
    }
}



let originalHTML = document.getElementById("guessList").innerHTML;
let guesses = new GuessList(guessList, dayWord, numGuesses);


let sec = document.getElementById("try-again");
let btn = document.createElement("button");
sec.appendChild(btn);
btn.innerText = "Tentar Novamente?";
btn.style.visibility = "hidden";
btn.onclick = () => {
    let main = document.getElementById("main");
    main.removeChild(guessList);
    guessList = document.createElement("section");
    guessList.setAttribute("id", "guessList");
    main.insertBefore(guessList, sec);
    guesses = new GuessList(guessList, dayWord, numGuesses);
    btn.style.visibility = "hidden";
};