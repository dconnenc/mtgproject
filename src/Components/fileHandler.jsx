import { useEffect, useCallback } from "react";
import { ScryfallQuery } from "./Functions/ScryfallQuery";
import { Batcher } from "./Functions/Batcher";

export const FileHandler = ({
  cardInput,
  setCardInput,
  cards,
  setCards,
  setComparisonCards,
}) => {
  
  //accepts a .txt file of MTG cards, visit cubecobra.com to generate.
  const reader = new FileReader();
  reader.addEventListener("load", function () {
    const allCards = this.result.split(/\r?\n/g);
    setCardInput(allCards);
  });

  const parseInput = (e) => {
    e.preventDefault();
    setCardInput([]);
    reader.readAsText(document.getElementById("input").files[0]);
  };

  //triggered when file is submitted, updates cards from the submitted .txt
  const updateCards = useCallback(async () => {
    const cardBatches = Batcher(cardInput, 75);

    const promisedBatch = cardBatches.map(async (cardBatch) => {
      const queryArray = cardBatch
        .filter((cardName) => cardName !== "")
        .map((cardName) => {
          return {
            name: cardName,
          };
        });
      //queries scryfall api   
      return ScryfallQuery({ identifiers: queryArray });
    });

    const retrievedBatch = await Promise.all(promisedBatch);

    if (retrievedBatch.length) {
      const retrievedCards = retrievedBatch.flatMap((batch) => batch.data);
      const scoredCards = retrievedCards.map( obj => {
        return {...obj, score: 1000};
      })
      setCards(scoredCards);

      const randomCardNum = Math.floor(Math.random() * cards.length);
      const randomCardNum1 = Math.floor(Math.random() * cards.length);

      setComparisonCards([cards[randomCardNum], cards[randomCardNum1]]);
    }
  }, [cardInput, setCards, setComparisonCards]);

  //updates table when cards are changed
  useEffect(() => {
    if (cardInput.length > 0 && cards.length === 0) {
      updateCards();
    }
  }, [cardInput, cards.length, updateCards]);

  return (
    <div className="App">
      <h1>Submit a .txt file of cards! </h1>
      <form target="_self" onSubmit={parseInput}>
        <input type="file" id="input" />
        <button id="submit">Submit</button>
        <pre id="preReader"></pre>
      </form>
    </div>
  );
};

export default FileHandler;
