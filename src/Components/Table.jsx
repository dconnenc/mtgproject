import { TableRow } from "./TableRow.jsx";
//
export const Table = ({ cards, setPreviewCard }) => {
  if(!cards.length) {
    return <></>
  } else {
    return (
        
        <table id="table-main">
          <tbody>
            <tr id="table-header">
              <th id="card-number">#</th>
              <th id="card-name">Card Name</th>
              <th id="card-data">Colors</th>
              <th id="card-data">Rarity</th>
              <th id="card-data">ELO</th>
            </tr>
            {cards &&
              cards.map((card, index) => (
                <TableRow
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
