# React D3 Charts
React D3 Charts is a library that offers a collection of simple and reusable charts with D3, React and TypeScript.

## Table of Conetnt
- [Installation](#Installation)
- [Docs](#Docs)
  - [Basic Bar Chart](./src/BarChart/)
  - [Basic Line Chart](./src/LineChart/)
  - [Bar and Line Combo Chart](./src/BarLineComboChart/)
  - [Diverging Bar Chart](./src/DivergingBarChart/)
  - [Horizontal Bar Chart](./src/HorizontalBarChart/)
  - [Area Chart](./src/AreaChart/)
  - [Multiple Lines Chart](./src/MultipleLinesChart/)
  - [Pie Chart](./src/PieChart/)
  - [Sparkline Chart](./src/Sparkline/)
- [Customizing Chart Styles with CSS Variables](#customizing-common-chart-styles-with-css-variables)
- [Dependencies](#Dependencies)
- [Storybook](#Storybook)

## Installation

To use React D3 Charts in your project, install it via npm:
```sh
npm install @vannizhang/react-d3-charts
```

## Docs

### [Basic Bar Chart](./src/BarChart/)
A basic bar chart, or bar graph, is a graph that displays different categories of data with rectangular bars. The lengths of the bars are proportional to the size of the data category they represent.

See [examples](https://vannizhang.github.io/react-d3-charts/?path=/docs/example-barchartbasic--docs).

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

### [Basic Line Chart](./src/LineChart/)
A basic line chart is a simple, two-dimensional chart with an X and Y axis. Each point represents a single value, and the data points are joined by a line to depict a trend, usually over time.

See [examples](https://vannizhang.github.io/react-d3-charts/?path=/docs/example-linechartbasic--docs).

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

### [Bar and Line Combo Chart](./src/BarLineComboChart/)
The Bar and Line Combo Chart is a type of graph that combines two different types of visualization: bar chart and line chart. It is used to display and compare different data series that have different scales or units of measurement. 

See [examples](https://vannizhang.github.io/react-d3-charts/?path=/docs/example-barlinecombochart--docs).

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

### [Diverging Bar Chart](./src/DivergingBarChart/)
A diverging bar chart is a type of bar chart that can be used to visualize the spread between values, generally positive and negative.

See [examples](https://vannizhang.github.io/react-d3-charts/?path=/docs/example-divergingbarchart--docs).

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

See [examples](https://vannizhang.github.io/react-d3-charts/?path=/docs/example-horizontalbarchart--docs).

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

### [Grouped Bar Chart](./src/HorizontalBarChart/)
A grouped bar chart is a type of bar chart that displays data in rectangular bars grouped together, with each group representing a category, and each bar within the group representing a subcategory or a different variable. 

Grouped bar charts are particularly useful for comparing the values of multiple subcategories across different categories. They allow for easy visual comparison of values within each category and between different categories. 

See [examples](https://vannizhang.github.io/react-d3-charts/?path=/docs/example-groupedbarchart--docs).

```js
import { GroupedBarChart } from '@vannizhang/react-d3-charts'

<GroupedBarChart
  data={[
    {
        title: 'California',
        data: [
            {
                x: 'Jan',
                y: 26,
                fill: 'steelblue',
                label: '26',
                labelOnTop: 'Jan',
            },
            {
                x: 'Feb',
                y: 38,
                fill: 'cornflowerblue',
                label: '38',
                labelOnTop: 'Feb',
            },
            {
                x: 'Mar',
                y: 10,
                fill: 'lightblue',
                label: '10',
                labelOnTop: 'Mar',
            },
        ],
    },
    //...
  ]}
/>
```

### [Area Chart](./src/AreaChart/)
An area chart, also known as a mountain chart, is a data visualization that combines the appearance of a line chart and a bar chart. It's similar to a line graph in that data points are plotted and connected by line segments. However, the area below the line is colored in or shaded.

See [examples](https://vannizhang.github.io/react-d3-charts/?path=/docs/example-areachart--docs).

```js
import { AreaChart } from '@vannizhang/react-d3-charts'

<AreaChart
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

### [Multiple Lines Chart](./src/MultipleLinesChart/)
A multi-line chart is a basic line chart with one or more additional lines that represent comparison trends.  You can use a line graph with multiple lines to display the trend of key data points over time. 

See [examples](https://vannizhang.github.io/react-d3-charts/?path=/docs/example-multiplelineschart--docs).

```js
import { MultipleLinesChart } from '@vannizhang/react-d3-charts'

<MultipleLinesChart
  data={[
    {
      fill: '#3b5998',
      key: 'Meta',  
      values: [
        {
          x: 1,
          y: 313.26001
        },
        {
          x: 2,
          y: 211.029999
        },
        {
          x: 3,
          y: 222.360001
        },
        //...
      ]
    },
    {
      fill: '#7FBA00',
      key: 'Microsoft',
      values: [
        {
          x: 1,
          y: 310.980011
        },
        {
          x: 2,
          y: 298.790009
        },
        {
          x: 3,
          y: 308.309998
        },
        //...
      ]
    }
  ]}
/>
```


### [Pie Chart](./src/PieChart/)
Pie charts can be used to summarize a set of nominal data or display the different values of a given variable, such as a percentage distribution. 

See [examples](https://vannizhang.github.io/react-d3-charts/?path=/docs/example-piechart--docs).

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

### [Sparkline Chart](./src/Sparkline/)
The Sparkline chart renders a tiny line chart using an array of numbers as input data.

See [examples](https://vannizhang.github.io/react-d3-charts/?path=/docs/example-sparkline--docs).

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
    --axis-tick-line-color: rgba(0,0,0,.5);
    --axis-tick-text-color: #303030;
    --axis-tick-text-font-size: 10px;

    /*
     * this variable will be used to adjust the position of 
     * bar-label-text-group text element along the y axis.
     */
    --bar-label-text-translate-y-position: -8px;

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
    --crosshair-reference-line-stroke-dasharray: 1 1;

    /*
     * variables that control the style of user provided vertical reference line
     */
    --vertical-reference-line-color: rgba(50, 50, 50, .5);
    --vertical-reference-line-width: 1px;
    --vertical-reference-line-stroke-dasharray: none;

    /*
     * variables that control the style of user provided horizontal reference line
     */
    --horizontal-reference-line-color: rgba(50, 50, 50, .5);
    --horizontal-reference-line-width: 1px;
    --horizontal-reference-line-stroke-dasharray: none;
    --horizontal-reference-line-label-text-color: rgba(30, 30, 30, .9);
    --horizontal-reference-line-label-text-size: .8rem;

    /*
     * variables that control the style of divider line that is used in Diverging Bar Chart and similar
     */
    --divider-line-color: rgba(0,0,0,.5);
    --divider-line-width: 1px;
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