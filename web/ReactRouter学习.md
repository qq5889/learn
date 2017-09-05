# React Router

## 简介

###  Static Routing （静态路由）

我们在做react native 应用的时候已经用到过路由，我们项目中用到的就是静态路由。
在web端，Rails, Express, Ember, Angular等框架都是静态路由。在这些框架中，在任何渲染发生之前，将您的路由声明为应用程序初始化的一部分。让我们看看如何在Express中配置路由：

```
app.get('/', handleIndex)
app.get('/invoices', handleInvoices)
app.get('/invoices/:id', handleInvoice)
app.get('/invoices/:id/edit', handleInvoiceEdit)

app.listen()
```

注意路由是在应用程序侦听之前声明的，与我们客户端路由器是相似的。

### Dynamic Routing（动态路由）

当我们说动态路由时，我们指的是当应用程序呈现时发生的路由，而不是在运行的应用程序之外的配置或约定中。这意味着在React Router中几乎所有的东西都是component。下面是API的60秒回顾，看看它是如何工作的：

首先，引入路由组件，并且render

```
// react-dom (what we'll use here)
import { BrowserRouter } from 'react-router-dom'

ReactDOM.render((
  <BrowserRouter>
    <App/>
  </BrowserRouter>
), el)
```

接下来，将组件链接到一个新位置：

```
const App = () => (
  <div>
    <nav>
      <Link to="/dashboard">Dashboard</Link>
    </nav>
  </div>
)
```

最后当路径`/dashboard`呈现时，显示对应的组件

```
const App = () => (
  <div>
    <nav>
      <Link to="/dashboard">Dashboard</Link>
    </nav>
    <div>
      <Route path="/dashboard" component={Dashboard}/>
    </div>
  </div>
)
```
路由将呈现 <Dashboard {...props}/> props是路由的一些属性，比如{ match, location, history }，如果路由导航时没有找到Dashboard组件，就会render null，上面几乎就是路由的全部。

### Nested Routes （嵌套路由）

很多路由都有嵌套路由的概念，那么到底是如何嵌套路由以及嵌套一个div呢？

```
const App = () => (
  <BrowserRouter>
    {/* here's a div */}
    <div>
      {/* here's a Route */}
      <Route path="/tacos" component={Tacos}/>
    </div>
  </BrowserRouter>
)

// when the url matches `/tacos` this component renders
const Tacos  = ({ match }) => (
  // here's a nested div
  <div>
    {/* here's a nested Route,
        match.url helps us make a relative path */}
    <Route
      path={match.url + '/carnitas'}
      component={Carnitas}
    />
  </div>
)
```
看上面代码，路由就是一个component，就像一个div。所以嵌套路由和嵌套div就像上面这么做就行了。

### Responsive Routes （响应路由）

考虑下这样一个场景，你的应用要适应不同屏幕大小，如下所示：
```
Small Screen
url: /invoices

+----------------------+
|                      |
|      Dashboard       |
|                      |
+----------------------+
|                      |
|      Invoice 01      |
|                      |
+----------------------+
|                      |
|      Invoice 02      |
|                      |
+----------------------+
|                      |
|      Invoice 03      |
|                      |
+----------------------+
|                      |
|      Invoice 04      |
|                      |
+----------------------+

Large Screen
url: /invoices/dashboard

+----------------------+---------------------------+
|                      |                           |
|      Dashboard       |                           |
|                      |   Unpaid:             5   |
+----------------------+                           |
|                      |   Balance:   $53,543.00   |
|      Invoice 01      |                           |
|                      |   Past Due:           2   |
+----------------------+                           |
|                      |                           |
|      Invoice 02      |                           |
|                      |   +-------------------+   |
+----------------------+   |                   |   |
|                      |   |  +    +     +     |   |
|      Invoice 03      |   |  | +  |     |     |   |
|                      |   |  | |  |  +  |  +  |   |
+----------------------+   |  | |  |  |  |  |  |   |
|                      |   +--+-+--+--+--+--+--+   |
|      Invoice 04      |                           |
|                      |                           |
+----------------------+---------------------------+
```

React Router以前静态路由的版本对于这种场景没有很好的答案，但是当路由是动态的，就可以很好的解决这种场景。当你开始将路由当做组件而不是静态的UI配置，那么你的直觉就会引导你使用下面的代码来实现：

