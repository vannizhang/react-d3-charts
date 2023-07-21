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
| data              | [`HorizontalBarChartDataItem[]`](.//types.ts)                       | -                                            | The data used to render the horizontal bar chart.                                                   |
| xScaleOptions     | `YScaleOptions` (optional)                                          | -                                            | Options used to customize the scale function for the y-axis.                                        |
| bottomAxisOptions | [`BottomAxisOptions`](./types.ts) (optional)                        | -                                            | Options used to customize the bottom axis.                                                          |
| leftAxisOptions   | [`LeftAxisOptions`](./types.ts)  (optional)                         | -                                            | Options used to customize the left axis.                                                            |
| fill              | `string` (optional)                                                 | -                                            | The fill color of the bar rectangles.                                                               |
| innerPadding      | `number` (optional)                                                 | 0.2                                          | The inner padding determines the blank space between bands.                                         |
| width             | `number` (optional)                                                 | -                                            | The width of the chart container. If not provided, it will fit the width of the parent container.   |
| height            | `number` (optional)                                                 | -                                            | The height of the chart container. If not provided, it will fit the height of the parent container. |
| margin            | `SvgContainerMargins` (optional)                                    | `{top: 15, right: 15, bottom: 30,left: 30,}` | Custom margin space around the chart.                                                               |
                                               

**Basic Example**
---

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
---

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
---

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
---

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
---

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