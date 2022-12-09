export function randomNumber(i) {
    let first = Math.floor(Math.random() * i);
    let second = Math.floor(Math.random() * i);
    
    // Make sure the second number is not the same as the first
    while (second === first) {
      // Generate a new second number if it is the same as the first
      second = Math.floor(Math.random() * i);
      console.log(second)
    }
    
    return [first, second];
  }