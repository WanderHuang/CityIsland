# js面向对象编程入门
## 1. 创建对象方式为，构造函数或对象字面量： new Object() || {}。  
  ```javascript
  // new创建对象 需要做构造函数初始化，内部存在一些消耗
  console.time('new')
  for(var i = 0; i < 100000; i++) {
    var a = new Object();
  }

  console.timeEnd('new'); // 16.567138671875ms

  //字面量创建对象 StackOverflow上有对应问题，显示各现代浏览器中 直接量创建对象更快
  console.time('straight')
  for(var j = 0; j < 100000; j++) {
    var b = {};
  }

  console.timeEnd('straight'); //13.918701171875ms 更快
  
  ```
## 2. 对象属性类型：数据属性和访问器属性。  
  ### a. 数据属性
    * [[Configurable]] : 表示能否通过delete删除属性从而重新定义属性，能否修改属性特性，或者能否把属性修改为访问器属性。默认true，改为false后再也改不掉了。  
    * [[Enumerable]] : 表示能否通过for-in循环返回属性。默认true  
    * [[Writable]] : 表示能否修改属性的值。默认true  
    * [[Value]] : 属性数据。getter、setter方法作用于这个位置。默认undefined  
    
    要修改属性默认的特性，必须使用Object.defineProperty()。使用Object.defineProperty()创建一个新属性时，若不指定，configurable、enumerable、writable都默认为false。  
  ### b. 访问器属性  
    访问器属性不包含数据值，包含一对getter、setter方法。访问器属性有如下4个特性：  
    * [[Configurable]] : 描述同数据属性的Configurable  
    * [[Enumerable]] : 描述同数据属性的Enumerable  
    * [[Get]] : 读取属性时调用的方法。默认为undefined  
    * [[Set]] : 写入属性时调用的方法。默认为undefined  
    访问器属性不能直接定义，必须通过Object.defineProperty()定义。  
