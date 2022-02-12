# sciter-cookie
这是一个用js从零实现cookie接口，可以让Sciter像浏览器一样支持Cookie功能。  
[Sciter](https://github.com/c-smile/sciter-sdk)是一个基于C++的图形界面框架，可以让你使用C++和HTML快速构建GUI应用。  
## 使用
### 从CDN加载
在需要使用Cookie组件的HTML页面中插入以下代码，即可开始使用。

    <script src="https://cdn.jsdelivr.net/gh/xiarimangguo/sciter-cookie@zipped/cookie.js" type="module"></script>

### 从本地文件加载
下载`cookie.js`，放入你的项目文件夹。  
在需要使用Cookie组件的HTML页面中插入以下代码，即可开始使用。

    <script src="file://path/to/cookie.js" type="module"></script>

别忘了更改文件路径为`cookie.js`的文件位置。
## 功能
### Cookie
sciter-cookie支持`Cookie`的基本功能。  
#### document.cookie
使用`document.cookie`来读取和存储Cookie。  
您可以按照您在浏览器中的方式正常操作`document.cookie`属性。  
#### Cookies对象
sciter-cookie为您提供了一个Cookie对象，可以方便地操作Cookie。  
使用方式请参考[js-cookie](https://github.com/js-cookie/js-cookie)的`Basic Usage`部分。  
不过，这个Cookie对象并未完全实现js-cookie的全部功能，仅支持`set``get``remove`这三个基本操作。  
如果您想使用完整版的js-cookie，请您覆盖掉`window.Cookies`对象，并在您的项目中引入js-cookie。  
### localStorage
sciter-cookie支持`localStorage`的基本功能。  
您可以按照您在浏览器中的方式正常操作`localStorage`属性。  
### sessionStorage
sciter-cookie支持`sessionStorage`的基本功能。  
您可以按照您在浏览器中的方式正常操作`sessionStorage`属性。
## 关于
本项目由 [@xiarimangguo](https://github.com/xiarimangguo/) 开发。  
如果你认为这个项目很方便，别忘了为我点亮star呀~
