webpackJsonp([1],{122:function(t,e,a){"use strict";function s(t){return d()+"/account/transfers/all?address="+t}function r(t){return d()+"/account/unconfirmedTransactions?address="+t}function n(t,e,a,s){for(var r=e.data.data.length,n=0;n<r;n++){var c=e.data.data[n].transaction,d=e.data.data[n].meta,l=o(c.timeStamp),u="",m=0,v="",p="",h=0,f="";if(4100==c.type&&(c=c.otherTrans),257==c.type||8193==c.type){var A=!1;c.mosaics&&c.mosaics.forEach(function(t){A=!0;var e=t;"xem"==e.mosaicId.name&&"nem"==e.mosaicId.namespaceId&&(h=e.quantity)}),A||(h=8193==c.type?c.rentalFee:c.amount),a!=c.recipient?(u="出金",m="- "+((h+c.fee)/i).toFixed(6),p="text-danger"):(u="入金",m="+ "+(h/i).toFixed(6),p="text-success"),s?f="table-warning":v="http://explorer.nemchina.com/#/s_tx?hash="+d.hash.data,t.push({timeStamp:l,type:u,amount:m,url:v,color:p,unconfirmed:s,bgcolor:f})}}return t}Object.defineProperty(e,"__esModule",{value:!0}),e.getAccountTransfersURL=s,e.getUnconfirmedTransactionURL=r,e.setDashbordList=n;var c=Array("https://aqualife2.supernode.me","https://aqualife3.supernode.me","https://happy.supernode.me","https://mnbhsgwbeta.supernode.me","https://nsm.supernode.me","https://kohkei.supernode.me","https://mttsukuba.supernode.me","https://strategic-trader-1.supernode.me","https://strategic-trader-2.supernode.me","https://shibuya.supernode.me","https://qora01.supernode.me","https://pegatennnag.supernode.me"),i=1e6,o=function(t){var e=Date.UTC(2015,2,29,0,6,25,0);return new Date(e+1e3*t).toLocaleString()},d=function(){return c[Math.floor(Math.random()*c.length)]+":7891"}},123:function(t,e,a){"use strict";function s(){var t=new Date,e=t.getFullYear(),a=t.getMonth()+1,s=t.getDate(),r=t.getHours(),n=t.getMinutes(),c=t.getSeconds();return e+"/"+a+"/"+s+" "+r+":"+("00"+n).slice(-2)+":"+("00"+c).slice(-2)}Object.defineProperty(e,"__esModule",{value:!0}),e.getNowDateTime=s},124:function(t,e,a){"use strict";var s=function(){var t=this,e=t.$createElement,a=t._self._c||e;return a("div",{staticClass:"invoice"},[a("main",{staticClass:"container",attrs:{role:"main"}},[a("div",{staticClass:"row"},[a("div",{staticClass:"col-md-6"},[a("div",{staticClass:"card border-secondary mb-3"},[t._m(0),t._v(" "),a("div",{staticClass:"card-body"},[a("form",{on:{submit:function(e){return e.preventDefault(),t.getPriceXEM(e)}}},[a("div",{staticClass:"form-group"},[a("label",[t._v("入金先")]),a("span",{staticClass:"help-block"},[t._v("（半角英数で40文字 ハイフンなし）")]),t._v(" "),a("input",{directives:[{name:"model",rawName:"v-model",value:t.nemAddress,expression:"nemAddress"}],staticClass:"form-control",attrs:{type:"text",placeholder:"(必須)NEMのアドレスを入力して下さい",pattern:"^[0-9-A-Z]{40}",required:""},domProps:{value:t.nemAddress},on:{input:function(e){e.target.composing||(t.nemAddress=e.target.value)}}})]),t._v(" "),a("div",{staticClass:"form-group"},[a("label",[t._v("メッセージ")]),t._v(" "),a("input",{directives:[{name:"model",rawName:"v-model",value:t.tranMessage,expression:"tranMessage"}],staticClass:"form-control",attrs:{type:"text",placeholder:"(任意)入金時のメッセージを入力して下さい"},domProps:{value:t.tranMessage},on:{input:function(e){e.target.composing||(t.tranMessage=e.target.value)}}})]),t._v(" "),a("div",{staticClass:"form-group"},[a("div",{staticClass:"row"},[t._m(1),t._v(" "),a("div",{staticClass:"col col-sm-3"},[a("select",{directives:[{name:"model",rawName:"v-model",value:t.currencyType,expression:"currencyType"}],staticClass:"form-control form-control-sm",attrs:{lazy:""},on:{change:function(e){var a=Array.prototype.filter.call(e.target.options,function(t){return t.selected}).map(function(t){return"_value"in t?t._value:t.value});t.currencyType=e.target.multiple?a:a[0]}}},t._l(t.currencyItems,function(e){return a("option",{domProps:{value:e.value}},[t._v("\n                        "+t._s(e.text)+"\n                      ")])}))])]),t._v(" "),a("input",{directives:[{name:"model",rawName:"v-model",value:t.priceFiat,expression:"priceFiat"}],staticClass:"form-control",attrs:{type:"number",placeholder:"(必須)日本円価格を入力して下さい",required:""},domProps:{value:t.priceFiat},on:{input:function(e){e.target.composing||(t.priceFiat=e.target.value)}}})]),t._v(" "),a("button",{staticClass:"btn btn-primary mb-2",attrs:{type:"submit"}},[t._v("請求書を作成")])])])])]),t._v(" "),a("div",{staticClass:"col-md-6"},[a("div",{staticClass:"card border-secondary mb-3"},[a("div",[a("h5",{staticClass:"card-header"},[t._v("\n              請求書\n              "),a("button",{staticClass:"btn btn-outline-primary btn-sm float-right",on:{click:t.updateInvoice}},[t._v("更新")])])]),t._v(" "),a("div",{staticClass:"card-body"},[a("div",{staticClass:"row"},[a("div",{staticClass:"col-md-4"},[t._v("\n               請求元\n              ")]),t._v(" "),a("div",{staticClass:"col-md-8"},[a("p",[t._v(t._s(t.nemAddress))])])]),t._v(" "),a("div",{staticClass:"row"},[a("div",{staticClass:"col-md-4"},[t._v("\n                現在のレート\n              ")]),t._v(" "),a("div",{staticClass:"col-md-8"},[a("p",[t._v(t._s(t.rateFiatToXem)+" "+t._s(t.currencyType)+" / XEM")]),t._v(" "),a("p",[t._v(t._s(t.invoiceMessage))])])]),t._v(" "),a("div",{staticClass:"row"},[a("div",{staticClass:"col-md-4"},[t._v("\n                価格(XEM)\n              ")]),t._v(" "),a("div",{staticClass:"col-md-8"},[a("p",[t._v(t._s(t.priceXem)+" XEM")])])]),t._v(" "),t.qrcodeShow?a("div",{staticClass:"text-center"},[a("img",{attrs:{src:t.qrcodeUrl,alt:"xem請求書",width:"200",height:"200"}})]):t._e(),t._v(" "),a("div",{directives:[{name:"show",rawName:"v-show",value:!1,expression:"false"}]},[a("p",[t._v(t._s(t.rateXemToBtc)+t._s(t.rateBtcToFiat))])])])])])]),t._v(" "),a("div",{staticClass:"card border-secondary mb-3"},[a("div",{staticClass:"card-header"},[a("h5",[t._v("\n          ダッシュボード\n          "),a("button",{staticClass:"btn btn-outline-primary btn-sm float-right",on:{click:t.getNemTransaction}},[t._v("更新")])])]),t._v(" "),a("div",{staticClass:"card-body m-0 p-2"},[a("p",[t._v(t._s(t.dashbordMessage))]),t._v(" "),a("table",{staticClass:"table table-hover table-bordered table-sm",staticStyle:{"max-width":"30em"}},[t._m(2),t._v(" "),a("tbody",t._l(t.dashbord,function(e){return a("tr",{class:e.bgcolor},[a("td",{staticStyle:{"max-width":"6em"}},[e.unconfirmed?a("div",{staticStyle:{"font-weight":"bold"}},[t._v("\n                    未承認\n                ")]):t._e(),t._v("\n                "+t._s(e.timeStamp)+"\n              ")]),t._v(" "),a("td",{staticClass:"text-right",class:e.color},[t._v("\n                "+t._s(e.amount)+"\n              ")]),t._v(" "),a("td",{staticClass:"text-center"},[a("a",{attrs:{href:e.url,target:"_blank"}},[a("button",{staticClass:"btn btn-primary btn-sm"},[t._v("詳細")])])])])}))])])])])])},r=[function(){var t=this,e=t.$createElement,a=t._self._c||e;return a("div",[a("h5",{staticClass:"card-header"},[t._v("請求価格入力")])])},function(){var t=this,e=t.$createElement,a=t._self._c||e;return a("div",{staticClass:"col col-sm-2"},[a("label",[t._v("価格")])])},function(){var t=this,e=t.$createElement,a=t._self._c||e;return a("thead",{staticClass:"thead-light text-center"},[a("tr",[a("th",{attrs:{scope:"col"}},[t._v("日時")]),t._v(" "),a("th",{attrs:{scope:"col"}},[t._v("価格(XEM)")]),t._v(" "),a("th",{attrs:{scope:"col"}})])])}],n={render:s,staticRenderFns:r};e.a=n},28:function(t,e,a){"use strict";e.a={name:"app",data:function(){return{language:"日本語"}},created:function(){},updated:function(){localStorage.setItem("lastLanguage",this.language)}}},29:function(t,e,a){"use strict";var s=a(60),r=a.n(s),n=a(63),c=a.n(n),i=a(100),o=a.n(i),d=(a(16),a(119)),l=(a.n(d),a(122)),u=(a.n(l),a(123));a.n(u);e.a={name:"invoice",data:function(){return{priceFiat:0,priceXem:0,rateXemToBtc:0,rateBtcToFiat:0,rateFiatToXem:"レート取得中・・・",nemAddress:"",tranMessage:"",currencyType:"",qrcodeShow:!1,invoiceMessage:"",dashbordList:[],dashbordMessage:"",currencyItems:[{text:"JPY",value:"JPY"},{text:"USD",value:"USD"},{text:"EUR",value:"EUR"},{text:"KRW",value:"KRW"}]}},mounted:function(){this.nemAddress=localStorage.getItem("lastNemAddress"),this.currencyType=localStorage.getItem("lastCurrencyType"),""===this.currencyType&&(this.currencyType="JPY"),this.getRateXem(),""!=this.nemAddress&&this.getNemTransaction()},updated:function(){0!=this.rateXemToBtc&&0!=this.rateBtcToFiat&&(this.rateFiatToXem=Math.round(this.rateXemToBtc*this.rateBtcToFiat[this.currencyType].last*1e6)/1e6,this.priceXem=Math.round(this.priceFiat/this.rateFiatToXem*1e6)/1e6)},methods:{updateInvoice:function(){var t=this;return c()(r.a.mark(function e(){return r.a.wrap(function(e){for(;;)switch(e.prev=e.next){case 0:return e.next=2,t.getRateXem();case 2:t.getPriceXEM();case 3:case"end":return e.stop()}},e,t)}))()},getPriceXEM:function(){alert("請求書用のQRコードを出力します"),this.qrcodeShow=!1;var t='{"v":2,"type":2,"data":{"addr":"'+this.nemAddress+'","amount":'+1e6*this.priceXem+',"msg":"'+this.tranMessage+'"}}';this.qrcodeUrl="http://chart.apis.google.com/chart?chs=180x180&cht=qr&chl="+t,this.qrcodeShow=!0,localStorage.setItem("lastNemAddress",this.nemAddress),localStorage.setItem("lastCurrencyType",this.currencyType)},getRateXem:function(){var t=this;return c()(r.a.mark(function e(){var a,s;return r.a.wrap(function(e){for(;;)switch(e.prev=e.next){case 0:return e.prev=0,t.rateFiatToXem="レート取得中・・・",t.rateXemToBtc=0,t.rateBtcToFiat=0,t.priceXem=0,e.next=7,o.a.get("https://poloniex.com/public?command=returnTicker");case 7:return a=e.sent,t.rateXemToBtc=a.data.BTC_XEM.last,e.next=11,o.a.get("https://blockchain.info/ticker?cors=true");case 11:s=e.sent,t.rateBtcToFiat=s.data,t.invoiceMessage="最終取得時刻："+u.getNowDateTime(),e.next=20;break;case 16:e.prev=16,e.t0=e.catch(0),t.invoiceMessage="取引所(poloniex)からレートを取得できませんでした。",console.error(e.t0);case 20:case"end":return e.stop()}},e,t,[[0,16]])}))()},getNemTransaction:function(){var t=this;return c()(r.a.mark(function e(){var a,s,n;return r.a.wrap(function(e){for(;;)switch(e.prev=e.next){case 0:return e.prev=0,a=[],s=l.getUnconfirmedTransactionURL(t.nemAddress),e.next=5,o.a.get(s);case 5:return n=e.sent,t.dashbord=l.setDashbordList(a,n,t.nemAddress,!0),s=l.getAccountTransfersURL(t.nemAddress),e.next=10,o.a.get(s);case 10:n=e.sent,t.dashbordList=l.setDashbordList(a,n,t.nemAddress,!1),t.dashbordMessage="最終取得時刻："+u.getNowDateTime(),e.next=18;break;case 15:e.prev=15,e.t0=e.catch(0),"Request failed with status code 400"==e.t0.message?t.dashbordMessage="入金先が正しくありません":(t.dashbordMessage=e.t0,console.error(e.t0));case 18:case"end":return e.stop()}},e,t,[[0,15]])}))()}}}},48:function(t,e,a){"use strict";function s(t){return t&&t.__esModule?t:{default:t}}var r=a(16),n=s(r),c=a(51),i=s(c),o=a(56),d=s(o);n.default.config.productionTip=!1;new n.default({el:"#app",router:d.default,template:"<App/>",components:{App:i.default}})},51:function(t,e,a){"use strict";function s(t){a(52)}Object.defineProperty(e,"__esModule",{value:!0});var r=a(28),n=a(54),c=a(27),i=s,o=c(r.a,n.a,!1,i,null,null);e.default=o.exports},52:function(t,e){},54:function(t,e,a){"use strict";var s=function(){var t=this,e=t.$createElement,a=t._self._c||e;return a("div",{attrs:{id:"app"}},[a("nav",{staticClass:"navbar navbar-dark bg-dark"},[t._m(0),t._v(" "),a("div",{staticClass:"row"},[a("div",{staticClass:"col"},[a("select",{directives:[{name:"model",rawName:"v-model",value:t.language,expression:"language"}],staticClass:"form-control form-control-sm",on:{change:function(e){var a=Array.prototype.filter.call(e.target.options,function(t){return t.selected}).map(function(t){return"_value"in t?t._value:t.value});t.language=e.target.multiple?a:a[0]}}},[a("option",[t._v("日本語")])])])])]),t._v(" "),a("main",[a("router-view")],1)])},r=[function(){var t=this,e=t.$createElement,s=t._self._c||e;return s("a",{staticClass:"navbar-brand",attrs:{href:""}},[s("img",{attrs:{src:a(55),alt:"XEM Invoice",align:"middle"}}),t._v("XEM Invoice")])}],n={render:s,staticRenderFns:r};e.a=n},55:function(t,e){t.exports="data:image/png;base64,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"},56:function(t,e,a){"use strict";function s(t){return t&&t.__esModule?t:{default:t}}Object.defineProperty(e,"__esModule",{value:!0});var r=a(16),n=s(r),c=a(57),i=s(c),o=a(58),d=s(o);n.default.use(i.default),e.default=new i.default({routes:[{path:"/",name:"Invoice",component:d.default}]})},58:function(t,e,a){"use strict";function s(t){a(59)}Object.defineProperty(e,"__esModule",{value:!0});var r=a(29),n=a(124),c=a(27),i=s,o=c(r.a,n.a,!1,i,null,null);e.default=o.exports},59:function(t,e){}},[48]);
//# sourceMappingURL=app.3862f9a730720c3aaf9f.js.map