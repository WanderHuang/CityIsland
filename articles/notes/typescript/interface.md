```typescript
/**
 * learn from https://www.tslang.cn/docs/handbook/interfaces.html
 * 接口的理解：
 * -  一类操作的定义
 * -  一类物件的共同行为
 */

// step 1: 认识类型检查
// 类型检查器对printLael的入参检查：参数为对象，且有个字符串类型的字段，字段名为label
function printLable(labelledObj: {label: string}) {
  console.log(labelledObj.label);
}

let myObj = {size: 10, label: 'Size 10 Object'}

printLable(myObj)

// step 2： 代码抽象 共用行为
// 接口 LabelledValue 定义了某个对象的属性与行为，被用作了printLable2的入参模板
interface LabelledValue {
  label: string;
}

function printLable2(labelledObj: LabelledValue) {
  console.log(labelledObj.label);
}

let myObj2 = {size: 10, label: 'Size 10 Object'}
printLable2(myObj2)

// step 3: 接口行为&属性的可选择性 继承但不一定实现部分行为或属性
// 提高了子类的扩展性，子类只是外形和interface类似，但行为和属性有部分差异
// 定义某类物件时，可以[1]预定义属性 [2]捕获引用了不存在属性的错误
interface SquareConfig {
  color?: string;
  width?: number;
}

function createSquare(config: SquareConfig): {color: string; area: number} {
  // 内部若引用config.otherProp将会报错，因为config的接口未定义此属性
  let newSquare = {color: "white", area: 100};
  if (config.color) {
    newSquare.color = config.color;
  }
  if (config.width) {
    newSquare.area = config.width * config.width;
  }
  return newSquare;
}

let mySquare = createSquare({color: "black"}); // 检查入参未实现width属性，但仍然放行


// step 4 接口的只读行为
```
