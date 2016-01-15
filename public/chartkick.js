(function(p){function w(b){return"[object Array]"===Object.prototype.toString.call(b)}function z(b){return!(b instanceof Function)&&b instanceof Object}function A(b,a){for(var c in a)z(a[c])||w(a[c])?(z(a[c])&&!z(b[c])&&(b[c]={}),w(a[c])&&!w(b[c])&&(b[c]=[]),A(b[c],a[c])):void 0!==a[c]&&(b[c]=a[c])}function q(b,a){var c={};A(c,b);A(c,a);return c}function B(b,a,c,f,m,e,l){return function(h,d,k){var g=q({},b),g=q(g,k||{});d.hideLegend&&a(g);if("min"in d)c(g,d.min);else{a:{var r,n;for(k=0;k<h.length;k++)for(n=
h[k].data,r=0;r<n.length;r++)if(0>n[r][1]){h=!0;break a}h=!1}h||c(g,0)}d.max&&f(g,d.max);d.stacked&&m(g);d.colors&&(g.colors=d.colors);d.xtitle&&e(g,d.xtitle);d.ytitle&&l(g,d.ytitle);return g=q(g,d.library||{})}}function F(b,a){var c="Error Loading Chart: "+a;document.body.innerText?b.innerText=c:b.textContent=c;b.style.color="#ff0000"}function N(b,a,c){(p.jQuery||p.Zepto||p.$).ajax({dataType:"json",url:a,success:c,error:function(a,c,e){F(b,"string"===typeof e?e:e.message)}})}function G(b,a){try{a(b)}catch(c){throw F(b.element,
c.message),c;}}function O(b,a){"string"===typeof b.dataSource?N(b.element,b.dataSource,function(c,f,m){b.data=c;G(b,a)}):(b.data=b.dataSource,G(b,a))}function C(b){if("object"!==typeof b)if("number"===typeof b)b=new Date(1E3*b);else{var a;a=b.replace(/ /,"T").replace(" ","").replace("UTC","Z");var c,f,m,e,l,h,d;c=Object.prototype.toString.call(a);"[object Date]"!==c&&("[object String]"!==c?a=void 0:(a=a.match(H))?(d=parseInt(a[1],10),l=parseInt(a[3],10)-1,c=parseInt(a[5],10),f=parseInt(a[7],10),e=
a[9]?parseInt(a[9],10):0,h=a[11]?parseInt(a[11],10):0,m=a[12]?1E3*parseFloat(I+a[12].slice(1)):0,f=Date.UTC(d,l,c,f,e,h,m),a[13]&&a[14]&&(c=60*a[15],a[17]&&(c+=parseInt(a[17],10)),c*="-"===a[14]?-1:1,f-=6E4*c),a=new Date(f)):a=void 0);b=a||new Date(b)}return b}function J(b){if(!w(b)){var a=[],c;for(c in b)b.hasOwnProperty(c)&&a.push([c,b[c]]);b=a}return b}function K(b,a){return b[0].getTime()-a[0].getTime()}function u(b,a){var c,f,m,e;m="render"+b;e=a.options.adapter;for(c=0;c<y.length;c++)if(f=y[c],
(!e||e===f.name)&&f[m]instanceof Function)return f[m](a);throw Error("No adapter found");}function x(b,a,c){!w(b)||"object"!==typeof b[0]||w(b[0])?(b=[{name:"Value",data:b}],a.hideLegend=!0):a.hideLegend=!1;a.discrete&&(c="string");for(a=0;a<b.length;a++){for(var f=b[a],m=J(b[a].data),e=c,l=[],h=void 0,d=void 0,d=0;d<m.length;d++){var h=m[d][0],k=e,h="number"===k?parseFloat(h):"datetime"===k?C(h):""+h;l.push([h,parseFloat(m[d][1])])}"datetime"===e&&l.sort(K);f.data=l}return b}function L(b){b=J(b);
var a;for(a=0;a<b.length;a++)b[a]=[""+b[a][0],parseFloat(b[a][1])];return b}function P(b){b.data=x(b.data,b.options,"datetime");u("LineChart",b)}function Q(b){b.data=x(b.data,b.options,"string");u("ColumnChart",b)}function R(b){b.data=L(b.data);u("PieChart",b)}function S(b){b.data=x(b.data,b.options,"string");u("BarChart",b)}function T(b){b.data=x(b.data,b.options,"datetime");u("AreaChart",b)}function U(b){b.data=L(b.data);u("GeoChart",b)}function V(b){b.data=x(b.data,b.options,"number");u("ScatterChart",
b)}function W(b){var a=b.data,c;for(c=0;c<a.length;c++)a[c][1]=C(a[c][1]),a[c][2]=C(a[c][2]);b.data=a;u("Timeline",b)}function v(b,a,c,f,m){"string"===typeof a&&(a=document.getElementById(a));b.element=a;b.options=f||{};b.dataSource=c;D.charts[a.id]=b;O(b,m)}var M=p.Chartkick||{},D,H,I,y=[];H=/(\d\d\d\d)(\-)?(\d\d)(\-)?(\d\d)(T)?(\d\d)(:)?(\d\d)?(:)?(\d\d)?([\.,]\d+)?($|Z|([\+\-])(\d\d)(:)?(\d\d)?)/i;I=".";if("Highcharts"in p){var E=new function(){var b=p.Highcharts;this.name="highcharts";var a={chart:{},
xAxis:{title:{text:null},labels:{style:{fontSize:"12px"}}},yAxis:{title:{text:null},labels:{style:{fontSize:"12px"}}},title:{text:null},credits:{enabled:!1},legend:{borderWidth:0},tooltip:{style:{fontSize:"12px"}},plotOptions:{areaspline:{},series:{marker:{}}}},c=B(a,function(b){b.legend.enabled=!1},function(b,a){b.yAxis.min=a},function(b,a){b.yAxis.max=a},function(b){b.plotOptions.series.stacking="normal"},function(b,a){b.xAxis.title.text=a},function(b,a){b.yAxis.title.text=a});this.renderLineChart=
function(a,e){e=e||"spline";var l={};"areaspline"===e&&(l={plotOptions:{areaspline:{stacking:"normal"},series:{marker:{enabled:!1}}}});var l=c(a.data,a.options,l),h,d,k;l.xAxis.type=a.options.discrete?"category":"datetime";l.chart.type=e;l.chart.renderTo=a.element.id;var g=a.data;for(d=0;d<g.length;d++){h=g[d].data;if(!a.options.discrete)for(k=0;k<h.length;k++)h[k][0]=h[k][0].getTime();g[d].marker={symbol:"circle"}}l.series=g;new b.Chart(l)};this.renderScatterChart=function(a){var e=c(a.data,a.options,
{});e.chart.type="scatter";e.chart.renderTo=a.element.id;e.series=a.data;new b.Chart(e)};this.renderPieChart=function(c){var e={};c.options.colors&&(e.colors=c.options.colors);e=q(q(a,e),c.options.library||{});e.chart.renderTo=c.element.id;e.series=[{type:"pie",name:"Value",data:c.data}];new b.Chart(e)};this.renderColumnChart=function(a,e){e=e||"column";var l=a.data,h=c(l,a.options),d,k,g,f,n=[];h.chart.type=e;h.chart.renderTo=a.element.id;for(d=0;d<l.length;d++)for(g=l[d],k=0;k<g.data.length;k++)f=
g.data[k],n[f[0]]||(n[f[0]]=Array(l.length)),n[f[0]][d]=f[1];g=[];for(d in n)n.hasOwnProperty(d)&&g.push(d);h.xAxis.categories=g;var t=[];for(d=0;d<l.length;d++){f=[];for(k=0;k<g.length;k++)f.push(n[g[k]][d]||0);t.push({name:l[d].name,data:f})}h.series=t;new b.Chart(h)};var f=this;this.renderBarChart=function(b){f.renderColumnChart(b,"bar")};this.renderAreaChart=function(b){f.renderLineChart(b,"areaspline")}};y.push(E)}p.google&&p.google.setOnLoadCallback&&(E=new function(){var b=p.google;this.name=
"google";var a={},c=[],f=function(){for(var a,d,e=0;e<c.length;e++)if(a=c[e],d=b.visualization&&("corechart"===a.pack&&b.visualization.LineChart||"timeline"===a.pack&&b.visualization.Timeline))a.callback(),c.splice(e,1),e--},m=function(t,e){e||(e=t,t="corechart");c.push({pack:t,callback:e});if(a[t])f();else{a[t]=!0;var d={packages:[t],callback:f};M.language&&(d.language=M.language);b.load("visualization","1",d)}},e={chartArea:{},fontName:"'Lucida Grande', 'Lucida Sans Unicode', Verdana, Arial, Helvetica, sans-serif",
pointSize:6,legend:{textStyle:{fontSize:12,color:"#444"},alignment:"center",position:"right"},curveType:"function",hAxis:{textStyle:{color:"#666",fontSize:12},titleTextStyle:{},gridlines:{color:"transparent"},baselineColor:"#ccc",viewWindow:{}},vAxis:{textStyle:{color:"#666",fontSize:12},titleTextStyle:{},baselineColor:"#ccc",viewWindow:{}},tooltip:{textStyle:{color:"#666",fontSize:12}}},l=function(b){b.legend.position="none"},h=function(b,a){b.hAxis.viewWindow.min=a},d=function(b,a){b.hAxis.viewWindow.max=
a},k=function(b){b.isStacked=!0},g=B(e,l,function(b,a){b.vAxis.viewWindow.min=a},function(b,a){b.vAxis.viewWindow.max=a},k,function(b,a){b.hAxis.title=a;b.hAxis.titleTextStyle.italic=!1},function(b,a){b.vAxis.title=a;b.vAxis.titleTextStyle.italic=!1}),r=function(a,c){var e=new b.visualization.DataTable;e.addColumn(c,"");var d,f,g,h,l,k=[];for(d=0;d<a.length;d++)for(g=a[d],e.addColumn("number",g.name),f=0;f<g.data.length;f++)h=g.data[f],l="datetime"===c?h[0].getTime():h[0],k[l]||(k[l]=Array(a.length)),
k[l][d]=parseFloat(h[1]);f=[];for(d in k)k.hasOwnProperty(d)&&(g="datetime"===c?new Date(parseFloat(d)):"number"===c?parseFloat(d):d,f.push([g].concat(k[d])));"datetime"===c&&f.sort(K);e.addRows(f);return e},n=function(b){p.attachEvent?p.attachEvent("onresize",b):p.addEventListener&&p.addEventListener("resize",b,!0);b()};this.renderLineChart=function(a){m(function(){var c=g(a.data,a.options),d=r(a.data,a.options.discrete?"string":"datetime");a.chart=new b.visualization.LineChart(a.element);n(function(){a.chart.draw(d,
c)})})};this.renderPieChart=function(a){m(function(){var c={chartArea:{top:"10%",height:"80%"}};a.options.colors&&(c.colors=a.options.colors);var d=q(q(e,c),a.options.library||{}),f=new b.visualization.DataTable;f.addColumn("string","");f.addColumn("number","Value");f.addRows(a.data);a.chart=new b.visualization.PieChart(a.element);n(function(){a.chart.draw(f,d)})})};this.renderColumnChart=function(a){m(function(){var c=g(a.data,a.options),d=r(a.data,"string");a.chart=new b.visualization.ColumnChart(a.element);
n(function(){a.chart.draw(d,c)})})};this.renderBarChart=function(a){m(function(){var c=B(e,l,h,d,k)(a.data,a.options,{hAxis:{gridlines:{color:"#ccc"}}}),f=r(a.data,"string");a.chart=new b.visualization.BarChart(a.element);n(function(){a.chart.draw(f,c)})})};this.renderAreaChart=function(a){m(function(){var c=g(a.data,a.options,{isStacked:!0,pointSize:0,areaOpacity:.5}),d=r(a.data,a.options.discrete?"string":"datetime");a.chart=new b.visualization.AreaChart(a.element);n(function(){a.chart.draw(d,c)})})};
this.renderGeoChart=function(a){m(function(){var c=q(q(e,{legend:"none",colorAxis:{colors:a.options.colors||["#f6c7b6","#ce502d"]}}),a.options.library||{}),d=new b.visualization.DataTable;d.addColumn("string","");d.addColumn("number","Value");d.addRows(a.data);a.chart=new b.visualization.GeoChart(a.element);n(function(){a.chart.draw(d,c)})})};this.renderScatterChart=function(a){m(function(){var c=g(a.data,a.options,{}),d=r(a.data,"number");a.chart=new b.visualization.ScatterChart(a.element);n(function(){a.chart.draw(d,
c)})})};this.renderTimeline=function(a){m("timeline",function(){var c={legend:"none"};a.options.colors&&(c.colors=a.options.colors);var d=q(q(e,c),a.options.library||{}),f=new b.visualization.DataTable;f.addColumn({type:"string",id:"Name"});f.addColumn({type:"date",id:"Start"});f.addColumn({type:"date",id:"End"});f.addRows(a.data);a.chart=new b.visualization.Timeline(a.element);n(function(){a.chart.draw(f,d)})})}},y.push(E));D={LineChart:function(b,a,c){v(this,b,a,c,P)},PieChart:function(b,a,c){v(this,
b,a,c,R)},ColumnChart:function(b,a,c){v(this,b,a,c,Q)},BarChart:function(b,a,c){v(this,b,a,c,S)},AreaChart:function(b,a,c){v(this,b,a,c,T)},GeoChart:function(b,a,c){v(this,b,a,c,U)},ScatterChart:function(b,a,c){v(this,b,a,c,V)},Timeline:function(b,a,c){v(this,b,a,c,W)},charts:{}};p.Chartkick=D})(window);