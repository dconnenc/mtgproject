export const ScryfallQuery = async (query) => {
  /*collection query function for more info read
    here: https://scryfall.com/docs/api/cards */
  const queryString = `https://api.scryfall.com/cards/collection`;
  const queryStringified = JSON.stringify(query);

  const res = await fetch(queryString, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: queryStringified,
  });
  if (res) {
    return res.json();
  }
};
