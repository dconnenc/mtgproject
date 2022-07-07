export const TableRow = ({ card, setPreviewCard, index }) => {
  //error with cards that have "//" in their name test
  

  // shortens rarity to single letter value
  const rarity = (cardRarity) => {
    switch(cardRarity){
      case "common":
        return "C";
      case "uncommon":
        return "U";
      case "rare":
        return "R"
      case "mythic":
        return "M"
      case "special":
        return "S"
      default:
        return console.log("Error in rarity function")
    }
  }

  //sets the color vertical of the column to a visual rep of the color
  //BUG: loses color upon comparison
  const color = (colorIdentity) => {

    let colorString = colorIdentity
    
    if(colorIdentity.length >= 2) {
        colorString = "gold";
      } if(colorIdentity.length < 1) {
        colorString = "grey";
      } else {
        colorString.toString()     
          .replace("G", "green")
          .replace("R", "red")
          .replace("U", "blue")
          .replace("W", "white")
          .replace("B", "black")
    }

    const circle = <div style={{
      height: "1em",
      width: "1em",
      borderRadius: "50%",
      border: "1pt black solid",
      backgroundColor: colorString
    }}></div>;

    return circle
}

  return (
    <tr 
      id={card} className="table-row" key={card.id}
      onClick={() => console.log(card)}
      onMouseEnter={() => setPreviewCard(card.image_uris?.normal)}
      //onMouseLeave={() => console.log(card.image_uris?.normal)}
    >
      <td id="card-number">{index + 1}</td>
      <td id="card-name">{card.name}</td>
      <td id="card-data">{color(card.color_identity)}</td>
      <td id="card-data">{rarity(card.rarity)}</td>
      <td id="card-data">{card.score}</td>
    </tr>
  );
};
