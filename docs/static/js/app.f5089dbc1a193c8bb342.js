webpackJsonp([1],{122:function(t,a,e){"use strict";var s=function(){var t=this,a=t.$createElement,e=t._self._c||a;return e("div",{staticClass:"hello"},[e("main",{staticClass:"container",attrs:{role:"main"}},[e("div",{staticClass:"row"},[e("div",{staticClass:"col-md-6"},[e("div",{staticClass:"card border-secondary mb-3"},[e("h5",{staticClass:"card-header"},[t._v("請求価格入力")]),t._v(" "),e("div",{staticClass:"card-body"},[e("form",[e("div",{staticClass:"form-group"},[e("label",[t._v("入金先")]),t._v(" "),e("input",{directives:[{name:"model",rawName:"v-model",value:t.nemAddress,expression:"nemAddress"}],staticClass:"form-control",attrs:{type:"text",id:"formGroupExampleInput2",placeholder:"NEMのアドレスを入力して下さい"},domProps:{value:t.nemAddress},on:{input:function(a){a.target.composing||(t.nemAddress=a.target.value)}}})]),t._v(" "),e("div",{staticClass:"form-group"},[e("label",[t._v("メッセージ")]),t._v(" "),e("input",{directives:[{name:"model",rawName:"v-model",value:t.tranMessage,expression:"tranMessage"}],staticClass:"form-control",attrs:{type:"text",id:"formGroupExampleInput2",placeholder:"(任意)入金時のメッセージを入力して下さい"},domProps:{value:t.tranMessage},on:{input:function(a){a.target.composing||(t.tranMessage=a.target.value)}}})]),t._v(" "),e("div",{staticClass:"form-group"},[e("label",[t._v("価格(JPY)")]),t._v(" "),e("input",{directives:[{name:"model",rawName:"v-model",value:t.jpyPrice,expression:"jpyPrice"}],staticClass:"form-control",attrs:{type:"text",id:"formGroupExampleInput2",placeholder:"日本円価格を入力して下さい"},domProps:{value:t.jpyPrice},on:{input:function(a){a.target.composing||(t.jpyPrice=a.target.value)}}})])]),t._v(" "),e("button",{staticClass:"btn btn-primary mb-2",on:{click:function(a){t.getXEMPrice()}}},[t._v("請求書を作成")])])])]),t._v(" "),e("div",{staticClass:"col-md-6"},[e("div",{staticClass:"card border-secondary mb-3"},[e("h5",{staticClass:"card-header"},[t._v("請求書")]),t._v(" "),e("div",{staticClass:"card-body"},[e("div",{staticClass:"row"},[e("div",{staticClass:"col-md-4"},[t._v("\n                現在のレート\n              ")]),t._v(" "),e("div",{staticClass:"col-md-8"},[e("p",[t._v(t._s(t.xemRate)+" 円 / XEM")])])]),t._v(" "),e("div",{staticClass:"row"},[e("div",{staticClass:"col-md-4"},[t._v("\n                価格(XEM)\n              ")]),t._v(" "),e("div",{staticClass:"col-md-8"},[e("p",[t._v(t._s(t.xemPrice)+" XEM")])])]),t._v(" "),t.qrcodeShow?e("div",{staticClass:"text-center"},[e("img",{attrs:{src:t.qrcodeUrl,alt:"xem請求書",width:"200",height:"200"}})]):t._e(),t._v(" "),e("div",{directives:[{name:"show",rawName:"v-show",value:!1,expression:"false"}]},[e("p",[t._v(t._s(t.xemBTC)+t._s(t.dolRate))])])])])])]),t._v(" "),e("div",{staticClass:"card border-secondary mb-3"},[t._m(0),t._v(" "),e("div",{staticClass:"card-body"},[e("div",{staticClass:"tab-content"},[e("div",{staticClass:"tab-pane active",attrs:{id:"tab1"}},[e("table",{staticClass:"table table-hover",staticStyle:{"max-width":"30em"}},[t._m(1),t._v(" "),e("tbody",t._l(t.dashbord,function(a){return e("tr",[e("td",{staticStyle:{"max-width":"7em"}},[t._v(t._s(t.dispTimeStamp(a.timeStamp)))]),t._v(" "),e("td",[t._v(t._s(a.type))]),t._v(" "),e("td",{staticClass:"text-right"},[e("a",{attrs:{href:a.url,target:"_blank"}},[t._v(t._s(a.amount))])])])}))])]),t._v(" "),e("div",{staticClass:"tab-pane",attrs:{id:"tab2"}},[t._v("\n            開発中・・・。リリースまでしばらく待ってね。\n          ")])])])])])])},r=[function(){var t=this,a=t.$createElement,e=t._self._c||a;return e("div",{staticClass:"card-header"},[e("h5",[t._v("ダッシュボード")]),t._v(" "),e("ul",{staticClass:"nav nav-tabs card-header-tabs"},[e("li",{staticClass:"nav-item"},[e("a",{staticClass:"nav-link active",attrs:{href:"#tab1","data-toggle":"tab"}},[t._v("承認済み")])]),t._v(" "),e("li",{staticClass:"nav-item"},[e("a",{staticClass:"nav-link",attrs:{href:"#tab2","data-toggle":"tab"}},[t._v("未承認")])])])])},function(){var t=this,a=t.$createElement,e=t._self._c||a;return e("thead",{staticClass:"thead-light"},[e("tr",[e("th",{attrs:{scope:"col"}},[t._v("日時")]),t._v(" "),e("th",{attrs:{scope:"col"}},[t._v("種別")]),t._v(" "),e("th",{attrs:{scope:"col"}},[t._v("価格(XEM)")])])])}],n={render:s,staticRenderFns:r};a.a=n},28:function(t,a,e){"use strict";a.a={name:"app"}},29:function(t,a,e){"use strict";var s=e(60),r=e.n(s),n=e(63),i=e.n(n),c=e(100),o=e.n(c),l=(e(16),e(119)),d=(e.n(l),Array("aqualife1.supernode.me","aqualife2.supernode.me","aqualife3.supernode.me")),v=function(t){return"https://"+d[Math.floor(Math.random()*d.length)]+":7891/account/transfers/all?address="+t};a.a={name:"hello",data:function(){return{jpyPrice:0,xemRate:"レート取得中・・・",xemPrice:0,xembookUrl:"http://13.113.193.148/xembook/lastprice2.json",poloniexUrl:"https://poloniex.com/public?command=returnTicker",qrcodeShow:!1,qrcodeUrl:"http://chart.apis.google.com/chart?chs=180x180&cht=qr&chl=",dolRate:0,xemBTC:0,nemAddress:"",tranMessage:"",accountTransfers:[],dashbord:[]}},created:function(){var t=this;return i()(r.a.mark(function a(){var e,s,n,i,c,l,d,m,u,p,h,A,f,C;return r.a.wrap(function(a){for(;;)switch(a.prev=a.next){case 0:return t.nemAddress=localStorage.getItem("lastNemAddress"),a.prev=1,a.next=4,o.a.get("https://poloniex.com/public?command=returnTicker");case 4:return e=a.sent,a.next=7,o.a.get("https://blockchain.info/ticker?cors=true");case 7:s=a.sent,t.xemBTC=e.data.BTC_XEM.last,t.dolRate=s.data.JPY.last,t.xemRate=Math.round(t.xemBTC*t.dolRate*1e6)/1e6,a.next=16;break;case 13:a.prev=13,a.t0=a.catch(1),console.error(a.t0);case 16:return a.prev=16,n=v(t.nemAddress),a.next=20,o.a.get(n);case 20:for(i=a.sent,t.accountTransfers=i.data.data,c=i.data.data.length,l=0;l<c;l++)d=t.accountTransfers[l].transaction,m=t.accountTransfers[l].meta,u=d.timeStamp,p="",h=0,A="",f=0,4100==d.type&&(d=d.otherTrans),257!=d.type&&8193!=d.type||(C=!1,d.mosaics&&d.mosaics.forEach(function(t){C=!0;var a=t;"xem"==a.mosaicId.name&&"nem"==a.mosaicId.namespaceId&&(f=a.quantity)}),C||(f=8193==d.type?d.rentalFee:d.amount),t.nemAddress!=d.recipient?(p="出金",h="- "+((f+d.fee)/1e6).toFixed(6)):(p="入金",h="+ "+(f/1e6).toFixed(6)),A="http://explorer.nemchina.com/#/s_tx?hash="+m.hash.data,t.dashbord.push({timeStamp:u,type:p,amount:h,url:A}));a.next=29;break;case 26:a.prev=26,a.t1=a.catch(16),console.error(a.t1);case 29:case"end":return a.stop()}},a,t,[[1,13],[16,26]])}))()},updated:function(){0!=this.xemBTC&&0!=this.dolRate&&(this.xemPrice=Math.round(this.jpyPrice/this.xemRate*1e6)/1e6)},methods:{getXEMPrice:function(){this.qrcodeShow=!1;var t='{"v":2,"type":2,"data":{"addr":"'+this.nemAddress+'","amount":'+1e6*this.xemPrice+',"msg":"'+this.tranMessage+'"}}';this.qrcodeUrl="http://chart.apis.google.com/chart?chs=180x180&cht=qr&chl="+t,this.qrcodeShow=!0,localStorage.setItem("lastNemAddress",this.nemAddress),alert("請求書用のQRコードを出力します")},dispTimeStamp:function(t){var a=Date.UTC(2015,2,29,0,6,25,0);return new Date(a+1e3*t).toLocaleString()}}}},48:function(t,a,e){"use strict";Object.defineProperty(a,"__esModule",{value:!0});var s=e(16),r=e(51),n=e(56);s.a.config.productionTip=!1;new s.a({el:"#app",router:n.a,template:"<App/>",components:{App:r.a}})},51:function(t,a,e){"use strict";function s(t){e(52)}var r=e(28),n=e(54),i=e(27),c=s,o=i(r.a,n.a,!1,c,null,null);a.a=o.exports},52:function(t,a){},54:function(t,a,e){"use strict";var s=function(){var t=this,a=t.$createElement,e=t._self._c||a;return e("div",{attrs:{id:"app"}},[t._m(0),t._v(" "),e("main",[e("router-view")],1)])},r=[function(){var t=this,a=t.$createElement,s=t._self._c||a;return s("nav",{staticClass:"navbar navbar-dark bg-dark"},[s("a",{staticClass:"navbar-brand",attrs:{href:"#"}},[s("img",{attrs:{src:e(55),alt:"Vue.js PWA",align:"middle"}}),t._v("XEM Invoice")]),t._v(" "),s("button",{staticClass:"navbar-toggler",attrs:{type:"button","data-toggle":"collapse","data-target":"#navMenu","aria-controls":"navMenu","aria-expanded":"false","aria-label":"Toggle navigation"}},[s("span",{staticClass:"navbar-toggler-icon"})]),t._v(" "),s("div",{staticClass:"collapse navbar-collapse",attrs:{id:"navMenu"}},[s("ul",{staticClass:"navbar-nav mr-auto"},[s("li",{staticClass:"nav-item"},[s("a",{staticClass:"nav-link",attrs:{href:"#"}},[t._v("アドレス帳")])]),t._v(" "),s("li",{staticClass:"nav-item"},[s("a",{staticClass:"nav-link",attrs:{href:"#"}},[t._v("設定")])])])])])}],n={render:s,staticRenderFns:r};a.a=n},55:function(t,a){t.exports="data:image/png;base64,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"},56:function(t,a,e){"use strict";var s=e(16),r=e(57),n=e(58);s.a.use(r.a),a.a=new r.a({routes:[{path:"/",name:"Hello",component:n.a}]})},58:function(t,a,e){"use strict";function s(t){e(59)}var r=e(29),n=e(122),i=e(27),c=s,o=i(r.a,n.a,!1,c,null,null);a.a=o.exports},59:function(t,a){}},[48]);
//# sourceMappingURL=app.f5089dbc1a193c8bb342.js.map