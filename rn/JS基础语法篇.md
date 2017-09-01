# JS 基础

-  **1.变量申明，var，let和const**

var是函数级作用域，let是块级作用域，const是不变量，var和let区别示例：

         function foo() {
           var a=3;
           {
              var a=2;
              console.log(a);
           }
           console.log(a);
         }
         foo();      

总结：var定义变量会提升，造成函数范围内变量污染，let在块级内生效，块级之外不可访问，let不可重复定义变量会直接报SyntaxError错误，const变量定义之后不可变，被引擎优化，性能最高


-  **2.对象和类型**


对象的构建方式：字面量方式以及构造方式，大部分情况采用字面量方式

          var myObj = {
              key: value
              // ...
          };

          var myObj = new Object();
          myObj.key = value;

JavaScript定义了7种内建类型，null，undefined，boolean，number，string，object，symbol ，示例如下：

          console.log(typeof undefined );
          console.log(typeof true );
          console.log(typeof 42 );
          console.log(typeof  "42" );
          console.log(typeof { life: 42 } );
          console.log(typeof Symbol() );
          console.log(typeof null );
          console.log(typeof function(){});


总结：其中object属于复杂对象，其他的6种类型属于简单对象，null的对象类型是null型，一般返回object；

函数对象：是对象的一种复杂子类型，比如Data对象，其内部实现是一个function，并不是类似普通面向对象语言的类的概念

          var myObject = {a: 2};   
          myObject.a; //  
          2myObject["a"]; // 2

数组对象：属于一种更加结构化的复杂对象，数组的值是不做约束的，可以是任意类型，只通过索引获取数组的值，比如这种：

          var myArray = [ "foo", 42, "bar" ];
          myArray["3"] = "baz";
          myArray.length; // 4
          myArray[3]; // "baz"

对象描述符：在ES5之后都使用对象描述符来描述， 出了本身的对象值之外还有三种属性，writable（可写），enumerable（可枚举），和configurable（可配置）

          var myObject = {
              a: 2
          };          
          console.log(Object.getOwnPropertyDescriptor( myObject, "a" ));
          <!-- Object.defineProperty( myObject, "a", {
            value: 2,
            writable: false, // 不可写！
            configurable: true,
            enumerable: true
          } ); -->

writable：设置false，属性的值不可再改变
configurable：设置为false，为不可逆操作，这个一般用在组织delete操作符删除属性
enumerable：设置为false，将不能通过for in访问

-  **3.this和作用域**

this的概念：this与其他的强类型语言的区别非常大，JS的this并不是指向函数，也不是指向全局，而是指向函数被调用的地方

          function foo(num) {
          console.log( "foo: " + num );

          // 追踪`foo`被调用了多少次
          this.count++;
          }

          foo.count = 0;

          var i;

          for (i=0; i<10; i++) {
          if (i > 5) {
             foo( i );
          }
          }
          // foo: 6
          // foo: 7
          // foo: 8
          // foo: 9

          console.log( foo.count );

　        
总结：this是指向函数被调用的地方而不是指向函数本身或者函数作用域，this绑定常用的几种方法：

1.默认绑定（修改上述例子）

2.call或者applay，这两个方法都是为了修改this

        function foo() {
            console.log( this.a );
        }
        var obj = {
            a: 2
        };
        foo.call( obj ); // 2

3.ES6的箭头函数，被调用的时候会捕获函数的调用点并绑定this，该绑定不能被覆盖

        function foo() {
            return (a) => {
            // 这里的`this`是词法上从`foo()`采用
                console.log( this.a );
            };
        }

        var obj1 = {
            a: 2
        };

        var obj2 = {
            a: 3
        };

        var bar = foo.call( obj1 );
        bar.call( obj2 ); // 2, 不是3!

4.new关键字，this指向被创建的对象

        function foo(a) {
          this.a = a;
        }
        var bar = new foo( 2 );
        console.log( bar.a ); // 2


作用域：一般分为函数级作用域和全局作用域，ES6新增块级作用域，作用域类似气泡，不会存在某个函数的作用域同时出现在它的两个外部作用域里，一般认为函数被创建的时候会为自己创建一个函数作用域

        function foo(a) {

            var b = a * 2;

            function bar(c) {
                console.log( a, b, c );
            }

            bar(b * 3);
        }

        foo( 2 ); // 2 4 12        

