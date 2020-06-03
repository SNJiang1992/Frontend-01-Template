function match(selector, element) {
  let queue = splitSelector(selector);
  let nodeParse = parserSelectorQueue(queue);
  matchAll(nodeParse, element);
}

function matchAll(nodeParse, element) {
  let targetNode = [];
  let unit = nodeParse;
  if (unit.id) {
    targetNode = [document.getElementById(nodeParse.id)];
    if (unit.tagName && !unit.tagName === targetNode[0].tagName.toLowerCase()) {
      targetNode = [];
    }
    if (unit.className && !targetNode[0].className.includes(unit.className)) {
      targetNode = [];
    }
  } else {
    if (unit.className) {
      targetNode = Array.from(element.getElementsByClassName(unit.className));
      if (unit.className === element.className) targetNode.push(element);
      if (unit.tagName) {
        targetNode = targetNode.filter(
          (i) => i.tagName.toLowerCase() === unit.tagName
        );
      }
    } else {
      if (unit.tagName) {
        targetNode = Array.from(element.getElementsByTagName(unit.tagName));
        if (unit.tagName === element.tagName.toLowerCase())
          targetNode.push(element);
      } else {
        targetNode = [];
      }
    }
  }
  if (!nodeParse.children && !nodeParse.descendant) {
    console.log(targetNode, "匹配到的元素");
  }
  if (unit.children && targetNode.length > 0) {
    targetNode.forEach((i) => {
      let childrenELe = Array.from(i.children);
      childrenELe.forEach((ii) => matchAll(unit.children, ii));
    });
  }
  if (unit.descendant && targetNode.length > 0) {
    targetNode.forEach((i) => matchAll(unit.descendant, i));
  }
}

function splitSelector(selector) {
  let current = "";
  let selectqueue = [];
  for (let c of selector) {
    if (c.match(/\w/)) {
      current += c;
    } else {
      if (current !== "") {
        selectqueue.push(current);
      }
      if (c === "#" || c === ".") {
        current = c;
      } else {
        selectqueue.push(c);
        current = "";
      }
    }
  }
  selectqueue.push(current);
  return selectqueue;
}

function parserSelectorQueue(queue) {
  let current = {};
  let currentNode = [];
  let reverseQueue = queue.slice().reverse();
  for (let i of reverseQueue) {
    if (i !== " " && i !== ">") {
      if (i.includes("#")) {
        current.id = i.slice(1);
      } else if (i.includes(".")) {
        current.className = i.slice(1);
      } else {
        current.tagName = i;
      }
      if (reverseQueue.indexOf(i) === 0) {
      } else {
        if (reverseQueue[reverseQueue.indexOf(i) - 1] === " ") {
          current.descendant = currentNode;
        } else if (reverseQueue[reverseQueue.indexOf(i) - 1] === ">") {
          current.children = currentNode;
        }
      }
    } else {
      currentNode = JSON.parse(JSON.stringify(current));
      current = {};
    }
  }
  return current;
}
