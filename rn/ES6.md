# 箭头操作符
- 简化函数的书写
- `this`

```
var array = [1, 2, 3];



//传统写法
array.forEach(function(v, i, a) {
    console.log(v);
});

//ES6
array.forEach(v = > console.log(v));
```

# 类的支持

```
//类的定义
class Animal {
	//ES6中新型构造器
    constructor(name) {
        this.name = name;
    }
    //实例方法
    sayName() {
        console.log('My name is '+this.name);
    }
}

//类的继承
class Programmer extends Animal {
    constructor(name) {
    	//直接调用父类构造器进行初始化
        super(name);
    }
    program() {
        console.log("I'm coding...");
    }
}

//测试我们的类
var animal=new Animal('dummy'),
wayou=new Programmer('wayou');
animal.sayName();//输出 ‘My name is dummy’
wayou.sayName();//输出 ‘My name is wayou’
wayou.program();//输出 ‘I'm coding...’
```

# 对象增强
- 可以在对象字面量里面定义原型
- 定义方法可以不用 `function` 关键字
- 直接调用父类方法

```
//通过对象字面量创建对象
var human = {
    breathe() {
        console.log('breathing...');
    }
};

var worker = {
    __proto__: human, //设置此对象的原型为human,相当于继承human
    company: 'freelancer',
    work() {
        console.log('working...');
    }
};

human.breathe();//输出 ‘breathing...’

//调用继承来的breathe方法
worker.breathe();//输出 ‘breathing...’
```

# 字符串模板
```
//产生一个随机数
var num=Math.random();
//将这个数字输出到console
console.log(`your num is ${num}`);
```

# 解构
自动解析数组或对象中的值

```
var [x,y]=getVal(),//函数返回值的解构
    [name,,age]=['wayou','male','secrect'];//数组解构

function getVal() {
    return [ 1, 2 ];
}

console.log('x:'+x+', y:'+y);//输出：x:1, y:2
console.log('name:'+name+', age:'+age);//输出： name:wayou, age:secrect
```

# 参数默认值，不定参数，拓展参数
## 参数默认值
现在可以在定义函数的时候指定参数的默认值了，而不用像以前那样通过逻辑或操作符来达到目的了。
```
function sayHello(name){
	//传统的指定默认参数的方式
	var name=name||'dude';
	console.log('Hello '+name);
}
//运用ES6的默认参数
function sayHello2(name='dude'){
	console.log(`Hello ${name}`);
}
sayHello();//输出：Hello dude
sayHello('Wayou');//输出：Hello Wayou
sayHello2();//输出：Hello dude
sayHello2('Wayou');//输出：Hello Wayou
```

## 不定参数
或称为`Rest`参数,他指在函数中使用命名参数同时接收不定数量的未命名参数,
```
//将所有参数相加的函数
function add(...x){
	return x.reduce((m,n)=>m+n);
}
//传递任意个数的参数
console.log(add(1,2,3));//输出：6
console.log(add(1,2,3,4,5));//输出：15
```

## 拓展参数
也称为展开,它允许传递数组或者类数组直接做为函数的参数而不用通过 `apply`
```
var people=['Wayou','John','Sherlock'];
//sayHello函数本来接收三个单独的参数人妖，人二和人三
function sayHello(people1,people2,people3){
	console.log(`Hello ${people1},${people2},${people3}`);
}
//但是我们将一个数组以拓展参数的形式传递，它能很好地映射到每个单独的参数
sayHello(...people);//输出：Hello Wayou,John,Sherlock

//而在以前，如果需要传递数组当参数，我们需要使用函数的apply方法
sayHello.apply(null,people);//输出：Hello Wayou,John,Sherlock
```

## 模块
### export
```
export { name1, name2, …, nameN };
export { variable1 as name1, variable2 as name2, …, nameN };
export let name1, name2, …, nameN; // also var
export let name1 = …, name2 = …, …, nameN; // also var, const

export default expression;
export default function (…) { … } // also class, function*
export default function name1(…) { … } // also class, function*
export { name1 as default, … };

export * from …;
export { name1, name2, …, nameN } from …;
export { import1 as name1, import2 as name2, …, nameN } from …;
```


### import
```
import defaultMember from "module-name";
import * as name from "module-name";
import { member } from "module-name";
import { member as alias } from "module-name";
import { member1 , member2 } from "module-name";
import { member1 , member2 as alias2 , [...] } from "module-name";
import defaultMember, { member [ , [...] ] } from "module-name";
import defaultMember, * as name from "module-name";
import "module-name";
```

**注意** `Node.js` 原生并未支持 `export | import`


# Proxies
`Proxy` 可以监听对象身上发生了什么事情，并在这些事情发生后执行一些相应的操作。一下子让我们对一个对象有了很强的追踪能力，同时在数据绑定方面也很有用处。
```
//定义被侦听的目标对象
var engineer = { name: 'Joe Sixpack', salary: 50 };
//定义处理程序
var interceptor = {
  set: function (receiver, property, value) {
    console.log(property, 'is changed to', value);
    receiver[property] = value;
  }
};
//创建代理以进行侦听
engineer = Proxy(engineer, interceptor);
//做一些改动来触发代理
engineer.salary = 60;//控制台输出：salary is changed to 60
```

# Symbols
隐藏属性,消除魔术字符串
```
let MyClass2 =  (function() {

  // 创建symbol
  var key = Symbol("key");

  function MyClass(privateData) {
    this[key] = privateData;
  }

  MyClass.prototype = {
    doStuff: function() {
       this[key]
    }
  };

  return MyClass;
})();

var c = new MyClass2("hello")
console.log(c["key"]);
```

# Promises
`Promises` 是处理异步操作的一种模式
```
//创建promise
var promise = new Promise(function(resolve, reject) {
// 进行一些异步或耗时操作
  resolve(2);
});

//绑定处理程序
promise.then(function(result) {
  console.log(result);
  return 3;
}, function(err) {
//promise失败会执行这里
console.log(err); // Error: "It broke"
}).then(result=>console.log(result));
```
