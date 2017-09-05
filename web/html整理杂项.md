#一.Html结构
- #1.head - 文档头部信息
		<!doctype html>
		<html>
		<head>
		    <meta charset="utf-8">
		    <meta name="viewport" content="width=device-width, initial-scale=1.0, maximum-scale=1.0, minimum-scale=1.0, user-scalable=no, minimal-ui">
		    <meta content="yes" name="apple-mobile-web-app-capable">
		    <meta name="apple-mobile-web-app-status-bar-style" content="black-translucent">
		    <meta content="black" name="apple-mobile-web-app-status-bar-style">
		    <meta name="format-detection" content="telephone=no">
		    <meta name="full-screen" content="yes">
		    <meta name="x5-fullscreen" content="true">
		    <meta http-equiv="Pragma" content="no-cache">
		    <meta http-equiv="Cache-control" content="no-cache">
		    <meta http-equiv="Cache" content="no-cache">
		    <title>葡星圈</title>
		    <script type="text/javascript" src='http://res.wx.qq.com/open/js/jweixin-1.0.0.js'></script>
		    <link href="/pxq/dist/app.css" rel="stylesheet">
		</head>
		<body>
		    
		</body>
		</html>
  - <!DOCTYPE>: 指示web浏览器关于页面使用哪个HTML版本进行编写的指令，例如<!DOCTYPE html>代表html5页面
  - title:标题定义文档的标题。
  - base:标签为页面上的所有链接规定默认地址或默认目标（target)
  - link:标签定义文档与外部资源之间的关系,最常用于连接样式表
  - meta:标签提供关于 HTML 文档的元数据。元数据不会显示在页面上，但是对于机器是可读的。典型的情况是，meta 元素被用于规定页面的描述、关键词、文档的作者、最后修改时间以及其他元数据
  - script:标签用于定义客户端脚本，比如 JavaScript
  - style:标签用于为 HTML 文档定义样式信息。
     
     		<head>
				<style type="text/css">
					body {background-color:yellow}
					p {color:blue}
				</style>
			</head>
