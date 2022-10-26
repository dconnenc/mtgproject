import { useState, useEffect, useCallback } from "react";
import { ScryfallQuery } from "./Functions/ScryfallQuery";
import { Batcher } from "./Functions/Batcher";

export const FileHandler = ({
  cardInput,
  setCardInput,
  cards,
  setCards,
  setComparisonCards,
  user
}) => {

  const [description, setDescription] = useState('')
  
  //accepts a .txt file of MTG cards, visit cubecobra.com to generate.
  //setCardInput triggers updateCards() useEffect
  const reader = new FileReader();
  reader.addEventListener("load", function () {
    const allCards = this.result.split(/\r?\n/g);
    setCardInput(allCards);
  });


  //Posts submitted list to the database. Called inside of updateCards() 
  const postDBCards = async () => {
    try {
        console.log("frontend userid =", user.id)
        await fetch(`http://localhost:3001/usersCards/${user.id}/${description}`, {
            method: "POST",
            headers: { "Content-Type": "application/json",},
            body: JSON.stringify({ cards })
        })
        .then(response => response.json())
        .then(json => console.log(json));
    } catch (err) {
        console.error(err.message);
    }
  }

  //Consequence of form submission 
  const parseInput = (e) => {
    e.preventDefault();
    setCardInput([]);

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
      console.log(cards)
      // WATCH THESE NEW LINES AND THE EDITS
      postDBCards();
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
            <input type="file" className="btn-file input tool-tip" id="file-input" />
            
            <input type="text" className="" value={description} required={true} placeholder="Your list name..."
                onChange={e => setDescription(e.target.value)} id="desciption-field"
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
