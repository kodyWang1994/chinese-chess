webpackJsonp([1],{NHnr:function(e,i,t){"use strict";Object.defineProperty(i,"__esModule",{value:!0});var n=t("7+uW"),s={name:"App",created:function(){this.resize(),document.body.onresize=this.resize},methods:{resize:function(){var e=document.body.clientWidth/750*100;e>100?e=100:e<32&&(e=32),document.querySelector("html").style.fontSize=e+"px"}}},r={render:function(){var e=this.$createElement,i=this._self._c||e;return i("div",{attrs:{id:"app"}},[i("router-view")],1)},staticRenderFns:[]};var a=t("VU/8")(s,r,!1,function(e){t("wec9")},null,null).exports,o=t("/ocq"),c=t("BO1k"),h=t.n(c),u=t("Gu7T"),p=t.n(u),l=t("Zrlr"),f=t.n(l),v=t("wxAW"),d=t.n(v),m=function e(i,t,n){f()(this,e),this.name=i,this.position=t,this.camp=n||0,this.died=0};m.prototype.moveTo=function(e){this.position=e};var g=m,k=new(function(){function e(){f()(this,e),this.initBlankMap=function(){for(var e=[],i=1;i<=9;i++)for(var t=10;t>0;t--)e.push(new g("",[i,t],0));return e},this.initRedPieces=function(){return[new g("j1",[1,1],1),new g("j2",[9,1],1),new g("p1",[2,3],1),new g("p2",[8,3],1),new g("m1",[2,1],1),new g("m2",[8,1],1),new g("x1",[3,1],1),new g("x2",[7,1],1),new g("s1",[4,1],1),new g("s2",[6,1],1),new g("z1",[1,4],1),new g("z2",[3,4],1),new g("z3",[5,4],1),new g("z4",[7,4],1),new g("z5",[9,4],1),new g("k",[5,1],1)]},this.initBlackPieces=function(){return[new g("j1",[1,10],-1),new g("j2",[9,10],-1),new g("p1",[2,8],-1),new g("p2",[8,8],-1),new g("m1",[2,10],-1),new g("m2",[8,10],-1),new g("x1",[3,10],-1),new g("x2",[7,10],-1),new g("s1",[4,10],-1),new g("s2",[6,10],-1),new g("z1",[1,7],-1),new g("z2",[3,7],-1),new g("z3",[5,7],-1),new g("z4",[7,7],-1),new g("z5",[9,7],-1),new g("k",[5,10],-1)]},console.log("constructor"),this.blankMap=[],this.redPieces=[],this.blackPieces=[]}return d()(e,[{key:"initGame",value:function(){console.log("init"),this.blankMap=this.initBlankMap(),this.redPieces=this.initRedPieces(),this.blackPieces=this.initBlackPieces()}},{key:"getBlankMap",value:function(){return this.blankMap}},{key:"getRedPieces",value:function(){return this.redPieces}},{key:"getBlackPieces",value:function(){return this.blackPieces}},{key:"getAllPieces",value:function(){return[].concat(p()(this.redPieces),p()(this.blackPieces))}}]),e}()),P=t("44pt"),w=function(e){var i=e.position,t=i[0],n=i[1],s=[];return 1===e.camp?n<=5?s.push([t,n+1]):(10!==n&&s.push([t,n+1]),1!==t&&s.push([t-1,n]),9!==t&&s.push([t+1,n])):n>5?s.push([t,n-1]):(1!==n&&s.push([t,n-1]),1!==t&&s.push([t-1,n]),9!==t&&s.push([t+1,n])),s},x=function(e){var i=e.position,t=i[0],n=i[1],s=[];return 1===e.camp?(4!==t&&(1!==n&&s.push([t-1,n-1]),3!==n&&s.push([t-1,n+1])),6!==t&&(1!==n&&s.push([t+1,n-1]),3!==n&&s.push([t+1,n+1]))):(4!==t&&(8!==n&&s.push([t-1,n-1]),10!==n&&s.push([t-1,n+1])),6!==t&&(8!==n&&s.push([t+1,n-1]),10!==n&&s.push([t+1,n+1]))),s},b=function(e){var i=e.position,t=i[0],n=i[1],s=[];return 1===e.camp?(3!==n&&s.push([t,n+1]),1!==n&&s.push([t,n-1]),4!==t&&s.push([t-1,n]),6!==t&&s.push([t+1,n])):(10!==n&&s.push([t,n+1]),8!==n&&s.push([t,n-1]),4!==t&&s.push([t-1,n]),6!==t&&s.push([t+1,n])),s},y=function(e){var i=e.position,t=i[0],n=i[1],s=[],r=_();return 1===e.camp?(1!==t&&(1!==n&&r.indexOf([t-1,n-1].toString())<0&&s.push([t-2,n-2]),5!==n&&r.indexOf([t-1,n+1].toString())<0&&s.push([t-2,n+2])),9!==t&&(1!==n&&r.indexOf([t+1,n-1].toString())<0&&s.push([t+2,n-2]),5!==n&&r.indexOf([t+1,n+1].toString())<0&&s.push([t+2,n+2]))):(1!==t&&(6!==n&&r.indexOf([t-1,n-1].toString())<0&&s.push([t-2,n-2]),10!==n&&r.indexOf([t-1,n+1].toString())<0&&s.push([t-2,n+2])),9!==t&&(6!==n&&r.indexOf([t+1,n-1].toString())<0&&s.push([t+2,n-2]),10!==n&&r.indexOf([t+1,n+1].toString())<0&&s.push([t+2,n+2]))),s},S=function(e){var i=e.position,t=i[0],n=i[1],s=[],r=_(),a=k.getAllPieces();if(9!==t)for(var o=t+1;o<=9;o++){var c=r.indexOf([o,n].toString());if(c>-1){a[c].camp!==e.camp&&s.push([o,n]);break}s.push([o,n])}if(1!==t)for(var h=t-1;h>=1;h--){var u=r.indexOf([h,n].toString());if(u>-1){a[u].camp!==e.camp&&s.push([h,n]);break}s.push([h,n])}if(10!==n)for(var p=n+1;p<=10;p++){var l=r.indexOf([t,p].toString());if(l>-1){a[l].camp!==e.camp&&s.push([t,p]);break}s.push([t,p])}if(1!==n)for(var f=n-1;f>=1;f--){var v=r.indexOf([t,f].toString());if(v>-1){a[v].camp!==e.camp&&s.push([t,f]);break}s.push([t,f])}return s},O=function(e){var i=e.position,t=i[0],n=i[1],s=[],r=_();return 1!==t&&(n>2&&r.indexOf([t,n-1].toString())<0&&s.push([t-1,n-2]),n<9&&r.indexOf([t,n+1].toString())<0&&s.push([t-1,n+2])),9!==t&&(n>2&&r.indexOf([t,n-1].toString())<0&&s.push([t+1,n-2]),n<9&&r.indexOf([t,n+1].toString())<0&&s.push([t+1,n+2])),1!==n&&(t>2&&r.indexOf([t-1,n].toString())<0&&s.push([t-2,n-1]),t<8&&r.indexOf([t+1,n].toString())<0&&s.push([t+2,n-1])),9!==n&&(t>2&&r.indexOf([t-1,n].toString())<0&&s.push([t-2,n+1]),t<8&&r.indexOf([t+1,n].toString())<0&&s.push([t+2,n+1])),s},C=function(e){var i=e.position,t=i[0],n=i[1],s=[],r=_(),a=k.getAllPieces();if(9!==t)for(var o=!1,c=t+1;c<=9;c++){var h=r.indexOf([c,n].toString());if(o){if(h>-1){a[h].camp!==e.camp&&s.push([c,n]);break}}else{if(h>-1){o=!0;continue}s.push([c,n])}}if(1!==t)for(var u=!1,p=t-1;p>=1;p--){var l=r.indexOf([p,n].toString());if(u){if(l>-1){a[l].camp!==e.camp&&s.push([p,n]);break}}else{if(l>-1){u=!0;continue}s.push([p,n])}}if(10!==n)for(var f=!1,v=n+1;v<=10;v++){var d=r.indexOf([t,v].toString());if(f){if(d>-1){a[d].camp!==e.camp&&s.push([t,v]);break}}else{if(d>-1){f=!0;continue}s.push([t,v])}}if(1!==n)for(var m=!1,g=n-1;g>=1;g--){var P=r.indexOf([t,g].toString());if(m){if(P>-1){a[P].camp!==e.camp&&s.push([t,g]);break}}else{if(P>-1){m=!0;continue}s.push([t,g])}}return s},_=function(){var e=k.getAllPieces(),i=P.a.pluck(e,"position"),t=[],n=!0,s=!1,r=void 0;try{for(var a,o=h()(i);!(n=(a=o.next()).done);n=!0){var c=a.value;t.push(c.toString())}}catch(e){s=!0,r=e}finally{try{!n&&o.return&&o.return()}finally{if(s)throw r}}return console.log(t),t},M=function(e){var i,t=(i=e.name,console.log("getRuleTypeByName",i),i.length>1?i.substring(0,1):i);console.log(e,t);var n=[];switch(t){case"z":n=w(e);break;case"s":n=x(e);break;case"k":n=b(e);break;case"j":n=S(e);break;case"p":n=C(e);break;case"x":n=y(e);break;case"m":n=O(e)}return n},z=function(e,i,t){if(console.log(e,i,t),!t||t.length<1)return!1;var n=i.position.toString(),s=!0,r=!1,a=void 0;try{for(var o,c=h()(t);!(s=(o=c.next()).done);s=!0)if(o.value.toString()===n)return!0}catch(e){r=!0,a=e}finally{try{!s&&c.return&&c.return()}finally{if(r)throw a}}return!1},L={data:function(){return{nextCamp:1,winCamp:0,over:!1,blankMap:[],redPieces:[],blackPieces:[],needMovePiece:null,highLightPoint:[]}},created:function(){this.begin()},methods:{begin:function(){this.nextCamp=this.winCamp?-this.winCamp:1,this.winCamp=0,this.over=!1,k.initGame(),this.blankMap=k.getBlankMap(),this.blackPieces=k.getBlackPieces(),this.redPieces=k.getRedPieces()},moreGame:function(){window.location.href="https://kodywang1994.github.io/game-box/dist/index.html#/"},gameOver:function(e){this.camp=e,this.over=!0},clickPiece:function(e){this.needMovePiece&&this.needMovePiece.camp!==e.camp?(this.moveToAnim(this.needMovePiece,e),this.needMovePiece=null,this.highLightPoint=[]):e.camp&&e.camp===this.nextCamp&&(this.needMovePiece=e,this.highLightPoint=M(this.needMovePiece),console.log(this.highLightPoint))},moveToAnim:function(e,i){z(e,i,this.highLightPoint)&&(i.camp&&i.camp!==e.camp&&this.removePiece(i),e.moveTo(i.position),this.nextCamp=-this.nextCamp,this.needMovePiece=null,this.highLightPoint=[])},removePiece:function(e){if("k"===e.name&&this.gameOver(-e.camp),1===e.camp){var i=this.getPieceIndexByName(this.redPieces,e);this.redPieces.splice(i,1)}else{var t=this.getPieceIndexByName(this.blackPieces,e);this.blackPieces.splice(t,1)}},getPieceIndexByName:function(e,i){for(var t in e)if(e[t].name===i.name)return t},handlePosition:function(e){var i=e[0],t=e[1];return"left:"+(i=.68*(i-1)-.34)+"rem;bottom:"+(t=.68*(t-1)-.34)+"rem;"},handleHighLight:function(e){var i=e.position.toString(),t=!0,n=!1,s=void 0;try{for(var r,a=h()(this.highLightPoint);!(t=(r=a.next()).done);t=!0){if(r.value.toString()===i)return this.needMovePiece&&e.camp===this.needMovePiece.camp?(console.log(),this.removeHighLightItem(e),""):"active"}}catch(e){n=!0,s=e}finally{try{!t&&a.return&&a.return()}finally{if(n)throw s}}},removeHighLightItem:function(e){var i=[],t=!0,n=!1,s=void 0;try{for(var r,a=h()(this.highLightPoint);!(t=(r=a.next()).done);t=!0){var o=r.value;i.push(o.toString())}}catch(e){n=!0,s=e}finally{try{!t&&a.return&&a.return()}finally{if(n)throw s}}var c=i.indexOf(e.position.toString());c>-1&&this.highLightPoint.splice(c,1)}}},B={render:function(){var e=this,i=e.$createElement,t=e._self._c||i;return t("div",[t("div",{staticClass:"status",class:e.nextCamp>0?"red":""},[e._v(e._s(e.nextCamp>0?"红旗":"黑棋"))]),e._v(" "),t("div",{staticClass:"board"},[t("div",{staticClass:"board-wrap"},[e._l(e.blankMap,function(i,n){return t("div",{key:"black"+n,staticClass:"piece blank-item",class:e.handleHighLight(i),style:e.handlePosition(i.position),on:{click:function(t){return e.clickPiece(i)}}})}),e._v(" "),e._l(e.blackPieces,function(i){return t("div",{key:"black"+i.name,staticClass:"piece",class:["black-"+i.name,e.handleHighLight(i)],style:e.handlePosition(i.position),on:{click:function(t){return e.clickPiece(i)}}})}),e._v(" "),e._l(e.redPieces,function(i){return t("div",{key:"red"+i.name,staticClass:"piece",class:["red-"+i.name,e.handleHighLight(i)],style:e.handlePosition(i.position),on:{click:function(t){return e.clickPiece(i)}}})})],2)]),e._v(" "),e.over?t("div",{staticClass:"success-panel"},[t("div",{staticClass:"success-title"},[e._v(e._s(e.winCamp>0?"红棋":"黑棋")+"赢了！")]),e._v(" "),t("div",{staticClass:"restart",on:{click:e.begin}},[e._v("再来一局")]),e._v(" "),t("div",{staticClass:"restart back",on:{click:e.moreGame}},[e._v("更多游戏")])]):e._e()])},staticRenderFns:[]};var A=t("VU/8")(L,B,!1,function(e){t("r4rb")},"data-v-3b891ee8",null).exports;n.a.use(o.a);var H=new o.a({routes:[{path:"/",name:"Index",component:A}]});n.a.config.productionTip=!1,new n.a({el:"#app",router:H,components:{App:a},template:"<App/>"})},r4rb:function(e,i){},wec9:function(e,i){}},["NHnr"]);
//# sourceMappingURL=app.c81c10ef050c4b8310a3.js.map