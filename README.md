# React D3 Charts
React D3 Charts is a library that offers a collection of simple and reusable D3 charts for React and TypeScript.

## Table of Conetnt
- [Installation](#Installation)
- [Dependencies](#Dependencies)
- [Storybook](#Storybook)
- [Basic Bar Chart](#Components)

## Installation

To use React D3 Charts in your project, install it via npm:
```
npm install @vannizhang/@vannizhang/react-d3-charts
```

## Dependencies
React (version 18) and D3.js (version 7) are the required dependencies for this library.

## Storybook
Storybook provides a sandbox environment where you can interactively develop and test the components in isolation.

To test the components locally, run the following command:
`npm run storybook`

You can also generate static output (saved in the `/docs` folder) of the Storybook using:
`npm run build-storybook`

## `BarChartBasic` Component
The `BarChartBasic` component renders a basic bar chart based on the provided data.

### Props
| **Name**      | **Type**                         | **Default**                                  | **Description**                                                                                     |
|---------------|----------------------------------|----------------------------------------------|-----------------------------------------------------------------------------------------------------|
| data          | `BarChartDataItem[]`             | -                                            | The data used to render the bar chart.                                                              |
| showTooltip   | `boolean` (optional)               | false                                      | Determines whether to show a tooltip when the user hovers over a bar element.                       |
| yScaleOptions | `YScaleOptions` (optional)       | -                                            | Options used to customize the scale function for the y-axis.                                        |
| xAxisOptions  | `XAxisOptions` (optional)        | -                                            | Options used to customize the x-axis.                                                               |
| yAxisOptions  | `YAxisOptions` (optional)        | -                                            | Options used to customize the y-axis.                                                               |
| fill          | `string` (optional)                | -                                          | The fill color of the bar rectangles.                                                               |
| width         | `number` (optional)                | -                                          | The width of the chart container. If not provided, it will fit the width of the parent container.   |
| height        | `number` (optional)                | -                                          | The height of the chart container. If not provided, it will fit the height of the parent container. |
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
Here is an example of customizing `fill` color for the bar rectangles, the `width` and `height` of the chart container.
```js
<BarChartBasic
  fill="orange"
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
      tooltip: 'this is a tooltip',
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
      tooltip: 'this is a tooltip',
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
    tickFormatFunction: (val: string) => {
        const [month, day] = val.split('/');
        return `${month}-${day}`;
    }
  }}
  data={[
    {
      x: '12/1',
      y: 26,
      tooltip: 'this is a tooltip',
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
      tooltip: 'this is a tooltip',
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
      tooltip: 'this is a tooltip',
    },
    //...
  ]}
/>
```

**Customized Options For Y Scale**
Here is an example of using customized options for Y Scale. 

You can provide a custom domain used to create the scale function for the y-axis. If not provided, the domain will be determined by the maximum values of the `y` property among all items, and the minimum value of the domain will be 0.
```js
<BarChartBasic
  yScaleOptions={{
    domain: [ 0, 200 ]
  }}
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

## License
This library is licensed under the [Apache License](./LICENSE)