```
const App = () => (
  <AppLayout>
    <Route path="/invoices" component={Invoices}/>
  </AppLayout>
)

const Invoices = () => (
  <Layout>

    {/* always show the nav */}
    <InvoicesNav/>

    <Media query={PRETTY_SMALL}>
      {screenIsSmall => screenIsSmall
        // small screen has no redirect
        ? <Switch>
            <Route exact path="/invoices/dashboard" component={Dashboard}/>
            <Route path="/invoices/:id" component={Invoice}/>
          </Switch>
        // large screen does!
        : <Switch>
            <Route exact path="/invoices/dashboard" component={Dashboard}/>
            <Route path="/invoices/:id" component={Invoice}/>
            <Redirect from="/invoices" to="/invoices/dashboard"/>
          </Switch>
      }
    </Media>
  </Layout>
)
```

这只是一个例子。我们可能还会有很多其他的问题，但是有很关键的一点就是：让你的直觉与响应路由器一致，考虑更多的是组件，而不是静态路由配置。

## API

### Router

所有路由的底层路由，通常我们使用一个稍微高级的路由来代替：

```
<BrowserRouter>
<HashRouter>
<MemoryRouter>
<NativeRouter>
<StaticRouter>
```
通常使用Router的场景是常见的状态处理库，如：Redux和Mobx。 注意，并不是说这路由需要状态处理，只是这些库用Router来深层集成。

* history: object

一个用于记录导航的历史对象。

```
import createBrowserHistory from 'history/createBrowserHistory'

const customHistory = createBrowserHistory()
<Router history={customHistory}/>
```
以下history也经常被用到：

```
“browser history” - 在支持HTML5历史API的Web浏览器中很有用
“hash history” - 传统的web浏览器。
“memory history” - 内存历史实现，在测试和非DOM环境中很有用，比如 React Native
```
历史对象通常具有以下属性和方法：


`length - (number)` 历史堆栈中的条目数

`action - (string)` 当前action (PUSH, REPLACE, or POP)

`location - (object)` 当前location，有如下属性:

	```
	pathname - (string) 路径url
	search - (string) url中查询字符串
	hash - (string) rul hash片段
	state - (string) 特定的location状态 
	```
	
`push(path, state)` 

`push(path, [state]) - (function)` 

`replace(path, [state]) - (function)` 

`go(n) - (function)` 在历史堆栈中移动当前指向的location的指针

`goBack() - (function)` 相当于go(-1)

`goForward() - (function)` 相当于go(1)

`block(prompt) - (function)`  阻止导航。详细查看相关文档。

* location

位置呈现应用所在的位置，location结构看起来像下面这样：

```
{
  key: 'ac3df4', // not with HashHistory!
  pathname: '/somewhere'
  search: '?some=search-string',
  hash: '#howdy',
  state: {
    [userDefined]: true
  }
}
```

* match

match对对象包含关于路由路径匹配url的信息，match对象包含以下信息：

```
params - (object) 从路径相对应的URL动态段解析的键/值对。
isExact - (boolean) 
path - (string) 匹配的path
url - (string) 匹配的url
```


### BrowserRouter

一个使用HTML5历史api（pushstate，replacestate和popstate事件）来保持UI与URL同步的Router。
```
import { BrowserRouter } from 'react-router-dom'

<BrowserRouter
  basename={optionalString}
  forceRefresh={optionalBool}
  getUserConfirmation={optionalFunc}
  keyLength={optionalNumber}
>
  <App/>
</BrowserRouter>
```

* basename: string

locations 的 base URL 

* getUserConfirmation: func

用户确认导航的方法，默认使用window.confirm

```
// this is the default behavior
const getConfirmation = (message, callback) => {
  const allowTransition = window.confirm(message)
  callback(allowTransition)
}

<BrowserRouter getUserConfirmation={getConfirmation}/>
```
* forceRefresh: bool

如果为ture，路由将在导航到页面后刷新这个页面。

* keyLength: number

ocation.key的长度，默认为6

* children: node

一个单一的需要渲染的子元素。


### MemoryRouter

一个保存所有历史URL在内存中的路由（不是从地址栏读取的），在测试和非浏览器环境中很有用，如react native中。

```
import { MemoryRouter } from 'react-router'

<MemoryRouter>
  <App/>
</MemoryRouter>
```

* initialEntries: array
历史堆栈中的locations数组，包含完整的位置信息 {pathname, search, hash, state}，以及简单的URLs字符串。

```
<MemoryRouter
  initialEntries={[ '/one', '/two', { pathname: '/three' } ]}
  initialIndex={1}
>
  <App/>
</MemoryRouter>
```

* initialIndex: number
initialEntries数组中初始位置索引

* getUserConfirmation: func
一个用于用户确认导航的函数。

* keyLength: number
ocation.key的长度，默认为6

* children: node
一个单一的需要渲染的子元素。

### Link

为应用程序提供可声明和访问的导航

```
import { Link } from 'react-router-dom'

<Link to="/about">About</Link>
```

