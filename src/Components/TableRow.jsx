export const TableRow = ({ card, setPreviewCard, index }) => {
  //error with cards that have "//" in their name test
  return (
    <tr 
      id={card} className="table-row" key={card.id}
      onMouseEnter={() => setPreviewCard(card.image_uris?.normal)}
      onMouseLeave={() => setPreviewCard("")}
    >
      <td id="card-number">{index}</td>
      <td id="card-name">{card.name}</td>
      <td id="card-data">{card.colors}</td>
      <td id="card-data">{card.rarity}</td>
      <td id="card-data">{card.score}</td>
    </tr>
  );
};
