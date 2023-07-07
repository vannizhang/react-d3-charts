# React D3 Charts
React D3 Charts is a library that offers a collection of simple and reusable charts with D3, React and TypeScript.

## Table of Conetnt
- [Installation](#Installation)
- [Docs](#Docs)
  - [Basic Bar Chart](#basic-bar-chart)
  - [Basic Line Chart](#basic-line-chart)
  - [Bar and Line Combo Chart](#bar-and-line-combo-chart)
  - [Horizontal Bar Chart](#horizontal-bar-chart)
  - [Pie Chart](#pie-chart)
  - [Sparkline Chart](#sparkline-component)
- [Dependencies](#Dependencies)
- [Storybook](#Storybook)

## Installation

To use React D3 Charts in your project, install it via npm:
```sh
npm install @vannizhang/react-d3-charts
```

## Docs

## Basic Bar Chart

See [examples](https://vannizhang.github.io/react-d3-charts/?path=/docs/example-barchartbasic--docs).

### Usage
```sh
import { BarChartBasic } from '@vannizhang/react-d3-charts'
```

### Props
| **Name**          | **Type**                                                    | **Default**                                  | **Description**                                                                                     |
|-------------------|-------------------------------------------------------------|----------------------------------------------|-----------------------------------------------------------------------------------------------------|
| data              | [`BarChartDataItem[]`](./src/BarChart/types.ts)             | -                                            | The data used to render the bar chart.                                                              |
| showTooltip       | `boolean` (optional)                                        | false                                        | Determines whether to show a tooltip when the user hovers over a bar element.                       |
| yScaleOptions     | [`YScaleOptions`](./src/BarChart/types.ts) (optional)       | -                                            | Options used to customize the scale function for the y-axis.                                        |
| bottomAxisOptions | [`BottomAxisOptions`](./src/Axis/types.ts) (optional)       | -                                            | Options used to customize the x-axis at bottom.                                                     |
| leftAxisOptions   | [`LeftAxisOptions`](./src/Axis/types.ts) (optional)         | -                                            | Options used to customize the y-axis at left.                                                       |
| fill              | `string` (optional)                                         | -                                            | The fill color of the bar rectangles.                                                               |
| innerPadding      | `number` (optional)                                         | 0.2                                          | The inner padding determines the blank space between bands.                                         |
| width             | `number` (optional)                                         | -                                            | The width of the chart container. If not provided, it will fit the width of the parent container.   |
| height            | `number` (optional)                                         | -                                            | The height of the chart container. If not provided, it will fit the height of the parent container. |
| margin            | `SvgContainerMargins` (optional)                            | `{top: 15, right: 15, bottom: 30,left: 30,}` | Custom margin space around the chart.                                                               |

                                               
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

**Customized Options for X Axis at Bottom**

Here is an example of rotate text labels on x axis to provide more space: 
```js
<BarChartBasic
  bottomAxisOptions={{
    shouldRotateTextLabels: true
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

Here is an example of extend ticks on x axis and show them as grid lines: 
```js
<BarChartBasic
  bottomAxisOptions={{
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
  bottomAxisOptions={{
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
  bottomAxisOptions={{
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

**Customized Options for Y Axis at left**

Here is an example of extend ticks on y axis and show them as grid lines: 
```js
<BarChartBasic
  leftAxisOptions={{
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
  leftAxisOptions={{
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

## Basic Line Chart

See [examples](https://vannizhang.github.io/react-d3-charts/?path=/docs/example-linechartbasic--docs).

### Usage
```sh
import { LineChartBasic } from '@vannizhang/react-d3-charts'
```

### Props
| **Name**          | **Type**                                                    | **Default** | **Description**                                                                                     | 
|-------------------|-------------------------------------------------------------|-------------|-----------------------------------------------------------------------------------------------------|
| data              | [`LineChartDataItem[]`](./src/LineChart/types.ts)           | -           | An array of `LineChartDataItem` objects that will be used to plot the line chart.                   |
| showTooltip       | `boolean` (optional)                                        | false       | If set to true, displays a tooltip when the user hovers over the chart.                             |
| xScaleOptions     | [`XScaleOptions`](./src/LineChart/types.ts) (optional)      | -           | Options used to create a scale function for the x-axis.                                             |
| yScaleOptions     | [`YScaleOptions`](./src/LineChart/types.ts) (optional)      | -           | Options used to create a scale function for the y-axis.                                             |
| bottomAxisOptions | [`BottomAxisOptions`](./src/Axis/types.ts) (optional)       | -           | Options used to customize the x-axis at bottom.                                                     |
| leftAxisOptions   | [`LeftAxisOptions`](./src/Axis/types.ts) (optional)         | -           | Options used to customize the y-axis at left.                                                       |
| stroke            | `string` (optional)                                         | -           | The stroke color of the line.                                                                       |
| strokeWidth       | `number` (optional)                                         | -           | The width of the line.                                                                              |
| width             | `number` (optional)                                         | -           | The width of the chart container. If not provided, it will fit the width of the parent container.   |
| height            | `number` (optional)                                         | -           | The height of the chart container. If not provided, it will fit the height of the parent container. |
| margin            | `SvgContainerMargins` (optional)                            | -           | Custom margins for the chart container.                                                             |
                                                   

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
  bottomAxisOptions={{
    /*
     * Indicate number of ticks that should be renderd on x axis
     */
    numberOfTicks: 3,
    /**
     * rotate the label text to provide more space
     */
    shouldRotateTextLabels: true
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

**Customized Options for Y Axis at Left**

Here is an example of using customized options for y axis:
```js
<LineChartBasic
  leftAxisOptions={{
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

When using time scale, it's recommended to also provide a `tickFormatFunction` in `bottomAxisOptions` that can create formatted ticks on x-axis.
```js
<LineChartBasic
  xScaleOptions={{
    useTimeScale: true
  }}
  bottomAxisOptions={{
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

## Bar and Line Combo Chart

The Bar and Line Combo Chart is a type of graph that combines two different types of visualization: bar chart and line chart. 

It is used to display and compare different data series that have different scales or units of measurement. 

See [examples](https://vannizhang.github.io/react-d3-charts/?path=/docs/example-barlinecombochart--docs).

### Usage
```sh
import { BarLineComboChart } from '@vannizhang/react-d3-charts'
```

### Props
| **Name**          | **Type**                                                          | **Default**                                  | **Description**                                                                                     |
|-------------------|-------------------------------------------------------------------|----------------------------------------------|-----------------------------------------------------------------------------------------------------|
| data              | [`BarLineComboChartDataItem[]`](./src/BarLineComboChart/types.ts) | -                                            | The data used to render the bar and line combo chart.                                               |
| showTooltip       | `boolean` (optional)                                              | false                                        | Determines whether to show a tooltip when the user hovers over a bar element.                       |
| yScaleOptions     | `YScaleOptions` (optional)                                        | -                                            | Options used to customize the scale function for the y-axis.                                        |
| bottomAxisOptions | [`BottomAxisOptions`](./src/Axis/types.ts) (optional)             | -                                            | Options used to customize the x-axis at bottom.                                                     |
| leftAxisOptions   | [`LeftAxisOptions`](./src/Axis/types.ts) (optional)               | -                                            | Options used to customize the y-axis at left.                                                       |
| fill              | `string` (optional)                                               | -                                            | The fill color of the bar rectangles.                                                               |
| strokeColor       | `string` (optional)                                               | -                                            | The stroke color of the line.                                                                       |
| strokeWidth       | `number` (optional)                                               | -                                            | The width of the line.                                                                              |
| innerPadding      | `number` (optional)                                               | 0.2                                          | The inner padding determines the blank space between bands.                                         |
| width             | `number` (optional)                                               | -                                            | The width of the chart container. If not provided, it will fit the width of the parent container.   |
| height            | `number` (optional)                                               | -                                            | The height of the chart container. If not provided, it will fit the height of the parent container. |
| margin            | `SvgContainerMargins` (optional)                                  | `{top: 15, right: 15, bottom: 30,left: 30,}` | Custom margin space around the chart.                                                               |

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

## Horizontal Bar Chart

A horizontal bar chart is a type of graph that uses rectangular bars to present data. 

The length of the bars is proportional to the values they represent. Horizontal bar charts are used to display comparisons between categories of data.

See [exmaples](https://vannizhang.github.io/react-d3-charts/?path=/docs/example-barlinecombochart--docs).

### Usage
```sh
import { HorizontalBarChart } from '@vannizhang/react-d3-charts'
```

### Props
| **Name**          | **Type**                                                            | **Default**                                  | **Description**                                                                                     |
|-------------------|---------------------------------------------------------------------|----------------------------------------------|-----------------------------------------------------------------------------------------------------|
| data              | [`HorizontalBarChartDataItem[]`](./src/HorizontalBarChart/types.ts) | -                                            | The data used to render the horizontal bar chart.                                                   |
| xScaleOptions     | `YScaleOptions` (optional)                                          | -                                            | Options used to customize the scale function for the y-axis.                                        |
| bottomAxisOptions | [`BottomAxisOptions`](./src/HorizontalBarChart/types.ts) (optional) | -                                            | Options used to customize the bottom axis.                                                          |
| leftAxisOptions   | [`LeftAxisOptions`](./src/HorizontalBarChart/types.ts)  (optional)  | -                                            | Options used to customize the left axis.                                                            |
| fill              | `string` (optional)                                                 | -                                            | The fill color of the bar rectangles.                                                               |
| innerPadding      | `number` (optional)                                                 | 0.2                                          | The inner padding determines the blank space between bands.                                         |
| width             | `number` (optional)                                                 | -                                            | The width of the chart container. If not provided, it will fit the width of the parent container.   |
| height            | `number` (optional)                                                 | -                                            | The height of the chart container. If not provided, it will fit the height of the parent container. |
| margin            | `SvgContainerMargins` (optional)                                    | `{top: 15, right: 15, bottom: 30,left: 30,}` | Custom margin space around the chart.                                                               |
                                               
### Examples
**Basic**

Here is an example of a Horizontal Bar Chart:
```js
<HorizontalBarChart
  data={[
    {
        y: 'California',
        x: 50,
        tooltip: 'this is a tooltip',
    },
    {
        y: 'Colorado',
        x: 45,
        tooltip: 'this is a tooltip',
    },
    //...
  ]}
/>
```

**Customized Style**

Here is an example of customizing `fill` color and `innerPadding` for the bar rectangles; and the `width`, `height` and `margin` of the chart container.
```js
<HorizontalBarChart
  fill="orange"
  innerPadding={0.3}
  width={800}
  height={400}
  margin={{
    bottom: 30,
    left: 100,
    right: 15,
    top: 30
  }}
  data={[
    {
        y: 'California',
        x: 50,
    },
    //...
  ]}
/>
```

**Customized Left Axis Options**

You can provide a custom format function mapping a value from the axis Domain to a formatted string for display purposes
```js
<HorizontalBarChart
  leftAxisOptions={{
    // convert 'California' to 'CA'
    tickFormatFunction: (val: number | string) => {
        val = typeof val === 'number' ? val.toString() : val;
        return val.slice(0, 2).toUpperCase();
    },
  }}
  data={[
    {
        y: 'California',
        x: 50,
    },
    //...
  ]}
/>
```

**Customized Bottom Axis Options**

```js
<HorizontalBarChart
  bottomAxisOptions={{
    // indicate number of ticks on bottom axis that should be rendered
    numberOfTicks: 10,
    // extend ticks on y axis and show them as grid lines
    showGridLines: true,
    // custom format function that add '$' to tick label text
    tickFormatFunction: (val: string | number) => {
        return `$${val}`;
    },
  }}
  data={[
    {
        y: 'California',
        x: 50,
    },
    //...
  ]}
/>
```

**Customized Options For X Scale**

You can provide custom domain used to create the scale function for the x-axis:
```js
<HorizontalBarChart
  xScaleOptions={{
    domain: [
      0,
      100
    ]
  }}
  data={[
    {
        y: 'California',
        x: 50,
    },
    //...
  ]}
/>
```

## Pie Chart
Pie charts can be used to summarize a set of nominal data or display the different values of a given variable, such as a percentage distribution. 

See [examples](https://vannizhang.github.io/react-d3-charts/?path=/docs/example-piechart--docs).

### Usage
```sh
import { PieChart } from '@vannizhang/react-d3-charts'
```

### Props
| **Name**     | **Type**                                        | **Default** | **Description**                                                                                     |
|--------------|-------------------------------------------------|-------------|-----------------------------------------------------------------------------------------------------|
| data         | [`PieChartDataItem[]`](./src/PieChart/types.ts) | -           | Data that will be used to plot the Pie Chart.                                                       |
| isDonut      | `boolean` (optional)                            | -           | if true, a pie chart with a hole in the center, which makes it look like an donut.                  |
| isHalfPie    | `boolean` (optional)                            | -           | if true, create half pie chart is a 180 degree graph that represents the composition of a whole.    |
| width        | `number` (optional)                             | -           | The width of the chart container. If not provided, it will fit the width of the parent container.   |
| height       | `number` (optional)                             | -           | The height of the chart container. If not provided, it will fit the height of the parent container. |
| onClick      | `(data: PieChartDataItem) => void` (optional)   | -           | Fires when user clicks a slice of the pie chart.                                                    |
| onMouseEnter | `(data: PieChartDataItem) => void` (optional)   | -           | Fires when user hovers a slice of the pie chart.                                                    |
| onMouseLeave | `() => void` (optional)                         | -           | Fires when user leaves a slice of the pie chart.                                                    |                                                  

### Examples

**Basic**

Here is an example of plotting a Pie chart.
```js
<PieChart
  data={[
    {
      key: 'CA',
      value: 2,
      tooltip: 'this is a tooltip',
    },
    {
      key: 'CO',
      value: 4,
      tooltip: 'this is a tooltip',
    },
    {
      key: 'CT',
      value: 3,
      tooltip: 'this is a tooltip',
    }
  ]}
  height={120}
  width={120}
/>
```

**Customized Styles**

Here is an example of using customized colors for each slice:
```js
<PieChart
  data={[
    {
      key: 'CA',
      value: 2,
      tooltip: 'this is a tooltip',
      color: 'steelblue'
    },
    {
      key: 'CO',
      value: 4,
      tooltip: 'this is a tooltip',
      color: 'skyblue'
    },
    //...
  ]}
/>
```

You can create a donut pie chart:
```js
<PieChart
  isDonut={true}
  data={[
    {
      key: 'CA',
      value: 2,
      tooltip: 'this is a tooltip',
      color: 'steelblue'
    },
    //...
  ]}
/>
```

You can create a half pie chart, it is recommended to specify the dimension of the container as a rectangle instead of a square. This will ensure that the half pie chart fits properly into the container.
```js
<PieChart
  isHalfPie={true}
  height={60} // use the height as half of the width so the half pie chart can fit into the container
  width={120}
  data={[
    {
      key: 'CA',
      value: 2,
      tooltip: 'this is a tooltip',
      color: 'steelblue'
    },
    //...
  ]}
/>
```

## Sparkline Chart
The Sparkline chart renders a tiny line chart using an array of numbers as input data. See [examples](https://vannizhang.github.io/react-d3-charts/?path=/docs/example-sparkline--docs).

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

## Customizing Chart Styles with CSS Variables
You have the ability to customize the styles of chart elements by providing your own values for CSS variables. These variables are defined in the [`variables.css`](./src/styles/variables.css) file and control the appearance of specific elements within the components.

Here's an example of the [`variables.css`](./src/styles/variables.css) file:
```css
:root {
    /*
     * variables that control style of the axis tick line and text color
     */
    --axis-tick-line-color: #303030;
    --axis-tick-text-color: #303030;

    /*
     * variables that control style of the chart tooltip
     */
    --tooltip-background-color: rgba(255,255,255,1);
    --tooltip-text-color: #303030;
    --tooltip-text-font-size: .8rem;
    --tooltip-max-width: 200px;
    --tooltip-border-color: transparent;
    --tooltip-dropshadow-color: rgba(0,0,0,.2);
}
```

To customize the styles, you can simply override these variables with your own values. Here's an example of how you can override the `--axis-tick-line-color` and `--axis-tick-text-color` variables:
```js
<div
  style={{
    '--axis-tick-line-color': 'lightslategray',
    '--axis-tick-text-color': 'lightslategray',
  } as React.CSSProperties}
>
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
</div>
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