## libreoffice

# mac
[options](http://www.cnblogs.com/si812cn/p/5009428.html)

1. 下载libreoffice
2. 执行

```
/Applications/LibreOffice.app/Contents/MacOS/soffice --invisible --convert-to pdf:writer_pdf_Export --outdir "/Users/admin/Documents" "/Users/admin/Documents/通知系统简要需求.docx"
```

- go语言

> 注意路径


```
cmdstr := "/Applications/LibreOffice.app/Contents/MacOS/soffice --invisible --convert-to pdf:writer_pdf_Export --outdir \"./static" \"./static/通知系统简要需求.docx\""
	cmd := exec.Command("sh", "-c", cmdstr)
	b, err := cmd.Output()
	fmt.Println(string(b), err)
```

## linux

[教程](http://blog.csdn.net/ljihe/article/details/77250206)

- 下载libreoffice

```
yum install libreoffice 
```

- 执行

```
/usr/bin/libreoffice  --invisible --convert-to pdf:writer_pdf_Export --outdir \"./static" \"./static/通知系统简要需求.docx\"
```

- 如果报错类似如下信息

```
/usr/lib64/libreoffice/program/soffice.bin X11 error: Can't open display:   
   Set DISPLAY environment variable, use -display option  
   or check permissions of your X-Server  
   (See "man X" resp. "man xhost" for details) 
```

则需要安装下面的库文件

```
yum install libreoffice-headless  
```

- 如果转换后pdf发现中文乱码，则需要在linux上安装中文字体包

> 1. 在服务器/usr/share/fonts/下新建文件夹my
> 2. 将字体包复制到文件夹my下
> 3. 执行mkfontscale命令生成字体索引
> 4. 执行执行fc-list :lang=zh查看索引中是否有中文字体，如果有，则说明成功
> 5. 重新convert to pdf，如果还失败，则需要重启服务器


# openoffice

## mac

1. 下载openoffice 
2. 开启服务
```
/Applications/OpenOffice.app/Contents/MacOS/soffice -accept=socket,host=127.0.0.1,port=8100;urp;StarOffice.ServiceManager -headless
```
3. 下载jodconverter.jar包
4. 执行以下java,注意，端口号要和开启服务的端口号一致

```
public static void createPdf(String sourceFile, String destFile){

		File inputFile = new File(sourceFile);
		File outputFile = new File(destFile);

		try {
			// String command = "/Applications/OpenOffice.app/Contents/MacOS/soffice -accept=socket,host=127.0.0.1,port=8100;urp;StarOffice.ServiceManager -headless";
			// Process pro = Runtime.getRuntime().exec(command);
			// Thread.sleep(4000);
			// connect to an OpenOffice.org instance running on port 8100
			OpenOfficeConnection connection = new SocketOpenOfficeConnection(8100);
			connection.connect();
			// convert
			DocumentConverter converter = new OpenOfficeDocumentConverter(connection);
			converter.convert(inputFile, outputFile);

			// close the connection
			connection.disconnect();
			pro.destroy();
		}catch (Exception e){
			e.printStackTrace();
		}



	}
```


# 在线

[在线转换链接](https://www.freepdfconvert.com/)

