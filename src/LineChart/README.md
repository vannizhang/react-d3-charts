## Basic Line Chart
A basic line chart is a simple, two-dimensional chart with an X and Y axis. Each point represents a single value, and the data points are joined by a line to depict a trend, usually over time. Line charts are also known as line graphs or line plots.

See [examples](https://vannizhang.github.io/react-d3-charts/?path=/docs/example-linechartbasic--docs).

### Usage
```sh
import { LineChartBasic } from '@vannizhang/react-d3-charts'
```

### Props
| **Name**                 | **Type**                                                                | **Default** | **Description**                                                                                     |
|--------------------------|-------------------------------------------------------------------------|-------------|-----------------------------------------------------------------------------------------------------|
| data                     | [`LineChartDataItem[]`](./types.ts)                                     | -           | An array of `LineChartDataItem` objects that will be used to plot the line chart.                   |
| showTooltip              | `boolean` (optional)                                                    | false       | If set to true, displays a tooltip when the user hovers over the chart.                             |
| xScaleOptions            | [`XScaleOptions`](./types.ts) (optional)                                | -           | Options used to create a scale function for the x-axis.                                             |
| yScaleOptions            | [`YScaleOptions`](./types.ts) (optional)                                | -           | Options used to create a scale function for the y-axis.                                             |
| bottomAxisOptions        | [`BottomAxisOptions`](../Axis/types.ts) (optional)                      | -           | Options used to customize the x-axis at bottom.                                                     |
| leftAxisOptions          | [`LeftAxisOptions`](../Axis/types.ts) (optional)                        | -           | Options used to customize the y-axis at left.                                                       |
| verticalReferenceLines   | [`VerticalReferenceLineData[]`](./types.ts) (optional)                  | -           | Data that will be used to draw vertical reference lines.                                            |
| horizontalReferenceLines | [`HorizontalReferenceLineData[]`](../ReferenceLine/types.ts) (optional) | -           | Data that will be used to draw horizontal reference lines.                                          |
| stroke                   | `string` (optional)                                                     | -           | The stroke color of the line.                                                                       |
| strokeWidth              | `number` (optional)                                                     | -           | The width of the line.                                                                              |
| width                    | `number` (optional)                                                     | -           | The width of the chart container. If not provided, it will fit the width of the parent container.   |
| height                   | `number` (optional)                                                     | -           | The height of the chart container. If not provided, it will fit the height of the parent container. |
| margin                   | `SvgContainerMargins` (optional)                                        | -           | Custom margins for the chart container.                                                             |
| onClick                  | `function` (optional)                                                   | -           | `(index: number) => void` Emits when user clicks on the line chart. `index` is index of the `LineChartDataItem` that user has clicked                                  |

                                                   

**Basic Example**
---

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
---

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
---

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
---

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
---

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
---

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

You can provide a custom domain that will be used to create a scale function for the x-axis. If not provided, the minimum and maximum values of the `x` property of all items will be used as the domain.

```js
<LineChartBasic
  xScaleOptions={{
    domain: [
      2010,
      2025
    ]
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

**Show Vertical Reference Lines**
---

Here is an example of adding vertical reference lines to the Line Chart.
```js
<LineChartBasic
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


**Show Horizontal Reference Lines**
---

Here is an example of adding horizontal reference lines to the Line Chart.
```js
<LineChartBasic
  data={[
    {
      x: 2013,
      y: 26,
    },
    //...
  ]}
  horizontalReferenceLines={[
    {
        y1: 30,
        y2: 30
        label: 'national average: 30',
    },
  ]}
/>
```

**Add Custom Event Handlers**
---

Here is an example of adding custom event handlers to the Line Chart.
```js
<LineChartBasic
  data={[
    {
      x: 2013,
      y: 26,
    },
    //...
  ]}
  onClick={(index:number)=>{
    alert(`clicked on data at index of ${index}`)
  }}
/>
```