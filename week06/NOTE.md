# 本周总结

## 状态机

本周学习了状态机的使用思想，以及遍历的方式，在做任意匹配状态机的时候需要精确记录当前索引值的需求，于是结合之前的知识，想到了使用一个类来进行记录

```
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
```

之后在每一次匹配的时候根据当前字符与 pattern 的索引值进行比较，相等则进入下一个状态，不等重设计数器，状态回归到初始状态。

## 解析 DOM 树

解析 dom 树的难点在于树的构建，这里使用了用 stack 这种数据的方式来进行匹配，和之前做广度优先遍历使用队列，做了一个很好的对比。

## 解析 CSS

这边学到一个小技巧，reverse 一个数组时，可以使用 slice 返回一个新的数组，这样不会改变原来的数组

```
var a = [1,2,3]
var b = a.slice().reverse()
```
