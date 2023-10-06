## Multiple Lines Chart
A multi-line chart is a basic line chart with one or more additional lines that represent comparison trends.  You can use a line graph with multiple lines to display the trend of key data points over time. 

See [examples](https://vannizhang.github.io/react-d3-charts/?path=/docs/example-multiplelineschart--docs).

### Usage
```sh
import { MultipleLinesChart } from '@vannizhang/react-d3-charts'
```

### Props
| **Name**                 | **Type**                                                                | **Default** | **Description**                                                                                     |
|--------------------------|-------------------------------------------------------------------------|-------------|-----------------------------------------------------------------------------------------------------|
| data                     | [`LineGroupData[]`](./types.ts)                                         | -           | An array of `LineGroupData` objects that will be used to plot the line groups.                   |
| showTooltip              | `boolean` (optional)                                                    | false       | If set to true, displays a tooltip when the user hovers over the chart.                             |
| xScaleOptions            | [`XScaleOptions`](./types.ts) (optional)                                | -           | Options used to create a scale function for the x-axis.                                             |
| yScaleOptions            | [`YScaleOptions`](./types.ts) (optional)                                | -           | Options used to create a scale function for the y-axis.                                             |
| bottomAxisOptions        | [`BottomAxisOptions`](../Axis/types.ts) (optional)                      | -           | Options used to customize the x-axis at bottom.                                                     |
| leftAxisOptions          | [`LeftAxisOptions`](../Axis/types.ts) (optional)                        | -           | Options used to customize the y-axis at left.                                                       |
| verticalReferenceLines   | [`VerticalReferenceLineData[]`](./types.ts) (optional)                  | -           | Data that will be used to draw vertical reference lines.                                            |
| horizontalReferenceLines | [`HorizontalReferenceLineData[]`](../ReferenceLine/types.ts) (optional) | -           | Data that will be used to draw horizontal reference lines.                                          |
| strokeWidth              | `number` (optional)                                                     | -           | The width of the line.                                                                              |
| width                    | `number` (optional)                                                     | -           | The width of the chart container. If not provided, it will fit the width of the parent container.   |
| height                   | `number` (optional)                                                     | -           | The height of the chart container. If not provided, it will fit the height of the parent container. |
| margin                   | `SvgContainerMargins` (optional)                                        | -           | Custom margins for the chart container.                                                             |
                                            
**Basic Example**
---

Here is an example of a basic Multiple Lines Chart.

The `key` field of the `LineGroupData` should be the name of the group, the `values` fields contains an array of `LineVertexData` that will be used to render the line for the given group.
```js
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

**Customized Style**
---

Here is an example of customizing stroke color and width for the line; and the `width`, `height` and `margin` of the chart container.
```js
<MultipleLinesChart
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

**Show Tooltip And Reference Line**
---

Set `showTooltip` to true to show a tooltip when the user moves mouse pointer. 

Plase make sure the `tooltip` field is included in each `LineVertexData`.
```js
<MultipleLinesChart
  showTooltip
  data={[
    {
      fill: '#3b5998',
      key: 'Meta',  
      values: [
        {
          x: 1,
          y: 313.26001,
          tooltip: 'Closing Price on Jan 2022: $313'
        },
        {
          x: 2,
          y: 211.029999,
          tooltip: 'Closing Price on Feb 2022: $211',
        },
        {
          x: 3,
          y: 222.360001,
          tooltip: 'Closing Price on Mar 2022: $222'
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
          y: 310.980011,
          tooltip: 'Closing Price on Jan 2022: $310'
        },
        {
          x: 2,
          y: 298.790009,
          tooltip: 'Closing Price on Feb 2022: $298'
        },
        {
          x: 3,
          y: 308.309998,
          tooltip: 'Closing Price on Mar 2022: $308'
        },
        //...
      ]
    }
  ]}
/>
```

**Customized Bottom Axis Options**
---

Here is an example of using customized options for x axis:
```js
<MultipleLinesChart
  bottomAxisOptions={{
    // /*
    //  * Indicate number of ticks that should be renderd on x axis
    //  */
    // numberOfTicks: 3,
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
    tickFormatFunction: (val: number | string, index) => {
        const monthAbbreviations = [
            'Jan',
            'Feb',
            'Mar',
            'Apr',
            'May',
            'Jun',
            'Jul',
            'Aug',
            'Sep',
            'Oct',
            'Nov',
            'Dec',
        ];

        return monthAbbreviations[index as number];
    },
  }}
  data={[
    {
      fill: '#3b5998',
      key: 'Meta',  
      values: [
        {
          x: 1,
          y: 313.26001
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
        //...
      ]
    }
  ]}
/>
```

**Customized Options for Y Axis at Left**
---

Here is an example of using customized options for y axis:
```js
<MultipleLinesChart
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
        return '$' + val.toString();
    },
  }}
  data={[
    {
      fill: '#3b5998',
      key: 'Meta',  
      values: [
        {
          x: 1,
          y: 313.26001
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
        //...
      ]
    }
  ]}
/>
```

**Customized Options For X Scale**
---

Here is an example of using time scale for x-axis instead of the linear scale.

When using time scale, it's recommended to also provide a `tickFormatFunction` in `bottomAxisOptions` that can create formatted ticks on x-axis.
```js
<MultipleLinesChart
  xScaleOptions={{
    useTimeScale: true
  }}
  bottomAxisOptions={{
    tickFormatFunction: (val: number | string) => {
        const month = [
            "January","February","March","April","May","June","July","August","September","October","November","December"
        ];
        return month[new Date(val).getMonth()];
    },
  }}
  data={[
    {
      fill: '#3b5998',
      key: 'Meta',  
      values: [
        {
          x: 1642204800,
          y: 313.26001
        },
        //...
      ]
    },
    {
      fill: '#7FBA00',
      key: 'Microsoft',
      values: [
        {
          x: 1642204800,
          y: 310.980011
        },
        //...
      ]
    }
  ]}
/>
```

**Customized Options For Y Scale**
---

You can provide a custom `domain` used to create the scale function for the y-axis. If not provided, the domain will be determined by the maximum values of the `y` property among all items, and the minimum value of the domain will be 0.
```js
<MultipleLinesChart
  yScaleOptions={{
    domain: [50, 350],
  }}
  data={[
    {
      fill: '#3b5998',
      key: 'Meta',  
      values: [
        {
          x: 1,
          y: 313.26001
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
        //...
      ]
    }
  ]}
/>
```

**Show Vertical Reference Lines**
---

Here is an example of adding vertical reference lines to the Multiple Lines chart.
```js
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
        //...
      ]
    }
  ]}
  verticalReferenceLines={[
    {
        x: 10,
        tooltip: 'Meta hit Lowest Closing Price<br/> $93.16 on Oct 2022 ',
    },
  ]}
/>
```


**Show Horizontal Reference Lines**
---

Here is an example of adding horizontal reference lines to the Multiple Lines chart.
```js
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
        //...
      ]
    }
  ]}
  horizontalReferenceLines={[
    {
        y: 382,
        label: 'Meta Highest Closing Price on 2021: $382',
    },
  ]}
/>
```

**Show Dashed Lines**
---

Here is an example of rendering lines with [stroke-dasharray](https://developer.mozilla.org/en-US/docs/Web/SVG/Attribute/stroke-dasharray). Just add `dashPattern` property to the `LineGroupData` objects.
```js
<MultipleLinesChart
  data={[
    {
      fill: '#3b5998',
      dashPattern: '9 3',
      key: 'Meta',  
      values: [
        {
          x: 1,
          y: 313.26001
        },
        //...
      ]
    },
    {
      fill: '#7FBA00',
      dashPattern: '9 3',
      key: 'Microsoft',
      values: [
        {
          x: 1,
          y: 310.980011
        },
        //...
      ]
    }
  ]}
/>
```