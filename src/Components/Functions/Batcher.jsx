export const Batcher  = (arr, batchSize) => {
    /* scryfall api accepts maximum 75 card query, 
    batches query in 75 increments */
    
    const batchArr = []
    for (let i = 0; i < arr.length; i += batchSize) {
        const batch = arr.slice(i, i + batchSize);
        batchArr.push(batch);
    }
    return batchArr;
}