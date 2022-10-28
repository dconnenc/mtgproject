import { TableRow } from "./TableRow.jsx";
import { CardsContext } from "./AppContext"
import { useContext } from "react";

export const Table = () => {
  
  const context = useContext(CardsContext);
  
  const [cards, setCards] = context["cards"]
  const [previewCard, setPreviewCard] = context["previewCard"]
  const [comparisonCards, setComparisonCards] = context["comparisonCards"]

  if(!cards.length) {
    return <></>
  } else {
    return (
        <table id="table-main">
          <tbody>
            <tr id="table-header">
              <th id="card-number"> 
                <button type="button" className="btn-close btn-danger" aria-label="Close"
                   onClick={()=> {
                    setCards([]) 
                    setComparisonCards([])
                  }}
                ></button>
              </th>
              <th id="card-name">Card Name</th>
              <th id="card-data">Colors</th>
              <th id="card-data">Rarity</th>
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
