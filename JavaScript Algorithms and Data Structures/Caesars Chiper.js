function rot13(str) {
    const ROT13 = {
      A: "N",
      B: "O",
      C: "P",
      D: "Q",
      E: "R",
      F: "S",
      G: "T",
      H: "U",
      I: "V",
      J: "W",
      K: "X",
      L: "Y",
      M: "Z",
      N: "A",
      O: "B",
      P: "C",
      Q: "D",
      R: "E",
      S: "F",
      T: "G",
      U: "H",
      V: "I",
      W: "J",
      X: "K",
      Y: "L",
      Z: "M",
    };
  
    str = str.split(" ");
  
    return str
      .map(function (word) {
        return [...word]
          .map(function (char) {
            if (ROT13.hasOwnProperty(char)) {
              return ROT13[char];
            } else {
              return char;
            }
          })
          .join("");
      })
      .join(" ");
  }