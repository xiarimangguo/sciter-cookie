# sciter-cookie
This is a cookie interface implemented from Sciter with js, using Sciter's Storage object to store data, allowing Sciter to support the cookie function like a browser.

[Sciter](https://github.com/c-smile/sciter-sdk) is a C++-based GUI framework that allows you to quickly build GUI applications using C++ and HTML.

### Switch languages
[中文](https://github.com/xiarimangguo/sciter-cookie/blob/main/README-CN.md)
## Use
### Load from CDN
Insert the following code in the HTML page that needs to use the Cookie component to get started.

    <script src="https://cdn.jsdelivr.net/gh/xiarimangguo/sciter-cookie@zipped/cookie.js" type="module"></script>

### Load from local file
Download `cookie.js` and put it in your project folder.  
Insert the following code in the HTML page that needs to use the Cookie component to get started.

    <script src="file://path/to/cookie.js" type="module"></script>

Don't forget to change the file path to the file location of `cookie.js`.
## Features
### Cookies
sciter-cookie supports the basic functionality of `Cookie`.
#### document.cookie
Use `document.cookie` to read and store cookies.

You can manipulate the `document.cookie` property normally the way you would in your browser.

For usage, please refer to [MDN](https://developer.mozilla.org/en-US/docs/Web/API/Document/cookie)
#### Cookies object
sciter-cookie provides you with a Cookie object to easily manipulate cookies.

Please refer to the `Basic Usage` section of [js-cookie](https://github.com/js-cookie/js-cookie) for usage.

However, this Cookie object does not fully implement all the functions of js-cookie, and only supports the three basic operations of `set` `get` `remove`.

If you want to use the full version of js-cookie, please override the `window.Cookies` object and include js-cookie in your project.
### localStorage
sciter-cookie supports the basic functionality of `localStorage`.  
You can manipulate the `localStorage` property normally the way you would in a browser.

For usage, please refer to [MDN](https://developer.mozilla.org/en-US/docs/Web/API/Window/localStorage)
### sessionStorage
sciter-cookie supports the basic functionality of `sessionStorage`.  
You can manipulate the `sessionStorage` property normally the way you would in a browser.

For usage, please refer to [MDN](https://developer.mozilla.org/en-US/docs/Web/API/Window/sessionStorage)
## About
This project is developed by [@xiarimangguo](https://github.com/xiarimangguo/).

If you think this project is very convenient, don't forget to light up the star for me~