### 3. 创建对象  
  #### 工厂模式  
  抽象了具体创建对象的细节，在js中采用函数封装的方式实现  
  ```JavaScript
  function createPerson(name, age, job) {
    var o = new Object();
    o.name = name;
    o.age = age;
    o.job = job;
    o.sayName = function() {
      alert(this.name);
    }
    return o;
  }
  ```
  #### 构造函数模式  
  ```JavaScript
  function Person(name, age, job) {
    this.name = name;
    this.age = age;
    this.job = job;
    this.sayName = function() {
      alert(this.name);
    }
  }
  var p1 = new Person('huang', 24, 'worker');
  var p2 = new Person('li', 24, 'worker');
  ```
  
  与工厂模式相比，构造函数特性如下：  
  * 没有显示创建对象的步骤  
  * 直接将属性和方法赋值给了this对象  
  * 不含有return语句  
  
  而调用new Person()时，js引擎会经历以下4个步骤：  
  * 创建一个新对象  
  * 将构造函数的作用域赋给新对象(修改this指向到新对象上)  
  * 执行构造函数中的代码(给新对象添加属性、方法)  
  * 返回新对象  
  
  上述方式中p1、p2均含有构造函数属性，且相同。`p1.constructor(p2.constructor) == Person`。  
  * constructor 采用instanceof来判断  
  
  * 构造函数模式存在的缺陷:  
    构造函数调用时，方法(Function)都要在每个实例对象上重新创建一遍。上述`p1.sayName !== p2.sayName`。  
    完成同一个任务没有必要创建两个方法，可以采用全局函数的方式替换  
    ```JavaScript
    function Person(name, age, job) {
      this.name = name;
      this.age = age;
      this.job = job;
      this.sayName = sayName;
    }
    function sayName() {
      alert(this.name)
    }
    ```
    但这种方式也带来新的问题：全局方法只能被某对象调用；多个方法时，创建步骤繁琐，要定义多个全局函数  
    因此可以采用原型模式来替代  
    
  #### 原型模式  
  ```JavaScript
  function Person() {
  }
  Person.prototype.name = 'default name';
  Person.prototype.age = 'default age';
  Person.prototype.sayName = function() {
    console.log(this.name)
  }
  ```
  
  每一个函数都带有一个prototype属性(指针), 该属性指向一个对象，而这个对象的用途是包含可以由特定类型的所有实例共享的属性和方法。prototype可以理解为通过调用构造函数而创建的那个对象实例的原型对象。  
  * 对象实例共享原型对象中的属性和方法  
  * 原型对象理解  
    * 新创建函数时，自动创建一个prototype属性，该属性指向函数的原型对象。默认情况下，原型对象获得一个constructor属性(构造函数对象),Person.prototype.constructor === Person。
    * prototype属性(原型对象)的其他属性从Object继承过来
    * 调用new Person()创建实例。实例内部包含一个指针(内部属性)，指向构造函数的原型对象(__proto__)  
    ```
    
           |=========================================================
    -------V---------------------------------------------------     |
    |Person Function  |  ====>|Person Prototype(proto object)  |    |
    |-----------------|  |    |--------------------------------|    |
    | prototype| & =>=|==|    |constructor|  & ====>>>>>>======|====|
    |-----------------|  |    |--------------------------------|
                         |    |name       | 'default name'     |   
                         |    |--------------------------------|
                         |    |age        | 'default age'      |
                         |    |--------------------------------|                      
                         |    |others     | 'others'           |
                         |    ---------------------------------|
    |-----------------|  | 
    |Instance Object  |  |
    ------------------|  |
    |__proto__: &==>==|==|                                    
    -------------------
    
    ```
  由图示关系，实例对象和构造函数没有直接关系，实例对象的内部原型指针指向了构造函数的原型对象。
  * 调用实例对象时，会在这个原型链中查找属性、方法，返回最先找到的，未找到则继续往上找，最终到Object对象。
  可以用isPrototypeof()来检测: `Person.prototype.isPrototypeof(p1)`
    
  * 更简洁的原型模式  
    ```JavaScript
    function Person() {
    }
    Person.prototype = {
      name: 'lack name',
      age: 19,
      sayName: function() {
        console.log(this.name);
      }
    }
    ```
    * 这种方式把对象字面量赋值给prototype指针，此时prototype内不再有constructor对象。  
    此时会存在如下现象：
    (1) `p1 instanceof Person // true`
    (2) `Person.constructor == Person // false`
  * 修复constructor的原型模式  
    ```JavaScript
    function Person() {
    }
    Person.prototype = {
      constructor: Person, //原生constructor是不可枚举的(enumerable=false)，此时却是可枚举(enumerable=true)
      name: 'lack name',
      age: 19,
      sayName: function() {
        console.log(this.name);
      }
    }
    ```
  * 原型模式缺点：  
    * 忽略了向构造函数的传值步骤，所有实例获得相同值
    * 引用属性被多个实例共用时，造成不可预知的影响(Object, Array)
  
  #### 组合构造函数模式和原型模式(应用最为广泛、认同度高)  
  构造函数模式用于定义实例属性，原型模式用于定义方法和共享属性，且支持向构造函数传参。节省内存。  
  ```JavaScript
  function Person(name, age) {
    this.name = name;
    this.age = age;
    this.language = ['chinese', 'english'];
  }
  Person.prototype = {
    constructor: Person,
    sayName: function() {
      console.log(this.name);
    }
  }
  ```
  #### 动态原型模式  
  仅在有必要的情况下初始化原型方法和共享属性.  
  ```JavaScript
  function Person(name, age) { //可以采用instanceof 确定其类型(constructor未被修改)  
    this.name = name;
    this.age = age;
    if(typeof this.sayName != 'function') {
      Person.prototype.sayName = function() { //原型修改立即生效，所有实例共享此方法
        console.log(this.name);
      }
    }
  }
  ```
  #### 寄生构造函数模式
  创建一个函数，该函数用于封装创建对象的代码。
  ```JavaScript
  function Person(name, age) {
    var o = new Object();
    o.name = name;
    o.age = age;
    o.sayName = function() {
      console.log(this.name);
    }
    return o; //不写时默认返回调用new生成的实例对象，重新return时，此时可以返回指定对象
  }
  
  var p1 = new Person('huang', 24);
  ```
  与工厂模式区别：  
  * 采用new调用  
  * 函数为构造函数，不是工厂函数  
  
  * 使用示例： 创建一个带有sayArray方法的数组。构造函数内就可以采用Array(Array寄生在构造函数内)。
  ```JavaScript
  function MyArray() {
    var arr = new Array();
    arr.push.apply(arr, arguments);
    arr.sayArray = function(){
      console.log('I am an array');
    }
  }
  ```
  #### 稳妥对象模式
  <略>
  
  
    
    
    
    
