!function(e,t){for(var n in t)e[n]=t[n]}(exports,function(e){var t={};function n(r){if(t[r])return t[r].exports;var o=t[r]={i:r,l:!1,exports:{}};return e[r].call(o.exports,o,o.exports,n),o.l=!0,o.exports}return n.m=e,n.c=t,n.d=function(e,t,r){n.o(e,t)||Object.defineProperty(e,t,{enumerable:!0,get:r})},n.r=function(e){"undefined"!=typeof Symbol&&Symbol.toStringTag&&Object.defineProperty(e,Symbol.toStringTag,{value:"Module"}),Object.defineProperty(e,"__esModule",{value:!0})},n.t=function(e,t){if(1&t&&(e=n(e)),8&t)return e;if(4&t&&"object"==typeof e&&e&&e.__esModule)return e;var r=Object.create(null);if(n.r(r),Object.defineProperty(r,"default",{enumerable:!0,value:e}),2&t&&"string"!=typeof e)for(var o in e)n.d(r,o,function(t){return e[t]}.bind(null,o));return r},n.n=function(e){var t=e&&e.__esModule?function(){return e.default}:function(){return e};return n.d(t,"a",t),t},n.o=function(e,t){return Object.prototype.hasOwnProperty.call(e,t)},n.p="",n(n.s=8)}([,function(e,t){e.exports=require("regenerator-runtime/runtime")},,,function(e,t){e.exports=require("axios")},,,,function(e,t,n){function r(e,t,n,r,o,a,c){try{var u=e[a](c),i=u.value}catch(e){return void n(e)}u.done?t(i):Promise.resolve(i).then(r,o)}var o=n(4),a=n(9);n(1);var c=function(e,t,n){return new TextDecoder("utf-8").decode(a.hmac(new TextEncoder("utf-8").encode(n),function(e,t,n){var r=a.hash(JSON.stringify(e)),o=new TextDecoder("utf-8").decode(r);return new TextEncoder("utf-8").encode("POST:".concat(t,":").concat(o,":").concat(n,"}"))}(e,t,n)))};t.handler=function(){var e,t=(e=regeneratorRuntime.mark((function e(t,n,r){var a,u,i,s,l,f,p,d,m,v,y,g,h,x,b,O,w;return regeneratorRuntime.wrap((function(e){for(;;)switch(e.prev=e.next){case 0:return e.prev=0,a=t.body,u=JSON.parse(a),i=u.name,s=u.email,l=u.phone,f=u.amount,p=u.notifyUrl,d=u.expired,m=u.paymentMethod,v=u.paymentChannel,y=u.apiKey,g=u.vaNum,console.log(a),x=c(h={name:i,email:s,phone:l,amount:f,notifyUrl:p,expired:d,paymentMethod:m,paymentChannel:v},g,y),console.log("Signature: ".concat(x)),b={"Content-Type":"application/json",va:g,signature:x,timestamp:(n=void 0,r=void 0,S=void 0,T=void 0,n=function(e){return e<10?"0".concat(e):"".concat(e)},r=new Date,S=r.getTime()+6e4*r.getTimezoneOffset(),T=new Date(S+252e5),"".concat(T.getFullYear().toString()).concat(n(T.getMonth()+1)).concat(n(T.getDate())).concat(n(T.getHours())).concat(n(T.getMinutes())).concat(n(T.getSeconds())))},e.next=11,o.post("https://my.ipaymu.com/api/v2/payment/direct",h,{headers:b});case 11:return O=e.sent,e.next=14,O;case 14:return w=e.sent,console.log(w),e.next=18,{statusCode:200,headers:{"Access-Control-Allow-Origin":"*","Access-Control-Allow-Headers":"Origin, X-Requested-With, Content-Type, Accept"},body:"Hello World!"};case 18:return e.abrupt("return",e.sent);case 21:return e.prev=21,e.t0=e.catch(0),console.error(e.t0),e.next=26,{statusCode:400,body:JSON.stringify(e.t0)};case 26:return e.abrupt("return",e.sent);case 27:case"end":return e.stop()}var n,r,S,T}),e,null,[[0,21]])})),function(){var t=this,n=arguments;return new Promise((function(o,a){var c=e.apply(t,n);function u(e){r(c,o,a,u,i,"next",e)}function i(e){r(c,o,a,u,i,"throw",e)}u(void 0)}))});return function(e,n,r){return t.apply(this,arguments)}}()},function(e,t){e.exports=require("fast-sha256")}]));