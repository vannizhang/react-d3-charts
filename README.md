# React D3 Charts
React D3 Charts is a library that offers a collection of simple and reusable D3 charts for React and TypeScript.

## Table of Conetnt
- [Installation](#Installation)
- [Docs](#Docs)
  - [Basic Bar Chart](#barchartbasic-component)
  - [Basic Line Chart](#linechartbasic-component)
  - [Sparkline Chart](#sparkline-component)
- [Dependencies](#Dependencies)
- [Storybook](#Storybook)

## Installation

To use React D3 Charts in your project, install it via npm:
```
npm install @vannizhang/@vannizhang/react-d3-charts
```

## Docs

## `BarChartBasic` Component

The `BarChartBasic` component renders a basic bar chart based on the provided data.

### Usage
```sh
import { BarChartBasic } from '@vannizhang/react-d3-charts'
```

### Props
| **Name**      | **Type**                         | **Default**                                  | **Description**                                                                                     |
|---------------|----------------------------------|----------------------------------------------|-----------------------------------------------------------------------------------------------------|
| data          | `BarChartDataItem[]`             | -                                            | The data used to render the bar chart.                                                              |
| showTooltip   | `boolean` (optional)             | false                                        | Determines whether to show a tooltip when the user hovers over a bar element.                       |
| yScaleOptions | `YScaleOptions` (optional)       | -                                            | Options used to customize the scale function for the y-axis.                                        |
| xAxisOptions  | `XAxisOptions` (optional)        | -                                            | Options used to customize the x-axis.                                                               |
| yAxisOptions  | `YAxisOptions` (optional)        | -                                            | Options used to customize the y-axis.                                                               |
| fill          | `string` (optional)              | -                                            | The fill color of the bar rectangles.                                                               |
| innerPadding  | `number` (optional)              | 0.2                                          | The inner padding determines the blank space between bands.                                         |
| width         | `number` (optional)              | -                                            | The width of the chart container. If not provided, it will fit the width of the parent container.   |
| height        | `number` (optional)              | -                                            | The height of the chart container. If not provided, it will fit the height of the parent container. |
| margin        | `SvgContainerMargins` (optional) | `{top: 15, right: 15, bottom: 30,left: 30,}` | Custom margin space around the chart.                                                               |
                                               
### Examples
**Basic**

Here is an example of a basic Bar Chart. Bar charts are effective for representing ordinal or categorical data:
```js
<BarChartBasic
  data={[
    {
      x: '12/1', // A string or numerical value that determines the x position of this item.
      y: 26, // A numerical value that determines the height of this item in Bar chart.
      tooltip: 'this is a tooltip',
    },
    {
      x: '12/2',
      y: 38,
      tooltip: 'this is a tooltip',
    },
    //...
  ]}
/>
```

The `x` field of `BarChartDataItem` can also be a `number`
```js
<BarChartBasic
  data={[
    {
      x: 2018,
      y: 26,
      tooltip: 'this is a tooltip',
    },
    {
      x: 2019,
      y: 38,
      tooltip: 'this is a tooltip',
    },
    //...
  ]}
 />
```

**Customized Style**

Here is an example of customizing `fill` color and `innerPadding` for the bar rectangles; and the `width`, `height` and `margin` of the chart container.
```js
<BarChartBasic
  fill="orange"
  innerPadding={0.05}
  height={150}
  width={350}
  margin={{
    bottom: 30,
    left: 30,
    right: 20,
    top: 15
  }}
  data={[
    {
      x: '12/1',
      y: 26,
    },
    //...
  ]}
/>
```

**Show Tooltip And Reference Line**

Set `showTooltip` to true to show a tooltip when the user hovers over a bar element. 

Plase make sure the `tooltip` field is included in each `BarChartDataItem`.
```js
<BarChartBasic
  showTooltip={true}
  data={[
    {
      x: '12/1',
      y: 26,
      tooltip: 'this is a tooltip',
    },
    {
      x: '12/2',
      y: 38,
      tooltip: 'this is a tooltip',
    },
    //...
  ]}
/>
```

**Customized X Axis Options**

Here is an example of extend ticks on x axis and show them as grid lines: 
```js
<BarChartBasic
  xAxisOptions={{
    showGridLines: true
  }}
  data={[
    {
      x: '12/1',
      y: 26,
    },
    //...
  ]}
/>
```

You can specify values to be used for ticks rather than using the scale’s automatic tick generator:
```js
<BarChartBasic
  xAxisOptions={{
    // only render ticks on a axis for values in this array
    tickValues: ['12/1', '12/5', '12/10'],
  }}
  data={[
    {
      x: '12/1',
      y: 26,
    },
    //...
  ]}
/>
```

You can provide a custom format function mapping a value from the axis Domain to a formatted string for display purposes:
```js
<BarChartBasic
  xAxisOptions={{
    // a format function to convert default value (e.g. '12/1') into a different format (e.g. '12-1')
    tickFormatFunction: (val: number | string) => {

        if(typeof val === 'number'){
            val = val.toString();
        }

        const [month, day] = val.split('/');
        return `${month}-${day}`;
    }
  }}
  data={[
    {
      x: '12/1',
      y: 26,
    },
    //...
  ]}
/>
```

**Customized X Axis Options**

Here is an example of extend ticks on y axis and show them as grid lines: 
```js
<BarChartBasic
  yAxisOptions={{
    showGridLines: true
  }}
  data={[
    {
      x: '12/1',
      y: 26,
    },
    //...
  ]}
/>
```

You can indicate number of ticks on y axis that should be rendered, If not provided, d3 will try to render as many ticks as possible.
```js
<BarChartBasic
  yAxisOptions={{
    numberOfTicks: 3
  }}
  data={[
    {
      x: '12/1',
      y: 26,
    },
    //...
  ]}
/>
```

**Customized Options For Y Scale**

Here is an example of using customized options for Y Scale. 

You can provide a custom `domain` used to create the scale function for the y-axis. If not provided, the domain will be determined by the maximum values of the `y` property among all items, and the minimum value of the domain will be 0.
```js
<BarChartBasic
  yScaleOptions={{
    domain: [ 0, 200 ]
  }}
  data={[
    {
      x: '12/1',
      y: 26,
    },
    //...
  ]}
/>
```

## `LineChartBasic` Component
The `LineChartBasic` component renders a basic line chart based on the provided data.

### Usage
```sh
import { LineChartBasic } from '@vannizhang/react-d3-charts'
```

### Props
 **Name**      | **Type**                         | **Default** | **Description**                                                                                     
---------------|----------------------------------|-------------|-----------------------------------------------------------------------------------------------------
 data          | `LineChartDataItem[]`            | -           | An array of `LineChartDataItem` objects that will be used to plot the line chart.                     
 showTooltip   | `boolean` (optional)             | false       | If set to true, displays a tooltip when the user hovers over the chart.                             
 xScaleOptions | `XScaleOptions` (optional)       | -           | Options used to create a scale function for the x-axis.                                             
 yScaleOptions | `YScaleOptions` (optional)       | -           | Options used to create a scale function for the y-axis.                                             
 xAxisOptions  | `XAxisOptions` (optional)        | -           | Options for customizing the x-axis.                                                                 
 yAxisOptions  | `YAxisOptions` (optional)        | -           | Options for customizing the y-axis.                                                                 
 stroke        | `string` (optional)              | -           | The stroke color of the line.                                                                       
 strokeWidth   | `number` (optional)              | -           | The width of the line.                                                                              
 width         | `number` (optional)              | -           | The width of the chart container. If not provided, it will fit the width of the parent container.   
 height        | `number` (optional)              | -           | The height of the chart container. If not provided, it will fit the height of the parent container. 
 margin        | `SvgContainerMargins` (optional) | -           | Custom margins for the chart container.                                                             

### Examples

**Basic**

Here is an example of a basic Line Chart, the `x` field of the `LineChartDataItem` should always be numerical value.
```js
<LineChartBasic
  data={[
    {
      x: 2013,
      y: 26,
      tooltip: 'this is a tooltip',
    },
    {
      x: 2014,
      y: 38,
      tooltip: 'this is a tooltip',
    },
    {
      x: 2015,
      y: 10,
      tooltip: 'this is a tooltip',
    }
  ]}
/>
```

**Customized Style**

Here is an example of customizing stroke color and width for the line; and the `width`, `height` and `margin` of the chart container.
```js
<LineChartBasic
  stroke="orange"
  strokeWidth={3}
  height={150}
  width={350}
  margin={{
    bottom: 30,
    left: 30,
    right: 20,
    top: 15
  }}
  data={[
    {
      x: 2013,
      y: 26,
    },
    //...
  ]}
/>
```

**Show Tooltip And Reference Line**

Set `showTooltip` to true to show a tooltip when the user moves mouse pointer. 

Plase make sure the `tooltip` field is included in each `LineChartDataItem`.
```js
<LineChartBasic
  showTooltip
  data={[
    {
      x: 2013,
      y: 26,
      tooltip: 'this is a tooltip',
    },
    {
      x: 2014,
      y: 38,
      tooltip: 'this is a tooltip',
    },
    //...
  ]}
/>
```

**Customized X Axis Options**

Here is an example of using customized options for x axis:
```js
<LineChartBasic
  xAxisOptions={{
    /*
     * Indicate number of ticks that should be renderd on x axis
     */
    numberOfTicks: 3,
    /*
     * extend ticks on x axis and show them as grid lines
     */
    showGridLines: true,
    /*
     * provide a custom format function mapping a value from the axis Domain to a formatted string for display purposes:
     */
    tickFormatFunction: (val: number | string) => {
        return val.toString();
    },
  }}
  data={[
    {
      x: 2013,
      y: 26,
    },
    //...
  ]}
/>
```

**Customized Y Axis Options**

Here is an example of using customized options for y axis:
```js
<LineChartBasic
  yAxisOptions={{
    /*
     * Indicate number of ticks that should be renderd on y axis
     */
    numberOfTicks: 2,
    /*
     * Extend ticks on y axis and show them as grid lines
     */
    showGridLines: true,
    /*
     * Provide a custom format function mapping a value from the axis Domain to a formatted string for display purposes:
     */
    tickFormatFunction: (val: number | string) => {
        return '+' + val.toString();
    },
  }}
  data={[
    {
      x: 2013,
      y: 26,
    },
    //...
  ]}
/>
```

**Customized Options For X Scale**

Here is an example of using time scale for x-axis instead of the linear scale.

When using time scale, it's recommended to also provide a `tickFormatFunction` in `xAxisOptions` that can create formatted ticks on x-axis.
```js
<LineChartBasic
  xScaleOptions={{
    useTimeScale: true
  }}
  xAxisOptions={{
    tickFormatFunction: (val: number | string) => {
        return new Date(val).getFullYear().toString();
    },
  }}
  data={[
    {
      x: 2013,
      y: 26,
    },
    //...
  ]}
/>
```

**Customized Options For Y Scale**

You can provide a custom `domain` used to create the scale function for the y-axis. If not provided, the domain will be determined by the maximum values of the `y` property among all items, and the minimum value of the domain will be 0.
```js
<LineChartBasic
  yScaleOptions={{
    domain: [ 0, 200 ]
  }}
  data={[
    {
      x: 2013,
      y: 26,
    },
    //...
  ]}
/>
```

## `BarLineComboChart` Component

The `BarLineComboChart` is a type of graph that combines two different types of visualization: bar chart and line chart. It is used to display and compare different data series that have different scales or units of measurement.

### Usage
```sh
import { BarLineComboChart } from '@vannizhang/react-d3-charts'
```

### Props
| **Name**      | **Type**                         | **Default**                                  | **Description**                                                                                     |
|---------------|----------------------------------|----------------------------------------------|-----------------------------------------------------------------------------------------------------|
| data          | `BarLineComboChartDataItem[]`             | -                                   | The data used to render the bar and line combo chart.                                                         |
| showTooltip   | `boolean` (optional)             | false                                        | Determines whether to show a tooltip when the user hovers over a bar element.                       |
| yScaleOptions | `YScaleOptions` (optional)       | -                                            | Options used to customize the scale function for the y-axis.                                        |
| xAxisOptions  | `XAxisOptions` (optional)        | -                                            | Options used to customize the x-axis.                                                               |
| yAxisOptions  | `YAxisOptions` (optional)        | -                                            | Options used to customize the y-axis.                                                               |
| fill          | `string` (optional)              | -                                            | The fill color of the bar rectangles.                                                               |
| strokeColor   | `string` (optional)              | -                                            | The stroke color of the line.                                                                       |
| strokeWidth   | `number` (optional)              | -                                            | The width of the line.                                                                              |
| innerPadding  | `number` (optional)              | 0.2                                          | The inner padding determines the blank space between bands.                                         |
| width         | `number` (optional)              | -                                            | The width of the chart container. If not provided, it will fit the width of the parent container.   |
| height        | `number` (optional)              | -                                            | The height of the chart container. If not provided, it will fit the height of the parent container. |
| margin        | `SvgContainerMargins` (optional) | `{top: 15, right: 15, bottom: 30,left: 30,}` | Custom margin space around the chart.                                                               |
                                               
### Examples
**Basic**

Here is an example of a Bar and Line Combo Chart, `yBar` is a numerical value that determines the height of Bar that represents this item, and `yLine` is numerical value that determines the y position of the node in the Line that represents this item
```js
<BarLineComboChart
  data={[
    {
        x: '12/1',
        yBar: 26,
        yLine: 10,
        tooltip: 'this is a tooltip',
    },
    {
        x: '12/2',
        yBar: 38,
        yLine: 36,
        tooltip: 'this is a tooltip',
    },
    //...
  ]}
/>
```

**Customized Style**

Here is an example of customizing `fill` color and `innerPadding` for the bar rectangles; `stroke` color of the line; and the `width`, `height` and `margin` of the chart container.
```js
<BarLineComboChart
  fill="orange"
  strokeColor='lightseagreen'
  innerPadding={0.05}
  height={150}
  width={350}
  margin={{
    bottom: 30,
    left: 30,
    right: 20,
    top: 15
  }}
  data={[
    {
        x: '12/1',
        yBar: 26,
        yLine: 10,
        tooltip: 'this is a tooltip',
    },
    //...
  ]}
/>
```

**Show Tooltip And Reference Line**

Set `showTooltip` to true to show a tooltip when the user hovers over a bar element. 

Plase make sure the `tooltip` field is included in each `BarLineComboChartDataItem`.
```js
<BarLineComboChart
  showTooltip={true}
  data={[
    {
      x: '12/1',
      yBar: 26,
      yLine: 10,
      tooltip: 'this is a tooltip',
    },
    //...
  ]}
/>
```

## `Sparkline` Component
The `Sparkline` component renders a tiny line chart using an array of numbers as input data.

### Usage
```sh
import { Sparkline } from '@vannizhang/react-d3-charts'
```

### Props
 **Name**      | **Type**                         | **Default** | **Description**                                                                                     
---------------|----------------------------------|-------------|-----------------------------------------------------------------------------------------------------
 data          | `number[]`                       | -           | Array of numbers that will be used to plot the Sparkline Chart.                     
 stroke        | `string` (optional)              | -           | The stroke color of the line.                                                                       
 strokeWidth   | `number` (optional)              | -           | The width of the line.                                                                              
 width         | `number` (optional)              | -           | The width of the chart container. If not provided, it will fit the width of the parent container.   
 height        | `number` (optional)              | -           | The height of the chart container. If not provided, it will fit the height of the parent container. 
 margin        | `SvgContainerMargins` (optional) | -           | Custom margins for the chart container.                                                             

### Examples

**Basic**

Here is an example of plotting a sparkline chart.
```js
<Sparkline
  data={[5, 16, 26 ,31, 7, 9, 14, 38]}
/>
```

**Customized Style**

Here is an example of customizing stroke color and width for the sparkline; and the `width`, `height` and `margin` of the chart container.
```js
<Sparkline
  stroke="orange"
  strokeWidth={1}
  height={20}
  width={60}
  margin={{
    bottom: 0,
    left: 0,
    right: 0,
    top: 0
  }}
  data={[5, 16, 26 ,31, 7, 9, 14, 38]}
/>
```

## Dependencies
- React (version 18)
- D3.js (version 7)

## Storybook
Storybook provides a sandbox environment where you can interactively develop and test the components in isolation.

To test the components locally, run the following command:
```sh
npm run storybook
```

You can also generate static output (saved in the `/docs` folder) of the Storybook using:
```sh
npm run build-storybook
```

## License
This library is licensed under the [Apache License](./LICENSE)