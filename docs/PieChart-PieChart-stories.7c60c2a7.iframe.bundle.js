"use strict";(self.webpackChunk_vannizhang_react_d3_charts=self.webpackChunk_vannizhang_react_d3_charts||[]).push([[693],{"./src/PieChart/PieChart.stories.tsx":function(__unused_webpack_module,__webpack_exports__,__webpack_require__){__webpack_require__.r(__webpack_exports__),__webpack_require__.d(__webpack_exports__,{AddCustomEvents:function(){return AddCustomEvents},BasicExample:function(){return BasicExample},DonutChartExample:function(){return DonutChartExample},HalfDonutChartExample:function(){return HalfDonutChartExample},ShowTooltip:function(){return ShowTooltip},__namedExportsOrder:function(){return __namedExportsOrder},default:function(){return PieChart_stories}});var react=__webpack_require__("./node_modules/react/index.js"),src=__webpack_require__("./node_modules/d3/src/index.js"),jsx_runtime=__webpack_require__("./node_modules/react/jsx-runtime.js");const Tooltip=({content:content,position:position})=>{const tooltipRef=react.useRef();return content&&position?(0,jsx_runtime.jsx)("div",{ref:tooltipRef,style:{position:"absolute",left:`${position.x+15||0}px`,top:`${position.y+15||0}px`,padding:".1rem .2rem",pointerEvents:"none",boxSizing:"border-box",boxShadow:"0 0 5px 2px var(--tooltip-dropshadow-color)",maxWidth:"var(--tooltip-max-width)",zIndex:5,background:"var(--tooltip-background-color)",color:"var(--tooltip-text-color)",fontSize:"var(--tooltip-text-font-size)",border:"solid 1px var(--tooltip-border-color)",whiteSpace:"nowrap"},dangerouslySetInnerHTML:{__html:content}}):null};Tooltip.displayName="Tooltip";try{Tooltip.displayName="Tooltip",Tooltip.__docgenInfo={description:"",displayName:"Tooltip",props:{content:{defaultValue:null,description:"",name:"content",required:!0,type:{name:"string"}},position:{defaultValue:null,description:"",name:"position",required:!0,type:{name:"TooltipPosition"}}}},"undefined"!=typeof STORYBOOK_REACT_CLASSES&&(STORYBOOK_REACT_CLASSES["src/PieChart/Tooltip.tsx#Tooltip"]={docgenInfo:Tooltip.__docgenInfo,name:"Tooltip",path:"src/PieChart/Tooltip.tsx#Tooltip"})}catch(__react_docgen_typescript_loader_error){}__webpack_require__("./src/styles/variables.css");const ColorRamp=src.W1Y,PieChart=({data:data,showTooltip:showTooltip,isDonut:isDonut,isHalfPie:isHalfPie,width:width,height:height,onClick:onClick,onMouseEnter:onMouseEnter,onMouseLeave:onMouseLeave})=>{const containerRef=(0,react.useRef)(),svgRef=(0,react.useRef)(),rootGroupRef=(0,react.useRef)(),[itemOnHOver,setItemOnHover]=(0,react.useState)(),[tooltipPosition,setTooltipPosition]=(0,react.useState)(),draw=()=>{const container=containerRef.current,width=container.offsetWidth,height=container.offsetHeight,arcGroup=(0,src.Ys)(rootGroupRef.current),radius=isHalfPie?width/2:Math.min(width,height)/2,arcGenerator=(0,src.Nb1)().innerRadius(!0===isDonut?.65*radius:0).outerRadius(radius),pieGenerator=(0,src.ve8)().value((d=>d.value)).sort(null);if(isHalfPie){const anglesRange=.5*Math.PI;pieGenerator.startAngle(-1*anglesRange).endAngle(anglesRange)}arcGroup.selectAll(".arc").remove().exit().data(pieGenerator(data)).enter().append("g").attr("class","arc").append("path").attr("d",arcGenerator).attr("fill",((d,i)=>d.data.color||ColorRamp[i])).on("click",(function(evt){const d=(0,src.Ys)(this).data()[0];onClick&&onClick(d.data)})).on("mouseenter",(function(evt){const d=(0,src.Ys)(this).data()[0];onMouseEnter&&onMouseEnter(d.data),setItemOnHover(d.data)})).on("mouseleave",(function(evt){onMouseLeave&&onMouseLeave(),setItemOnHover(null),setTooltipPosition(null)})).on("mousemove",(function(evt){showTooltip&&setTooltipPosition({x:evt.offsetX,y:evt.offsetY})}))};return(0,react.useEffect)((()=>{draw()}),[data]),(0,jsx_runtime.jsxs)("div",{ref:containerRef,style:{position:"relative",width:width||"100%",height:height||"100%"},children:[(0,jsx_runtime.jsx)("svg",{ref:svgRef,style:{position:"relative",width:"100%",height:"100%"},children:(0,jsx_runtime.jsx)("g",{className:"arc-group",ref:rootGroupRef,style:{transform:`translate(50%, ${isHalfPie?"100%":"50%"})`}})}),showTooltip&&itemOnHOver?(0,jsx_runtime.jsx)(Tooltip,{content:itemOnHOver?.tooltip,position:tooltipPosition}):null]})};PieChart.displayName="PieChart";try{PieChart.displayName="PieChart",PieChart.__docgenInfo={description:"",displayName:"PieChart",props:{data:{defaultValue:null,description:"data that will be used to plot the Pie Chart",name:"data",required:!0,type:{name:"PieChartDataItem[]"}},showTooltip:{defaultValue:null,description:"if true, show tooltip when user hover the Pie Chart",name:"showTooltip",required:!0,type:{name:"boolean"}},isDonut:{defaultValue:null,description:"if true, a pie chart with a hole in the center, which makes it look like an donut",name:"isDonut",required:!1,type:{name:"boolean"}},isHalfPie:{defaultValue:null,description:"if true, create half pie chart is a 180 degree graph that represents the composition of a whole",name:"isHalfPie",required:!1,type:{name:"boolean"}},width:{defaultValue:null,description:"The width of the chart container. If not provided, it will fit the width of the parent container.",name:"width",required:!1,type:{name:"number"}},height:{defaultValue:null,description:"The height of the chart container. If not provided, it will fit the height of the parent container.",name:"height",required:!1,type:{name:"number"}},onClick:{defaultValue:null,description:"Fires when user clicks an arc of the pie chart",name:"onClick",required:!1,type:{name:"(data: PieChartDataItem) => void"}},onMouseEnter:{defaultValue:null,description:"Fires when user hovers an arc of the pie chart",name:"onMouseEnter",required:!1,type:{name:"(data: PieChartDataItem) => void"}},onMouseLeave:{defaultValue:null,description:"Fires when user leaves an arc of the pie chart",name:"onMouseLeave",required:!1,type:{name:"() => void"}}}},"undefined"!=typeof STORYBOOK_REACT_CLASSES&&(STORYBOOK_REACT_CLASSES["src/PieChart/PieChart.tsx#PieChart"]={docgenInfo:PieChart.__docgenInfo,name:"PieChart",path:"src/PieChart/PieChart.tsx#PieChart"})}catch(__react_docgen_typescript_loader_error){}const data=[{key:"CA",value:2,color:"skyblue",tooltip:"California: 2"},{key:"CO",value:4,color:"pink",tooltip:"Colorado: 4"},{key:"CT",value:3,color:"steelblue",tooltip:"Connecticut: 3"}];var PieChart_stories={title:"Example/PieChart",component:PieChart,decorators:[Story=>(0,jsx_runtime.jsx)("div",{style:{width:"100%",height:"100%"},children:(0,jsx_runtime.jsx)(Story,{})})],tags:["autodocs"]};const BasicExample={args:{data:data,width:200,height:200}},DonutChartExample={args:{data:data,isDonut:!0,width:200,height:200}},HalfDonutChartExample={args:{data:data,isDonut:!0,isHalfPie:!0,width:200,height:100}},ShowTooltip={args:{data:data,showTooltip:!0,width:200,height:200}},AddCustomEvents={args:{data:data,width:200,height:200,onClick:data=>{alert("clicked on a pie chart "+data.tooltip)},onMouseEnter:data=>{console.log("mouse pointer has entered pie chart path",data)},onMouseLeave:()=>{console.log("mouse pointer has left the pie chart path")}}};BasicExample.parameters={...BasicExample.parameters,docs:{...BasicExample.parameters?.docs,source:{originalSource:"{\n  // More on args: https://storybook.js.org/docs/react/writing-stories/args\n  args: {\n    data,\n    width: 200,\n    height: 200\n  }\n}",...BasicExample.parameters?.docs?.source}}},DonutChartExample.parameters={...DonutChartExample.parameters,docs:{...DonutChartExample.parameters?.docs,source:{originalSource:"{\n  // More on args: https://storybook.js.org/docs/react/writing-stories/args\n  args: {\n    data,\n    isDonut: true,\n    width: 200,\n    height: 200\n  }\n}",...DonutChartExample.parameters?.docs?.source}}},HalfDonutChartExample.parameters={...HalfDonutChartExample.parameters,docs:{...HalfDonutChartExample.parameters?.docs,source:{originalSource:"{\n  // More on args: https://storybook.js.org/docs/react/writing-stories/args\n  args: {\n    data,\n    isDonut: true,\n    isHalfPie: true,\n    width: 200,\n    height: 100\n  }\n}",...HalfDonutChartExample.parameters?.docs?.source}}},ShowTooltip.parameters={...ShowTooltip.parameters,docs:{...ShowTooltip.parameters?.docs,source:{originalSource:"{\n  // More on args: https://storybook.js.org/docs/react/writing-stories/args\n  args: {\n    data,\n    showTooltip: true,\n    width: 200,\n    height: 200\n  }\n}",...ShowTooltip.parameters?.docs?.source}}},AddCustomEvents.parameters={...AddCustomEvents.parameters,docs:{...AddCustomEvents.parameters?.docs,source:{originalSource:"{\n  // More on args: https://storybook.js.org/docs/react/writing-stories/args\n  args: {\n    data,\n    width: 200,\n    height: 200,\n    onClick: data => {\n      alert('clicked on a pie chart ' + data.tooltip);\n    },\n    onMouseEnter: data => {\n      console.log('mouse pointer has entered pie chart path', data);\n    },\n    onMouseLeave: () => {\n      console.log('mouse pointer has left the pie chart path');\n    }\n  }\n}",...AddCustomEvents.parameters?.docs?.source}}};const __namedExportsOrder=["BasicExample","DonutChartExample","HalfDonutChartExample","ShowTooltip","AddCustomEvents"]},"./node_modules/css-loader/dist/cjs.js??ruleSet[1].rules[7].use[1]!./src/styles/variables.css":function(module,__webpack_exports__,__webpack_require__){var _node_modules_css_loader_dist_runtime_sourceMaps_js__WEBPACK_IMPORTED_MODULE_0__=__webpack_require__("./node_modules/css-loader/dist/runtime/sourceMaps.js"),_node_modules_css_loader_dist_runtime_sourceMaps_js__WEBPACK_IMPORTED_MODULE_0___default=__webpack_require__.n(_node_modules_css_loader_dist_runtime_sourceMaps_js__WEBPACK_IMPORTED_MODULE_0__),_node_modules_css_loader_dist_runtime_api_js__WEBPACK_IMPORTED_MODULE_1__=__webpack_require__("./node_modules/css-loader/dist/runtime/api.js"),___CSS_LOADER_EXPORT___=__webpack_require__.n(_node_modules_css_loader_dist_runtime_api_js__WEBPACK_IMPORTED_MODULE_1__)()(_node_modules_css_loader_dist_runtime_sourceMaps_js__WEBPACK_IMPORTED_MODULE_0___default());___CSS_LOADER_EXPORT___.push([module.id,":root {\r\n    /*\r\n     * variables that control the style of the axis tick line and text\r\n     */\r\n    --axis-tick-line-color: rgba(0,0,0,.5);\r\n    --axis-tick-text-color: #303030;\r\n\r\n    /*\r\n     * variables that control the style of the chart tooltip\r\n     */\r\n    --tooltip-background-color: rgba(255,255,255,1);\r\n    --tooltip-text-color: #303030;\r\n    --tooltip-text-font-size: .8rem;\r\n    --tooltip-max-width: 200px;\r\n    --tooltip-border-color: transparent;\r\n    --tooltip-dropshadow-color: rgba(0,0,0,.2);\r\n\r\n    /*\r\n     * variables that control the style of crosshair reference line\r\n     */\r\n    --crosshair-reference-line-color: rgba(0,0,0,.5);\r\n    --crosshair-reference-line-width: 1px;\r\n    --crosshair-reference-line-stroke-dasharray: 1 1;\r\n\r\n    /*\r\n     * variables that control the style of user provided vertical reference line\r\n     */\r\n    --vertical-reference-line-color: rgba(50, 50, 50, .5);\r\n    --vertical-reference-line-width: 1px;\r\n    --vertical-reference-line-stroke-dasharray: none;\r\n\r\n    /*\r\n     * variables that control the style of user provided horizontal reference line\r\n     */\r\n    --horizontal-reference-line-color: rgba(50, 50, 50, .5);\r\n    --horizontal-reference-line-width: 1px;\r\n    --horizontal-reference-line-stroke-dasharray: none;\r\n    --horizontal-reference-line-label-text-color: rgba(30, 30, 30, .9);\r\n    --horizontal-reference-line-label-text-size: .8rem;\r\n\r\n    /*\r\n     * variables that control the style of divider line that is used in Diverging Bar Chart and similar\r\n     */\r\n    --divider-line-color: rgba(0,0,0,.5);\r\n    --divider-line-width: 1px;\r\n}","",{version:3,sources:["webpack://./src/styles/variables.css"],names:[],mappings:"AAAA;IACI;;MAEE;IACF,sCAAsC;IACtC,+BAA+B;;IAE/B;;MAEE;IACF,+CAA+C;IAC/C,6BAA6B;IAC7B,+BAA+B;IAC/B,0BAA0B;IAC1B,mCAAmC;IACnC,0CAA0C;;IAE1C;;MAEE;IACF,gDAAgD;IAChD,qCAAqC;IACrC,gDAAgD;;IAEhD;;MAEE;IACF,qDAAqD;IACrD,oCAAoC;IACpC,gDAAgD;;IAEhD;;MAEE;IACF,uDAAuD;IACvD,sCAAsC;IACtC,kDAAkD;IAClD,kEAAkE;IAClE,kDAAkD;;IAElD;;MAEE;IACF,oCAAoC;IACpC,yBAAyB;AAC7B",sourcesContent:[":root {\r\n    /*\r\n     * variables that control the style of the axis tick line and text\r\n     */\r\n    --axis-tick-line-color: rgba(0,0,0,.5);\r\n    --axis-tick-text-color: #303030;\r\n\r\n    /*\r\n     * variables that control the style of the chart tooltip\r\n     */\r\n    --tooltip-background-color: rgba(255,255,255,1);\r\n    --tooltip-text-color: #303030;\r\n    --tooltip-text-font-size: .8rem;\r\n    --tooltip-max-width: 200px;\r\n    --tooltip-border-color: transparent;\r\n    --tooltip-dropshadow-color: rgba(0,0,0,.2);\r\n\r\n    /*\r\n     * variables that control the style of crosshair reference line\r\n     */\r\n    --crosshair-reference-line-color: rgba(0,0,0,.5);\r\n    --crosshair-reference-line-width: 1px;\r\n    --crosshair-reference-line-stroke-dasharray: 1 1;\r\n\r\n    /*\r\n     * variables that control the style of user provided vertical reference line\r\n     */\r\n    --vertical-reference-line-color: rgba(50, 50, 50, .5);\r\n    --vertical-reference-line-width: 1px;\r\n    --vertical-reference-line-stroke-dasharray: none;\r\n\r\n    /*\r\n     * variables that control the style of user provided horizontal reference line\r\n     */\r\n    --horizontal-reference-line-color: rgba(50, 50, 50, .5);\r\n    --horizontal-reference-line-width: 1px;\r\n    --horizontal-reference-line-stroke-dasharray: none;\r\n    --horizontal-reference-line-label-text-color: rgba(30, 30, 30, .9);\r\n    --horizontal-reference-line-label-text-size: .8rem;\r\n\r\n    /*\r\n     * variables that control the style of divider line that is used in Diverging Bar Chart and similar\r\n     */\r\n    --divider-line-color: rgba(0,0,0,.5);\r\n    --divider-line-width: 1px;\r\n}"],sourceRoot:""}]),__webpack_exports__.Z=___CSS_LOADER_EXPORT___},"./src/styles/variables.css":function(__unused_webpack_module,__unused_webpack___webpack_exports__,__webpack_require__){var _node_modules_style_loader_dist_runtime_injectStylesIntoStyleTag_js__WEBPACK_IMPORTED_MODULE_0__=__webpack_require__("./node_modules/style-loader/dist/runtime/injectStylesIntoStyleTag.js"),_node_modules_style_loader_dist_runtime_injectStylesIntoStyleTag_js__WEBPACK_IMPORTED_MODULE_0___default=__webpack_require__.n(_node_modules_style_loader_dist_runtime_injectStylesIntoStyleTag_js__WEBPACK_IMPORTED_MODULE_0__),_node_modules_style_loader_dist_runtime_styleDomAPI_js__WEBPACK_IMPORTED_MODULE_1__=__webpack_require__("./node_modules/style-loader/dist/runtime/styleDomAPI.js"),_node_modules_style_loader_dist_runtime_styleDomAPI_js__WEBPACK_IMPORTED_MODULE_1___default=__webpack_require__.n(_node_modules_style_loader_dist_runtime_styleDomAPI_js__WEBPACK_IMPORTED_MODULE_1__),_node_modules_style_loader_dist_runtime_insertBySelector_js__WEBPACK_IMPORTED_MODULE_2__=__webpack_require__("./node_modules/style-loader/dist/runtime/insertBySelector.js"),_node_modules_style_loader_dist_runtime_insertBySelector_js__WEBPACK_IMPORTED_MODULE_2___default=__webpack_require__.n(_node_modules_style_loader_dist_runtime_insertBySelector_js__WEBPACK_IMPORTED_MODULE_2__),_node_modules_style_loader_dist_runtime_setAttributesWithoutAttributes_js__WEBPACK_IMPORTED_MODULE_3__=__webpack_require__("./node_modules/style-loader/dist/runtime/setAttributesWithoutAttributes.js"),_node_modules_style_loader_dist_runtime_setAttributesWithoutAttributes_js__WEBPACK_IMPORTED_MODULE_3___default=__webpack_require__.n(_node_modules_style_loader_dist_runtime_setAttributesWithoutAttributes_js__WEBPACK_IMPORTED_MODULE_3__),_node_modules_style_loader_dist_runtime_insertStyleElement_js__WEBPACK_IMPORTED_MODULE_4__=__webpack_require__("./node_modules/style-loader/dist/runtime/insertStyleElement.js"),_node_modules_style_loader_dist_runtime_insertStyleElement_js__WEBPACK_IMPORTED_MODULE_4___default=__webpack_require__.n(_node_modules_style_loader_dist_runtime_insertStyleElement_js__WEBPACK_IMPORTED_MODULE_4__),_node_modules_style_loader_dist_runtime_styleTagTransform_js__WEBPACK_IMPORTED_MODULE_5__=__webpack_require__("./node_modules/style-loader/dist/runtime/styleTagTransform.js"),_node_modules_style_loader_dist_runtime_styleTagTransform_js__WEBPACK_IMPORTED_MODULE_5___default=__webpack_require__.n(_node_modules_style_loader_dist_runtime_styleTagTransform_js__WEBPACK_IMPORTED_MODULE_5__),_node_modules_css_loader_dist_cjs_js_ruleSet_1_rules_7_use_1_variables_css__WEBPACK_IMPORTED_MODULE_6__=__webpack_require__("./node_modules/css-loader/dist/cjs.js??ruleSet[1].rules[7].use[1]!./src/styles/variables.css"),options={};options.styleTagTransform=_node_modules_style_loader_dist_runtime_styleTagTransform_js__WEBPACK_IMPORTED_MODULE_5___default(),options.setAttributes=_node_modules_style_loader_dist_runtime_setAttributesWithoutAttributes_js__WEBPACK_IMPORTED_MODULE_3___default(),options.insert=_node_modules_style_loader_dist_runtime_insertBySelector_js__WEBPACK_IMPORTED_MODULE_2___default().bind(null,"head"),options.domAPI=_node_modules_style_loader_dist_runtime_styleDomAPI_js__WEBPACK_IMPORTED_MODULE_1___default(),options.insertStyleElement=_node_modules_style_loader_dist_runtime_insertStyleElement_js__WEBPACK_IMPORTED_MODULE_4___default();_node_modules_style_loader_dist_runtime_injectStylesIntoStyleTag_js__WEBPACK_IMPORTED_MODULE_0___default()(_node_modules_css_loader_dist_cjs_js_ruleSet_1_rules_7_use_1_variables_css__WEBPACK_IMPORTED_MODULE_6__.Z,options),_node_modules_css_loader_dist_cjs_js_ruleSet_1_rules_7_use_1_variables_css__WEBPACK_IMPORTED_MODULE_6__.Z&&_node_modules_css_loader_dist_cjs_js_ruleSet_1_rules_7_use_1_variables_css__WEBPACK_IMPORTED_MODULE_6__.Z.locals&&_node_modules_css_loader_dist_cjs_js_ruleSet_1_rules_7_use_1_variables_css__WEBPACK_IMPORTED_MODULE_6__.Z.locals}}]);