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
  const [isLoading, setIsLoading] = context["isLoading"];

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
          {window.innerWidth > 800 ? 
            <div>
              <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" fill="currentColor" className="bi bi-question-circle tool-tip" viewBox="0 0 16 16">
                <path d="M8 15A7 7 0 1 1 8 1a7 7 0 0 1 0 14zm0 1A8 8 0 1 0 8 0a8 8 0 0 0 0 16z"></path>
                <path d="M5.255 5.786a.237.237 0 0 0 .241.247h.825c.138 0 .248-.113.266-.25.09-.656.54-1.134 1.342-1.134.686 0 1.314.343 1.314 1.168 0 .635-.374.927-.965 1.371-.673.489-1.206 1.06-1.168 1.987l.003.217a.25.25 0 0 0 .25.246h.811a.25.25 0 0 0 .25-.25v-.105c0-.718.273-.927 1.01-1.486.609-.463 1.244-.977 1.244-2.056 0-1.511-1.276-2.241-2.673-2.241-1.267 0-2.655.59-2.75 2.286zm1.557 5.763c0 .533.425.927 1.01.927.609 0 1.028-.394 1.028-.927 0-.552-.42-.94-1.029-.94-.584 0-1.009.388-1.009.94z"></path>
              </svg>
              <div className="inline-padding tool-tip">UPLOAD YOUR LIST
                <span className="tool-tip-text">
                  File should be .txt and only include card names:
                  <br />
                  City of Brass <br />
                  Llanowar Elves <br />
                  Skeletal Swarming <br />
                  CubeCubra offers an export "Card Name (.txt)"
                </span>
              </div>
            </div>
            : <div></div>
          }
            <input type="file" className="btn-file input" required={true} id="file-input" />

            <input type="text" className="description-field" value={list} required={true} placeholder="Your list name..."
                onChange={e => setList(e.target.value)} id="desciption-field"
            />
            <button className="button button-green input-group-append"id="submit">Save</button>
          <pre id="preReader"></pre>
        </form>
      </div>
  );
};

export default FileHandler;
