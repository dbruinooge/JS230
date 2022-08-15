document.addEventListener('DOMContentLoaded', event => {
  const message = document.querySelector('#message');
  const letters = document.querySelector('#spaces');
  const guesses = document.querySelector('#guesses');
  const apples = document.querySelector('#apples');
  const replay = document.querySelector('#replay');
  const ALPHABET = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ';
  const GUESSES_ALLOWED = 6;

  const randomWord = (() => {
    const originalWords = ['CHEESE', 'APPLE', 'CUCUMBER', 'PASTRY', 'CAKE'];
    const randomWords = [];
    while (originalWords.length > 0) {
      let index = Math.floor(Math.random() * originalWords.length);
      randomWords.push(originalWords.splice(index, 1)[0]);
    }
    return function() {
      return randomWords.pop();
    };
  })();

  function Game() {
    this.incorrect = 0;
    this.lettersGuessed = [];
    this.correctSpaces = 0;
    this.word = randomWord();
    console.log(this.word);
    if (!this.word) {
      this.displayMessage("Sorry, I've run out of words!");
      return this;
    }
    this.word = this.word.split("");
    this.init();
  }

  Game.prototype = {
    createBlanks() {
      let spaces = (new Array(this.word.length + 1)).join("<span></span>");

      let spans = document.querySelectorAll("span");
      spans.forEach(span => {
        span.parentNode.removeChild(span);
      });
      letters.insertAdjacentHTML('beforeend', spaces);
      this.spaces = document.querySelectorAll('#spaces span');
    },

    displayMessage(text) {
      message.textContent = text;
    },

    init() {
      this.createBlanks();
      replay.style.display = "none";
      apples.className = 'guess_0';
    },
  };

  let game = new Game();

  function playerLost() {
    game.displayMessage("Sorry! You're out of guesses");
    gameOver();
  }

  function playerWon() {
    game.displayMessage("You guessed it!");
    gameOver();
  }

  function gameOver() {
    replay.style.display = "inline";
    document.removeEventListener('keydown', keyPress);
  }

  function keyPress(event) {
    event.preventDefault();
    event.stopPropagation();
    const key = event.key.toUpperCase();
    if (!ALPHABET.includes(key) || game.lettersGuessed.includes(key)) {
      return;
    }

    game.lettersGuessed.push(key);
    guesses.insertAdjacentHTML('beforeend', `<span>${key}</span>`);

    if (game.word.includes(key)) {
      letters.querySelectorAll('span').forEach((span, idx) => {
        if (game.word[idx] === key) {
          span.textContent = key;
        }
      });

        if (game.word.every(letter => game.lettersGuessed.includes(letter))) {
         playerWon();
        }
    } else {
        game.incorrect += 1;
        if (game.incorrect >= GUESSES_ALLOWED) {
          playerLost();
        }
      apples.className = `guess_${game.incorrect}`;
    }
  }

  document.addEventListener('keydown', keyPress);

  replay.addEventListener('click', event => {
    game = new Game();
    console.log('new game object created!');
    if (game.word) {
      game.displayMessage("");
      document.addEventListener('keydown', keyPress);
    }
  });
});

