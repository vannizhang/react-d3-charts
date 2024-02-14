## Grouped Bar Chart
A grouped bar chart is a type of bar chart that displays data in rectangular bars grouped together, with each group representing a category, and each bar within the group representing a subcategory or a different variable.

Grouped bar charts are particularly useful for comparing the values of multiple subcategories across different categories. They allow for easy visual comparison of values within each category and between different categories.

See [examples](https://vannizhang.github.io/react-d3-charts/?path=/docs/example-barchartbasic--docs).

### Usage
```js
import { GroupedBarChart } from '@vannizhang/react-d3-charts'
```

### Props
| **Name**                 | **Type**                                                                | **Default**                                  | **Description**                                                                                     |
|--------------------------|-------------------------------------------------------------------------|----------------------------------------------|-----------------------------------------------------------------------------------------------------|
| groupedData              | [`GroupedBarChartGroupData[]`](./types.ts)                              | -                                            | Grouped bar chart data.                                                                             |
| yScaleOptions            | [`YScaleOptions`](./types.ts) (optional)                                | -                                            | Options used to customize the scale function for the y-axis.                                        |
| bottomAxisOptions        | [`BottomAxisOptions`](../Axis/types.ts) (optional)                      | -                                            | Options used to customize the x-axis at bottom.                                                     |
| leftAxisOptions          | [`LeftAxisOptions`](../Axis/types.ts) (optional)                        | -                                            | Options used to customize the y-axis at left.                                                       |
| horizontalReferenceLines | [`HorizontalReferenceLineData[]`](../ReferenceLine/types.ts) (optional) | -                                            | Data that will be used to draw horizontal reference lines.                                          |
| showLabelText            | `boolean` (optional)                                                    | false                                        | if true, show label text on top of each bar rectangle.                                              |
| showStickyLabelText      | `boolean` (optional)                                                    | false                                        | if true, show label text that will be placed at a fixed position on top of chart container.         |
| showDividerLines         | `boolean` (optional)                                                    | false                                        | if true, show label text on top of each bar rectangle.                                              |
| groupPadding             | `number` (optional)                                                     | 0.15                                         | The inner padding determines the blank space between each group of bars.                            |
| innerPadding             | `number` (optional)                                                     | 0.05                                         | The inner padding determines the blank space between bands inside of each group.                    |
| width                    | `number` (optional)                                                     | -                                            | if true, show label text on top of each bar rectangle.                                              |
| height                   | `number` (optional)                                                     | -                                            | The height of the chart container. If not provided, it will fit the height of the parent container. |
| margin                   | `SvgContainerMargins` (optional)                                        | `{top: 15, right: 15, bottom: 30,left: 30,}` | Custom margin space around the chart.                                                               |


**Basic Example**
---

Here is an example of a basic Grouped Bar Chart"
```js
<GroupedBarChart
  data={[
    {
        title: 'California',
        data: [
            {
                x: 'Jan',
                y: 26,
                fill: 'steelblue',
            },
            {
                x: 'Feb',
                y: 38,
                fill: 'cornflowerblue',
            },
            {
                x: 'Mar',
                y: 10,
                fill: 'lightblue',
            },
        ],
    },
    {
        title: 'Ohio',
        data: [
            {
                x: 'Jan',
                y: 12,
                fill: 'steelblue',
            },
            {
                x: 'Feb',
                y: 38,
                fill: 'cornflowerblue',
            },
            {
                x: 'Mar',
                y: 42,
                fill: 'lightblue',
            },
        ],
    },
    //...
  ]}
/>
```           

**Customize Left Axis**:

Here is an example of extend ticks on y axis and show them as grid lines: 
```js
<GroupedBarChart
    leftAxisOptions={
        showGridLines: true,
        numberOfTicks: 3,
    }
    data={[
        {
            title: 'California',
            data: [
                {
                    x: 'Jan',
                    y: 26,
                    fill: 'steelblue',
                },
                {
                    x: 'Feb',
                    y: 38,
                    fill: 'cornflowerblue',
                },
                {
                    x: 'Mar',
                    y: 10,
                    fill: 'lightblue',
                },
            ],
        },
        //...
    ]}
/>
```

**Use Customized Domain for Y Scale**:

Here is an example of using customized options for Y Scale. 

You can provide a custom `domain` used to create the scale function for the y-axis. If not provided, the domain will be determined by the maximum values of the `y` property among all items, and the minimum value of the domain will be 0.

```js
<GroupedBarChart
    yScaleOptions={
        domain: [0, 100],
    }
    data={[
        {
            title: 'California',
            data: [
                {
                    x: 'Jan',
                    y: 26,
                    fill: 'steelblue',
                },
                {
                    x: 'Feb',
                    y: 38,
                    fill: 'cornflowerblue',
                },
                {
                    x: 'Mar',
                    y: 10,
                    fill: 'lightblue',
                },
            ],
        },
        //...
    ]}
/>
```

**Add Horizonatl Reference Lines**
---

Here is an example of adding horizontal reference lines to the Grouped Bar Chart.

```js
<GroupedBarChart
    horizontalReferenceLines={[
        {
            y1: 30,
            y2: 30,
            label: 'text label with reference line',
        },
    ]}
    data={[
        {
            title: 'California',
            data: [
                {
                    x: 'Jan',
                    y: 26,
                    fill: 'steelblue',
                },
                {
                    x: 'Feb',
                    y: 38,
                    fill: 'cornflowerblue',
                },
                {
                    x: 'Mar',
                    y: 10,
                    fill: 'lightblue',
                },
            ],
        },
        //...
    ]}
/>
```

**Show Label text**

Here is an example of showing label text for each bar.
```js
<GroupedBarChart
    showLabelText={true}
    data={[
        {
            title: 'California',
            data: [
                {
                    x: 'Jan',
                    y: 26,
                    fill: 'steelblue',
                    label: '26',
                },
                {
                    x: 'Feb',
                    y: 38,
                    fill: 'cornflowerblue',
                    label: '38',
                },
                {
                    x: 'Mar',
                    y: 10,
                    fill: 'lightblue',
                    label: '10',
                },
            ],
        },
        //...
    ]}
/>
```

**Show Sticky Label text**
---

Here is an example of showing sticky label text for each bar.
```js
<GroupedBarChart
    showStickyLabelText={true}
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

**Show Divever Lines between Bars**

```js
<GroupedBarChart
    showDividerLines={true}
    data={[
        {
            title: 'California',
            data: [
                {
                    x: 'Jan',
                    y: 26,
                    fill: 'steelblue',
                },
                {
                    x: 'Feb',
                    y: 38,
                    fill: 'cornflowerblue',
                },
                {
                    x: 'Mar',
                    y: 10,
                    fill: 'lightblue',
                },
            ],
        },
        //...
    ]}
/>
```