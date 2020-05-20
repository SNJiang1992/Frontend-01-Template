//自定义状态机

class StepIndex {
  constructor() {
    this.step = 0;
  }
  add() {
    this.step++;
  }
  getStep() {
    return this.step;
  }
  reset() {
    this.step = 0;
  }
}
function match(string, pattern) {
  let step = new StepIndex();
  let state = start;
  for (let c of string) {
    state = state(c, pattern, step);
  }
  return state === end;
}

function start(c, pattern, step) {
  if (c === pattern[0]) {
    if (pattern.length === 1) {
      return end;
    } else {
      step.add();
      return next;
    }
  } else {
    step.reset();
    return start;
  }
}

function end(c, pattern, step) {
  return end;
}

function next(c, pattern, step) {
  if (c === pattern[step.step]) {
    if (step.step === pattern.length - 1) {
      return end;
    } else {
      step.add();
      return next;
    }
  } else {
    step.reset();
    return start;
  }
}
console.log(match("asdafafa", "dafa"));