* to: string 要link的URL

* to: object 要link到的location
```
<Link to={{
  pathname: '/login',
  search: '?utm=your+face',
  state: { referrer: currentLocation }
}}/>
```

* replace: bool

如果为true，单击链接将替换历史堆栈中的当前项，而不是添加新的项

### NavLink

当匹配当前URL时，将向呈现元素添加样式属性。

```
import { NavLink } from 'react-router-dom'

<NavLink to="/about">About</NavLink>
```

详细属性，请查看官方文档


### Prompt

用于在导航离开页面之前提示用户。当你的应用程序进入一个应该阻止用户离开当前页面的状态时（比如一个表单已经填写了一半），那么渲染一个prompt。

```
import { Prompt } from 'react-router'

<Prompt
  when={formIsHalfFilledOut}
  message="Are you sure you want to leave?"
/>
```

* message: string 要显示的文字信息
* message: func 将在用户试图导航到下一个位置和操作时调用，返回提示的字符串，自带下一个位置的location信息。
```
<Prompt message={location => (
  `Are you sure you want to go to ${location.pathname}?`
)}/>
```

* when: bool 传递一个bool值 来判断是否需要渲染prompt。
```
<Prompt when={formIsHalfFilledOut} message="Are you sure?"/>
```

### Redirect

重定向导航到一个新的位置，新的位置将在历史堆栈覆盖当前位置。如服务器端重定向（HTTP 3xx）做的。

```
import { Route, Redirect } from 'react-router'

<Route exact path="/" render={() => (
  loggedIn ? (
    <Redirect to="/dashboard"/>
  ) : (
    <PublicHomePage/>
  )
)}/>
```

* to: string 要重定向的URL

* to: object 要重定向到的location
```
<Redirect to={{
  pathname: '/login',
  search: '?utm=your+face',
  state: { referrer: currentLocation }
}}/>
```

* push: bool 为ture时，重定向将push一个新的条目到history，而不是覆盖当前位置。

* from: string 从哪个路径重定向，这个属性只能用于<Switch>中匹配某个位置，详情可以查看<Switch> 。
```
<Switch>
  <Redirect from='/old-path' to='/new-path'/>
  <Route path='/new-path' component={Place}/>
</Switch>
```

### Route

Route是路由组件中最重要的组件，它最基本的职责是在某个位置与路由的路径匹配时呈现一些UI。
看看下面的代码：

```
import { BrowserRouter as Router, Route } from 'react-router-dom'

<Router>
  <div>
    <Route exact path="/" component={Home}/>
    <Route path="/news" component={NewsFeed}/>
  </div>
</Router>
```
如果应用程序的位置是"/", 那么UI层次结构将类似于：

```
<div>
  <Home/>
  <!-- react-empty: 2 -->
</div>
```

如果应用程序的位置是"/news", 那么UI层次结构将类似于：

```
<div>
  <!-- react-empty: 1 -->
  <NewsFeed/>
</div>
```

react-empty仅仅只是为了反映null渲染的实现细节。但对于我们而言，这是有益的。路由始终在技术上“呈现”，即使其呈现空。当应用程序位置与路由的路径匹配时，组件将被呈现。

* Route render methods

Route有三种呈现组件的方法：

```
<Route component>
<Route render>
<Route children>
```

每个方法在不同情况下都会用到，在给定的Route中，只能使用一个。后面会讲到为什么有三种选择方式，大多数情况下用的是component。

* Route props

三种渲染方法，都会用到这三个props：

```
match
location
history
```
后面会一一详细讲解。

* component

一个React的组件，当路由路由匹配时，将会被呈现。

```
<Route path="/user/:username" component={User}/>

const User = ({ match }) => {
  return <h1>Hello {match.params.username}!</h1>
}
```
当你使用component（而不是render和children的时候），路由使用 React.createElement 创建一个新的 React element 。 这意味着，如果组件使用了内敛函数，那么每次渲染都会创建一个新的组件，即当前组件会卸载，新的组件会渲染，而不是更新当前组件。

* getComponent(location, callback)

与 component 一样，但是是异步的，对于 code-splitting 很有用。

`cb(err, component)`

```
<Route path="courses/:courseId" getComponent={(location, cb) => {
  // 做一些异步操作去查找组件
  cb(null, Course)
}}/>
```

* getComponents(location, callback)

`cb(err, components)`

与 component 一样，但是是异步的，对于 code-splitting 很有用。

```
<Route path="courses/:courseId" getComponent={(location, cb) => {
  // 做一些异步操作去查找组件
  cb(null, {sidebar: CourseSidebar, content: Course})
}}/>
```

