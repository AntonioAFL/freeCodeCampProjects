function palindrome(str) {
    let regex = /\W|_/gi;
    let revStr = str
      .toLowerCase()
      .replace(regex, "")
      .split("")
      .reverse()
      .join("");
  
    if (str.toLowerCase().replace(regex, "") == revStr) {
      return true;
    } else {
      return false;
    }
  }
  