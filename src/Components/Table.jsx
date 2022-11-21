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
        <table className="table-main">
          <tbody>
            <tr className="table-header">
              <th className="card-number"> 
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
              <th className="card-data">Colors</th>
              <th className="card-data">Rarity</th>
              <th className="card-name">Card Name</th>
              <th className="card-data">ELO</th>
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
