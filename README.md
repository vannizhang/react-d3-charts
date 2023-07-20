# React D3 Charts
React D3 Charts is a library that offers a collection of simple and reusable charts with D3, React and TypeScript.

## Table of Conetnt
- [Installation](#Installation)
- [Charts](#Charts)
  - [Basic Bar Chart](./src/BarChart/README.md)
  - [Basic Line Chart](./src/LineChart/README.md)
  - [Bar and Line Combo Chart](./src/BarLineComboChart/README.md)
  - [Diverging Bar Chart](./src/DivergingBarChart/README.md)
  - [Horizontal Bar Chart](./src/HorizontalBarChart/)
  - [Pie Chart](./src/PieChart/README.md)
  - [Sparkline Chart](./src/Sparkline/README.md)
- [Customizing Chart Styles with CSS Variables](#customizing-common-chart-styles-with-css-variables)
- [Dependencies](#Dependencies)
- [Storybook](#Storybook)

## Installation

To use React D3 Charts in your project, install it via npm:
```sh
npm install @vannizhang/react-d3-charts
```

## Charts

### [Basic Bar Chart](./src/BarChart/README.md)
A basic bar chart, or bar graph, is a graph that displays different categories of data with rectangular bars. The lengths of the bars are proportional to the size of the data category they represent.

```js
import { BarChartBasic } from '@vannizhang/react-d3-charts'

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

### [Basic Line Chart](./src/LineChart/README.md)
A basic line chart is a simple, two-dimensional chart with an X and Y axis. Each point represents a single value, and the data points are joined by a line to depict a trend, usually over time.

```js
import { LineChartBasic } from '@vannizhang/react-d3-charts'

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
    //...
  ]}
/>
```

### [Bar and Line Combo Chart](./src/BarLineComboChart/README.md)
The Bar and Line Combo Chart is a type of graph that combines two different types of visualization: bar chart and line chart. It is used to display and compare different data series that have different scales or units of measurement. 

```js
import { BarLineComboChart } from '@vannizhang/react-d3-charts'

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

### [Diverging Bar Chart](./src/DivergingBarChart/README.md)
A diverging bar chart is a type of bar chart that can be used to visualize the spread between values, generally positive and negative.

```js
import { DivergingBarChart } from '@vannizhang/react-d3-charts'

<DivergingBarChart
  data={[
    {
        x: 'Trees',
        y: -40,
        tooltip: 'this is a tooltip',
        fill: 'green',
    },
    {
        x: 'Water',
        y: -10,
        tooltip: 'this is a tooltip',
        fill: 'dodgerblue',
    },
    //...
  ]}
/>
```

### [Horizontal Bar Chart](./src/HorizontalBarChart/)
A horizontal bar chart is a type of graph that uses rectangular bars to present data. The length of the bars is proportional to the values they represent. Horizontal bar charts are used to display comparisons between categories of data.

```js
import { HorizontalBarChart } from '@vannizhang/react-d3-charts'

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

### [Pie Chart](./src/PieChart/README.md)
Pie charts can be used to summarize a set of nominal data or display the different values of a given variable, such as a percentage distribution. 

```js
import { PieChart } from '@vannizhang/react-d3-charts'

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

### [Sparkline Chart](./src/Sparkline/README.md)
The Sparkline chart renders a tiny line chart using an array of numbers as input data.

```js
import { Sparkline } from '@vannizhang/react-d3-charts'

<Sparkline
  data={[5, 16, 26 ,31, 7, 9, 14, 38]}
/>
```

## Customizing Common Chart Styles with CSS Variables
You have the ability to customize the styles of common chart elements by providing your own values for CSS variables. These variables are defined in the [`variables.css`](./src/styles/variables.css) file and control the appearance of specific elements within the components.

Here's an example of the [`variables.css`](./src/styles/variables.css) file:
```css
:root {
    /*
     * variables that control the style of the axis tick line and text
     */
    --axis-tick-line-color: #303030;
    --axis-tick-text-color: #303030;

    /*
     * variables that control the style of the chart tooltip
     */
    --tooltip-background-color: rgba(255,255,255,1);
    --tooltip-text-color: #303030;
    --tooltip-text-font-size: .8rem;
    --tooltip-max-width: 200px;
    --tooltip-border-color: transparent;
    --tooltip-dropshadow-color: rgba(0,0,0,.2);

    /*
     * variables that control the style of crosshair reference line
     */
    --crosshair-reference-line-color: rgba(0,0,0,.5);
    --crosshair-reference-line-width: 1px;
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