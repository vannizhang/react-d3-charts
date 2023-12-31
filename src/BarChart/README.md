## Basic Bar Chart
A basic bar chart, or bar graph, is a graph that displays different categories of data with rectangular bars. The lengths of the bars are proportional to the size of the data category they represent.

See [examples](https://vannizhang.github.io/react-d3-charts/?path=/docs/example-barchartbasic--docs).

### Usage
```sh
import { BarChartBasic } from '@vannizhang/react-d3-charts'
```

### Props
| **Name**                 | **Type**                                                                | **Default**                                  | **Description**                                                                                     |
|--------------------------|-------------------------------------------------------------------------|----------------------------------------------|-----------------------------------------------------------------------------------------------------|
| data                     | [`BarChartDataItem[]`](./types.ts)                                      | -                                            | The data used to render the bar chart.                                                              |
| showTooltip              | `boolean` (optional)                                                    | false                                        | Determines whether to show a tooltip when the user hovers over a bar element.                       |
| yScaleOptions            | [`YScaleOptions`](./types.ts) (optional)                                | -                                            | Options used to customize the scale function for the y-axis.                                        |
| bottomAxisOptions        | [`BottomAxisOptions`](../Axis/types.ts) (optional)                      | -                                            | Options used to customize the x-axis at bottom.                                                     |
| leftAxisOptions          | [`LeftAxisOptions`](../Axis/types.ts) (optional)                        | -                                            | Options used to customize the y-axis at left.                                                       |
| verticalReferenceLines   | [`VerticalReferenceLineData[]`](./types.ts) (optional)                  | -                                            | Data that will be used to draw vertical reference lines.                                            |
| horizontalReferenceLines | [`HorizontalReferenceLineData[]`](../ReferenceLine/types.ts) (optional) | -                                            | Data that will be used to draw horizontal reference lines.                                          |
| fill                     | `string` (optional)                                                     | -                                            | The fill color of the bar rectangles.                                                               |
| innerPadding             | `number` (optional)                                                     | 0.2                                          | The inner padding determines the blank space between bands.                                         |
| width                    | `number` (optional)                                                     | -                                            | The width of the chart container. If not provided, it will fit the width of the parent container.   |
| height                   | `number` (optional)                                                     | -                                            | The height of the chart container. If not provided, it will fit the height of the parent container. |
| margin                   | `SvgContainerMargins` (optional)                                        | `{top: 15, right: 15, bottom: 30,left: 30,}` | Custom margin space around the chart.                                                               |

                                               
Basic Example
---

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

Use Customized Styles
---

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

Show Tooltip And Crosshair Reference Line
---

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

Customized Options for X Axis at Bottom
---

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

Customized Options for Y Axis at left
---

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

Customized Options For Y Scale
---

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

Add Vertical Reference Lines
---

Here is an example of adding vertical reference lines to the Bar Chart.
```js
<BarChartBasic
  data={[
    {
      x: '12/1',
      y: 26,
    },
    //...
  ]}
  verticalReferenceLines={[
    {
      tooltip: 'tooltip comes with reference line',
      x: '12/9'
    }
  ]}
/>
```

Add Horizonatl Reference Lines
---

Here is an example of adding horizontal reference lines to the Bar Chart.
```js
<BarChartBasic
  data={[
    {
      x: '12/1',
      y: 26,
    },
    //...
  ]}
  horizontalReferenceLines={[
    {
        y1: 30,
        y2: 30,
        label: 'national average: 30',
    },
  ]}
/>
```