!function(e,t){for(var r in t)e[r]=t[r]}(exports,function(e){var t={};function r(n){if(t[n])return t[n].exports;var o=t[n]={i:n,l:!1,exports:{}};return e[n].call(o.exports,o,o.exports,r),o.l=!0,o.exports}return r.m=e,r.c=t,r.d=function(e,t,n){r.o(e,t)||Object.defineProperty(e,t,{enumerable:!0,get:n})},r.r=function(e){"undefined"!=typeof Symbol&&Symbol.toStringTag&&Object.defineProperty(e,Symbol.toStringTag,{value:"Module"}),Object.defineProperty(e,"__esModule",{value:!0})},r.t=function(e,t){if(1&t&&(e=r(e)),8&t)return e;if(4&t&&"object"==typeof e&&e&&e.__esModule)return e;var n=Object.create(null);if(r.r(n),Object.defineProperty(n,"default",{enumerable:!0,value:e}),2&t&&"string"!=typeof e)for(var o in e)r.d(n,o,function(t){return e[t]}.bind(null,o));return n},r.n=function(e){var t=e&&e.__esModule?function(){return e.default}:function(){return e};return r.d(t,"a",t),t},r.o=function(e,t){return Object.prototype.hasOwnProperty.call(e,t)},r.p="",r(r.s=10)}({0:function(e,t){e.exports=require("dotenv")},10:function(e,t,r){function n(e,t){var r=Object.keys(e);if(Object.getOwnPropertySymbols){var n=Object.getOwnPropertySymbols(e);t&&(n=n.filter((function(t){return Object.getOwnPropertyDescriptor(e,t).enumerable}))),r.push.apply(r,n)}return r}function o(e,t,r){return t in e?Object.defineProperty(e,t,{value:r,enumerable:!0,configurable:!0,writable:!0}):e[t]=r,e}var c=r(11);r(0).config();var a=process.env,i=a.MAIL_ADDR,u=a.MAIL_PASS,l=c.createTransport({service:"gmail",auth:{user:i,pass:u}});t.handler=function(e,t,r){var c,a,u,f,s=e.queryStringParameters,p=s.type,b=void 0===p?"":p,d="",O="";switch(console.log(e),b){case"PAYMENT_NOTIF":var y=s.oid;O="Order ".concat(y," has been paid"),d="\n                <h1>Order ".concat(y," has been paid on ").concat((c=function(e){return e<10?"0".concat(e):"".concat(e)},a=new Date,u=a.getTime()+6e4*a.getTimezoneOffset(),f=new Date(u+252e5),"".concat(c(f.getDate()),".").concat(c(f.getMonth()+1),".").concat(f.getFullYear().toString()," (+7GMT)")),"</h1>\n                <br />\n                <p>Please procceed to fullfil the order. Click <a href='/'>Here</a> to directly go to the admin link.</p>\n            ");break;case"ERROR":O="ERROR Etheral",d=e.body}var g={html:d,subject:O},v=function(e){for(var t=1;t<arguments.length;t++){var r=null!=arguments[t]?arguments[t]:{};t%2?n(Object(r),!0).forEach((function(t){o(e,t,r[t])})):Object.getOwnPropertyDescriptors?Object.defineProperties(e,Object.getOwnPropertyDescriptors(r)):n(Object(r)).forEach((function(t){Object.defineProperty(e,t,Object.getOwnPropertyDescriptor(r,t))}))}return e}({from:'"Etheral notification 📿" <'.concat(i,">"),to:"asketheral@gmail.com"},g);l.sendMail(v,(function(e,t){e&&r(null,{statusCode:200,body:JSON.stringify(e)}),r(null,{statusCode:200,body:"Success"})}))}},11:function(e,t){e.exports=require("nodemailer")}}));