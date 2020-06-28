#静态页面css浏览器适配方案

- 由于各浏览器存在各种差异，需要前端人员编写一些不必要的代码,比如：

```
box-sizing
-webkit-box-sizing

background: linear-gradient
background: -webkit-gradient

display: -webkit-box;
display: -ms-flexbox;
display: flex;

-webkit-box-align: center;
-ms-flex-align: center;
align-items: center;
            
```

无论是用时或者记忆这些名字，都是一件很繁琐的事情，而网上有很多这类的解决方案，特此记录一条个人觉得很方便的方案`gulp-postcss`

##所需环境

- node.js

##主要代码

- npm init

- package.json

```

npm install -g gulp-cli 
npm install gulp-postcss gulp autoprefixer cssnext precss --save-dev
// npm install cssnano --save-dev

{
  "scripts": {
    "pack": "gulp default && gulp css"
  },
  "devDependencies": {
  		....
   },
  "browserslist": [ // 需要适配的浏览器，具体参数百度browserslist
    "> 1%",
    "last 2 versions"
  ]
}

```

- gulpfile.js

```
var gulp = require('gulp');

var postcss = require('gulp-postcss');

var autoprefixer = require('autoprefixer');

var cssnext = require('cssnext');

var precss = require('precss');

gulp.task("default", function () {
  return gulp.src("./index/**/*.*").pipe(gulp.dest("./dist"));
});

gulp.task("css", function () {
  var plugins = [autoprefixer, cssnext, precss];
  return gulp
    .src("./index/**/*.css")
    .pipe(postcss(plugins))
    .pipe(gulp.dest("./dist"));
});

gulp.task("pack", function () {
  gulp.src("./index/**/*.!(css)").pipe(gulp.dest("./dist"));
  var plugins = [autoprefixer, cssnext, precss];
  return gulp
    .src("./index/**/*.css")
    .pipe(postcss(plugins))
    .pipe(gulp.dest("./dist"));
});


// gulp.src中内容替换为实际原路径
// gulp.dest中是编译后生成的路径，没有会自动创建

```

##使用方法
1. npm i
1. 编写相css关文件
2. 执行`npm run pack`
3. 等待编译···
4. dist目录即为打包后的文件

##注意
如果打包出错，目测是没有全局安装gulp-cli，需要`npm install -g gulp-cli`




