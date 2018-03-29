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
## 3. 创建对象  
  ### 工厂模式  
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
  ### 构造函数模式  
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
    
  ### 原型模式  
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
  
  ### 组合构造函数模式和原型模式(应用最为广泛、认同度高)  
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
  ### 动态原型模式  
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
  ### 寄生构造函数模式
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
  ### 稳妥对象模式  
  <略>  
## 4. 对象继承  
* 原型链：  
  * 每个构造函数都有一个原型对象，原型对象包含一个指向构造函数的指针，实例对象都包含一个指向原型对象的内部指针。  
  * 根据上述关系，把一个原型对象指向另一个类的实例，可以构造一个原型链关系。  
  * 实现原型链的一种基本模式  
    ```javascript
    function SuperType(){
      this.property = true;
    }
    SuperType.prototype.getSuperValue = function() {
      return this.property;
    }
    function SubType() {
      this.subproperty = false;
    }

    //继承
    SubType.prototype = new SuperType();
    SubType.prototype.getSubValue = function(){
      return this.subproperty;
    }
    var instance = new SubType();
    alert(instance.getSubperValue()) // true
    ```  
* 原型链问题：  
  * 父函数的实例变成子函数的原型，因此，子函数默认共享了父函数实例上的属性。  
  * 创建子类型时不能向超类型的构造函数传参。没有办法在不影响所有对象实例的情况下给超类型的构造函数传参。  
  
  ### 借用构造函数(很少单独使用)  
  在子类型构造函数的内部调用超类型构造函数。  
  ```javascript
  function SuperType() {
    this.colors = ['red', 'blue', 'green'];
  }

  function SubType() {
    //显示调用父类构造函数 call、apply 生成每个子实例的时候调用此块代码，子实例各自留存一份父构造函数内属性的一份副本
    SuperType.call(this); 
  }

  var instance1 = new SubType();
  instance1.colors.push('black'); //red, blue, green, black

  var instance2 = new SubType();
  console.log(instance2.colors) // red, blue, green
  ```  
  * 借用构造函数时，需要在子构造函数中显示调用父构造函数，造成方法都在函数中定义，无法实现函数复用  
  * 超类型原型中定义的方法对子类不可见  
  
  ### 组合继承(常用)  
  组合原型和构造函数方法：借用原型链实现对原型属性和方法的继承，通过借用构造函数实现对实例属性的继承  
  ```javascript
  function SuperType(name) {
    this.name = name;
    this.colors = ['red', 'blue'];
  }
  SuperType.prototype.sayName = function() {
    console.log(this.name)
  }

  function SubType(name, age) {
    Super.call(this, name); //  借用构造函数获取父实例属性
    this.age = age;
  }

  SubType.prototype = new SuperType(); //  调用父类构造函数
  SubType.prototype.constructor = SubType; //  修复构造函数
  SubType.prototype.sayAge = function() {
    console.log(this.age)
  }

  // 分别拥有自己的age属性， 共享原型链上的方法
  var instance1 = new SubType('huang', 14); //生成实例，内部二次调用父类构造函数
  var instance2 = new SubType('cheng', 24);
  ```

  ### 原型式继承  
  借助原型可以基于已有的对象创建新对象，不必因此创建自定义类型。
  ```javascript

  // 实际上实现了对对象o的一次浅复制。修改新对象的引用类型属性时，o的对应属性也会被修改。
  function object(o) {
    function F(){};
    F.prototype = o; //类似借用构造函数模式，实例o的引用属性被各子实例共享
    return new F();
  }
  ```
  ECMAScript5引入了`Object.create()`方法，以规范化原型式继承。  
  
  ### 寄生式继承  
  创建一个仅用于封装继承过程的函数，该函数在内部以某种方式增强对象，然后再返回对象  
  ```javascript
  function createAnother(original) {
    var clone = object(original);// 调用函数创建对象，原型模式(可以不采用此方式创建对象，任意能创建对象的方式都可以)
    clone.sayHi = function() { // 可以给新对象添加自己的方法( 每个实例都生成一次, 函数复用效率低)
      console.log('Hi')
    }
    return clone;
  }
  ```
  
  ### 寄生组合式继承(最理想方式 最有效)  
  组合式继承会调用两次父类实例，一次是用于生成子类原型(原型对象)，一次用于子类实例属性(构造函数内部)。  
  寄生组合模式：通过借用构造函数来继承属性，通过原型链的混成形式来继承方法。采用寄生式继承来继承超类型的原型，然后再将结果指定给子类型的原型。  
  ```javascript
  // 原型继承公用方法
  function inheritPrototype(subType, superType) {
    var prototype = object(superType.prototype); // 创建对象 创建超类型原型的一个副本
    prototype.constructor = subType; //对象增强 为副本添加属性 此处为constructor
    subType.prototype = prototype; //指定对象 新副本赋值给子类型的原型
  }


  function SuperType(name) {
    this.name = name;
    this.colors = ['red', 'blue', 'green'];
  }

  SuperType.prototype.sayName = function() {
    console.log(this.name);
  }

  function SubType(name, age) {
    SuperType.call(this, name); // 调用父类构造函数，实现对属性的继承
    this.age = age;
  }

  inheritPrototype(SubType, SuperType); // 子类原型指向父类原型对象的副本，实现对方法的继承

  SubType.prototype.sayAge = function() { // 增加子类型自身原型方法
    console.log(this.age)
  }
  ```
  * 此方法只调用了一次超类型的构造函数，并且避免了在SubType.prototype上创建不必要的、多余的属性，只在调用超类构造函数的时候获取超类属性。  
  * 原型链保持不变，实现原型链继承  
  * 可以正常使用intanceof 和 isPrototypeOf()  
