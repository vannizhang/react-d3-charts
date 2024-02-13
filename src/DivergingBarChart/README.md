## Diverging Bar Chart

A diverging bar chart is a type of bar chart that can be used to visualize the spread between values, generally positive and negative.

See [examples](https://vannizhang.github.io/react-d3-charts/?path=/docs/example-divergingbarchart--docs).

### Usage
```sh
import { DivergingBarChart } from '@vannizhang/react-d3-charts'
```

### Props
| **Name**            | **Type**                                           | **Default**                                  | **Description**                                                                                     |
|---------------------|----------------------------------------------------|----------------------------------------------|-----------------------------------------------------------------------------------------------------|
| data                | [`DivergingBarChartDataItem[]`](./types.ts)        | -                                            | The data used to render the bar chart.                                                              |
| showTooltip         | `boolean` (optional)                               | false                                        | Determines whether to show a tooltip when the user hovers over a bar element.                       |
| showStickyLabelText | `boolean` (optional)                               | false                                        | if true, show label text that will be sticky to the top of chart container.                         |
| yScaleOptions       | [`YScaleOptions`](./types.ts) (optional)           | -                                            | Options used to customize the scale function for the y-axis.                                        |
| bottomAxisOptions   | [`BottomAxisOptions`](../Axis/types.ts) (optional) | -                                            | Options used to customize the x-axis at bottom.                                                     |
| leftAxisOptions     | [`LeftAxisOptions`](../Axis/types.ts) (optional)   | -                                            | Options used to customize the y-axis at left.                                                       |
| fill                | `string` (optional)                                | -                                            | The fill color of the bar rectangles.                                                               |
| innerPadding        | `number` (optional)                                | 0.2                                          | The inner padding determines the blank space between bands.                                         |
| width               | `number` (optional)                                | -                                            | The width of the chart container. If not provided, it will fit the width of the parent container.   |
| height              | `number` (optional)                                | -                                            | The height of the chart container. If not provided, it will fit the height of the parent container. |
| margin              | `SvgContainerMargins` (optional)                   | `{top: 15, right: 15, bottom: 30,left: 30,}` | Custom margin space around the chart.                                                               |
                                

**Basic Example**
---

Here is an example of a Diverging Bar Chart:
```js
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

The `x` field of `DivergingBarChartDataItem` can also be a `number`
```js
<DivergingBarChart
  data={[
    {
      x: 2018,
      y: -40,
      tooltip: 'this is a tooltip',
    },
    {
      x: 2019,
      y: -10,
      tooltip: 'this is a tooltip',
    },
    //...
  ]}
 />
```

**Customized Style**
---

Here is an example of customizing `fill` color and `innerPadding` for the bar rectangles; and the `width`, `height` of the chart container.
```js
<DivergingBarChart
	fill={'orange'}
	innerPadding={0.05}
	width={450}
	height={300}
	data={[
		{
			x: 2018,
			y: -40,
			tooltip: 'this is a tooltip',
		},
		//...
	]}
/>
```

**Show Tooltip And Crosshair Reference Line**
---

Set `showTooltip` to true to show a tooltip when the user hovers over a bar element. 

Plase make sure the `tooltip` field is included in each `DivergingBarChartDataItem`.
```js
<DivergingBarChart
  showTooltip={true}
  data={[
    {
      x: 'Trees',
      y: -40,
      tooltip: 'this is a tooltip',
      fill: 'green',
    },
    //...
  ]}
/>
```

**Customized Options for X Axis at Bottom**
---

You can provide a custom format function mapping a value from the axis Domain to a formatted string for display purposes:
```js
<DivergingBarChart
  bottomAxisOptions={{
    shouldRotateTextLabels: true,
      // a format function to convert default value (e.g. 'Trees') into a different format (e.g. 'Change of Trees')
    tickFormatFunction: (val: number | string) => {
      if (typeof val === 'number') {
        val = val.toString();
      }

      return `Change of ${val}`;
    },
  }}
  data={[
    {
      x: 'Trees',
      y: -40,
    },
    //...
  ]}
/>
```

**Customized Options for Y Axis at left**
---

Here is an example of extend ticks on y axis and show them as grid lines: 
```js
<DivergingBarChart
  leftAxisOptions={{
    numberOfTicks: 3,
    showGridLines: true
  }}
  data={[
    {
      x: 'Trees',
      y: -40,
    },
    //...
  ]}
/>
```

You can provide a custom format function mapping a value from the axis Domain to a formatted string for display purposes. Here is an example of adding '%' to the end of tick label text.
```js
<DivergingBarChart
  leftAxisOptions={{
	tickFormatFunction: (domainValue, index) => {
		return domainValue + '%';
	},
  }}
  data={[
    {
      x: 'Trees',
      y: -40,
    },
    //...
  ]}
/>
```

**Customized Options For Y Scale**
---

Here is an example of using customized options for Y Scale. 

You can provide a custom `domain` used to create the scale function for the y-axis. If not provided, the maximum value of the domain will be determined by the maximum absolute values of the `y` property among all items. The minimum value will be the negative value of the maximum value.
```js
<DivergingBarChart
  yScaleOptions={{
    domain: [ -200, 200 ]
  }}
  data={[
    {
      x: 2018,
      y: -40,
    },
    //...
  ]}
/>
```

**Show Sticky Label text**
---

Here is an example of showing sticky label text for each bar.
```js
<DivergingBarChart
  data={[
    {
      x: 2018,
      y: -40,
      labelOnTop: '2018'
    },
    //...
  ]}
  showStickyLabelText={true}
/>
```