//this component queries scryfall for a full art land and sets the background to a land
export const backgroundQuery = async () => {
  const query = "https://api.scryfall.com/cards/random?q=%28type%3Aland%29+is%3Aartcrop"
  const response = await fetch(query);
  const data = await response.json()

  //this console is here to help track down when there is no art_crop
  console.log(data);
  return data;
}
