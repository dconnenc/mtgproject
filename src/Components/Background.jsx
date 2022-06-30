import { useEffect } from "react";

export const Background = ({ background, setBackground }) => {
  //goal is to query a random land and set the background to the full art of that land on page load
  const backgroundQuery = async () => { 
    const query = "https://api.scryfall.com/cards/random?q=%28type%3Aland%29+is%3Aartcrop"
    const response = await fetch(query);
    const data = await response.json()
    return data;
  }
 
  useEffect(() => {
    backgroundQuery()
      .then(data => {
          setBackground(data.image_uris.art_crop); 
      })
      .catch(error => console.log(error.message));
}, []);

  return(
    <div>
      0
    </div>
  )
};
