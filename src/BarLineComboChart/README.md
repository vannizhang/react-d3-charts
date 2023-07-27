## Bar and Line Combo Chart

The Bar and Line Combo Chart is a type of graph that combines two different types of visualization: bar chart and line chart.

It is used to display and compare different data series that have different scales or units of measurement.

See [examples](https://vannizhang.github.io/react-d3-charts/?path=/docs/example-barlinecombochart--docs).

### Usage

```sh
import { BarLineComboChart } from '@vannizhang/react-d3-charts'
```

### Props

| **Name**                 | **Type**                                                                | **Default**                                  | **Description**                                                                                     |
|--------------------------|-------------------------------------------------------------------------|----------------------------------------------|-----------------------------------------------------------------------------------------------------|
| data                     | [`BarLineComboChartDataItem[]`](./types.ts)                             | -                                            | The data used to render the bar and line combo chart.                                               |
| showTooltip              | `boolean` (optional)                                                    | false                                        | Determines whether to show a tooltip when the user hovers over a bar element.                       |
| yScaleOptions            | `YScaleOptions` (optional)                                              | -                                            | Options used to customize the scale function for the y-axis.                                        |
| bottomAxisOptions        | [`BottomAxisOptions`](../Axis/types.ts) (optional)                      | -                                            | Options used to customize the x-axis at bottom.                                                     |
| leftAxisOptions          | [`LeftAxisOptions`](../Axis/types.ts) (optional)                        | -                                            | Options used to customize the y-axis at left.                                                       |
| verticalReferenceLines   | [`VerticalReferenceLineData[]`](./types.ts) (optional)                  | -                                            | Data that will be used to draw vertical reference lines.                                            |
| horizontalReferenceLines | [`HorizontalReferenceLineData[]`](../ReferenceLine/types.ts) (optional) | -                                            | Data that will be used to draw horizontal reference lines.                                          |
| fill                     | `string` (optional)                                                     | -                                            | The fill color of the bar rectangles.                                                               |
| strokeColor              | `string` (optional)                                                     | -                                            | The stroke color of the line.                                                                       |
| strokeWidth              | `number` (optional)                                                     | -                                            | The width of the line.                                                                              |
| innerPadding             | `number` (optional)                                                     | 0.2                                          | The inner padding determines the blank space between bands.                                         |
| width                    | `number` (optional)                                                     | -                                            | The width of the chart container. If not provided, it will fit the width of the parent container.   |
| height                   | `number` (optional)                                                     | -                                            | The height of the chart container. If not provided, it will fit the height of the parent container. |
| margin                   | `SvgContainerMargins` (optional)                                        | `{top: 15, right: 15, bottom: 30,left: 30,}` | Custom margin space around the chart.                                                               |


## **Basic Example**

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

## **Customized Style**

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

## **Show Tooltip And Reference Line**

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

Add Vertical Reference Lines
---
Here is an example of adding vertical reference lines to the Bar Chart.

```js
<BarLineComboChart
  data={[
    {
      tooltip: 'this is a tooltip',
      x: '12/1',
      yBar: 26,
      yLine: 10
    },
    //...
  ]}
  showTooltip={true}
  verticalReferenceLines={[
    {
      tooltip: 'tooltip comes with reference line',
      x: '12/9'
    }
  ]}
/>
```

Add Horizontal Reference Lines
---

Here is an example of adding horizontal reference lines to the Line Chart.
```js
<BarLineComboChart
  data={[
    {
      tooltip: 'this is a tooltip',
      x: '12/1',
      yBar: 26,
      yLine: 10
    },
    //...
  ]}
  horizontalReferenceLines={[
    {
        y: 30,
        label: 'national average: 30',
    },
  ]}
/>
```