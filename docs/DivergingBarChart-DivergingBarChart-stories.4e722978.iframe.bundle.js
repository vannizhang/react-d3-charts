"use strict";(self.webpackChunk_vannizhang_react_d3_charts=self.webpackChunk_vannizhang_react_d3_charts||[]).push([[360],{"./src/DivergingBarChart/DivergingBarChart.stories.tsx":function(__unused_webpack_module,__webpack_exports__,__webpack_require__){__webpack_require__.r(__webpack_exports__),__webpack_require__.d(__webpack_exports__,{BasicExample:function(){return BasicExample},CustomizedOptionsForYScale:function(){return CustomizedOptionsForYScale},CustomizedStyles:function(){return CustomizedStyles},CustomizedXAxisOptions:function(){return CustomizedXAxisOptions},CustomizedYAxisOptions:function(){return CustomizedYAxisOptions},ShowTooltipAndReferenceLine:function(){return ShowTooltipAndReferenceLine},__namedExportsOrder:function(){return __namedExportsOrder},default:function(){return DivergingBarChart_stories}});var react=__webpack_require__("./node_modules/react/index.js"),src=(__webpack_require__("./src/styles/variables.css"),__webpack_require__("./node_modules/d3/src/index.js")),SvgContainer=__webpack_require__("./src/SvgContainer/SvgContainer.tsx"),jsx_runtime=__webpack_require__("./node_modules/react/jsx-runtime.js");const Bars=({xScale:xScale,yScale:yScale,data:data,svgContainerData:svgContainerData,fill:fill="steelblue"})=>{const barsGroup=(0,react.useRef)();return(0,react.useEffect)((()=>{svgContainerData&&xScale&&yScale&&data&&(()=>{const{dimension:dimension}=svgContainerData,existingBars=(0,src.Ys)(barsGroup.current).selectAll("rect");existingBars.size()&&existingBars.remove(),(0,src.Ys)(barsGroup.current).selectAll("rect").data(data).enter().append("rect").style("fill",(d=>d.fill||fill)).attr("x",(d=>"number"==typeof d.x?xScale(d.x.toString()):xScale(d.x))).attr("width",xScale.bandwidth()).attr("y",(d=>yScale(Math.max(0,d.y)))).attr("height",(d=>Math.abs(yScale(d.y)-yScale(0))))})()}),[xScale,yScale,data]),(0,jsx_runtime.jsx)("g",{ref:barsGroup,className:"bar-group"})};Bars.displayName="Bars";var DivergingBarChart_Bars=Bars;try{Bars.displayName="Bars",Bars.__docgenInfo={description:"",displayName:"Bars",props:{xScale:{defaultValue:null,description:"",name:"xScale",required:!0,type:{name:"ScaleBand<string | number>"}},yScale:{defaultValue:null,description:"",name:"yScale",required:!0,type:{name:"ScaleLinear<number, number, never>"}},svgContainerData:{defaultValue:null,description:"",name:"svgContainerData",required:!1,type:{name:"SvgContainerData"}},data:{defaultValue:null,description:"",name:"data",required:!0,type:{name:"DivergingBarChartDataItem[]"}},fill:{defaultValue:{value:"steelblue"},description:"fill color of bar rects",name:"fill",required:!1,type:{name:"string"}}}},"undefined"!=typeof STORYBOOK_REACT_CLASSES&&(STORYBOOK_REACT_CLASSES["src/DivergingBarChart/Bars.tsx#Bars"]={docgenInfo:Bars.__docgenInfo,name:"Bars",path:"src/DivergingBarChart/Bars.tsx#Bars"})}catch(__react_docgen_typescript_loader_error){}var BottomAxis=__webpack_require__("./src/Axis/BottomAxis.tsx"),LeftAxis=__webpack_require__("./src/Axis/LeftAxis.tsx"),PointerEventsOverlay=__webpack_require__("./src/PointerEventOverlay/PointerEventsOverlay.tsx"),TooltipOnTop=__webpack_require__("./src/Tooltip/TooltipOnTop.tsx"),constants=__webpack_require__("./src/SvgContainer/constants.ts"),VerticalCrosshairLine=__webpack_require__("./src/CrosshairReferenceLine/VerticalCrosshairLine.tsx");const HorizontalDividerLine=({xScale:xScale,yScale:yScale,svgContainerData:svgContainerData})=>{const containerGroupRef=(0,react.useRef)();return(0,react.useEffect)((()=>{svgContainerData&&(()=>{const{dimension:dimension}=svgContainerData,{width:width}=dimension,group=(0,src.Ys)(containerGroupRef.current),refLine=group.select("line");refLine.size()?refLine.attr("x1",0).attr("x2",width):group.append("line").attr("x1",0).attr("y1",yScale(0)).attr("x2",width).attr("y2",yScale(0)).attr("stroke-width","var(--divider-line-width)").attr("stroke","var(--divider-line-color)").style("fill","none")})()}),[svgContainerData]),(0,jsx_runtime.jsx)("g",{className:"divider-line-group",ref:containerGroupRef})};HorizontalDividerLine.displayName="HorizontalDividerLine";try{HorizontalDividerLine.displayName="HorizontalDividerLine",HorizontalDividerLine.__docgenInfo={description:"",displayName:"HorizontalDividerLine",props:{xScale:{defaultValue:null,description:"",name:"xScale",required:!0,type:{name:"ScaleBand<string | number>"}},yScale:{defaultValue:null,description:"",name:"yScale",required:!0,type:{name:"ScaleLinear<number, number, never>"}},svgContainerData:{defaultValue:null,description:"",name:"svgContainerData",required:!1,type:{name:"SvgContainerData"}}}},"undefined"!=typeof STORYBOOK_REACT_CLASSES&&(STORYBOOK_REACT_CLASSES["src/DivergingBarChart/HorizontalDividerLine.tsx#HorizontalDividerLine"]={docgenInfo:HorizontalDividerLine.__docgenInfo,name:"HorizontalDividerLine",path:"src/DivergingBarChart/HorizontalDividerLine.tsx#HorizontalDividerLine"})}catch(__react_docgen_typescript_loader_error){}const DivergingBarChart=({data:data,showTooltip:showTooltip=!1,yScaleOptions:yScaleOptions={},bottomAxisOptions:bottomAxisOptions={},leftAxisOptions:leftAxisOptions={},fill:fill,innerPadding:innerPadding=.2,width:width,height:height,margin:margin=constants.A})=>{const[dimension,setDimension]=(0,react.useState)({height:0,width:0}),[hoveredChartItem,setHoveredChartItem]=(0,react.useState)(),xDomain=(0,react.useMemo)((()=>data&&data.length?data.map((d=>"number"==typeof d.x?d.x.toString():d.x)):[]),[data]),xScale=(0,react.useMemo)((()=>{const{width:width}=dimension;return(0,src.tiA)().paddingInner(innerPadding).range([0,width]).domain(xDomain)}),[dimension,xDomain]),yScale=(0,react.useMemo)((()=>{const{height:height}=dimension;let domain=yScaleOptions?.domain||[];if(!domain.length){const absYMax=data&&data.length?(0,src.Fp7)(data,(d=>Math.abs(d.y))):0;domain=[0-absYMax,absYMax]}return(0,src.BYU)().range([height,0]).domain(domain)}),[dimension,data,yScaleOptions]);return(0,jsx_runtime.jsxs)("div",{style:{position:"relative",width:width||"100%",height:height||"100%"},children:[(0,jsx_runtime.jsxs)(SvgContainer.Z,{margin:margin,dimensionOnChange:setDimension,children:[(0,jsx_runtime.jsx)(DivergingBarChart_Bars,{data:data,xScale:xScale,yScale:yScale,fill:fill}),(0,jsx_runtime.jsx)(HorizontalDividerLine,{xScale:xScale,yScale:yScale}),(0,jsx_runtime.jsx)(BottomAxis.U,{scale:xScale,showGridLines:bottomAxisOptions.showGridLines,tickValues:bottomAxisOptions.tickValues,tickFormatFunction:bottomAxisOptions.tickFormatFunction,shouldRotateTextLabels:bottomAxisOptions.shouldRotateTextLabels}),(0,jsx_runtime.jsx)(LeftAxis.M,{scale:yScale,showGridLines:leftAxisOptions.showGridLines,numberOfTicks:leftAxisOptions.numberOfTicks,tickFormatFunction:leftAxisOptions.tickFormatFunction}),showTooltip?(0,jsx_runtime.jsx)(VerticalCrosshairLine.H,{xPosition:hoveredChartItem?hoveredChartItem.xPosition:null}):(0,jsx_runtime.jsx)(jsx_runtime.Fragment,{}),(0,jsx_runtime.jsx)(PointerEventsOverlay.X,{xScale:xScale,xDomain:xDomain,hoveredChartItemOnChange:setHoveredChartItem})]}),showTooltip&&hoveredChartItem&&(0,jsx_runtime.jsx)(TooltipOnTop.d,{content:data[hoveredChartItem.index]?.tooltip,xPosition:hoveredChartItem.xPosition,dimension:dimension,margin:margin})]})};DivergingBarChart.displayName="DivergingBarChart";try{DivergingBarChart.displayName="DivergingBarChart",DivergingBarChart.__docgenInfo={description:"A diverging bar chart is a type of bar chart that can be used to visualize the spread between values, generally positive and negative.",displayName:"DivergingBarChart",props:{data:{defaultValue:null,description:"The data used to render the diverging bar chart.",name:"data",required:!0,type:{name:"DivergingBarChartDataItem[]"}},showTooltip:{defaultValue:{value:"false"},description:"Determines whether to show a tooltip when the user hovers over a bar element.",name:"showTooltip",required:!1,type:{name:"boolean"}},yScaleOptions:{defaultValue:{value:"{}"},description:"Options used to customize the scale function for the y-axis.",name:"yScaleOptions",required:!1,type:{name:"YScaleOptions"}},bottomAxisOptions:{defaultValue:{value:"{}"},description:"Options used to customize the x-axis at bottom.",name:"bottomAxisOptions",required:!1,type:{name:"BottomAxisOptions"}},leftAxisOptions:{defaultValue:{value:"{}"},description:"Options used to customize the y-axis at left.",name:"leftAxisOptions",required:!1,type:{name:"LeftAxisOptions"}},fill:{defaultValue:null,description:"The fill color of the bar rectangles.",name:"fill",required:!1,type:{name:"string"}},innerPadding:{defaultValue:{value:"0.2"},description:"The inner padding determines the blank space between bands.\nThe value which must be in the range [0, 1]. A value `0` of innerPadding indicates no blank space betwwen bands.\nThe default value is 0.2.",name:"innerPadding",required:!1,type:{name:"number"}},width:{defaultValue:null,description:"The width of the chart container. If not provided, it will fit the width of the parent container.",name:"width",required:!1,type:{name:"number"}},height:{defaultValue:null,description:"The height of the chart container. If not provided, it will fit the height of the parent container.",name:"height",required:!1,type:{name:"number"}},margin:{defaultValue:{value:"{\n    top: 15,\n    right: 15,\n    bottom: 30,\n    left: 30,\n}"},description:"Custom margin space around the chart area.",name:"margin",required:!1,type:{name:"SvgContainerMargins"}}}},"undefined"!=typeof STORYBOOK_REACT_CLASSES&&(STORYBOOK_REACT_CLASSES["src/DivergingBarChart/DivergingBarChart.tsx#DivergingBarChart"]={docgenInfo:DivergingBarChart.__docgenInfo,name:"DivergingBarChart",path:"src/DivergingBarChart/DivergingBarChart.tsx#DivergingBarChart"})}catch(__react_docgen_typescript_loader_error){}const data=[{x:"Trees",y:-40,tooltip:"this is a tooltip",fill:"green"},{x:"Water",y:-10,tooltip:"this is a tooltip",fill:"dodgerblue"},{x:"Crops",y:25,tooltip:"this is a tooltip",fill:"wheat"},{x:"Built",y:38,tooltip:"this is a tooltip",fill:"red"},{x:"Bare",y:22,tooltip:"this is a tooltip",fill:"lightgrey"},{x:"Range",y:50,tooltip:"this is a tooltip",fill:"khaki"}];var DivergingBarChart_stories={title:"Example/DivergingBarChart",component:DivergingBarChart,decorators:[Story=>(0,jsx_runtime.jsx)("div",{style:{width:"100%",height:"100%"},children:(0,jsx_runtime.jsx)(Story,{})})],tags:["autodocs"]};const BasicExample={args:{data:data}},CustomizedStyles={args:{data:[{x:2018,y:-40,tooltip:"this is a tooltip"},{x:2019,y:-10,tooltip:"this is a tooltip"},{x:2020,y:25,tooltip:"this is a tooltip"},{x:2021,y:38,tooltip:"this is a tooltip"},{x:2022,y:22,tooltip:"this is a tooltip"},{x:2023,y:50,tooltip:"this is a tooltip"}],fill:"orange",innerPadding:.05,width:450,height:300}},ShowTooltipAndReferenceLine={args:{data:data,showTooltip:!0}},CustomizedXAxisOptions={args:{data:data,bottomAxisOptions:{showGridLines:!0,shouldRotateTextLabels:!0,tickFormatFunction:val=>("number"==typeof val&&(val=val.toString()),`Change of ${val}`)},height:300,margin:{...constants.A,bottom:120}}},CustomizedYAxisOptions={args:{data:data,leftAxisOptions:{showGridLines:!0,numberOfTicks:3,tickFormatFunction:(domainValue,index)=>domainValue+"%"}}},CustomizedOptionsForYScale={args:{data:data,yScaleOptions:{domain:[-200,200]}}};BasicExample.parameters={...BasicExample.parameters,docs:{...BasicExample.parameters?.docs,source:{originalSource:"{\n  // More on args: https://storybook.js.org/docs/react/writing-stories/args\n  args: {\n    data\n  }\n}",...BasicExample.parameters?.docs?.source}}},CustomizedStyles.parameters={...CustomizedStyles.parameters,docs:{...CustomizedStyles.parameters?.docs,source:{originalSource:"{\n  // More on args: https://storybook.js.org/docs/react/writing-stories/args\n  args: {\n    data: dataNumbericalX,\n    fill: 'orange',\n    innerPadding: 0.05,\n    width: 450,\n    height: 300\n  }\n}",...CustomizedStyles.parameters?.docs?.source}}},ShowTooltipAndReferenceLine.parameters={...ShowTooltipAndReferenceLine.parameters,docs:{...ShowTooltipAndReferenceLine.parameters?.docs,source:{originalSource:"{\n  // More on args: https://storybook.js.org/docs/react/writing-stories/args\n  args: {\n    data,\n    showTooltip: true\n  }\n}",...ShowTooltipAndReferenceLine.parameters?.docs?.source}}},CustomizedXAxisOptions.parameters={...CustomizedXAxisOptions.parameters,docs:{...CustomizedXAxisOptions.parameters?.docs,source:{originalSource:"{\n  // More on args: https://storybook.js.org/docs/react/writing-stories/args\n  args: {\n    data,\n    bottomAxisOptions: {\n      /**\r\n       * set to true to extend ticks on x axis and show them as grid lines\r\n       */\n      showGridLines: true,\n      // /**\n      //  * Specified values to be used for ticks rather than using the scale’s automatic tick generator.\n      //  */\n      // tickValues: ['Trees', 'Crops', 'Bare'],\n      shouldRotateTextLabels: true,\n      /**\r\n       * You can provide a custom format function mapping a value from the axis Domain to a formatted string for display purposes.\r\n       * @param val\r\n       * @returns\r\n       */\n      tickFormatFunction: (val: number | string) => {\n        if (typeof val === 'number') {\n          val = val.toString();\n        }\n        return `Change of ${val}`;\n      }\n    },\n    height: 300,\n    margin: {\n      ...DEFAULT_MARGINS,\n      bottom: 120\n    }\n  }\n}",...CustomizedXAxisOptions.parameters?.docs?.source}}},CustomizedYAxisOptions.parameters={...CustomizedYAxisOptions.parameters,docs:{...CustomizedYAxisOptions.parameters?.docs,source:{originalSource:"{\n  // More on args: https://storybook.js.org/docs/react/writing-stories/args\n  args: {\n    data,\n    leftAxisOptions: {\n      showGridLines: true,\n      numberOfTicks: 3,\n      tickFormatFunction: (domainValue, index) => {\n        return domainValue + '%';\n      }\n    }\n  }\n}",...CustomizedYAxisOptions.parameters?.docs?.source}}},CustomizedOptionsForYScale.parameters={...CustomizedOptionsForYScale.parameters,docs:{...CustomizedOptionsForYScale.parameters?.docs,source:{originalSource:"{\n  // More on args: https://storybook.js.org/docs/react/writing-stories/args\n  args: {\n    data,\n    yScaleOptions: {\n      domain: [-200, 200]\n    }\n  }\n}",...CustomizedOptionsForYScale.parameters?.docs?.source}}};const __namedExportsOrder=["BasicExample","CustomizedStyles","ShowTooltipAndReferenceLine","CustomizedXAxisOptions","CustomizedYAxisOptions","CustomizedOptionsForYScale"]}}]);