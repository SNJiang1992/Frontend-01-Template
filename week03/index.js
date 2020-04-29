var numberObj = {
  a: 10,
  b: 11,
  c: 12,
  d: 13,
  e: 14,
  f: 15,
};

function stringToNumber(str) {
  if (str.startsWith("0b") || str.startsWith("0B")) {
    //二进制
    return getNumber(str, 2);
  } else if (str.startsWith("0o") || str.startsWith("0O")) {
    //8进制
    return getNumber(str, 8);
  } else if (str.startsWith("0x") || str.startsWith("0X")) {
    //16进制
    return getNumber(str, 16);
  } else {
    debugger;
    //十进制
    if (str.startsWith("-")) {
      return 0 - getE(str.slice(1));
    } else {
      return getE(str);
    }
  }
}

function getFullNumber(str) {
  if (str.includes(".")) {
    let arr = str.split(".");
    let num = getNumber(arr[0], 10);
    for (let i = 0; i < arr[1].length; i++) {
      num += arr[1][i] / 10 ** (i + 1);
    }
    return num;
  } else {
    return getNumber(str, 10);
  }
}

function getE(str) {
  if (str.includes("e")) {
    let arr = str.split("e");
    return getFullNumber(arr[0]) * 10 ** getNumber(arr[1], 10);
  }
}

function getNumber(str, x) {
  let num = 0;
  if (x === 10) {
    for (let i = str.length - 1; i == 0; i--) {
      num +=
        (str[i].charCodeAt() - "0".charCodeAt()) * x ** (str.length - i - 1);
    }
  } else {
    for (let i = str.length - 1; i > 1; i--) {
      if (x === 16) {
        if (
          ["0", "1", "2", "3", "4", "5", "6", "7", "8", "9"].includes(str[i])
        ) {
          num +=
            (str[i].charCodeAt() - "0".charCodeAt()) *
            x ** (str.length - i - 1);
        } else {
          num += numberObj[str[i]] * x ** (str.length - i - 1);
        }
      } else {
        num +=
          (str[i].charCodeAt() - "0".charCodeAt()) * x ** (str.length - i - 1);
      }
    }
  }

  return num;
}

function numberToString(value, x) {
  let str = "";
  let temp = value;
  while (temp >= x) {
    str = (temp % x) + str;
    temp = Math.floor(temp / x);
  }
  return (temp % x) + str;
}
