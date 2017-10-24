# 网页显示pdf

## PDFObject

[地址](https://pdfobject.com/)

- 优点

 嵌入简单，使用方便
 
- 缺点
	
 可以通过查看元素，找到下载链接
 
 可以通过右键下载
 
 可以通过自带工具栏下载
 
 
## FlashPlayer

- [swftools：pdf2swf工具](http://www.swftools.org/download.html)

- [参数说明](http://www.cnblogs.com/paxing/p/5796657.html)

```
mac
sudo port install swftools

eg：
pdf2swf a.pdf b.swf -b

htm:
<embed src="b.swf"  type="application/x-shockwave-flash"  width="100%" height="700px">

<embed src="http://127.0.0.1:4000/static/a.swf"  type="application/x-shockwave-flash"  width="100%" height="700px">
          

```


- 默认模板太丑（不会自定义模板-_-）
- 审核元素可以看到swf下载链接

## react-pdf-js-worker

- [地址](https://github.com/truckingsim/react-pdf-js-worker)

- 注意

 1 后台文件不能放在静态目录(beego里面默认存在一个静态文件static)
 
 2 文件必须已download下载形式传递给前端
 
  ```
 eg:
 
 beego.Any("/template/*", func(ctx *context.Context) {
		ctx.Output.Download("template/a.pdf")
	})
 ```
 
 ```
 import PDF from 'react-pdf-js-worker'
 
 
 state = {
  }
  
  onDocumentComplete = (pages) => {
    this.setState({ page: 1, pages });
  }
 
  onPageCompleted = (page) => {
    this.setState({ page });
  }
 
  handlePrevious = () => {
    this.setState({ page: this.state.page - 1 });
  }
 
  handleNext = () => {
    this.setState({ page: this.state.page + 1 });
  }
 
  renderPagination = (page, pages) => {
    let previousButton = <li className="previous" onClick={this.handlePrevious}><a href="#"><i className="fa fa-arrow-left"></i> Previous</a></li>;
    if (page === 1) {
      previousButton = <li className="previous disabled"><a href="#"><i className="fa fa-arrow-left"></i> Previous</a></li>;
    }
    let nextButton = <li className="next" onClick={this.handleNext}><a href="#">Next <i className="fa fa-arrow-right"></i></a></li>;
    if (page === pages) {
      nextButton = <li className="next disabled"><a href="#">Next <i className="fa fa-arrow-right"></i></a></li>;
    }
    let download = <li className="next disabled"><a href="http://127.0.0.1:4000/res/preview/1/6bbe50af227341589d289481b23311f9_通知系统简要需求.pdf">download <i className="fa fa-arrow-right"></i></a></li>;
    return (
      <nav>
        <ul className="pager">
          {previousButton}
          {nextButton}
          {download}
        </ul>
      </nav>
      );
  }
 
  render() {
    let pagination = null;
    if (this.state.pages) {
      pagination = this.renderPagination(this.state.page, this.state.pages);
    }
    return (
      <div>
        {pagination}
        <PDF file="http://127.0.0.1:4000/res/preview/1/6bbe50af227341589d289481b23311f9_通知系统简要需求.pdf?isD=false" onDocumentComplete={this.onDocumentComplete} onPageCompleted={this.onPageCompleted} page={this.state.page} />
      </div>)
  }
}
 ```
 

- 优点

 elements控制台看不到相关链接
 
 前端显示的为图片，无法复制文字内容
 
 分页显示，加载速度快
 
- 缺点
 
 在network控制台可以看到下载路径
 
 无法加入cookie
 
 
## react-pdf

- [地址](https://github.com/wojtekmaj/react-pdf)

- 优点

 请求可以带cookie
 
 elements控制台看不到相关链接
 
 前端显示的为图片，无法复制文字内容
 
 可分页显示，也可要一次加载全部
 
- 缺点
 
 如果选用一次性加载全部，速度会比较慢
 
 在network控制台可以看到下载路径
 
```
import React from 'react'

import { Document, Page } from 'react-pdf';

class MdInfo extends React.Component {
  state = {
    file: 'http://127.0.0.1:4000/res/preview/1/a.pdf?isD=false',
    pageNumber: null,
    numPages: null,
  }

  onDocumentLoadSuccess = ({ numPages }) =>
    this.setState({
      numPages,
      pageNumber: 1,
    })

  handlePrevious = () => {
    this.addPage(-1)
  }

  handleNext = () => {
    this.addPage(1)
  }

  addPage = num => {
    const { pageNumber } = this.state
    this.changePage(pageNumber + num)
  }

  changePage = num => {
    const { numPages } = this.state
    let page = num
    if (num < 1) {
      page = 1
    } else if (page > numPages) {
      page = numPages
    }
    this.setState({ pageNumber: page })
  }

  renderPagination = (page, pages) => {
    let previousButton = <li className="previous" onClick={this.handlePrevious}><a href="#"><i className="fa fa-arrow-left"></i> Previous</a></li>;
    if (page === 1) {
      previousButton = <li className="previous disabled"><a href="#"><i className="fa fa-arrow-left"></i> Previous</a></li>;
    }
    let nextButton = <li className="next" onClick={this.handleNext}><a href="#">Next <i className="fa fa-arrow-right"></i></a></li>;
    if (page === pages) {
      nextButton = <li className="next disabled"><a href="#">Next <i className="fa fa-arrow-right"></i></a></li>;
    }
    return (
      <nav>
        <ul className="pager">
          {previousButton}
          {nextButton}
        </ul>
      </nav>
      )
  }

  render() {
    const { file, numPages, pageNumber } = this.state
    {/* 分页加载 */}
    let pagination = null
    if (numPages) {
      pagination = this.renderPagination(pageNumber, numPages)
    }
    
    return (
      <div>
        <div>
          <div>
            {/* 分页加载 */}
            { pagination }
            <Document
              file={{ url: file, withCredentials: true }}
              onLoadSuccess={this.onDocumentLoadSuccess}
            >
            {/* 分页加载 */}
            <Page pageNumber={pageNumber} />
              {/* { // 一次加载全部
                Array.from(
                  new Array(numPages),
                  (el, index) => (
                    <Page
                      key={`page_${index + 1}`}
                      pageIndex = {index}
                      pageNumber={index + 1}
                      onRenderSuccess={this.onPageRenderSuccess}
                      width={Math.min(600, document.body.clientWidth - 52)}
                    />
                  ),
                )
              } */}
              
            </Document>
          </div>
        </div>
      </div>
    );
  }
}
```
