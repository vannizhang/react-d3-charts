## Area Chart
An area chart, also known as a mountain chart, is a data visualization that combines the appearance of a line chart and a bar chart. It's commonly used to show how numerical values change based on a second variable, usually a time period.

It's similar to a line graph in that data points are plotted and connected by line segments. However, the area below the line is colored in or shaded.

See [examples](https://vannizhang.github.io/react-d3-charts/?path=/docs/example-areachart--docs).

### Usage
```js
import { AreaChart } from '@vannizhang/react-d3-charts'
```

### Props
| **Name**                 | **Type**                                                                | **Default** | **Description**                                                                                     |
|--------------------------|-------------------------------------------------------------------------|-------------|-----------------------------------------------------------------------------------------------------|
| data                     | [`AreaChartDataItem[]`](./types.ts)                                     | -           | An array of `AreaChartDataItem` objects that will be used to plot the area chart.                   |
| showTooltip              | `boolean` (optional)                                                    | false       | If set to true, displays a tooltip when the user hovers over the chart.                             |
| xScaleOptions            | [`XScaleOptions`](./types.ts) (optional)                                | -           | Options used to create a scale function for the x-axis.                                             |
| yScaleOptions            | [`YScaleOptions`](./types.ts) (optional)                                | -           | Options used to create a scale function for the y-axis.                                             |
| bottomAxisOptions        | [`BottomAxisOptions`](../Axis/types.ts) (optional)                      | -           | Options used to customize the x-axis at bottom.                                                     |
| leftAxisOptions          | [`LeftAxisOptions`](../Axis/types.ts) (optional)                        | -           | Options used to customize the y-axis at left.                                                       |
| verticalReferenceLines   | [`VerticalReferenceLineData[]`](./types.ts) (optional)                  | -           | Data that will be used to draw vertical reference lines.                                            |
| horizontalReferenceLines | [`HorizontalReferenceLineData[]`](../ReferenceLine/types.ts) (optional) | -           | Data that will be used to draw horizontal reference lines.                                          |
| fill                     | `string` (optional)                                                     | -           | The fill color of the area path.                                                                    |
| width                    | `number` (optional)                                                     | -           | The width of the chart container. If not provided, it will fit the width of the parent container.   |
| height                   | `number` (optional)                                                     | -           | The height of the chart container. If not provided, it will fit the height of the parent container. |
| margin                   | `SvgContainerMargins` (optional)                                        | -           | Custom margins for the chart container.                                                             |

                                           
**Basic Example**
---

Here is an example of a basic Area Chart, the `x` field of the `AreaChartDataItem` should always be numerical value.
```js
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
    {
      x: 2015,
      y: 10,
      tooltip: 'this is a tooltip',
    }
  ]}
/>
```

**Customized Style**
---

Here is an example of customizing stroke color and width for the line; and the `width`, `height` and `margin` of the chart container.
```js
<AreaChart
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
---

Set `showTooltip` to true to show a tooltip when the user moves mouse pointer. 

Plase make sure the `tooltip` field is included in each `AreaChartDataItem`.
```js
<AreaChart
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
---

Here is an example of using customized options for x axis:
```js
<AreaChart
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
---

Here is an example of using customized options for y axis:
```js
<AreaChart
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
---

Here is an example of using time scale for x-axis instead of the linear scale.

When using time scale, it's recommended to also provide a `tickFormatFunction` in `bottomAxisOptions` that can create formatted ticks on x-axis.
```js
<AreaChart
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
---

You can provide a custom `domain` used to create the scale function for the y-axis. If not provided, the domain will be determined by the maximum values of the `y` property among all items, and the minimum value of the domain will be 0.
```js
<AreaChart
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

**Add Customized Vertical Reference Lines**
---

Here is an example of adding vertical reference lines to the Area Chart.
```js
<AreaChart
  data={[
    {
      x: 2013,
      y: 26,
    },
    //...
  ]}
  verticalReferenceLines={[
    {
      tooltip: 'text to be displayed',
      x: 2020
    }
  ]}
/>
```

**Add Customized Horizontal Reference Lines**
---

Here is an example of adding horizontal reference lines to the Area Chart.
```js
<AreaChart
  data={[
    {
      x: 2013,
      y: 26,
    },
    //...
  ]}
  horizontalReferenceLines={[
    {
      label: 'text label with reference line',
      y1: 35,
      y2: 35,
    }
  ]}
/>
```