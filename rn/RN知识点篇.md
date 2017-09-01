#  RN知识点

-  **1.RN存在的背景**

1.相比于原生，更高的可维护性，更少的开发投入，统一的技术栈，热更新，

2.相比与h5，更强的性能，更好的动画和交互

-  **2.JSX**

一种类似xml的语言，官方推荐，使组件的结构和组件的关系更加清晰，比如

         <Text style={{fontSize:15}}/>

转换成JS的语法等价与：React.createElement(Text,{style:{{fontSize:15}}});

- **3.flex**

伸缩布局：使容器拥有控制组件的宽度和高度的能力，组件可以在容器内自动填充，减少移动端设备带来的
工作量

![](https://git.oschina.net/fiberhomeskyinno/ReactNativeLearning/blob/master/%E5%9F%B9%E8%AE%AD/%E5%9B%BE%E7%89%87/6.png?dir=0&filepath=%E5%9F%B9%E8%AE%AD%2F%E5%9B%BE%E7%89%87%2F6.png&oid=2d29879e3ab4b48cd709173c021c27ea63f33b21&sha=49ed74ef79105eab8900319e1124459ce406048d)

1.flex number 作用域伸缩容器，自动填充，如果相同级别有多个伸缩容器，比如

      <View>
          <View style={{flex:1}}></View>
          <View style={{flex:1}}></View>
          <View style={{flex:1}}></View>
      </View>

此时flex:1表示权重比例

2.flexDirection enum('row', 'row-reverse', 'column', 'column-reverse')
表示伸缩容器内主轴的方向，该属性将影响flexWrap，justifyContent和alignItems，注意：主轴的默认起点是左上角，而'column-reverse'表示垂直翻转排列，从屏幕最左边的底部向上排列

![](https://git.oschina.net/fiberhomeskyinno/ReactNativeLearning/blob/master/%E5%9F%B9%E8%AE%AD/%E5%9B%BE%E7%89%87/2.png?dir=0&filepath=%E5%9F%B9%E8%AE%AD%2F%E5%9B%BE%E7%89%87%2F2.png&oid=cde2a281caaa37b94322d9c38a7adcd78f16e877&sha=49ed74ef79105eab8900319e1124459ce406048d)

3.flexWrap enum('wrap', 'nowrap')
表示沿着主轴方向排列，是否换行，'wrap'是换行，'nowrap'则不换行

![](https://git.oschina.net/fiberhomeskyinno/ReactNativeLearning/blob/master/%E5%9F%B9%E8%AE%AD/%E5%9B%BE%E7%89%87/1.png?dir=0&filepath=%E5%9F%B9%E8%AE%AD%2F%E5%9B%BE%E7%89%87%2F1.png&oid=b45b2891e8eca2df2f4a3a73aeab9a35182f48c5&sha=49ed74ef79105eab8900319e1124459ce406048d)

注意：如果flexDirection属性设置过反转，则换行起始点相反

4.justifyContent enum('flex-start', 'flex-end', 'center', 'space-between', 'space-around')
作用于伸缩容器，决定其伸缩子元素的沿着主轴的排列方式

![](https://git.oschina.net/fiberhomeskyinno/ReactNativeLearning/blob/master/%E5%9F%B9%E8%AE%AD/%E5%9B%BE%E7%89%87/3.png?dir=0&filepath=%E5%9F%B9%E8%AE%AD%2F%E5%9B%BE%E7%89%87%2F3.png&oid=e310c8648ef31c4f66bd6fe2eae6c732c8b71c6b&sha=49ed74ef79105eab8900319e1124459ce406048d)

注意：这里是基于主轴沿着水平方向，如果主轴设置是垂直方向，则不同

5.alignItems enum('flex-start', 'flex-end', 'center', 'stretch')
作用于伸缩容器，决定伸缩子元素沿着侧轴的排列方式

![](https://git.oschina.net/fiberhomeskyinno/ReactNativeLearning/blob/master/%E5%9F%B9%E8%AE%AD/%E5%9B%BE%E7%89%87/5.png?dir=0&filepath=%E5%9F%B9%E8%AE%AD%2F%E5%9B%BE%E7%89%87%2F5.png&oid=f43ba8aa8f75766a1efd90b01b3b20d5f1d68343&sha=49ed74ef79105eab8900319e1124459ce406048d)

注意：这里是基于侧轴沿着水平方向，如果侧轴设置是垂直方向，则不同

相关文档： [一个完整的flex指南]http://www.w3cplus.com/css3/a-guide-to-flexbox-new.html


- **4.导航路由navigator**

navigator管理多个页面的相互跳转，可配置过渡动画，navigator可以跨平台使用，且具有一定的定制性，导航的概念类似路由，导航的动作发生的时候被导航起的组件会拥有当前的导航对象navigator，所以被导航的组件也就具有了导航功能，其中push和pop是最常见的导航功能，表示导入和退出；

注意：导航的过程是运行在JS线程，导航的过程与新的页面render的过程是同时进行的，如果进入一个发杂的大页面使，会出现
JS线程占满导致ui卡顿，此时可以在render的生命周期的componentDidMount的进行优化，将导航的过程和render隔开，保证导航的流畅性

相关优秀开源导航组件：[react-native-router-flux]https://github.com/aksonov/react-native-router-flux

- **5.View和组件**

作为创建UI时最基础的组件，View是一个支持Flexbox布局、样式、一些触摸处理、和一些无障碍功能的容器，并且它可以放到其它的视图里，也可以有任意多个任意类型的子视图。不论在什么平台上，View都会直接对应一个平台的原生视图，无论它是UIView、<div>还是android.view.View。下面的例子创建了一个View，包含了两个有颜色的方块和一个自定义的组件，并且设置了一个内边距：

        <View style={{flexDirection: 'row', height: 100, padding: 20}}>
          <View style={{backgroundColor: 'blue', flex: 0.3}} />
          <View style={{backgroundColor: 'red', flex: 0.5}} />
          <MyCustomComponent {...customProps} />
        </View>

组件是View嵌套生成，组件是以Component为概念，它表示了一种可拆卸，可组装的单位，它可以拼装到其他的组件里面，也可以包裹更小的组件在本身里，组件本身会获取来自外界的数据流，但是不会受到外部逻辑的影响

注意：View是所有试图的基组件，但是真正的自定义组件并不是继承View，而是React.component，包括安卓，苹果和react前端全部是继承它，View一般是最外层或者容器层且 flex：1 代表可伸缩

- **5.ScrollView和ListView**

RN的ScrollView则是分别实现了安卓和IOS原生的ScrollView，所以具备原生ScrollView的特性和性能，支持垂直滚动平行滚动布局；RN的ListView并没有实现了原生的安卓的RecyclerView或者IOS的UITableView，而是在ScrollView基础上的扩展，并没有复用item，它的使用方式需要兼顾到以下几点：

initialListSize#

这个属性定义了在首次渲染中绘制的行数。如果我们关注于快速的显示出页面，可以设置initialListSize为1，然后我们会发现其他行在接下来的帧中被快速绘制到屏幕上。而每帧所显示的行数由pageSize所决定。

pageSize

在初始渲染也就是initialListSize被使用之后，ListView将利用pageSize来决定每一帧所渲染的行数。默认值为1 —— 但是如果你的页面很小，而且渲染的开销不大的话，你会希望这个值更大一些。稍加调整，你会发现它所起到的作用。

scrollRenderAheadDistance

“在将要进入屏幕区域之前的某个位置，开始绘制一行，距离按像素计算。”

如果我们有一个2000个元素的列表，并且立刻全部渲染出来的话，无论是内存还是计算资源都会显得很匮乏。还很可能导致非常可怕的阻塞。因此scrollRenderAheadDistance允许我们来指定一个超过视野范围之外所需要渲染的行数。

removeClippedSubviews

“当这一选项设置为true的时候，超出屏幕的子视图（同时overflow值为hidden）会从它们原生的父视图中移除。这个属性可以在列表很长的时候提高滚动的性能。默认为false。（0.14版本后默认为true）”

这是一个应用在长列表上极其重要的优化。Android上，overflow值总是hidden的，所以你不必担心没有设置它。而在iOS上，你需要确保在行容器上设置了overflow: hidden。

总结：其中最后一个removeClippedSubviews优化手段非常重要，在IOS开发的大列表里面一定要设置行的overflow: hidden，安卓不需要关注这个问题

相关文档： [ListView详细介绍]http://taobaofed.org/blog/2015/12/09/using-js-to-build-an-crossplatform-native-app-an-introduction-to-listview/

- **6.props和state**

props：RN的单向数据流就是props的流动过程，基于组件，所有组件都可以在组件标签级别传递任意对象的数据甚至函数，而在组件内部通过this.props获取当前数据，经过props传递的数据应该是单向的，透明的，不可变的，组件获取到这些数据可以直接使用，props的引入可以从根本上做到组件的隔离，也是前面提到的组件拆装的根本

state：存在组件的内部，代表了组件的状态，是组件动态变化的部分，比如刷新页面，或者某个交互动作导致的页面变化，它是不可预期的，在没有触发之前你不知道它的结果，把组件当作一种状态机来理解，state管理了它被你看到的各种状态而不需要去关注组件的实际渲染过程，这样我们摆脱了原生开发中很多跟界面变化的过程相关的逻辑，只需要在某个时间点关注当前组件的状态，当它可能变化的时候设置新的状态上去，state的变化与组件生命周期的render方法相关，setState会导致render触发，但是多次的setState会被批处理，每一次真正执行render的过程是一次合并操作，由react决定，所以，如何抽离真正的会导致页面变化的部分也就是state的属性以及合理的使用setState触发render是很重要的

- **7.组件的生命周期**


1.componentWillMount() 初次挂载
服务器端和客户端都只调用一次，在初始化渲染执行之前立刻调用。如果在这个方法内调用 setState，render() 将会感知到更新后的 state，将会执行仅一次，尽管 state 改变了。


2.componentDidMount() 第二次挂载
在初始化渲染执行之后立刻调用一次，仅客户端有效（服务器端不会调用）。在生命周期中的这个时间点，组件拥有一个 DOM 展现，你可以通过 this.getDOMNode() 来获取相应 DOM 节点。

如果想和其它 JavaScript 框架集成，使用 setTimeout 或者 setInterval 来设置定时器，或者发送 AJAX 请求，可以在该方法中执行这些操作


3.componentWillReceiveProps(object nextProps) 接收新的数据
在组件接收到新的 props 的时候调用。在初始化渲染的时候，该方法不会调用。

用此函数可以作为 react 在 prop 传入之后， render() 渲染之前更新 state 的机会。老的 props 可以通过 this.props 获取到。在该函数中调用 this.setState() 将不会引起第二次渲染。

componentWillReceiveProps: function(nextProps) {
  this.setState({
    likesIncreasing: nextProps.likeCount > this.props.likeCount
  });
}

4.shouldComponentUpdate: function(nextProps, nextState) {
  return nextProps.id !== this.props.id;
}
如果 shouldComponentUpdate 返回 false，则 render() 将不会执行，直到下一次 state 改变。（另外，componentWillUpdate 和 componentDidUpdate 也不会被调用。）

默认情况下，shouldComponentUpdate 总会返回 true，在 state 改变的时候避免细微的 bug，但是如果总是小心地把 state 当做不可变的，在 render() 中只从 props 和 state 读取值，此时你可以覆盖 shouldComponentUpdate 方法，实现新老 props 和 state 的比对逻辑。

如果性能是个瓶颈，尤其是有几十个甚至上百个组件的时候，使用 shouldComponentUpdate 可以提升应用的性能。

5.componentWillUpdate(object nextProps, object nextState)
在接收到新的 props 或者 state 之前立刻调用。在初始化渲染的时候该方法不会被调用。

使用该方法做一些更新之前的准备工作。

注意：

你不能在刚方法中使用 this.setState()。如果需要更新 state 来响应某个 prop 的改变，请使用 componentWillReceiveProps。


6.componentDidUpdate(object prevProps, object prevState)
在组件的更新已经同步到 DOM 中之后立刻被调用。该方法不会在初始化渲染的时候调用。

使用该方法可以在组件更新之后操作 DOM 元素。

注意：

为了兼容 v0.9，DOM 节点会作为最后一个参数传入。如果使用这个方法，你仍然可以使用 this.getDOMNode() 来访问 DOM 节点。

7.componentWillUnmount()
在组件从 DOM 中移除的时候立刻被调用。

在该方法中执行任何必要的清理，比如无效的定时器，或者清除在 componentDidMount 中创建的 DOM 元素。

- **8.RN开发的流程以及要注意的问题**

1.JS严格模式，ES6，JSX

2.RN的环境分两种，一种是纯RN工程，通过通过react-native init xxxx生成，另一种也就是原生集成RN的模块，安卓和IOS分别集成环境，目前我们主要开发方式，原生和RN的页面存在边界交互，RN与原生相互通信，包括传值以及回调

3.代码远程调试，chrome调试器，控制台输出，debug，布局预览，性能监控，jest单元测试

4.组件化规范，代码目录规范，工具配置文件规范，插件库标准化（富文本的问题），官方支持的优先

5.性能问题，console语句过多，配置babel插件；开发模式和生产模式的区别；navigator的进场动画在主线程执行的问题；大列表的问题（参照ListView篇）；
