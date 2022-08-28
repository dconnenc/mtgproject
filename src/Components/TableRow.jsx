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
    let colorString = ''

    switch(colorIdentity){
      case colorIdentity.length > 1:
        return colorString = "gold";
      case colorIdentity.length < 1: 
        return colorString = "gray";
      case ["W"]:
        return colorString = "white";
      case ["U"]: 
        return colorString = "blue";
      case ["R"]:
        return colorString = "red";
      case ["B"]:
        return colorString = "black";
      case ["G"]:
        return colorString = "green";
    }
    
    //console.log(colorString, card.color_identity);

    const circle = <div style={{
      height: "1em",
      width: "1em",
      borderRadius: "50%",
      border: "1pt black solid",
      backgroundColor: colorString
    }}>
    </div>;

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
