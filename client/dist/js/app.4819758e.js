(function(e){function t(t){for(var r,a,c=t[0],i=t[1],s=t[2],l=0,h=[];l<c.length;l++)a=c[l],Object.prototype.hasOwnProperty.call(o,a)&&o[a]&&h.push(o[a][0]),o[a]=0;for(r in i)Object.prototype.hasOwnProperty.call(i,r)&&(e[r]=i[r]);m&&m(t);while(h.length)h.shift()();return u.push.apply(u,s||[]),n()}function n(){for(var e,t=0;t<u.length;t++){for(var n=u[t],r=!0,a=1;a<n.length;a++){var c=n[a];0!==o[c]&&(r=!1)}r&&(u.splice(t--,1),e=i(i.s=n[0]))}return e}var r={},a={app:0},o={app:0},u=[];function c(e){return i.p+"js/"+({}[e]||e)+"."+{"chunk-3b892205":"af211d0e","chunk-07bee420":"53139aa9","chunk-0b927500":"7dde6b10","chunk-37681ca9":"75b5078b","chunk-7cf8fd17":"9dad6b73","chunk-114b7fb6":"4f9833f1","chunk-060ab832":"ac148d27","chunk-98dc7a8c":"0485a2c2","chunk-59170842":"9e27b64a","chunk-7277fdb0":"49f72ae9","chunk-c9bb4d56":"642fee56"}[e]+".js"}function i(t){if(r[t])return r[t].exports;var n=r[t]={i:t,l:!1,exports:{}};return e[t].call(n.exports,n,n.exports,i),n.l=!0,n.exports}i.e=function(e){var t=[],n={"chunk-3b892205":1,"chunk-07bee420":1,"chunk-0b927500":1,"chunk-37681ca9":1,"chunk-7cf8fd17":1,"chunk-114b7fb6":1,"chunk-060ab832":1,"chunk-98dc7a8c":1,"chunk-59170842":1,"chunk-7277fdb0":1,"chunk-c9bb4d56":1};a[e]?t.push(a[e]):0!==a[e]&&n[e]&&t.push(a[e]=new Promise((function(t,n){for(var r="css/"+({}[e]||e)+"."+{"chunk-3b892205":"93820a10","chunk-07bee420":"60ad07ea","chunk-0b927500":"b6e7e4ea","chunk-37681ca9":"b6e7e4ea","chunk-7cf8fd17":"38fb335c","chunk-114b7fb6":"1a0209ca","chunk-060ab832":"8854a150","chunk-98dc7a8c":"0a87e826","chunk-59170842":"60ad07ea","chunk-7277fdb0":"cd4cce80","chunk-c9bb4d56":"b0469831"}[e]+".css",o=i.p+r,u=document.getElementsByTagName("link"),c=0;c<u.length;c++){var s=u[c],l=s.getAttribute("data-href")||s.getAttribute("href");if("stylesheet"===s.rel&&(l===r||l===o))return t()}var h=document.getElementsByTagName("style");for(c=0;c<h.length;c++){s=h[c],l=s.getAttribute("data-href");if(l===r||l===o)return t()}var m=document.createElement("link");m.rel="stylesheet",m.type="text/css",m.onload=t,m.onerror=function(t){var r=t&&t.target&&t.target.src||o,u=new Error("Loading CSS chunk "+e+" failed.\n("+r+")");u.code="CSS_CHUNK_LOAD_FAILED",u.request=r,delete a[e],m.parentNode.removeChild(m),n(u)},m.href=o;var f=document.getElementsByTagName("head")[0];f.appendChild(m)})).then((function(){a[e]=0})));var r=o[e];if(0!==r)if(r)t.push(r[2]);else{var u=new Promise((function(t,n){r=o[e]=[t,n]}));t.push(r[2]=u);var s,l=document.createElement("script");l.charset="utf-8",l.timeout=120,i.nc&&l.setAttribute("nonce",i.nc),l.src=c(e);var h=new Error;s=function(t){l.onerror=l.onload=null,clearTimeout(m);var n=o[e];if(0!==n){if(n){var r=t&&("load"===t.type?"missing":t.type),a=t&&t.target&&t.target.src;h.message="Loading chunk "+e+" failed.\n("+r+": "+a+")",h.name="ChunkLoadError",h.type=r,h.request=a,n[1](h)}o[e]=void 0}};var m=setTimeout((function(){s({type:"timeout",target:l})}),12e4);l.onerror=l.onload=s,document.head.appendChild(l)}return Promise.all(t)},i.m=e,i.c=r,i.d=function(e,t,n){i.o(e,t)||Object.defineProperty(e,t,{enumerable:!0,get:n})},i.r=function(e){"undefined"!==typeof Symbol&&Symbol.toStringTag&&Object.defineProperty(e,Symbol.toStringTag,{value:"Module"}),Object.defineProperty(e,"__esModule",{value:!0})},i.t=function(e,t){if(1&t&&(e=i(e)),8&t)return e;if(4&t&&"object"===typeof e&&e&&e.__esModule)return e;var n=Object.create(null);if(i.r(n),Object.defineProperty(n,"default",{enumerable:!0,value:e}),2&t&&"string"!=typeof e)for(var r in e)i.d(n,r,function(t){return e[t]}.bind(null,r));return n},i.n=function(e){var t=e&&e.__esModule?function(){return e["default"]}:function(){return e};return i.d(t,"a",t),t},i.o=function(e,t){return Object.prototype.hasOwnProperty.call(e,t)},i.p="/",i.oe=function(e){throw console.error(e),e};var s=window["webpackJsonp"]=window["webpackJsonp"]||[],l=s.push.bind(s);s.push=t,s=s.slice();for(var h=0;h<s.length;h++)t(s[h]);var m=l;u.push([0,"chunk-vendors"]),n()})({0:function(e,t,n){e.exports=n("56d7")},1363:function(e,t,n){},"56d7":function(e,t,n){"use strict";n.r(t);n("e260"),n("e6cf"),n("cca6"),n("a79d"),n("d3b7");var r=n("2b0e"),a=n("bc3a"),o=n.n(a),u=n("123d"),c=n.n(u),i=function(){var e=this,t=e.$createElement,n=e._self._c||t;return n("v-app",[n("Navbar"),n("router-view")],1)},s=[],l=function(){var e=this,t=e.$createElement,n=e._self._c||t;return n("v-app-bar",{attrs:{app:"",color:"white",flat:"","max-height":"65"}},[n("v-menu",{attrs:{align:"center",justify:"space-around"},scopedSlots:e._u([{key:"activator",fn:function(t){var r=t.on,a=t.attrs;return[n("v-btn",e._g(e._b({staticClass:"d-flex d-md-none mx-auto",attrs:{color:"primary",dark:"",name:"menu",outlined:"",small:"",width:"200"}},"v-btn",a,!1),Object.assign({},r)),[n("v-icon",{attrs:{alt:"hamburger menu"}},[e._v("menu")])],1),n("v-spacer")]}}])},[n("v-list",{staticClass:"font-weight-bold grey--text mobileMenu text-uppercase"},[n("v-list-item",{attrs:{to:"/"}},[e._v("home")]),e.isAuthorized?n("v-list-item",{attrs:{name:"list",to:"/roomlist"}},[e._v(" rooms ")]):e._e(),e.isAuthorized?n("v-list-item",{attrs:{name:"profile",to:"/profile"}},[e._v(" profile ")]):e._e(),n("v-list-item",{attrs:{to:"/about"}},[e._v("about")]),e.isAuthorized?n("v-list-item",[n("v-btn",{staticClass:"mx-auto",attrs:{color:"primary",name:"logout",outlined:"",small:"",width:"250"},on:{click:function(t){return t.preventDefault(),e.logout.apply(null,arguments)}}},[e._v(" logout ")])],1):e._e()],1)],1),n("v-tabs",{staticClass:"d-none d-md-block",attrs:{color:"primary"}},[n("v-tab",{attrs:{name:"home",to:"/"}},[e._v(" home ")]),e.isAuthorized?n("v-tab",{attrs:{name:"list",to:"/roomlist"}},[e._v(" rooms ")]):e._e(),e.isAuthorized?n("v-tab",{attrs:{name:"profile",to:"/profile"}},[e._v(" profile ")]):e._e(),n("v-tab",{attrs:{name:"about",to:"/about"}},[e._v(" about ")])],1),n("v-tab",{staticClass:"appName grey--text menu text--darken-2",attrs:{name:"logo",to:"/"}},[e._v(" gemverse ")]),e.isAuthorized?n("v-tab",{staticClass:"grey--text hidden-xs-only menu mx-2 text--darken-2",attrs:{name:"logout"},on:{click:function(t){return t.preventDefault(),e.logout.apply(null,arguments)}}},[e._v(" logout ")]):e._e()],1)},h=[],m=n("5530"),f=n("2f62"),d={name:"Navbar",created:function(){this.dispatchToken()},computed:Object(m["a"])(Object(m["a"])({},Object(f["b"])(["remitAuthState"])),Object(f["c"])(["isAuthorized"])),methods:{dispatchToken:function(){localStorage.getItem("authenticationToken")?this.$store.dispatch("remitAuthState",!0):(localStorage.clear(),this.$store.dispatch("remitAuthState",!1))},logout:function(){localStorage.getItem("authenticationToken")&&(localStorage.clear(),this.$store.dispatch("remitAuthState",!1),this.$store.dispatch("saveUser",""),this.$router.push({name:"Login"}))}}},p=d,b=(n("d8b7"),n("2877")),v=n("6544"),g=n.n(v),k=n("40dc"),S=n("8336"),y=n("132d"),_=n("8860"),A=n("da13"),T=n("e449"),x=n("2fa4"),w=n("71a3"),E=n("fe57"),O=Object(b["a"])(p,l,h,!1,null,null,null),j=O.exports;g()(O,{VAppBar:k["a"],VBtn:S["a"],VIcon:y["a"],VList:_["a"],VListItem:A["a"],VMenu:T["a"],VSpacer:x["a"],VTab:w["a"],VTabs:E["a"]});var P={name:"App",components:{Navbar:j}},R=P,C=(n("5c0b"),n("7496")),I=Object(b["a"])(R,i,s,!1,null,null,null),L=I.exports;g()(I,{VApp:C["a"]});var q=n("1da1"),N=(n("96cf"),n("3ca3"),n("ddb0"),n("8c4f")),U=n("53ca");n("b64b"),n("498a");r["a"].use(f["a"]);var z=new f["a"].Store({state:{authState:!1,currentRoom:{},user:{}},getters:{getCurrentRoom:function(e){return e.currentRoom},getUserInfo:function(e){return e.user},isAuthorized:function(e){return e.authState}},mutations:{SET_INITIAL_STATE:function(e){e.authState=!1,e.currentRoom={},e.user={}},SET_AUTH_STATE:function(e,t){e.authState=t},SET_CURRENT_ROOM:function(e,t){e.currentRoom=t},SET_USER:function(e,t){e.user=t}},actions:{remitAuthState:function(e,t){e.commit("SET_AUTH_STATE",t)},resetState:function(e){e.commit("SET_INITIAL_STATE")},saveCurrentRoom:function(e,t){e.commit("SET_CURRENT_ROOM",t)},saveUser:function(e,t){e.commit("SET_USER",t)}}});function V(e){return"undefined"===typeof e||null===e||"object"===Object(U["a"])(e)&&0===Object.keys(e).length||"string"===typeof e&&0===e.trim().length}var M=function(){var e=Object(q["a"])(regeneratorRuntime.mark((function e(t){var n;return regeneratorRuntime.wrap((function(e){while(1)switch(e.prev=e.next){case 0:if(!localStorage.getItem("authenticationToken")){e.next=16;break}if(!V(z.getters.getUserData)){e.next=13;break}return e.next=4,o.a.get("https://gemverse.herokuapp.com/api/user/logged");case 4:if(n=e.sent,!n.data.data){e.next=11;break}return e.next=8,z.dispatch("remitAuthState",!0);case 8:return e.next=10,z.dispatch("saveUser",n.data.data);case 10:t();case 11:e.next=14;break;case 13:t();case 14:e.next=17;break;case 16:t();case 17:case"end":return e.stop()}}),e)})));return function(t){return e.apply(this,arguments)}}();r["a"].use(N["a"]);var $=[{path:"/",name:"Home",component:function(){return Promise.all([n.e("chunk-3b892205"),n.e("chunk-37681ca9")]).then(n.bind(null,"bb51"))},meta:{requiresAuth:!1}},{path:"/about",name:"About",component:function(){return Promise.all([n.e("chunk-3b892205"),n.e("chunk-0b927500")]).then(n.bind(null,"f820"))},meta:{requiresAuth:!1}},{path:"/register",name:"Register",component:function(){return Promise.all([n.e("chunk-3b892205"),n.e("chunk-7cf8fd17"),n.e("chunk-59170842")]).then(n.bind(null,"271f"))},meta:{requiresAuth:!1}},{path:"/login",name:"Login",component:function(){return Promise.all([n.e("chunk-3b892205"),n.e("chunk-7cf8fd17"),n.e("chunk-7277fdb0")]).then(n.bind(null,"4b2f"))},props:!0,meta:{requiresAuth:!1}},{path:"/roomlist",name:"RoomList",component:function(){return Promise.all([n.e("chunk-3b892205"),n.e("chunk-7cf8fd17"),n.e("chunk-114b7fb6"),n.e("chunk-98dc7a8c")]).then(n.bind(null,"f25e"))},meta:{requiresAuth:!0}},{path:"/room/:slug",name:"Room",component:function(){return Promise.all([n.e("chunk-3b892205"),n.e("chunk-7cf8fd17"),n.e("chunk-114b7fb6"),n.e("chunk-060ab832")]).then(n.bind(null,"2391"))},meta:{requiresAuth:!0}},{path:"/profile",name:"Profile",component:function(){return Promise.all([n.e("chunk-3b892205"),n.e("chunk-c9bb4d56")]).then(n.bind(null,"5c5b"))},meta:{requiresAuth:!0}},{path:"*",component:function(){return Promise.all([n.e("chunk-3b892205"),n.e("chunk-07bee420")]).then(n.bind(null,"7b00"))},meta:{requiresAuth:!1}}],B=new N["a"]({mode:"history",routes:$});B.beforeEach(function(){var e=Object(q["a"])(regeneratorRuntime.mark((function e(t,n,r){return regeneratorRuntime.wrap((function(e){while(1)switch(e.prev=e.next){case 0:return e.next=2,M(r);case 2:t.meta.requiresAuth?null===localStorage.getItem("authenticationToken")?(localStorage.clear(),B.push({name:"Login",params:{message:"Please login to proceed"}})):r():(t.meta.requiresAuth||V(t.meta)||localStorage.getItem("authenticationToken"),r()),r();case 4:case"end":return e.stop()}}),e)})));return function(t,n,r){return e.apply(this,arguments)}}());var D=B,H=(n("d1e78"),n("f309"));r["a"].use(H["a"]);var F=new H["a"]({icons:{iconfont:"md"},theme:{themes:{light:{primary:"#64B5F6",secondary:"#EF5350"}}}}),J=F,K=n("c841");r["a"].use(c.a),r["a"].config.productionTip=!1,localStorage.authenticationToken?Object(K["a"])(localStorage.authenticationToken):Object(K["a"])(null),o.a.interceptors.request.use((function(e){return e}),(function(e){return Promise.reject(e)})),o.a.interceptors.response.use((function(e){return e}),(function(e){return 401===e.response.status&&(localStorage.removeItem("authenticationToken"),z.dispatch("remitAuthState",!1),D.push({name:"Login",params:{message:"Session expired, please login again"}})),Promise.reject(e)})),new r["a"]({router:D,store:z,vuetify:J,render:function(e){return e(L)}}).$mount("#app")},"5c0b":function(e,t,n){"use strict";n("c58b")},c58b:function(e,t,n){},c841:function(e,t,n){"use strict";var r=n("bc3a"),a=n.n(r),o=function(e){e?a.a.defaults.headers.common.Authorization=e:delete a.a.defaults.headers.common.Authorization};t["a"]=o},d8b7:function(e,t,n){"use strict";n("1363")}});
//# sourceMappingURL=app.4819758e.js.map