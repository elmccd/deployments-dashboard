webpackJsonp([1],{0:function(t,e){},"5FGH":function(t,e){},NHnr:function(t,e,n){"use strict";Object.defineProperty(e,"__esModule",{value:!0});var a=n("/5sW"),s=n("fZjL"),i=n.n(s),r=n("DmT9"),o=n.n(r),u=n("PJh5"),l=n.n(u),c={name:"ServerBlock",props:["data"],data:function(){return{now:Date.now()}},created:function(){var t=this;setInterval(function(){t.now=Date.now()},1e3)},computed:{shortCommit:function(){return this.data.build.commit?this.data.build.commit.substr(0,6):null},builtRelative:function(){return"pending"===this.data.build.status?l.a.utc(l()(this.now).diff(l()(this.data.timestamp))).format("HH:mm:ss"):l()(this.data.timestamp).fromNow()},statusIconClass:function(){return{Errored:"fa-exclamation-circle",Broken:"fa-exclamation-triangle",fail:"fa-exclamation-circle",Failed:"fa-exclamation-circle","Still Failing":"fa-exclamation-circle",Canceled:"fa-ban",Pending:"fa-pulse fa-spinner",pending:"fa-pulse fa-spinner",Fixed:"fa-wrench",Passed:"fa-check",success:"fa-check"}[this.data.build.status_message||this.data.build.status]||"fa-question"}}},d={render:function(){var t=this,e=t.$createElement,n=t._self._c||e;return n("div",{staticClass:"block",class:t.data.build.status},[n("h1",[t._v(t._s(t.data.id))]),t._v(" "),n("h2",{directives:[{name:"show",rawName:"v-show",value:t.data.build.id,expression:"data.build.id"}]},[t._v("\n    Build:\n    "),n("a",{attrs:{target:"_blank",href:t.data.build.link}},[t._v("#"+t._s(t.data.build.id))])]),t._v(" "),n("i",{staticClass:"fa fa-4x",class:t.statusIconClass}),t._v(" "),n("p",[t._v("\n    "+t._s("pending"===t.data.build.status?"Building for":"Built")+"\n    "),n("b",[t._v(t._s(t.builtRelative))])]),t._v(" "),n("p",[t._v("Status: "),n("b",[t._v(t._s(t.data.build.status_message))])]),t._v(" "),n("p",[t._v("Author: "),n("b",[t._v(t._s(t.data.build.author))])]),t._v(" "),n("p",[t._v("Deployed by: "),n("b",[t._v(t._s(t.data.build.committer))])]),t._v(" "),n("p",[t._v("\n    Message:\n    "),n("i",[t._v(t._s(t.data.build.message))])]),t._v(" "),n("p",{directives:[{name:"show",rawName:"v-show",value:t.shortCommit,expression:"shortCommit"}]},[t._v("\n    on commit:\n    "),n("a",{attrs:{target:"_blank",href:t.data.build.compare_url}},[t._v(t._s(t.shortCommit))])]),t._v(" "),n("a",{staticClass:"block-link",attrs:{href:t.data.destination}},[t._v(t._s(t.data.destination))])])},staticRenderFns:[]};var v=n("VU/8")(c,d,!1,function(t){n("5FGH")},"data-v-60b93149",null).exports,f=o()({path:"/ws"}),m={name:"App",components:{ServerBlock:v},data:function(){return{servers:{},state:"initial"}},created:function(){var t=this;console.log(44),console.log(this),setInterval(function(){i()(t.servers).forEach(function(e){f.emit("getStatus",t.servers[e].id)})},1e3),f.on("status",function(e){t.$set(t.servers,[e.id],e),t.state="loaded"}),f.on("error",function(t){console.log("error",t)}),f.on("connection",function(t){console.log("connected",t)})}},_={render:function(){var t=this.$createElement,e=this._self._c||t;return e("div",{attrs:{id:"app"}},["loaded"===this.state?this._l(this.servers,function(t){return e("ServerBlock",{key:t.id,attrs:{data:t}})}):e("div",{staticClass:"error"},[this._v("\n    Looks like there is no servers to list."),e("br"),this._v("\n    Trigger build results to see something here.\n  ")])],2)},staticRenderFns:[]};var h=n("VU/8")(m,_,!1,function(t){n("U4mj")},null,null).exports;a.a.config.productionTip=!1,new a.a({el:"#app",render:function(t){return t(h)}})},U4mj:function(t,e){},tdTh:function(t,e,n){var a={"./en-au":"Sjoy","./en-au.js":"Sjoy","./en-ca":"Tqun","./en-ca.js":"Tqun","./en-gb":"hPuz","./en-gb.js":"hPuz","./en-ie":"ALEw","./en-ie.js":"ALEw","./en-nz":"dyB6","./en-nz.js":"dyB6"};function s(t){return n(i(t))}function i(t){var e=a[t];if(!(e+1))throw new Error("Cannot find module '"+t+"'.");return e}s.keys=function(){return Object.keys(a)},s.resolve=i,t.exports=s,s.id="tdTh"}},["NHnr"]);
//# sourceMappingURL=app.c80401bb8636ebd4affc.js.map