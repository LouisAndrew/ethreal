!function(e,r){for(var t in r)e[t]=r[t]}(exports,function(e){var r={};function t(n){if(r[n])return r[n].exports;var o=r[n]={i:n,l:!1,exports:{}};return e[n].call(o.exports,o,o.exports,t),o.l=!0,o.exports}return t.m=e,t.c=r,t.d=function(e,r,n){t.o(e,r)||Object.defineProperty(e,r,{enumerable:!0,get:n})},t.r=function(e){"undefined"!=typeof Symbol&&Symbol.toStringTag&&Object.defineProperty(e,Symbol.toStringTag,{value:"Module"}),Object.defineProperty(e,"__esModule",{value:!0})},t.t=function(e,r){if(1&r&&(e=t(e)),8&r)return e;if(4&r&&"object"==typeof e&&e&&e.__esModule)return e;var n=Object.create(null);if(t.r(n),Object.defineProperty(n,"default",{enumerable:!0,value:e}),2&r&&"string"!=typeof e)for(var o in e)t.d(n,o,function(r){return e[r]}.bind(null,o));return n},t.n=function(e){var r=e&&e.__esModule?function(){return e.default}:function(){return e};return t.d(r,"a",r),r},t.o=function(e,r){return Object.prototype.hasOwnProperty.call(e,r)},t.p="",t(t.s=1)}([,function(e,r,t){"use strict";t.r(r),t.d(r,"db",(function(){return f})),t(2).config();var n=t(3),o=process.env,i=o.FIREBASE_CLIENT_EMAIL,u=o.FIREBASE_PRIVATE_KEY,a={credential:n.credential.cert({client_email:i,private_key:u.replace(/\\n/g,"\n"),project_id:"etheral-dev-f86af"}),databaseURL:"https://etheral-dev-f86af.firebaseio.com"};n.apps.length||n.initializeApp(a);var f=n.firestore()},function(e,r){e.exports=require("dotenv")},function(e,r){e.exports=require("firebase-admin")}]));