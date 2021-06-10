(window["webpackJsonp"]=window["webpackJsonp"]||[]).push([["chunk-59170842"],{"271f":function(e,t,a){"use strict";a.r(t);var r=function(){var e=this,t=e.$createElement,a=e._self._c||t;return a("v-container",{staticClass:"mt-12"},[a("v-card",{staticClass:"mt-12 mx-auto",attrs:{"max-width":"500px"}},[a("v-card-title",[a("span",{staticClass:"headline grey--text text--darken-2"},[e._v("Create account")])]),a("v-card-text",[a("v-container",[a("v-form",{ref:"form",model:{value:e.isFormValid,callback:function(t){e.isFormValid=t},expression:"isFormValid"}},[a("v-row",{staticClass:"mb-2"},[a("v-col",{attrs:{cols:"12"}},[a("v-text-field",{ref:"username",attrs:{autofocus:"",counter:15,"error-messages":e.usernameError,label:"Username",name:"username",required:"",rules:e.generalRules.concat(e.usernameRules)},on:{keyup:[function(t){e.usernameError=""},function(t){return!t.type.indexOf("key")&&e._k(t.keyCode,"enter",13,t.key,"Enter")?null:e.formValidation.apply(null,arguments)}]},model:{value:e.username,callback:function(t){e.username="string"===typeof t?t.trim():t},expression:"username"}})],1),a("v-col",{attrs:{cols:"12"}},[a("v-text-field",{ref:"email",attrs:{"error-messages":e.emailError,label:"E-mail address",name:"email",required:"",rules:e.generalRules.concat(e.emailRules)},on:{keyup:[function(t){e.emailError=""},function(t){return!t.type.indexOf("key")&&e._k(t.keyCode,"enter",13,t.key,"Enter")?null:e.formValidation.apply(null,arguments)}]},model:{value:e.email,callback:function(t){e.email="string"===typeof t?t.trim():t},expression:"email"}})],1),a("v-col",{attrs:{cols:"12"}},[a("v-text-field",{attrs:{hint:"Minimum length - 6 characters",label:"Password",name:"password","persistent-hint":"",required:"",rules:e.generalRules.concat(e.passwordRules),type:"password"},on:{keyup:function(t){return!t.type.indexOf("key")&&e._k(t.keyCode,"enter",13,t.key,"Enter")?null:e.formValidation.apply(null,arguments)}},model:{value:e.password,callback:function(t){e.password="string"===typeof t?t.trim():t},expression:"password"}})],1)],1),a("p",[e._v("All fields are required and case-sensitive")])],1)],1)],1),a("v-card-actions",{staticClass:"pb-4"},[a("v-btn",{attrs:{color:"primary",name:"back",outlined:"",text:"",to:"/"}},[e._v(" back ")]),a("v-spacer"),a("v-btn",{attrs:{color:"primary",disabled:!e.isFormValid,name:"register",outlined:"",text:""},on:{click:function(t){return t.preventDefault(),e.formValidation.apply(null,arguments)}}},[e._v(" sign up ")])],1)],1),a("div",{staticClass:"mt-6 text-center"},[a("h4",{staticClass:"grey--text mx-auto mb-2 text--darken-1"},[e._v("Already have an account? Sign in")]),a("v-btn",{attrs:{color:"blue lighten-1",name:"login",outlined:"",text:"",to:"/login"}},[e._v(" sign in ")])],1)],1)},s=[],n=a("bc3a"),i=a.n(n),o=a("c841"),l={name:"Register",data:function(){return{email:"",emailError:"",errors:{},isFormValid:!1,password:"",username:"",usernameError:"",generalRules:[function(e){return!/[ ]/.test(e)||"No blank spaces allowed"},function(e){return!!e||"Required"}],emailRules:[function(e){return e.length>=8&&e.length<=128||"E-mail address must be at least 8 characters long"},function(e){var t=/^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;return t.test(e)||"Invalid e-mail"}],passwordRules:[function(e){return e.length>=6&&e.length<=128||"Password must be at least 6 characters long"}],usernameRules:[function(e){return e.length>=3&&e.length<=15||"Characters range: 3 - 15"}]}},methods:{createUser:function(){var e=this;i.a.post("https://gemverse.herokuapp.com/api/authentication/register",{email:this.email,password:this.password,username:this.username}).then((function(t){localStorage.setItem("authenticationToken",t.data.token),Object(o["a"])(t.data.token),e.dispatchToken(),e.$store.dispatch("saveUser",t.data.user),201===t.status&&e.$router.push({name:"RoomList"})})).catch((function(t){t.response.data.errors.email&&(e.emailError=t.response.data.errors.email.msg),t.response.data.errors.username&&(e.usernameError=t.response.data.errors.username.msg)}))},dispatchToken:function(){localStorage.getItem("authenticationToken")?this.$store.dispatch("remitAuthState",!0):(localStorage.clear(),this.$store.dispatch("remitAuthState",!1))},formValidation:function(){this.isFormValid&&this.createUser()}}},c=l,u=a("2877"),d=a("6544"),m=a.n(d),p=a("8336"),h=a("b0af"),f=a("99d9"),v=a("62ad"),g=a("a523"),b=a("4bd4"),k=a("0fd9"),y=a("2fa4"),x=a("8654"),w=Object(u["a"])(c,r,s,!1,null,null,null);t["default"]=w.exports;m()(w,{VBtn:p["a"],VCard:h["a"],VCardActions:f["a"],VCardText:f["b"],VCardTitle:f["c"],VCol:v["a"],VContainer:g["a"],VForm:b["a"],VRow:k["a"],VSpacer:y["a"],VTextField:x["a"]})},"615b":function(e,t,a){},"99d9":function(e,t,a){"use strict";a.d(t,"a",(function(){return n})),a.d(t,"b",(function(){return o})),a.d(t,"c",(function(){return l}));var r=a("b0af"),s=a("80d2"),n=Object(s["g"])("v-card__actions"),i=Object(s["g"])("v-card__subtitle"),o=Object(s["g"])("v-card__text"),l=Object(s["g"])("v-card__title");r["a"]},b0af:function(e,t,a){"use strict";var r=a("5530"),s=(a("a9e3"),a("0481"),a("615b"),a("10d2")),n=a("297c"),i=a("1c87"),o=a("58df");t["a"]=Object(o["a"])(n["a"],i["a"],s["a"]).extend({name:"v-card",props:{flat:Boolean,hover:Boolean,img:String,link:Boolean,loaderHeight:{type:[Number,String],default:4},raised:Boolean},computed:{classes:function(){return Object(r["a"])(Object(r["a"])({"v-card":!0},i["a"].options.computed.classes.call(this)),{},{"v-card--flat":this.flat,"v-card--hover":this.hover,"v-card--link":this.isClickable,"v-card--loading":this.loading,"v-card--disabled":this.disabled,"v-card--raised":this.raised},s["a"].options.computed.classes.call(this))},styles:function(){var e=Object(r["a"])({},s["a"].options.computed.styles.call(this));return this.img&&(e.background='url("'.concat(this.img,'") center center / cover no-repeat')),e}},methods:{genProgress:function(){var e=n["a"].options.methods.genProgress.call(this);return e?this.$createElement("div",{staticClass:"v-card__progress",key:"progress"},[e]):null}},render:function(e){var t=this.generateRouteLink(),a=t.tag,r=t.data;return r.style=this.styles,this.isClickable&&(r.attrs=r.attrs||{},r.attrs.tabindex=0),e(a,this.setBackgroundColor(this.color,r),[this.genProgress(),this.$slots.default])}})}}]);
//# sourceMappingURL=chunk-59170842.9e27b64a.js.map