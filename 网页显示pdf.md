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

 前端显示为单张图片，没有整个文档的下载链接，最多下载单张图片
 
- 缺点

 使用上一页 下一页的形式，比较繁琐
 
## react-pdf-js(Warning: Setting up fake worker.)

- [地址](https://github.com/mikecousins/react-pdf-js)

 效果以及优缺点同上
 
## react-pdf(Warning: Setting up fake worker.)

- [地址](https://github.com/wojtekmaj/react-pdf)