* render: func

render很方便内敛渲染，不像上面重新remounting, 与component生成一个新的 React element 不同的是，你可以传递一个函数，render会接收所有相同的Route props作为组件来渲染。

```
// convenient inline rendering
<Route path="/home" render={() => <div>Home</div>}/>

// wrapping/composing
const FadingRoute = ({ component: Component, ...rest }) => (
  <Route {...rest} render={props => (
    <FadeIn>
      <Component {...props}/>
    </FadeIn>
  )}/>
)

<FadingRoute path="/cool" component={Something}/>
```

* children: func

有时候需要看路径是否匹配，从而来决定是否需要渲染，这种情况下，就可以使用children了，它和render一样，除了是否有match。

```
<ul>
  <ListItemLink to="/somewhere"/>
  <ListItemLink to="/somewhere-else"/>
</ul>

const ListItemLink = ({ to, ...rest }) => (
  <Route path={to} children={({ match }) => (
    <li className={match ? 'active' : ''}>
      <Link to={to} {...rest}/>
    </li>
  )}/>
)
```
也可以用于动画：

```
<Route children={({ match, ...rest }) => (
  {/* Animate will always render, so you can use lifecycles
      to animate its child in and out */}
  <Animate>
    {match && <Something {...rest}/>}
  </Animate>
)}/>
```

* childRoutes

子route 的一个数组，与在route 配置中的 children 一样。

* getChildRoutes(location, callback)

与 childRoutes 一样，但是是异步的，并且可以接收 location。对于 code-splitting 和动态路由匹配很有用（给定一些 state 或 session 数据会返回不同的子 route）。

`cb(err, routesArray)`

```
let myRoute = {
  path: 'course/:courseId',
  childRoutes: [
    announcementsRoute,
    gradesRoute,
    assignmentsRoute
  ]
}

// 异步的子 route
let myRoute = {
  path: 'course/:courseId',
  getChildRoutes(location, cb) {
    // 做一些异步操作去查找子 route
    cb(null, [ announcementsRoute, gradesRoute, assignmentsRoute ])
  }
}

// 可以根据一些 state
// 跳转到依赖的子 route
<Link to="/picture/123" state={{ fromDashboard: true }}/>

let myRoute = {
  path: 'picture/:id',
  getChildRoutes(location, cb) {
    let { state } = location

    if (state && state.fromDashboard) {
      cb(null, [dashboardPictureRoute])
    } else {
      cb(null, [pictureRoute])
    }
  }
}
```

* indexRoute

route 配置时显式指定的子组件，即指定情况下默认加载的子组件，比如：

```
<Router>
  <Route path="/" component={App}>
    <Route path="accounts" component={Accounts}/>
    <Route path="statements" component={Statements}/>
  </Route>
</Router>
```
上面代码中，访问根路径/，不会加载任何子组件，indexRoute就是解决这个问题的：

```
<Router>
  <Route path="/" component={App}>
    <IndexRoute component={Home}/>
    <Route path="accounts" component={Accounts}/>
    <Route path="statements" component={Statements}/>
  </Route>
</Router>
```
这时访问/根路径，加载的组件结构是：

```
<App>
  <Home/>
</App>
```

* getIndexRoute(location, callback)

与 indexRoute 一样，但是是异步的，并且可以接收 location。与 getChildRoutes 一样，对于 code-splitting 和动态路由匹配很有用.

`cb(err, route)`

```
// 例如：
let myIndexRoute = {
  component: MyIndex
}

let myRoute = {
  path: 'courses',
  indexRoute: myIndexRoute
}

// 异步的 index route
let myRoute = {
  path: 'courses',
  getIndexRoute(location, cb) {
    // 做一些异步操作
    cb(null, myIndexRoute)
  }
}
```

* path: string

一个有效的URL，一般通过 path-to-regexp 来解析。

```
<Route path="/users/:id" component={User}/>
```

* exact: bool

如果为ture，将严格匹配location.pathname。

```
<Route exact path="/one" component={About}/>

path	location.pathname	exact	matches?
/one	/one/two			true	no
/one	/one/two			false	yes

```
* strict: bool

如果为ture，将匹配location.pathname中是否包含path

```
<Route strict path="/one/" component={About}/>

path	location.pathname	matches?
/one/	/one				no
/one/	/one/				yes
/one/	/one/two			yes
```

strict 和 exact可以结合使用。

* location: object

route的一个元素，试图通过path来匹配历史中的location（通常是当前的浏览器URL）。


## 参考文档

官方GitHub地址： `https://github.com/ReactTraining/react-router`
官方文档：`https://reacttraining.com/react-router/web/guides/philosophy`










