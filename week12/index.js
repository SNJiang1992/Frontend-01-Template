var regexp = /([0-9\.]+)|([ ]+)|([\r\n]+)|(\+)|(\-)|(\*)|(\/)/g;

var dictionary = ["Number", "Whitespace", "LineTerminator", "+", "-", "*", "/"];

function* tokenize(source) {
  var result = null;
  var lastIndex = 0;

  do {
    lastIndex = regexp.lastIndex;
    result = regexp.exec(source);
    if (!result) break;

    for (var i = 0; i < dictionary.length; i++) {
      if (result[i + 1]) console.log(dictionary[i]);
    }

    console.log(result[0]);
  } while (result);
  yield { type: "EOF" };
}

tokenize("1024 + 10 * 25");
