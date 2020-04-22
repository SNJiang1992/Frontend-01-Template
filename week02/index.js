//utf-8 encoding
function toUtf8(string) {
  let codeNumber = string.codePointAt();
  let binaryString = codeNumber.toString(2);
  let nlength = binaryString.length;
  let arr = [];
  arr[0] = nlength > 7 ? binaryString.slice(-6) : binaryString;
  for (let i = 1; i < nlength / 6; i++) {
    arr[i] = binaryString.slice(-i * 6 - 1 * 6, -i * 6);
  }
  arr.reverse();
  for (let i = 1; i < arr.length; i++) {
    arr[i] = "00" + arr[i];
  }
  let targetBinaryStr = arr.join("");
  let baseBinary = 0;
  if (0 < nlength && nlength <= 7) {
    baseBinary = 0;
  } else if (7 < nlength && nlength <= 11) {
    baseBinary = 0b1100000010000000;
  } else if (11 < nlength && nlength <= 16) {
    baseBinary = 0b111000001000000010000000;
  } else if (16 < nlength && nlength <= 21) {
    baseBinary = 0b11110000100000001000000010000000;
  }
  let result = baseBinary + Number(`0b${targetBinaryStr}`);
  return result.toString(16);
}
toUtf8("严"); //e4b8a5

/**
 * 1.整数 /^\d+$/
 * 2.带小数点 /^\d+\.\d*$|^\d*\.\d+$/
 * 3.0x 0b 0o /^(0[bB])[01]+$/ /(0[oO])[0-7]+$/ /^(0[xX])[0-9|a-f|A-F]+$/
 * */
 var numReg = /^-?(\d+$|\d+\.\d*$|\d*\.\d+$|(0[bB])[01]+$|(0[oO])[0-7]+$|(0[xX])[0-9|a-f|A-F]+$)/

//字符串正则

var SrrReg = /^\"[a-z][A-Z][0-9]*\"$|^\'[a-z][A-Z][0-9]*\'$/

