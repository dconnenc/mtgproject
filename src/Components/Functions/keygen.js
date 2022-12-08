export function randomString() {
    const chars = "0123456789ABCDEFGHIJKLMNOPQRSTUVWXTZabcdefghiklmnopqrstuvwxyz";
    let str = "";
    for (let i = 0; i < 16; i++) {
      let rnum = Math.floor(Math.random() * chars.length);
      str += chars.substring(rnum, rnum + 1);
    }
    return str;
  }