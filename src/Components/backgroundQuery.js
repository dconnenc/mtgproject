//this component queries scryfall for a full art land and sets the background to a land
export const backgroundQuery = async () => {
  const query = "https://api.scryfall.com/cards/random?q=%28type%3Aland%29+is%3Aartcrop"
  const response = await fetch(query);
  const data = await response.json()
  return data;
}
