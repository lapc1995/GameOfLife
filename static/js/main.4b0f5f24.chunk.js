(window.webpackJsonp=window.webpackJsonp||[]).push([[0],{30:function(t,e,a){t.exports=a.p+"static/media/logo.5d5d9eef.svg"},31:function(t,e,a){t.exports=a(82)},35:function(t,e,a){},36:function(t,e,a){},82:function(t,e,a){"use strict";a.r(e);var n=a(5),r=a.n(n),i=a(29),s=a.n(i),o=(a(35),a(11)),h=a(12),p=a(14),c=a(13),u=a(15),l=a(30),m=a.n(l);a(36),n.Component,Boolean("localhost"===window.location.hostname||"[::1]"===window.location.hostname||window.location.hostname.match(/^127(?:\.(?:25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)){3}$/));var f=a(16);function v(t){return r.a.createElement(f.Stage,{width:window.innerWidth,height:window.innerHeight},r.a.createElement(f.Layer,null,t.game))}var g=function(t){function e(t){var a;return Object(o.a)(this,e),(a=Object(p.a)(this,Object(c.a)(e).call(this,t))).state={map:null,rectangles:[]},a.map1=a.generateMap(),a.map2=a.generateMap(),a.currentMap=1,a}return Object(u.a)(e,t),Object(h.a)(e,[{key:"render",value:function(){return r.a.createElement("div",null,r.a.createElement(v,{game:this.state.rectangles}))}},{key:"componentDidMount",value:function(){var t=this;this.setState({map:this.map1,start:!0}),this.intervalID=setInterval(function(){return t.tick()},1/30)}},{key:"componentWillUnmount",value:function(){clearInterval(this.intervalID)}},{key:"tick",value:function(){var t,e=[];1===this.currentMap?(t=this.map2,this.currentMap=2):(t=this.map1,this.currentMap=1);for(var a=0;a<this.props.y;a++)for(var n=0;n<this.props.x;n++)t[a][n]=this.gameOfLifeRules(a,n,this),1===t[a][n]&&e.push(r.a.createElement(f.Rect,{x:10*n,y:10*a,width:10,height:10,fill:"rgb(0,0,0)"}));this.setState({map:t,rectangles:e})}},{key:"generateMap",value:function(){for(var t=new Array(Number(this.props.y)),e=0;e<this.props.y;e++){t[e]=Array(Number(this.props.x));for(var a=0;a<this.props.x;a++)t[e][a]=Math.round(Math.random())}return t}},{key:"gameOfLifeRules",value:function(t,e){var a=this.getNeighbors(t,e);if(1===this.state.map[t][e]){if(a<2||a>3)return 0;if(2===a||3===a)return 1}else if(0===this.state.map[t][e])return 3===a?1:0}},{key:"getNeighbors",value:function(t,e){var a=0,n=t-1<0?this.props.y-1:t-1,r=t+1>=this.props.y?0:t+1,i=e-1<0?this.props.x-1:e-1,s=e+1>=this.props.x?0:e+1;return a+=this.state.map[n][i],a+=this.state.map[n][e],a+=this.state.map[n][s],a+=this.state.map[t][i],a+=this.state.map[t][s],a+=this.state.map[r][i],a+=this.state.map[r][e],a+=this.state.map[r][s]}}]),e}(r.a.Component);s.a.render(r.a.createElement(g,{x:Math.floor(window.innerWidth/10),y:Math.floor(window.innerHeight/10)}),document.getElementById("root")),"serviceWorker"in navigator&&navigator.serviceWorker.ready.then(function(t){t.unregister()})}},[[31,1,2]]]);
//# sourceMappingURL=main.4b0f5f24.chunk.js.map