!function(e){var n={};function t(r){if(n[r])return n[r].exports;var o=n[r]={i:r,l:!1,exports:{}};return e[r].call(o.exports,o,o.exports,t),o.l=!0,o.exports}t.m=e,t.c=n,t.d=function(e,n,r){t.o(e,n)||Object.defineProperty(e,n,{enumerable:!0,get:r})},t.r=function(e){"undefined"!=typeof Symbol&&Symbol.toStringTag&&Object.defineProperty(e,Symbol.toStringTag,{value:"Module"}),Object.defineProperty(e,"__esModule",{value:!0})},t.t=function(e,n){if(1&n&&(e=t(e)),8&n)return e;if(4&n&&"object"==typeof e&&e&&e.__esModule)return e;var r=Object.create(null);if(t.r(r),Object.defineProperty(r,"default",{enumerable:!0,value:e}),2&n&&"string"!=typeof e)for(var o in e)t.d(r,o,function(n){return e[n]}.bind(null,o));return r},t.n=function(e){var n=e&&e.__esModule?function(){return e.default}:function(){return e};return t.d(n,"a",n),n},t.o=function(e,n){return Object.prototype.hasOwnProperty.call(e,n)},t.p="/dist/",t(t.s=0)}([function(e,n){var t=document.getElementById("grid"),r=t.getContext("2d");r.scale(20,20);var o=[null,"purple","orange","yellow","blue","cyan","red","green"];function i(){var e,n=["s","l","i","o","j","z","t"];c.matrix="t"===(e=n[n.length*Math.random()|0])?[[0,0,0],[1,1,1],[0,1,0]]:"o"===e?[[3,3],[3,3]]:"l"===e?[[0,2,0],[0,2,0],[0,2,2]]:"j"===e?[[0,4,0],[0,4,0],[4,4,0]]:"i"===e?[[0,5,0,0],[0,5,0,0],[0,5,0,0],[0,5,0,0]]:"z"===e?[[6,6,0],[0,6,6],[0,0,0]]:"s"===e?[[0,7,7],[7,7,0],[0,0,0]]:void 0,c.pos.y=0,c.pos.x=f[0].length/2-1,m(f,c)&&(f.forEach((function(e){return e.fill(0)})),c.gameOver=!0,c.time=0,c.score=0,b(),h())}function u(e,n){e.forEach((function(e,t){e.forEach((function(e,i){0!==e&&(r.fillStyle=o[e],r.fillRect(i+n.x,t+n.y,1,1))}))}))}var c={pos:{x:5,y:5},matrix:null,score:0,music:!1,gameOver:!1,time:0},f=function(e,n){for(var t=[];n--;)t.push(new Array(e).fill(0));return t}(12,20);function a(){r.fillStyle="#000",r.fillRect(0,0,t.width,t.height),u(f,{x:0,y:0}),u(c.matrix,c.pos)}var l=0,s=0;function d(){var e=arguments.length>0&&void 0!==arguments[0]?arguments[0]:0,n=e-s;s=e,l+=n,c.gameOver,l>1e3&&(y(),l=0),b(),E(),a(),requestAnimationFrame(d)}function m(e,n){for(var t=[n.matrix,n.pos],r=t[0],o=t[1],i=0;i<r.length;i++)for(var u=0;u<r[i].length;u++)if(0!==r[i][u]&&0!==(e[i+o.y]&&e[i+o.y][u+o.x]))return!0;return!1}function y(){c.pos.y++,m(f,c)&&(c.pos.y--,function(e,n){n.matrix.forEach((function(t,r){t.forEach((function(t,o){0!==t&&(e[r+n.pos.y][o+n.pos.x]=t)}))}))}(f,c),i(),function(){var e=1;e:for(var n=f.length-1;n>0;n--){for(var t=0;t<f[n].length;t++)if(0===f[n][t])continue e;var r=f.splice(n,1)[0].fill(0);f.unshift(r),n++,c.score+=10*e,e*=2}}(),h()),l=0}function p(e){c.pos.x+=e,m(f,c)&&(c.pos.x-=e)}function v(e,n){for(var t=0;t<e.length;t++)for(var r=0;r<t;r++){var o=[e[t][r],e[r][t]];e[r][t]=o[0],e[t][r]=o[1]}n>0?e.forEach((function(e){return e.reverse()})):e.reverse()}function g(e){v(c.matrix,e);for(var n=c.pos.x,t=1;m(f,c);)if(c.pos.x+=t,(t=-(t+(t>0?1:-1)))>c.matrix[0].length)return v(c.matrix,-e),void(c.pos.x=n)}function h(){document.getElementById("score").innerText=c.score}function x(){var e=document.getElementById("song");c.music?(e.pause(),c.music=!1):(e.play(),c.music=!0)}function b(){this.current=new Date,c.time=Math.round((this.current-this.currentTime)/1e3)}function E(){document.getElementById("timer").innerText="".concat(c.time," seconds and counting..")}document.addEventListener("keydown",(function(e){37===e.keyCode?p(-1):39===e.keyCode?p(1):40===e.keyCode?y():90===e.keyCode?g(-1):88===e.keyCode?g(1):80===e.keyCode?x():32===e.keyCode&&function(){this.currentTime=new Date,x(),i(),h(),d()}()}))}]);
//# sourceMappingURL=main.js.map