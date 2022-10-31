import { useState, useEffect, useCallback, useContext } from "react";
import { ScryfallQuery } from "./Functions/ScryfallQuery";
import { Batcher } from "./Functions/Batcher";
import { CardsContext } from "./AppContext"

export const FileHandler = ({user}) => {
  const context = useContext(CardsContext);
  
  const [cards, setCards] = context["cards"]
  const [comparisonCards, setComparisonCards] = context["comparisonCards"]
  const [cardInput, setCardInput] = context["cardInput"]

  const [list, setList] = useState('')

  //accepts a .txt file of MTG cards, visit cubecobra.com to generate.
  //setCardInput triggers updateCards() useEffect
  const reader = new FileReader();
  reader.addEventListener("load", function () {
    const allCards = this.result.split(/\r?\n/g);

    setCardInput(allCards);
  });


  //Posts submitted list to the database. Called inside of updateCards()
  const postDBCards = async (scoredCards) => {
    console.log(user.id, list)
    try {
        await fetch(`http://localhost:3001/usersCards/${user.id}/${list}`, {
            method: "POST",
            headers: { "Content-Type": "application/json",},
            body: JSON.stringify({ cards: scoredCards })
        })
        .then(response => response.json())
    } catch (err) {
        console.error(err.message);
    }
  }

  //Triggered by Form Submission
  const parseInput = (e) => {
    e.preventDefault();
    setCardInput([]);
    setCards([]);

    reader.readAsText(document.getElementById("file-input").files[0]);
    };

  //triggered when file is submitted, updates cards from the submitted .txt
  //scryfall API has 75 request limit, code below sends cards in acceptable batches
  const updateCards = useCallback(async () => {
    const cardBatches = Batcher(cardInput, 75);

    const promisedBatch = cardBatches.map(async (cardBatch) => {
      const queryArray = cardBatch
        .filter((cardName) => cardName !== "")
        .map((cardName) => {
          // Expansion // Explosion -> split('//') -> [Expansion, Explosion]
          // Skeletal Swarming -> [Skeletal Swarming, undefined] -> [Skeletal Swarming]
          const [name, ]= cardName.split('//');
          return {
            name,
          };
        });
      //queries scryfall api, check util folder
      return ScryfallQuery({ identifiers: queryArray });
    });

    const retrievedBatch = await Promise.all(promisedBatch);

    if (retrievedBatch.length) {
      const retrievedCards = retrievedBatch.flatMap((batch) => batch.data);
      const scoredCards = retrievedCards.map(obj => {
        return {...obj, score: 1000};
      }).map(card => {
        const { color_identity, image_uris, name, score, rarity } = card;
        return {
          color_identity,
          image_uris: image_uris?.normal,
          name,
          score,
          rarity
        }
      });

      setCards(scoredCards);
      // WATCH THESE NEW LINES AND THE EDITS
      console.log("saving cards");
      postDBCards(scoredCards);
      //The below lines set the comparison card for ELO evaluation
      function getRandomInt(max) {return Math.floor(Math.random() * max);}

      let comparisonCard1 = getRandomInt(scoredCards.length);
      let comparisonCard2 = getRandomInt(scoredCards.length);

      setComparisonCards([scoredCards[comparisonCard1], scoredCards[comparisonCard2]])
    }
  }, [cardInput, setCards, setComparisonCards]);

  //updates table when cards are changed
  useEffect(() => {
    if (cardInput.length > 0 && cards.length === 0) {
      console.log("update cards useeffect tried to run")
      updateCards();
    }
  }, [cardInput, cards.length]);

  if(cards.length > 0){
    return(<div></div>)
  } else{
    return (
    <div className=".container file-handler-container" id="file-handler-container">
      <div className="file-handler-element">
        <form target="_self" onSubmit={parseInput}>
          <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" className="bi bi-question-circle tool-tip" viewBox="0 0 16 16">
            <path d="M8 15A7 7 0 1 1 8 1a7 7 0 0 1 0 14zm0 1A8 8 0 1 0 8 0a8 8 0 0 0 0 16z"></path>
            <path d="M5.255 5.786a.237.237 0 0 0 .241.247h.825c.138 0 .248-.113.266-.25.09-.656.54-1.134 1.342-1.134.686 0 1.314.343 1.314 1.168 0 .635-.374.927-.965 1.371-.673.489-1.206 1.06-1.168 1.987l.003.217a.25.25 0 0 0 .25.246h.811a.25.25 0 0 0 .25-.25v-.105c0-.718.273-.927 1.01-1.486.609-.463 1.244-.977 1.244-2.056 0-1.511-1.276-2.241-2.673-2.241-1.267 0-2.655.59-2.75 2.286zm1.557 5.763c0 .533.425.927 1.01.927.609 0 1.028-.394 1.028-.927 0-.552-.42-.94-1.029-.94-.584 0-1.009.388-1.009.94z"></path>
          </svg>
            <div className="inline-padding tool-tip">UPLOAD YOUR LIST
              <span className="tool-tip-text">
                File should be .txt and only include card names:
                <br></br>
                City of Brass <br></br>
                Llanowar Elves <br></br>
                Skeletal Swarming <br></br>
                CubeCubra offers an export "Card Name (.txt)"
              </span>
            </div>
            <input type="file" className="btn-file input tool-tip" required={true} id="file-input" />

            <input type="text" className="" value={list} required={true} placeholder="Your list name..."
                onChange={e => setList(e.target.value)} id="desciption-field"
            />
            <button className="btn btn-success input-group-append"id="submit">Save</button>
          <pre id="preReader"></pre>
        </form>
      </div>
    </div>
  );
  };
}
export default FileHandler;
