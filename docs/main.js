(()=>{var t={441:(t,e,n)=>{const r=function(){this.listen()};(r.prototype={listeners:["mousemove","mousedown","mouseup","mouseleave","touchstart","touchmove","touchend","touchcancel"],eventQueue:[],depth:1,preventDefault:!0,mono:!0,buffer:{},rejectedBuffer:[],touchStartTime:0,target:document,debounce:!0,customEvent:{enabled:!0,name:"touch-pickup"},classes:{allow:"allowDefault",prevent:"preventDefault"},actions:{default:{touch:(t,e,n)=>{},hover:(t,e,n)=>{},drag:(t,e,n)=>{},leave:(t,e,n)=>{},enter:(t,e,n)=>{},start:(t,e,n)=>{},end:(t,e,n)=>{}},".allowDefault":{start:function(){window.currentPreventDefault=!1},hover:function(){window.currentPreventDefault=!1},move:function(){window.currentPreventDefault=!1},drag:function(){window.currentPreventDefault=!1},leave:function(){window.currentPreventDefault=!1},enter:function(){window.currentPreventDefault=!1},end:function(){window.currentPreventDefault=!1}},".preventDefault":{touch:function(t,e,n){e.preventDefault()},hover:function(t,e,n){e.preventDefault()},move:function(){window.currentPreventDefault=!1},drag:function(t,e,n){e.preventDefault()},leave:function(t,e,n){e.preventDefault()},enter:function(t,e,n){e.preventDefault()},end:function(){window.currentPreventDefault=!1}}}}).constructor=r,["getListOfElements","matchActions","handleEvent","listen","unlisten","processElement","setDefaultAction","setAction","setActionsAsDictionary","assignAllowDefault","addStyles"].forEach((t=>r.prototype[t]=n(905)(`./${t}`))),t.exports=r},762:t=>{t.exports=function(){return this.stylesheet=document.createElement("style"),this.stylesheet.innerHTML=`.${this.classes.detect}{\n        pointer-events:auto;\n        touch-action:none;\n    }\n        \n.\n    ${this.classes.ignore}{\n        pointer-events:none;\n        touch-action:none;\n    }`,document.querySelector("head").appendChild(this.stylesheet),this}},562:t=>{t.exports=function(t={},e="add"){return t.querySelectorAll("*").forEach((t=>{t.classList[e](this.classes.allow)})),this}},841:t=>{t.exports=function(t,e,n=document){let r=n.elementsFromPoint(t,e);return r=Array.from(r).filter((t=>this.matchActions(t))),r=r.slice(0,this.depth),r}},378:(t,e,n)=>{const r=n(671).j8;t.exports=function(t){this.mono=!1,window.currentPreventDefault=this.preventDefault;let e=t;t.type.includes("mouse")&&("mousedown"==t.type?t={type:"touchstart",changedTouches:[{identifier:"mouse",clientX:t.clientX,clientY:t.clientY,preventDefault:function(t){t.preventDefault()}.bind(t)}]}:"mousemove"==t.type&&t.buttons>0?t={type:"touchmove",touches:[{identifier:"mouse",clientX:t.clientX,clientY:t.clientY,preventDefault:function(t){t.preventDefault()}.bind(t)}]}:"mouseup"==t.type&&(t={type:"touchend",changedTouches:[{identifier:"mouse",clientX:t.clientX,clientY:t.clientY,preventDefault:function(t){t.preventDefault()}.bind(t)}]})),"touchstart"==t.type?(0==Object.keys(this.buffer).length&&(this.touchStartTime=Date.now()),Array.from(t.changedTouches).forEach((e=>{this.buffer[e.identifier]={elements:{},history:{}},this.getListOfElements(e.clientX,e.clientY).slice(0,this.depth).forEach(((n,r)=>{this.processElement(n,e.identifier,r,"start",t,e)}))}))):"touchmove"==t.type?Array.from(t.touches).forEach((e=>{let n=[];this.getListOfElements(e.clientX,e.clientY).slice(0,this.depth).forEach(((r,o)=>{this.processElement(r,e.identifier,o,"move",t,e)&&n.push(r.id)})),Object.keys(this.buffer).length>0&&Object.entries(this.buffer[e.identifier].elements).forEach((([r,o],i)=>{n.includes(r)||(this.buffer[e.identifier].history[r]=this.buffer[e.identifier].elements[r],this.processElement(o.query,e.identifier,i,"leave",t,e,r),delete this.buffer[e.identifier].elements[r])}))})):"touchend"==t.type&&Array.from(t.changedTouches).forEach((e=>{Object.entries(this.buffer[e.identifier].elements).forEach((([n,r],o)=>{this.processElement(r.query,e.identifier,o,"end",t,e,n)})),delete this.buffer[e.identifier]})),this.eventQueue.forEach((([t,e,n,o,i])=>{"function"==typeof this.actions[t][e]&&this.actions[t][e](n,o,i),this.customEvent.enabled&&r(this.customEvent.name,i)})),this.eventQueue=[],window.currentPreventDefault&&e.preventDefault()}},447:t=>{t.exports=function(t=document){for(let e of this.listeners)t.addEventListener(e,this,!1);return console.log(`multitouch mapper listening on ${t==document?"document":t.id}...`),this}},796:t=>{t.exports=function(t){let e=!1;return Object.keys(this.actions).forEach(((n,r)=>{"object"==typeof t?t.matches(n)&&(e=!0):"string"==typeof t&&t==n&&(e=!0)})),e}},384:t=>{t.exports=function(t,e,n,r,o,i,s){let a=!1;return Object.entries(this.actions).forEach((([n,u],c)=>{let l=!1;if("object"==typeof t?(l=t.matches(n),s=t.id):"string"==typeof t&&(l=t==n,t=document.querySelector(`#${s}`)),l){let u=this.buffer[e].elements;const c=t.getBoundingClientRect();Object.keys(u).includes(s)?"move"==r?(u[s].type="move",u[s].query=n,u[s].delta.x=i.clientX-u[s].x,u[s].delta.y=i.clientY-u[s].y,u[s].path.x.push(i.clientX),u[s].path.y.push(i.clientY),u[s].x=i.clientX,u[s].y=i.clientY,u[s].relative.x=i.clientX-c.left,u[s].relative.y=c.bottom-i.clientY,u[s].distance.x=i.clientX-u[s].origin.x,u[s].distance.y=i.clientY-u[s].origin.y,u[s].iterations+=1):"end"==r?u[s].type="end":"leave"==r&&(u[s].type="leave"):u[s]={id:s,element:t,time:Date.now(),type:"start"==r?"start":"enter",x:i.clientX,y:i.clientY,query:n,iterations:0,rect:{original:c,current:c},origin:{x:i.clientX,y:i.clientY},relative:{x:i.clientX-c.left,y:c.bottom-i.clientY,range:{x:c.width,y:c.height}},distance:{x:0,y:0},path:{x:[i.clientX],y:[i.clientY]},delta:{x:0,y:0}},this.eventQueue.push([n,u[s].type,t,o,u[s]]),a=!0}})),a}},807:t=>{t.exports=function(t,e,n){return Object.keys(this.actions).includes(t)||(this.actions[t]={}),Object.assign(this.actions[t],{start:function(t,e,n){},enter:function(t,e,n){},move:function(t,e,n){},leave:function(t,e,n){},end:function(t,e,n){}}),"object"==typeof e?this.setActionsAsDictionary(t,e):"string"==typeof e&&("all"==e?Object.keys(this.actions[t]).forEach((e=>{this.actions[t][e]=n.bind(this)})):this.actions[t][e]=n.bind(this)),this}},21:t=>{t.exports=function(t,e={}){return Object.entries(e).forEach((([e,n])=>{this.actions[t][e]=n})),this}},838:t=>{t.exports=function(t){return this.setAction("default","all",t),this}},411:t=>{t.exports=function(t=document){for(let e of this.listeners)t.removeEventListener(e,this);return console.log(`removed multitouch mapper listener on ${t==document?"document":t.id}...`),this}},905:(t,e,n)=>{var r={"./addStyles":762,"./addStyles.js":762,"./assignAllowDefault":562,"./assignAllowDefault.js":562,"./getListOfElements":841,"./getListOfElements.js":841,"./handleEvent":378,"./handleEvent.js":378,"./listen":447,"./listen.js":447,"./matchActions":796,"./matchActions.js":796,"./processElement":384,"./processElement.js":384,"./setAction":807,"./setAction.js":807,"./setActionsAsDictionary":21,"./setActionsAsDictionary.js":21,"./setDefaultAction":838,"./setDefaultAction.js":838,"./unlisten":411,"./unlisten.js":411};function o(t){var e=i(t);return n(e)}function i(t){if(!n.o(r,t)){var e=new Error("Cannot find module '"+t+"'");throw e.code="MODULE_NOT_FOUND",e}return r[t]}o.keys=function(){return Object.keys(r)},o.resolve=i,t.exports=o,o.id=905},304:(t,e,n)=>{function r(t){this.mode=i.MODE_8BIT_BYTE,this.data=t,this.parsedData=[];for(var e=0,n=this.data.length;e<n;e++){var r=[],o=this.data.charCodeAt(e);o>65536?(r[0]=240|(1835008&o)>>>18,r[1]=128|(258048&o)>>>12,r[2]=128|(4032&o)>>>6,r[3]=128|63&o):o>2048?(r[0]=224|(61440&o)>>>12,r[1]=128|(4032&o)>>>6,r[2]=128|63&o):o>128?(r[0]=192|(1984&o)>>>6,r[1]=128|63&o):r[0]=o,this.parsedData.push(r)}this.parsedData=Array.prototype.concat.apply([],this.parsedData),this.parsedData.length!=this.data.length&&(this.parsedData.unshift(191),this.parsedData.unshift(187),this.parsedData.unshift(239))}function o(t,e){this.typeNumber=t,this.errorCorrectLevel=e,this.modules=null,this.moduleCount=0,this.dataCache=null,this.dataList=[]}r.prototype={getLength:function(t){return this.parsedData.length},write:function(t){for(var e=0,n=this.parsedData.length;e<n;e++)t.put(this.parsedData[e],8)}},o.prototype={addData:function(t){var e=new r(t);this.dataList.push(e),this.dataCache=null},isDark:function(t,e){if(t<0||this.moduleCount<=t||e<0||this.moduleCount<=e)throw new Error(t+","+e);return this.modules[t][e]},getModuleCount:function(){return this.moduleCount},make:function(){this.makeImpl(!1,this.getBestMaskPattern())},makeImpl:function(t,e){this.moduleCount=4*this.typeNumber+17,this.modules=new Array(this.moduleCount);for(var n=0;n<this.moduleCount;n++){this.modules[n]=new Array(this.moduleCount);for(var r=0;r<this.moduleCount;r++)this.modules[n][r]=null}this.setupPositionProbePattern(0,0),this.setupPositionProbePattern(this.moduleCount-7,0),this.setupPositionProbePattern(0,this.moduleCount-7),this.setupPositionAdjustPattern(),this.setupTimingPattern(),this.setupTypeInfo(t,e),this.typeNumber>=7&&this.setupTypeNumber(t),null==this.dataCache&&(this.dataCache=o.createData(this.typeNumber,this.errorCorrectLevel,this.dataList)),this.mapData(this.dataCache,e)},setupPositionProbePattern:function(t,e){for(var n=-1;n<=7;n++)if(!(t+n<=-1||this.moduleCount<=t+n))for(var r=-1;r<=7;r++)e+r<=-1||this.moduleCount<=e+r||(this.modules[t+n][e+r]=0<=n&&n<=6&&(0==r||6==r)||0<=r&&r<=6&&(0==n||6==n)||2<=n&&n<=4&&2<=r&&r<=4)},getBestMaskPattern:function(){for(var t=0,e=0,n=0;n<8;n++){this.makeImpl(!0,n);var r=s.getLostPoint(this);(0==n||t>r)&&(t=r,e=n)}return e},createMovieClip:function(t,e,n){var r=t.createEmptyMovieClip(e,n);this.make();for(var o=0;o<this.modules.length;o++)for(var i=1*o,s=0;s<this.modules[o].length;s++){var a=1*s;this.modules[o][s]&&(r.beginFill(0,100),r.moveTo(a,i),r.lineTo(a+1,i),r.lineTo(a+1,i+1),r.lineTo(a,i+1),r.endFill())}return r},setupTimingPattern:function(){for(var t=8;t<this.moduleCount-8;t++)null==this.modules[t][6]&&(this.modules[t][6]=t%2==0);for(var e=8;e<this.moduleCount-8;e++)null==this.modules[6][e]&&(this.modules[6][e]=e%2==0)},setupPositionAdjustPattern:function(){for(var t=s.getPatternPosition(this.typeNumber),e=0;e<t.length;e++)for(var n=0;n<t.length;n++){var r=t[e],o=t[n];if(null==this.modules[r][o])for(var i=-2;i<=2;i++)for(var a=-2;a<=2;a++)this.modules[r+i][o+a]=-2==i||2==i||-2==a||2==a||0==i&&0==a}},setupTypeNumber:function(t){for(var e=s.getBCHTypeNumber(this.typeNumber),n=0;n<18;n++){var r=!t&&1==(e>>n&1);this.modules[Math.floor(n/3)][n%3+this.moduleCount-8-3]=r}for(n=0;n<18;n++)r=!t&&1==(e>>n&1),this.modules[n%3+this.moduleCount-8-3][Math.floor(n/3)]=r},setupTypeInfo:function(t,e){for(var n=this.errorCorrectLevel<<3|e,r=s.getBCHTypeInfo(n),o=0;o<15;o++){var i=!t&&1==(r>>o&1);o<6?this.modules[o][8]=i:o<8?this.modules[o+1][8]=i:this.modules[this.moduleCount-15+o][8]=i}for(o=0;o<15;o++)i=!t&&1==(r>>o&1),o<8?this.modules[8][this.moduleCount-o-1]=i:o<9?this.modules[8][15-o-1+1]=i:this.modules[8][15-o-1]=i;this.modules[this.moduleCount-8][8]=!t},mapData:function(t,e){for(var n=-1,r=this.moduleCount-1,o=7,i=0,a=this.moduleCount-1;a>0;a-=2)for(6==a&&a--;;){for(var u=0;u<2;u++)if(null==this.modules[r][a-u]){var c=!1;i<t.length&&(c=1==(t[i]>>>o&1)),s.getMask(e,r,a-u)&&(c=!c),this.modules[r][a-u]=c,-1==--o&&(i++,o=7)}if((r+=n)<0||this.moduleCount<=r){r-=n,n=-n;break}}}},o.PAD0=236,o.PAD1=17,o.createData=function(t,e,n){for(var r=l.getRSBlocks(t,e),i=new h,a=0;a<n.length;a++){var u=n[a];i.put(u.mode,4),i.put(u.getLength(),s.getLengthInBits(u.mode,t)),u.write(i)}var c=0;for(a=0;a<r.length;a++)c+=r[a].dataCount;if(i.getLengthInBits()>8*c)throw new Error("code length overflow. ("+i.getLengthInBits()+">"+8*c+")");for(i.getLengthInBits()+4<=8*c&&i.put(0,4);i.getLengthInBits()%8!=0;)i.putBit(!1);for(;!(i.getLengthInBits()>=8*c||(i.put(o.PAD0,8),i.getLengthInBits()>=8*c));)i.put(o.PAD1,8);return o.createBytes(i,r)},o.createBytes=function(t,e){for(var n=0,r=0,o=0,i=new Array(e.length),a=new Array(e.length),u=0;u<e.length;u++){var l=e[u].dataCount,h=e[u].totalCount-l;r=Math.max(r,l),o=Math.max(o,h),i[u]=new Array(l);for(var f=0;f<i[u].length;f++)i[u][f]=255&t.buffer[f+n];n+=l;var d=s.getErrorCorrectPolynomial(h),p=new c(i[u],d.getLength()-1).mod(d);for(a[u]=new Array(d.getLength()-1),f=0;f<a[u].length;f++){var g=f+p.getLength()-a[u].length;a[u][f]=g>=0?p.get(g):0}}var m=0;for(f=0;f<e.length;f++)m+=e[f].totalCount;var v=new Array(m),y=0;for(f=0;f<r;f++)for(u=0;u<e.length;u++)f<i[u].length&&(v[y++]=i[u][f]);for(f=0;f<o;f++)for(u=0;u<e.length;u++)f<a[u].length&&(v[y++]=a[u][f]);return v};for(var i={MODE_NUMBER:1,MODE_ALPHA_NUM:2,MODE_8BIT_BYTE:4,MODE_KANJI:8},s={PATTERN_POSITION_TABLE:[[],[6,18],[6,22],[6,26],[6,30],[6,34],[6,22,38],[6,24,42],[6,26,46],[6,28,50],[6,30,54],[6,32,58],[6,34,62],[6,26,46,66],[6,26,48,70],[6,26,50,74],[6,30,54,78],[6,30,56,82],[6,30,58,86],[6,34,62,90],[6,28,50,72,94],[6,26,50,74,98],[6,30,54,78,102],[6,28,54,80,106],[6,32,58,84,110],[6,30,58,86,114],[6,34,62,90,118],[6,26,50,74,98,122],[6,30,54,78,102,126],[6,26,52,78,104,130],[6,30,56,82,108,134],[6,34,60,86,112,138],[6,30,58,86,114,142],[6,34,62,90,118,146],[6,30,54,78,102,126,150],[6,24,50,76,102,128,154],[6,28,54,80,106,132,158],[6,32,58,84,110,136,162],[6,26,54,82,110,138,166],[6,30,58,86,114,142,170]],G15:1335,G18:7973,G15_MASK:21522,getBCHTypeInfo:function(t){for(var e=t<<10;s.getBCHDigit(e)-s.getBCHDigit(s.G15)>=0;)e^=s.G15<<s.getBCHDigit(e)-s.getBCHDigit(s.G15);return(t<<10|e)^s.G15_MASK},getBCHTypeNumber:function(t){for(var e=t<<12;s.getBCHDigit(e)-s.getBCHDigit(s.G18)>=0;)e^=s.G18<<s.getBCHDigit(e)-s.getBCHDigit(s.G18);return t<<12|e},getBCHDigit:function(t){for(var e=0;0!=t;)e++,t>>>=1;return e},getPatternPosition:function(t){return s.PATTERN_POSITION_TABLE[t-1]},getMask:function(t,e,n){switch(t){case 0:return(e+n)%2==0;case 1:return e%2==0;case 2:return n%3==0;case 3:return(e+n)%3==0;case 4:return(Math.floor(e/2)+Math.floor(n/3))%2==0;case 5:return e*n%2+e*n%3==0;case 6:return(e*n%2+e*n%3)%2==0;case 7:return(e*n%3+(e+n)%2)%2==0;default:throw new Error("bad maskPattern:"+t)}},getErrorCorrectPolynomial:function(t){for(var e=new c([1],0),n=0;n<t;n++)e=e.multiply(new c([1,a.gexp(n)],0));return e},getLengthInBits:function(t,e){if(1<=e&&e<10)switch(t){case i.MODE_NUMBER:return 10;case i.MODE_ALPHA_NUM:return 9;case i.MODE_8BIT_BYTE:case i.MODE_KANJI:return 8;default:throw new Error("mode:"+t)}else if(e<27)switch(t){case i.MODE_NUMBER:return 12;case i.MODE_ALPHA_NUM:return 11;case i.MODE_8BIT_BYTE:return 16;case i.MODE_KANJI:return 10;default:throw new Error("mode:"+t)}else{if(!(e<41))throw new Error("type:"+e);switch(t){case i.MODE_NUMBER:return 14;case i.MODE_ALPHA_NUM:return 13;case i.MODE_8BIT_BYTE:return 16;case i.MODE_KANJI:return 12;default:throw new Error("mode:"+t)}}},getLostPoint:function(t){for(var e=t.getModuleCount(),n=0,r=0;r<e;r++)for(var o=0;o<e;o++){for(var i=0,s=t.isDark(r,o),a=-1;a<=1;a++)if(!(r+a<0||e<=r+a))for(var u=-1;u<=1;u++)o+u<0||e<=o+u||0==a&&0==u||s==t.isDark(r+a,o+u)&&i++;i>5&&(n+=3+i-5)}for(r=0;r<e-1;r++)for(o=0;o<e-1;o++){var c=0;t.isDark(r,o)&&c++,t.isDark(r+1,o)&&c++,t.isDark(r,o+1)&&c++,t.isDark(r+1,o+1)&&c++,0!=c&&4!=c||(n+=3)}for(r=0;r<e;r++)for(o=0;o<e-6;o++)t.isDark(r,o)&&!t.isDark(r,o+1)&&t.isDark(r,o+2)&&t.isDark(r,o+3)&&t.isDark(r,o+4)&&!t.isDark(r,o+5)&&t.isDark(r,o+6)&&(n+=40);for(o=0;o<e;o++)for(r=0;r<e-6;r++)t.isDark(r,o)&&!t.isDark(r+1,o)&&t.isDark(r+2,o)&&t.isDark(r+3,o)&&t.isDark(r+4,o)&&!t.isDark(r+5,o)&&t.isDark(r+6,o)&&(n+=40);var l=0;for(o=0;o<e;o++)for(r=0;r<e;r++)t.isDark(r,o)&&l++;return n+Math.abs(100*l/e/e-50)/5*10}},a={glog:function(t){if(t<1)throw new Error("glog("+t+")");return a.LOG_TABLE[t]},gexp:function(t){for(;t<0;)t+=255;for(;t>=256;)t-=255;return a.EXP_TABLE[t]},EXP_TABLE:new Array(256),LOG_TABLE:new Array(256)},u=0;u<8;u++)a.EXP_TABLE[u]=1<<u;for(u=8;u<256;u++)a.EXP_TABLE[u]=a.EXP_TABLE[u-4]^a.EXP_TABLE[u-5]^a.EXP_TABLE[u-6]^a.EXP_TABLE[u-8];for(u=0;u<255;u++)a.LOG_TABLE[a.EXP_TABLE[u]]=u;function c(t,e){if(null==t.length)throw new Error(t.length+"/"+e);for(var n=0;n<t.length&&0==t[n];)n++;this.num=new Array(t.length-n+e);for(var r=0;r<t.length-n;r++)this.num[r]=t[r+n]}function l(t,e){this.totalCount=t,this.dataCount=e}function h(){this.buffer=[],this.length=0}c.prototype={get:function(t){return this.num[t]},getLength:function(){return this.num.length},multiply:function(t){for(var e=new Array(this.getLength()+t.getLength()-1),n=0;n<this.getLength();n++)for(var r=0;r<t.getLength();r++)e[n+r]^=a.gexp(a.glog(this.get(n))+a.glog(t.get(r)));return new c(e,0)},mod:function(t){if(this.getLength()-t.getLength()<0)return this;for(var e=a.glog(this.get(0))-a.glog(t.get(0)),n=new Array(this.getLength()),r=0;r<this.getLength();r++)n[r]=this.get(r);for(r=0;r<t.getLength();r++)n[r]^=a.gexp(a.glog(t.get(r))+e);return new c(n,0).mod(t)}},l.RS_BLOCK_TABLE=[[1,26,19],[1,26,16],[1,26,13],[1,26,9],[1,44,34],[1,44,28],[1,44,22],[1,44,16],[1,70,55],[1,70,44],[2,35,17],[2,35,13],[1,100,80],[2,50,32],[2,50,24],[4,25,9],[1,134,108],[2,67,43],[2,33,15,2,34,16],[2,33,11,2,34,12],[2,86,68],[4,43,27],[4,43,19],[4,43,15],[2,98,78],[4,49,31],[2,32,14,4,33,15],[4,39,13,1,40,14],[2,121,97],[2,60,38,2,61,39],[4,40,18,2,41,19],[4,40,14,2,41,15],[2,146,116],[3,58,36,2,59,37],[4,36,16,4,37,17],[4,36,12,4,37,13],[2,86,68,2,87,69],[4,69,43,1,70,44],[6,43,19,2,44,20],[6,43,15,2,44,16],[4,101,81],[1,80,50,4,81,51],[4,50,22,4,51,23],[3,36,12,8,37,13],[2,116,92,2,117,93],[6,58,36,2,59,37],[4,46,20,6,47,21],[7,42,14,4,43,15],[4,133,107],[8,59,37,1,60,38],[8,44,20,4,45,21],[12,33,11,4,34,12],[3,145,115,1,146,116],[4,64,40,5,65,41],[11,36,16,5,37,17],[11,36,12,5,37,13],[5,109,87,1,110,88],[5,65,41,5,66,42],[5,54,24,7,55,25],[11,36,12],[5,122,98,1,123,99],[7,73,45,3,74,46],[15,43,19,2,44,20],[3,45,15,13,46,16],[1,135,107,5,136,108],[10,74,46,1,75,47],[1,50,22,15,51,23],[2,42,14,17,43,15],[5,150,120,1,151,121],[9,69,43,4,70,44],[17,50,22,1,51,23],[2,42,14,19,43,15],[3,141,113,4,142,114],[3,70,44,11,71,45],[17,47,21,4,48,22],[9,39,13,16,40,14],[3,135,107,5,136,108],[3,67,41,13,68,42],[15,54,24,5,55,25],[15,43,15,10,44,16],[4,144,116,4,145,117],[17,68,42],[17,50,22,6,51,23],[19,46,16,6,47,17],[2,139,111,7,140,112],[17,74,46],[7,54,24,16,55,25],[34,37,13],[4,151,121,5,152,122],[4,75,47,14,76,48],[11,54,24,14,55,25],[16,45,15,14,46,16],[6,147,117,4,148,118],[6,73,45,14,74,46],[11,54,24,16,55,25],[30,46,16,2,47,17],[8,132,106,4,133,107],[8,75,47,13,76,48],[7,54,24,22,55,25],[22,45,15,13,46,16],[10,142,114,2,143,115],[19,74,46,4,75,47],[28,50,22,6,51,23],[33,46,16,4,47,17],[8,152,122,4,153,123],[22,73,45,3,74,46],[8,53,23,26,54,24],[12,45,15,28,46,16],[3,147,117,10,148,118],[3,73,45,23,74,46],[4,54,24,31,55,25],[11,45,15,31,46,16],[7,146,116,7,147,117],[21,73,45,7,74,46],[1,53,23,37,54,24],[19,45,15,26,46,16],[5,145,115,10,146,116],[19,75,47,10,76,48],[15,54,24,25,55,25],[23,45,15,25,46,16],[13,145,115,3,146,116],[2,74,46,29,75,47],[42,54,24,1,55,25],[23,45,15,28,46,16],[17,145,115],[10,74,46,23,75,47],[10,54,24,35,55,25],[19,45,15,35,46,16],[17,145,115,1,146,116],[14,74,46,21,75,47],[29,54,24,19,55,25],[11,45,15,46,46,16],[13,145,115,6,146,116],[14,74,46,23,75,47],[44,54,24,7,55,25],[59,46,16,1,47,17],[12,151,121,7,152,122],[12,75,47,26,76,48],[39,54,24,14,55,25],[22,45,15,41,46,16],[6,151,121,14,152,122],[6,75,47,34,76,48],[46,54,24,10,55,25],[2,45,15,64,46,16],[17,152,122,4,153,123],[29,74,46,14,75,47],[49,54,24,10,55,25],[24,45,15,46,46,16],[4,152,122,18,153,123],[13,74,46,32,75,47],[48,54,24,14,55,25],[42,45,15,32,46,16],[20,147,117,4,148,118],[40,75,47,7,76,48],[43,54,24,22,55,25],[10,45,15,67,46,16],[19,148,118,6,149,119],[18,75,47,31,76,48],[34,54,24,34,55,25],[20,45,15,61,46,16]],l.getRSBlocks=function(t,e){var n=l.getRsBlockTable(t,e);if(null==n)throw new Error("bad rs block @ typeNumber:"+t+"/errorCorrectLevel:"+e);for(var r=n.length/3,o=[],i=0;i<r;i++)for(var s=n[3*i+0],a=n[3*i+1],u=n[3*i+2],c=0;c<s;c++)o.push(new l(a,u));return o},l.getRsBlockTable=function(t,e){switch(e){case 1:return l.RS_BLOCK_TABLE[4*(t-1)+0];case 0:return l.RS_BLOCK_TABLE[4*(t-1)+1];case 3:return l.RS_BLOCK_TABLE[4*(t-1)+2];case 2:return l.RS_BLOCK_TABLE[4*(t-1)+3];default:return}},h.prototype={get:function(t){var e=Math.floor(t/8);return 1==(this.buffer[e]>>>7-t%8&1)},put:function(t,e){for(var n=0;n<e;n++)this.putBit(1==(t>>>e-n-1&1))},getLengthInBits:function(){return this.length},putBit:function(t){var e=Math.floor(this.length/8);this.buffer.length<=e&&this.buffer.push(0),t&&(this.buffer[e]|=128>>>this.length%8),this.length++}};var f=[[17,14,11,7],[32,26,20,14],[53,42,32,24],[78,62,46,34],[106,84,60,44],[134,106,74,58],[154,122,86,64],[192,152,108,84],[230,180,130,98],[271,213,151,119],[321,251,177,137],[367,287,203,155],[425,331,241,177],[458,362,258,194],[520,412,292,220],[586,450,322,250],[644,504,364,280],[718,560,394,310],[792,624,442,338],[858,666,482,382],[929,711,509,403],[1003,779,565,439],[1091,857,611,461],[1171,911,661,511],[1273,997,715,535],[1367,1059,751,593],[1465,1125,805,625],[1528,1190,868,658],[1628,1264,908,698],[1732,1370,982,742],[1840,1452,1030,790],[1952,1538,1112,842],[2068,1628,1168,898],[2188,1722,1228,958],[2303,1809,1283,983],[2431,1911,1351,1051],[2563,1989,1423,1093],[2699,2099,1499,1139],[2809,2213,1579,1219],[2953,2331,1663,1273]];function d(t){if(this.options={padding:4,width:256,height:256,typeNumber:4,color:"#000000",background:"#ffffff",ecl:"M"},"string"==typeof t&&(t={content:t}),t)for(var e in t)this.options[e]=t[e];if("string"!=typeof this.options.content)throw new Error("Expected 'content' as string!");if(0===this.options.content.length)throw new Error("Expected 'content' to be non-empty!");if(!(this.options.padding>=0))throw new Error("Expected 'padding' value to be non-negative!");if(!(this.options.width>0&&this.options.height>0))throw new Error("Expected 'width' or 'height' value to be higher than zero!");var n=this.options.content,r=function(t,e){for(var n=function(t){var e=encodeURI(t).toString().replace(/\%[0-9a-fA-F]{2}/g,"a");return e.length+(e.length!=t?3:0)}(t),r=1,o=0,i=0,s=f.length;i<=s;i++){var a=f[i];if(!a)throw new Error("Content too long: expected "+o+" but got "+n);switch(e){case"L":o=a[0];break;case"M":o=a[1];break;case"Q":o=a[2];break;case"H":o=a[3];break;default:throw new Error("Unknwon error correction level: "+e)}if(n<=o)break;r++}if(r>f.length)throw new Error("Content too long");return r}(n,this.options.ecl),i=function(t){switch(t){case"L":return 1;case"M":return 0;case"Q":return 3;case"H":return 2;default:throw new Error("Unknwon error correction level: "+t)}}(this.options.ecl);this.qrcode=new o(r,i),this.qrcode.addData(n),this.qrcode.make()}d.prototype.svg=function(t){var e=this.options||{},n=this.qrcode.modules;void 0===t&&(t={container:e.container||"svg"});for(var r=void 0===e.pretty||!!e.pretty,o=r?"  ":"",i=r?"\r\n":"",s=e.width,a=e.height,u=n.length,c=s/(u+2*e.padding),l=a/(u+2*e.padding),h=void 0!==e.join&&!!e.join,f=void 0!==e.swap&&!!e.swap,d=void 0===e.xmlDeclaration||!!e.xmlDeclaration,p=void 0!==e.predefined&&!!e.predefined,g=p?o+'<defs><path id="qrmodule" d="M0 0 h'+l+" v"+c+' H0 z" style="fill:'+e.color+';shape-rendering:crispEdges;" /></defs>'+i:"",m=o+'<rect x="0" y="0" width="'+s+'" height="'+a+'" style="fill:'+e.background+';shape-rendering:crispEdges;"/>'+i,v="",y="",w=0;w<u;w++)for(var b=0;b<u;b++)if(n[b][w]){var E=b*c+e.padding*c,D=w*l+e.padding*l;if(f){var T=E;E=D,D=T}if(h){var A=c+E,C=l+D;E=Number.isInteger(E)?Number(E):E.toFixed(2),D=Number.isInteger(D)?Number(D):D.toFixed(2),A=Number.isInteger(A)?Number(A):A.toFixed(2),y+="M"+E+","+D+" V"+(C=Number.isInteger(C)?Number(C):C.toFixed(2))+" H"+A+" V"+D+" H"+E+" Z "}else v+=p?o+'<use x="'+E.toString()+'" y="'+D.toString()+'" href="#qrmodule" />'+i:o+'<rect x="'+E.toString()+'" y="'+D.toString()+'" width="'+c+'" height="'+l+'" style="fill:'+e.color+';shape-rendering:crispEdges;"/>'+i}h&&(v=o+'<path x="0" y="0" style="fill:'+e.color+';shape-rendering:crispEdges;" d="'+y+'" />');var L="";switch(t.container){case"svg":d&&(L+='<?xml version="1.0" standalone="yes"?>'+i),L+='<svg xmlns="http://www.w3.org/2000/svg" version="1.1" width="'+s+'" height="'+a+'">'+i,L+=g+m+v,L+="</svg>";break;case"svg-viewbox":d&&(L+='<?xml version="1.0" standalone="yes"?>'+i),L+='<svg xmlns="http://www.w3.org/2000/svg" version="1.1" viewBox="0 0 '+s+" "+a+'">'+i,L+=g+m+v,L+="</svg>";break;case"g":L+='<g width="'+s+'" height="'+a+'">'+i,L+=g+m+v,L+="</g>";break;default:L+=(g+m+v).replace(/^\s+/,"")}return L},d.prototype.save=function(t,e){var r=this.svg();"function"!=typeof e&&(e=function(t,e){});try{n(Object(function(){var t=new Error("Cannot find module 'fs'");throw t.code="MODULE_NOT_FOUND",t}())).writeFile(t,r,e)}catch(t){e(t)}},t.exports=d},671:(t,e,n)=>{"use strict";n.d(e,{j8:()=>c,EA:()=>h,ul:()=>p});var r=function(t,e){Object.entries(e).forEach((e=>{let[n,r]=e;switch(n){case"custom":Object.entries(r).forEach((e=>t.setAttribute(...e)));break;case"style":Object.entries(r).forEach((e=>t.style[e[0]]=e[1]));break;case"dataset":Object.entries(r).forEach((e=>t.dataset[e[0]]=e[1]));break;default:t[n]=r}}))},o=o||"http://www.w3.org/2000/svg",i=function(t,e,n=document){let i=n.createElementNS(o,t);return r(i,e),i},s=function(t,e,n,r={},o){o||"undefined"==typeof document||(o=document);let s={custom:{attributeName:"fill",begin:"indefinite",repeatCount:"1",dur:"1s",fill:"freeze",keyTimes:"0; 1",values:"red; blue"}};"object"==typeof arguments[0]&&(Object.assign(s.custom,arguments[0].custom),"dur"in s.custom||(s.custom.dur=`${arguments[0].duration}s`),e=arguments[0].events,n=arguments[0].duration,arguments.length>1&&(o=arguments[1]));let a="",u="";if(!Array.isArray(e)){let t=[];Object.keys(e).forEach((n=>{t.push([n,e[n]])})),(e=t).sort(((t,e)=>t[0]-e[0]))}e.forEach((([t,n],r)=>{parseFloat(t)%1==0&&(t+=".00");let o=r<Object.keys(e).length-1?"; ":"";u+=`${t}${o}`,a+=`${n}${o}`})),s.custom.values=a,s.custom.keyTimes=u;let c=i("translate"==t?"animateTransform":"animate",s,o);return c=Object.assign(c,r),c},a=function(t,e,n,r=!1){return(t=r?Math.floor(t):t)>n?n:t<e?e:t},u=function(t,e,n){n||"undefined"==typeof document||(n=document);let o=n.createElement(t);return r(o,e),o};const c=function(t,e={}){document.dispatchEvent(new CustomEvent(t,{detail:e,bubbles:!0,cancelable:!0,composed:!1}))},l=n(304);function h(t,e=null){e=e||`qr_temp_${Math.floor(1e6*Math.random())}`;const n=new l({content:t,padding:0,width:512,height:512,color:"#000000",background:"#ffffff",ecl:"Q"}).svg().replace("<svg",`<svg viewbox="0, 0, 512, 512" id="${e}" `);console.log(n),document.body.insertAdjacentHTML("beforeend",n);let r=document.querySelector(`#${e}`);return document.body.removeChild(r),r}var f=function(t,e=0){return t=Tone.Frequency(t,"midi").transpose(e),Tone.Frequency(t,"midi").toFrequency()},d=function(t,e=0){return t=Tone.Frequency(t).transpose(e),Tone.Frequency(t).toFrequency()};const p=function(t){return t.trim().split(/\n\s*\n/).map(((t,e)=>{const n=t.trim().split(/\n/),[r,o]=n[1].split(" --\x3e "),i=[r.replace(",","."),o.replace(",",".")],s=n.slice(2).join("\n");return`${i[0]},${i[1]}\n${s}\n\n`})).join("")};function g(t,e){const n=document.createElementNS("http://www.w3.org/2000/svg","filter");return n.setAttribute("id",t),n.setAttribute("filterUnits",e),n}function m(t,e,n){const r=document.createElementNS("http://www.w3.org/2000/svg","feColorMatrix");return r.setAttribute("id",t),r.setAttribute("type",e),r.setAttribute("values",n),r}function v(t){const e=document.createElementNS("http://www.w3.org/2000/svg","feComponentTransfer");return e.setAttribute("id",t),e}function y(t){const e=document.createElementNS("http://www.w3.org/2000/svg","animate");return Object.keys(t).forEach((n=>{e.setAttribute(n,t[n])})),e}function w(t){const e=g(t.id,t.filterUnits),n=v("feComponentTransfer1");return e.appendChild(n),Object.keys(t.components).forEach((n=>{const r=t.components[n],o=m(r.id,r.type,r.values);e.appendChild(o)})),Object.keys(t.animations).length>0&&Object.keys(t.animations).forEach((n=>{const r=y(t.animations[n]);e.appendChild(r)})),e}function b(t){return parseInt(t,16)/255}function E(t){let e=Math.round(255*t).toString(16);return e=1===e.length?`0${e}`:e,e}const D=(t,e,n)=>(n<0&&(n+=1),n>1&&(n-=1),n<1/6?t+6*(e-t)*n:n<.5?e:n<2/3?t+(e-t)*(2/3-n)*6:t);console.log("running cm-toolbox");var T={CSSToggle:class{constructor(t,e=!1,n=.1,r=.3,o="hc--light",i="fill"){this.element=t,this.on=e,this.attack=n,this.release=r,this.effectClass=o}toggle(){this.on=!this.on;let{element:t,on:e,attack:n,release:r,effectClass:o}=this;t.style.transition=`fill ${e?n:r}s ease`,t.classList[e?"add":"remove"](o)}trigger(t,e=!0){this.on=t;let{element:n,attack:r,release:o,effectClass:i}=this;n.style.transition=`fill ${t?r:o}s ease`,n.classList[t?"add":"remove"](i)}set attack(t){this._attack=t}set release(t){this._release=t}},addAnimation:function(t,e,n,r,o={},i){i||"undefined"==typeof document||(i=document);let a,u="object"==typeof t?t:i.getElementById(t);if("object"==typeof arguments[1]){let t={custom:{}};Object.assign(t,arguments[1]),arguments.length>2&&(i=arguments[2]),"id"in t.custom||(t.custom.id=`${u.id}_${e}`),a=s(t,i)}else"id"in o||(o.id=`${u.id}_${e}`),a=s(e,n,r,o,i);return u.appendChild(a),a},constrain:a,create:u,createFilter:function(t,e){let n={filter:i("filter",{id:t,custom:{filterUnits:"objectBoundingBox",x:"0",y:"0",width:"100%",height:"100%"}}),animation:{},update:{}};return"string"==typeof e&&(e=[e]),e.forEach((r=>{n[r]=i("feColorMatrix",{id:`${t}_${r}`,custom:{type:e,in:"SourceGraphic",values:0}}),n.filter.appendChild(n[r]),n.animation[r]=s("values",[[0,0],[1,1]],.1),n[r].appendChild(n.animation[r]),n.update[r]=function(t,e="unspecified",o="unspecified"){"unspecified"==o&&(o=n[r].values.animVal.getItem("value").value),"unspecified"!=e&&n.animation[r].setAttribute("dur",`${e}s`),n.animation[r].setAttribute("values",`${o};${t}`),console.log(n.animation[r]),n.animation[r].beginElement()}})),n},createAnimation:s,createNS:i,emit:c,ftos:function(t,e=0){return sym=Tone.Frequency(t).transpose(e),Tone.Frequency(t).toNote()},generateQR:h,getTranslate:t=>{const e=getComputedStyle(t).transform,{e:n,f:r}="none"==e?{e:0,f:0}:new DOMMatrix(e);return{x:n,y:r}},hexToInt:function(t){let e=[0,0];for(let n=0;n<2;n++)e[n]=t.charCodeAt(n),e[n]-=e[n]>=65?55:48;return e[0]*=16,e[0]+e[1]},interpolate:function(t,e,n,r=!1){let o=(1-n)*t+n*e;return o=r?Math.floor(o):o,o},intToHex:function(t){let e=[0,0];e[0]=Math.floor(t/16),e[1]=t%16;for(let t in e)e[t]=e[t]>9?String.fromCharCode(e[t]+55):e[t];return`${e[0]}${e[1]}`},map:function(t,e,n,r,o,i=!1,s=!1){return t=(t-e)*(o-r)/(n-e)+r,t=s?Math.floor(t):t,i?a(t,r,o):t},mtof:f,mtos:function(t,e=0){return t=Tone.Frequency(t,"midi").transpose(e),Tone.Frequency(t,"midi").toNote()},populate:function(t,e,n=!1,r="option"){e.forEach((e=>{t.appendChild(u(r,{value:e,innerHTML:e})),0!=n&&(t.value=n)}))},rot:function(t,e){let n=[t.slice(e),t.slice(0,e)];return n[0].concat(n[1])},set:r,setInTree:function(t=[],e=0,n=this){"string"==typeof t&&(t=t.split("_"));var r=n;t.forEach(((t,e,n)=>{e<n.length-1&&(r=r[t])})),console.log(r,e),r[t[t.length-1]]=e},setNS:function(t,e){Object.entries(e).forEach((e=>{let[n,r]=e;switch(n){case"custom":Object.entries(r).forEach((e=>{t.setAttributeNS(xmlns,...e)}));break;case"style":Object.entries(r).forEach((e=>t.style[e[0]]=e[1]));break;default:t[n]=r}}))},srtToSbv:p,stom:function(t,e=0){return t=Tone.Frequency(t).transpose(e),Tone.Frequency(t).toMidi()},stof:d,toggleFullscreen:()=>document.fullscreenElement?(document.exitFullscreen(),!0):document.webkitFullscreenElement?(document.webkitExitFullscreen(),!0):document.documentElement.requestFullscreen?(document.documentElement.requestFullscreen(),!0):document.documentElement.webkitRequestFullscreen?(document.documentElement.webkitRequestFullscreen(),!0):(window.top!=window.self?window.top.location.href=window.location.href:window.history.back(),!1),transposeForPlayer:function(t,e){return"string"==typeof t?t=d(t):"number"==typeof t&&(t=f(t)),"string"==typeof e?e=d(e):"number"==typeof e&&(e=f(e)),t/e},v:function(t){return Tone.gainToDb(t)},within:function(t=0,e=0,n={left:0,right:0,top:0,bottom:0}){let r={left:t>=n.left,right:t<=n.right,top:e>=n.top,bottom:e<=n.bottom},o=[];return Object.keys(n).forEach((t=>{t in r&&o.push(r[t])})),o.every((t=>!0===t))},generateSVGFilter:g,generateFeColorMatrix:m,generateFeComponentTransfer:v,generateAnimate:y,addFiltersToDefs:function(t,e=document.querySelector("svg")){Object.keys(t).forEach((e=>{const n=w(t[e]);if(!document.querySelector("svg defs")){const t=document.createElementNS("http://www.w3.org/2000/svg","defs");document.querySelector("svg").insertBefore(t,document.querySelector("svg").firstChild)}document.querySelector("svg defs").appendChild(n)}));const n=e.cloneNode(!0);e.parentNode.replaceChild(n,e)},filterFromDictionary:w,applyFilter:function(t,e){const n=e.cloneNode(!0);n.setAttribute("filter",`url(#${t.id})`),e.parentNode.replaceChild(n,e),document.querySelector(`#${t.id}`).querySelectorAll("animate").forEach((t=>{t.setAttribute("href",`#${t.getAttribute("href").slice(1)}${e.id}`),t.setAttribute("id",`${t.getAttribute("id")}${e.id}`)}))},setSvgTextClass:function(t,e,n="selected"){Array.from(t.children).filter((t=>"svg"==t.tagName)).forEach((t=>{t.querySelectorAll("text").forEach((t=>{t.classList[e](n)}))}))},hexToRGB:function(t){return[b(t.slice(1,3)),b(t.slice(3,5)),b(t.slice(5,7))]},RGBToHSL:function(t,e,n){let r,o,i=Math.max(t,e,n),s=Math.min(t,e,n),a=(i+s)/2;if(i==s)r=o=0;else{var u=i-s;switch(o=a<.5?u/(i+s):u/(2-i-s),i){case t:r=(e-n)/u+(e<n?6:0);break;case e:r=(n-t)/u+2;break;case n:r=(t-e)/u+4}r/=6}return r=Math.round(360*r),o=Math.round(100*o),a=Math.round(100*a),[r,o,a]},HSLToHex:function(t,e,n){let r;if(t/=360,n/=100,0==(e/=100))r=[n,n,n];else{const o=n<.5?n*(1+e):n+e-n*e,i=2*n-o;r=[D(i,o,t+1/3),D(i,o,t),D(i,o,t-1/3)]}return r=r.map((t=>E(t))),`#${r.join("")}`},floatToHexDigit:E,hexDigitToFloat:b};"undefined"!=typeof module&&module.exports?(console.log("cm-toolbox running in node...success!"),module.exports=T):"undefined"!=typeof globalThis?globalThis.CM=T:"undefined"!=typeof window&&(window.CM=T)}},e={};function n(r){var o=e[r];if(void 0!==o)return o.exports;var i=e[r]={exports:{}};return t[r](i,i.exports,n),i.exports}n.d=(t,e)=>{for(var r in e)n.o(e,r)&&!n.o(t,r)&&Object.defineProperty(t,r,{enumerable:!0,get:e[r]})},n.o=(t,e)=>Object.prototype.hasOwnProperty.call(t,e),(()=>{"use strict";var t=n(671);function e(t){return t.trim().split(/\n\s*\n/).map(((t,e)=>{const n=t.trim().split(/\n/),[r,o]=n[1].split(" --\x3e "),i=[r.replace(",","."),o.replace(",",".")],s=n.slice(2).join("\n");return`${i[0]},${i[1]}\n${s}\n`})).join("")}const r=function(t){this.script={},this.timeline=[],this.filename="",this.container=t,window.srtToSbv=e};(r.prototype={}).constructor=r,r.prototype.setContainer=function(t){this.container=t},r.prototype.updateCaptions=function(t,e=!0,n=!0){let r="";if(!e)return this.container.style.opacity=0,!1;let o=this.timeline.find((e=>e.startS<=t&&e.endS>=t));void 0!==o?(o.content.forEach(((t,e)=>{r+=t,e<o.content.length-1&&(r+="<br>")})),r!=this.container.innerHTML&&(this.container.innerHTML="",this.container.innerHTML=r),this.container.style.opacity=n?1:0):(this.container.innerHTML="",this.container.style.opacity=0)},r.prototype.checkNextDescriptionTime=function(t){let e=t.getCurrentTime(),n=Math.floor(sbvCaptions.timeline.find((t=>t.startS>=e&&t.endS>=e)).startS-e);n>6&&null!=typeof StatusVO&&StatusVO.update(`audio description starting in ${n} seconds`)},r.prototype.convertTimetoMs=function(t){if(""==t||void 0===t)return console.log("nothing to convert..."),"";let e=t.split(":"),n=parseInt(e[0]),r=parseInt(e[1]),o=parseInt(e[2].split(".")[0]);return(parseInt(e[2].split(".")[1])+1e3*o+60*r*1e3+60*n*60*1e3)/1e3},r.prototype.splitCaptions=function(t){function e(t){if(""==t||void 0===t)return"";let e=t.split(":"),n=parseInt(e[0]),r=parseInt(e[1]),o=parseInt(e[2].split(".")[0]);return(parseInt(e[2].split(".")[1])+1e3*o+60*r*1e3+60*n*60*1e3)/1e3}let n=[];return t.forEach(((t,r)=>{if(""==t)return;let o={start:t.split("\n")[0].split(",")[0],end:t.split("\n")[0].split(",")[1],content:t.split("\n").slice(1)};o.startS=e(o.start),o.endS=e(o.end),n.push(o)}),this),n},r.prototype.requestListener=function(){if(console.log("requestListener",this.responseText,this.captionTarget),!this.captionTarget)return window.textOutput=this.responseText,!1;this.captionTarget.script.events=this.responseText.split("\n\n"),this.captionTarget.timeline=this.captionTarget.splitCaptions(this.captionTarget.script.events,this.captionTarget)},r.prototype.requestError=function(t){console.error("Fetch Error",t)},r.prototype.loadCaptions=function(t){this.filename=t;var e=new XMLHttpRequest;e.captionTarget=this,e.onload=this.requestListener,e.onerror=this.requestError,e.open("get",`./${this.filename}`,!0),e.send()};const o=r;var i=n(441);window.syncCC=new o,window.generateQR=t.EA,window.srtToSbv=t.ul,window.touch=new i})()})();