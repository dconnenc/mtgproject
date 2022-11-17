export const TableRow = ({ card, setPreviewCard, index }) => {
  //error with cards that have "//" in their name test

  // shortens rarity to single letter value
  const rarity = {
    "common": "C",
    "uncommon": "U",
    "rare": "R",
    "mythic": "M",
    "special": "S"
  }

  // The values here come from the color identity
  const colorMap = {
    'W': "white",
    'U': "blue",
    'R': "red",
    'B': "black",
    'G': "green",
    'GO': "gold",
    'GR': "gray"
  }

  //sets the color vertical of the column to a visual rep of the color
  // colorIdentity is an array
  const color = (colorIdentity) => {
    const backgroundColor = colorIdentity.length > 1 ? 'GO' : (colorIdentity[0] || 'GR');

    const circle = <div style={{
      height: "1em",
      width: "1em",
      borderRadius: "50%",
      border: "1pt black solid",
      backgroundColor: colorMap[backgroundColor]
    }}>
    </div>;

    return circle
}
  return (
    <tr
      id={card} className="table-row"
      onClick={() => console.log(card)}
      onMouseEnter={() => {
        setPreviewCard({img: card.image_uris ? card.image_uris : card.card_faces[0].image_uris.normal})
      }}
    >
      <td id="card-number">{index + 1}</td>
      <td id="card-data">{color(card.color_identity)}</td>
      <td id="card-data">{rarity[card.rarity]}</td>
      <td id="card-name">{card.name}</td>
      <td id="card-data">{card.score}</td>
    </tr>
  );
};
