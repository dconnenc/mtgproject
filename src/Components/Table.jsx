import { TableRow } from "./TableRow.jsx";
import { CardsContext } from "./AppContext"
import { useContext } from "react";

export const Table = () => {
  
  const context = useContext(CardsContext);
  
  const [userDBCards, setUserDBCards] = context["userDBCards"]
  const [cards, setCards] = context["cards"]
  const [previewCard, setPreviewCard] = context["previewCard"]
  const [comparisonCards, setComparisonCards] = context["comparisonCards"]
  const [cardInput, setCardInput] = context["cardInput"]
  
  if(!cards?.length) {
    return <div></div>
  } else {
    return (
        <table id="table-main">
          <tbody>
            <tr id="table-header">
              <th id="card-number"> 
                <button type="button" className="btn-close btn-danger" aria-label="Close"
                   onClick={()=> {
                    setUserDBCards([]);
                    setCards([]);
                    setComparisonCards([]);
                    setPreviewCard([]);
                    setCardInput([]);
                  }}
                ></button>
              </th>
              <th id="card-data">Colors</th>
              <th id="card-data">Rarity</th>
              <th id="card-name">Card Name</th>
              <th id="card-data">ELO</th>
            </tr>
            {cards &&
              cards.map((card, index) => (
                <TableRow
                  key={index}
                  card={card}
                  setPreviewCard={setPreviewCard}
                  index={index}
                />
              ))}
          </tbody>
        </table>
    );
  }
};