- #2.body -文档主题内容
  - 元素:元素指的是从开始标签（start tag）到结束标签（end tag）的所有代码。
     - 块级元素(block level element),块级元素在浏览器显示时，通常会以新行来开始（和结束).例如div,h1,p,ul,table这些
     - 内联元素(inline element),内联元素在显示时通常不会以新行开始。例如b,td,a,img这些
  - 标签.
     - html常用标签
         - body:定义文档主体
         - div:定义文档中的分区或节,标签可以把文档分割为独立的、不同的部分
         - h1 - h6:标题
         - p:段落
         - br:定义简单换行
         - button:定义按钮
         - select&option:定义下拉列表
         - span:定义文档中的节,被用来组合文档中的行内元素
         - a:超链接
         
             `<a href="http://www.w3school.com.cn/">Visit W3School</a>`
         - img:图像标签
         
             `<img src="boat.gif" alt="Big Boat">`
         - 列表
             - ul,li 无序列表
             
                 `<ul>
					  <li>Coffee</li>    
					  <li>Milk</li>
				   </ul>`
				   
				   浏览器显示效果如下:
				   <ul>
					  <li>Coffee</li>
					  <li>Milk</li>
				   </ul>
             - ol,li 有序列表
               
                 `<ol>
					  <li>Coffee</li>    
					  <li>Milk</li>
				   </ol>`
				   
				   浏览器显示效果如下:
				   <ol>
					  <li>Coffee</li>
					  <li>Milk</li>
				   </ol>
				- dl,dt,dd 定义列表.可理解为sectionList
				    
				*     <dl>
							<dt>Coffee</dt>
							<dd>Black hot drink</dd>
							<dt>Milk</dt>
							<dd>White cold drink</dd>
						</dl>
					
					浏览器显示效果如下:
					<dl>
						<dt>Coffee</dt>
							<dd>Black hot drink</dd>
						<dt>Milk</dt>
							<dd>White cold drink</dd>
					</dl>
			- table 表格标签.tr:行标签;td:列标签
			*			<table border="1">
							<tr>
							  <td>row 1, cell 1</td>
							  <td>row 1, cell 2</td>
							</tr>
							<tr>
							  <td>row 2, cell 1</td>
							  <td>row 2, cell 2</td>
							</tr>
						</table>
			浏览器显示效果如下:
					<table border="1">
							<tr>
							  <td>row 1, cell 1</td>
							  <td>row 1, cell 2</td>
							</tr>
							<tr>
							  <td>row 2, cell 1</td>
							  <td>row 2, cell 2</td>
							</tr>
						</table>	
		 - form表单
		 
		     `表单元素`
		     
		         - input input元素是最重要的表单元素,常用的几种type如下:
		         (1)text定义常规文本输入(2)radio定义单选按钮输入（选择多个选择之一）(3)submit定义提交按钮（提交表单）(4) password 定义密码字段
		         - select select元素（下拉列表）
		         - textarea 定义多行输入字段（文本域）
		         - button 定义可点击的按钮
		         
		     `表单属性`
		     
		         - accept-charset 规定在被提交表单中使用的字符集（默认：页面字符集）
		         - action 规定向何处提交表单的地址（URL）（提交页面）
		         - autocomplete 规定浏览器应该自动完成表单（默认：开启）。
		         - enctype 规定被提交数据的编码（默认：url-encoded）
		         - method 规定在提交表单时所用的 HTTP 方法（默认：GET）
		         - name 规定识别表单的名称（对于 DOM 使用：document.forms.name）。
		         - novalidate 规定浏览器不验证表单。
		         - target 规定 action 属性中地址的目标（默认：_self）。
		         
		     `例子`
		     
					     <form action="action_page.php">
								First name:<br>
							<input type="text" name="firstname" value="Mickey">
								<br>
								Last name:<br>
							<input type="text" name="lastname" value="Mouse">
								<br><br>
							<input type="submit" value="Submit">
						</form>
						 
			浏览器效果如下:	
			 <form action="action_page.php">
								First name:<br/>
							<input type="text" name="firstname" value="Mickey">
								<br/>
								Last name:<br/>
							<input type="text" name="lastname" value="Mouse">
								<br/>
							<input type="submit" value="Submit">
						</form>
				
     - html5新增常用标签及其它
         - header:定义 section 或 page 的页眉。
         - footer: 定义 section 或 page 的页脚。
         - canvas:定义图形
         - video:视频元素,目前支持Ogg,MEPG4,WebM3种格式
         - audio: 音频元素,目前支持Ogg Vorbis,MP3,Wav3种格式
         - svg: 可伸缩矢量图形,Internet Explorer 9、Firefox、Opera、Chrome 以及 Safari 支持内联 SVG。
         - Web存储
             - localStorage 没有时间限制的数据存储
             - sessionStorage  针对一个session 的数据存储,当用户关闭浏览器窗口后，数据会被删除   
  - 常用属性
     - id:规定元素的唯一 id
     - class:规定元素的一个或多个类名（引用样式表中的类）
     - lang:规定元素内容的语言。
     - style:规定元素的行内 CSS 样式
     - tabindex: 规定元素的 tab 键次序

     
#二.React Dom 与Html Dom的一些区别
- 1.react dom的properties和attributes	应当驼峰式命名,例如Html的一个attribute tabindex在react中应当是tabIndex
- 2.react用className属性来指定一个CSS的class, html dom中用class属性
- 3.intput标签type类型为checkbox和radio的checked属性，react使用defaultChecked设置默认值
- 4.react使用dangerouslySetInnerHTML替代html中的innerHTML插入一段html
- 5.react使用htmlFor替代html中的for,防止和js关键字冲突
- 6.option标签提供了selected属性设置是否被选中
- 7.react dom的style接受一个js对象而非一个CSS string
- 8.input和textarea的value属性,react提供defaultValue设置默认值
- 9.后续补充....

  