import { useState, useEffect, useCallback, useContext } from "react";
import { ScryfallQuery } from "./Functions/ScryfallQuery";
import { Batcher } from "./Functions/Batcher";
import { CardsContext } from "./AppContext";
import { postDBCards } from "./Functions/PostDBCard";

//This file is admittedly a jungle.
// FileHandler component handles files by:
// • intakes list name from client
// • reads text input from client on form submission
// • posts submitted list to Scryfall Api to populate
//   card images, colors, and other data
// • adds a 'score' quality to the card object
// • posts the updated card object to the datbase
// • generates a URL that renders the list for evaluation

export const FileHandler = ({user}) => {
  const context = useContext(CardsContext);
  const [cards, setCards] = context["cards"];
  const [cardInput, setCardInput] = context["cardInput"];
  const [_, setIsLoading] = context["isLoading"];

  const [list, setList] = useState('');

  //accepts a .txt file of MTG cards, visit cubecobra.com to generate.
  //setCardInput triggers updateCards() useEffect
  const reader = new FileReader();
  reader.addEventListener("load", function () {
    const allCards = this.result.split(/\r?\n/g);

    setCardInput(allCards);
  });

  //Triggered by Form Submission
  const parseInput = (e) => {
    e.preventDefault();
    setCardInput([]);
    setCards([]);
    setIsLoading(true);
    
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
          //These lines of code dont do anything but for some reason everything breaks when I try to refactor them. 
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
      const scoredCards = retrievedCards.map(card => {
        const { color_identity, image_uris, card_faces, name, score, rarity } = card;
        return {
          color_identity,
          image_uris: image_uris?.normal,
          name,
          score,
          rarity,
          card_faces,
          score: 1000
        }
      });

      postDBCards(scoredCards, user.id, list);
      setIsLoading(false)
    }
  });

  //updates table when cards are changed
  useEffect(() => {
    if (cardInput.length > 0 && cards.length === 0) {
      updateCards();
    }
  }, [cardInput, cards.length]);

  
  return (
    <div className="file-handler-container" id="file-handler-container">
        <form target="_self" onSubmit={parseInput}>
            <div className="input-title">UPLOAD YOUR LIST</div>
              <div className="instructions">
                File should be .txt and include only card names, no quantities. For example:
                <ul><br /><em>
                City of Brass<br />
                Llanowar Elves <br />
                Skeletal Swarming <br />
                Command Tower <br /></em>
                </ul> 
                CubeCubra offers an export "Card Name (.txt)" which works perfectly for the reader. 
              </div>
            <input type="file" className="btn-file input" required={true} id="file-input" />
            <input type="text" className="description-field input" value={list} required={true} 
                placeholder="Your list name..." onChange={e => setList(e.target.value)} id="desciption-field"
            />
            <button className="button button-green"id="submit">Save</button>
            <pre id="preReader" />
        </form>
      </div>
  );
};

export default FileHandler;