块级作用域：很多时候在函数内部应该避免使用var，块级作用域和函数作用域共存

        function foo() {
            var i=100;
            for (let i=0; i<10; i++) {
                console.log( i );
            }
            console.log( i );
        }


-  **4.函数和闭包**        

1.函数：函数是一种复杂对象，区别与面向对象语言的方法，当对象的某个属性值是一个函数的时候，可以当它是一个方法
函数的结构类似一个黑盒子，附带输入的接口和输出的接口，函数内部对外是不可见的，函数可以直接访问全局作用域的值
并不是基于类的概念，而是基于闭包

        function foo() {
            var a = 2;
            this.bar();
        }

        function bar() {
            console.log( this.a );
        }

        foo();

函数的四种调用方式：

（1）.函数调用方式，this指向全局

        a=10;
        function foo() {
             console.log(this.a);
        }
        foo();

（2）.方法调用模式，this指向当前调用的对象

       a=10;  
       var foo = function() {
           console.log(this.a);
       };
       var o = {};+
       o.bar = foo;
       o.bar();

（3）.构造器调用模式，this指向对象

      function foo(a) {
        this.a = a;
      }
      var bar = new foo( 2 );
      console.log( bar.a ); // 2

（4）.call和applay，替换对象，改变this

      var foo = function() {
      this.name = '10';
      };
      var o = {};
      foo.apply(o);
      console.log( o.name );


总结：函数应该是模块化，功能型的，被某个对象调用，或者当值传递，复杂的逻辑应该在函数本身内部完成
，而不是依赖访问全局的变量进行存储，JS的编程里面应该减少全局变量的使用，保证函数的完整性  


闭包：前面在作用域提过气泡理论，嵌套的气泡能够访问到外面的打气泡，所以当函数访问属于它的作用域之外的属性或者方法时，就会形成闭包，
闭包的形成使函数的访问穿过了函数的作用域边界，上述章节提到函数访问全局作用域的变量也是这种情况，这个时候JS看起来很像面向对象编程，
其内部的作用域和this都有本质区别

      function foo() {
          var a = 2;
          function bar() {
              console.log( a );
              var b=10;
              function bar1() {
                  console.log( b );
              }
              bar1();
          }
          bar();
      }
      foo();

闭包的误区：闭包的作用域范围问题

      for (var i=1; i<=5; i++) {
          setTimeout( function timer(){
              console.log( i );
          }, i*1000 );
      }
      //
      for (let i=1; i<=5; i++) {
          setTimeout( function timer(){
              console.log( i );
          }, i*1000 );
      }

模块：合理利用闭包可以达到封装模块的效果，包括的ES6的模块化，都是通过闭包实现，模块要求两个关键性质：1）
一个被调用的外部包装函数，来创建外围作用域。2）这个包装函数的返回值必须包含至少一个内部函数的引用，
这个函数才拥有包装函数内部作用域的闭包。

      function CoolModule() {
          var something = "cool";
          var another = [1, 2, 3];

          function doSomething() {
              console.log( something );
          }

          function doAnother() {
              console.log( another.join( " ! " ) );
          }

          return {
              doSomething: doSomething,
              doAnother: doAnother
          };
      }

      var foo = CoolModule();

      foo.doSomething(); // cool
      foo.doAnother(); // 1 ! 2 ! 3

总结：闭包可能出现在代码的任何地方，需要合理利用，理解闭包对于理解JS的高阶函数很重要

-  **5.原型**  

关于_proto_：

对象实例内部拥有原型指针_proto_，指向改对象的原型对象

      var a = new Array();

      a.__proto__ === Array.prototype // true

原型对象本身也是实例对象，原型对象的的_proto_指向object的原型

      a.__proto__.__proto__ === Object.prototype  // true

      // 等同于 Array.prototype.__proto__ === Object.prototype

object的_proto_指向null

      a.__proto__.__proto__.__proto__ === null  // true

      // 等同于 Object.prototype.__proto__ === null

综上，js中对象来源于null并通过__proto__实现了继承的功能

函数实例的_proto_指向Function.prototype

      var Foo = function() {}
      Foo.__proto__ === Function.prototype // true

函数本身的prototype属性，是由Object构造的实例对象

      Foo.prototype.__proto__ === Object.prototype; // true

prototype属性很特殊，它还有一个隐式的的constructor，指向了构造函数本身

      Foo.prototype.constructor === Foo; // true
      a.constructor === Foo; // true
      a.constructor === Foo.prototype.constructor; // true

具体原型连结构图：
