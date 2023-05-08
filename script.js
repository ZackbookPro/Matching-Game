//Since I got stuck on my own matching game, I followed a tutorial as a way to learn from my mistakes. I will go through and comment what each section of code is doing as a learning exercise. I have also added a lot of code to make this game my own.



const welcome = document.querySelector(".welcome")
const startButton = document.querySelector(".start-button");
const scoreDisplay = document.querySelector(".score");
const scoreBoard = document.querySelector(".scoreboard");




startButton.addEventListener("click", () => {
	welcome.remove()
	matchingGame()
	

})


const matchingGame = () => {
	let resetButton = document.createElement('button')
	resetButton.className = "reset-button"

	//This selects the container from the DOM that will hold all of the tiles for the game
	const tilesContainer = document.querySelector(".tiles");
	const movesDisplay = document.querySelector(".moves");
	const matchesDisplay = document.querySelector(".matches");
	const scoreDisplay = document.querySelector(".score");

	let matchesUpdate = document.createElement('p')
	let movesUpdate = document.createElement('p')
	let scoreUpdate = document.createElement('p')

	let matches = '0'
	let moves = '0'
	let score = '0'

	//Array with all the image links or "cards"
	const rappers = ["Savage.jpg", "cardi-b.jpg", "cheif-keef.jpg", "doja-cat.jpg", "drake.jpg", "future.png", "gunna.jpg", "kodak-black.jpg", "lil-baby.jpg", "lil-nas-x.jpg", "lil-uzi.jpg", "lil-yachty.jpg", "megan.png", "moneybagg-yo.jpg", "nba-youngboy.png", "nicki.jpg", "tyler-the-creator.png", "young-thug.jpg"];

	//This code creates a new array and pushes the contents of the rappers array inside of it x2. Then tileCount is assigned to the length of this new array.
	const rappersPicklist = [...rappers, ...rappers];
	const tileCount = rappersPicklist.length;

	// Game state
	let revealedCount = 0;
	let activeTile = null;
	let awaitingEndOfMove = false;


	//This function builds the game board by creating a const called element, and assigning it to a createElement function that makes div element in the HTML document. Then it gives the div's the class of 'tile', a data attribute of 'rapper' and a data attribute of revealed set it 'false'.  
	function buildTile(rapper) {
		const element = document.createElement("div");

		element.classList.add("tile");
		element.setAttribute("data-rapper", rapper);
		element.setAttribute("data-revealed", "false");

		//Then each div is given an event listener of 'click' check the 'revealed' data attribute. 

		element.addEventListener("click", () => {
			const revealed = element.getAttribute("data-revealed");

		//Here an if statement 
			if (
				awaitingEndOfMove
				|| revealed === "true"
				|| element == activeTile
			) {
				return;
			}

			//If not then change the background image from the question mark, to the corresponding rapper's picture.
			element.style.backgroundImage = "url(images/" + rapper + ")";

			if (!activeTile) {
				activeTile = element;
				
				return;
			}

			// Here we set const rapperToMatch to 
			const rapperToMatch = activeTile.getAttribute("data-rapper");

			if (rapperToMatch === rapper) {
				element.setAttribute("data-revealed", "true");
				activeTile.setAttribute("data-revealed", "true");

				

			//Updates the number of matches counter
				matches++ 
				matchesUpdate.innerText = (matches)
				matchesDisplay.appendChild(matchesUpdate)

				moves++ 
				movesUpdate.innerText = (moves)
				movesDisplay.appendChild(movesUpdate)

				score = (moves / matches).toFixed(2)
				console.log(score)
				scoreUpdate.innerText = (score)
				scoreDisplay.appendChild(scoreUpdate)	



				activeTile = null;
				awaitingEndOfMove = false;
				revealedCount += 2;

				//i want the reset button to dsiappear after you click
				
				if (revealedCount === tileCount) {
					resetButton.innerText = 'Play Again?';
					resetButton.addEventListener("click", () => {
						document.querySelectorAll('.tile').forEach(e => e.remove());
						moves = ''
						movesUpdate.innerText = (moves)
						movesDisplay.appendChild(movesUpdate)

						matches = ''
						matchesUpdate.innerText = (matches)
						matchesDisplay.appendChild(matchesUpdate)

						score = ''
						scoreUpdate.innerText = (score)
						scoreDisplay.appendChild(scoreUpdate)

						scoreBoard.removeChild(resetButton)

						matchingGame()
					})
					scoreBoard.appendChild(resetButton)
				}
				return;
			}

			

			//Updates the move counter 
			moves++ 
			movesUpdate.innerText = (moves)
			movesDisplay.appendChild(movesUpdate)
			
			awaitingEndOfMove = true;

			setTimeout(() => {
				activeTile.style.backgroundImage = null;
				element.style.backgroundImage = null;

				awaitingEndOfMove = false;
				activeTile = null;
			}, 700);

		});
			


		return element;

	}



	// This code iterates over the entire rappersPicklist array, and shuffles the array by setting 'randomIndex' to the math.random function. Then assigning an array element to a const called 'rapper'. Then each rapper is assigned to a tile using the buildTile function.
	for (let i = 0; i < tileCount; i++) {
		const randomIndex = Math.floor(Math.random() * rappersPicklist.length);
		const rapper = rappersPicklist[randomIndex];
		const tile = buildTile(rapper);

		rappersPicklist.splice(randomIndex, 1);
		tilesContainer.appendChild(tile);
	}
}

