## Pie Chart
Pie charts can be used to summarize a set of nominal data or display the different values of a given variable, such as a percentage distribution. 

See [examples](https://vannizhang.github.io/react-d3-charts/?path=/docs/example-piechart--docs).

### Usage
```sh
import { PieChart } from '@vannizhang/react-d3-charts'
```

### Props
| **Name**     | **Type**                                        | **Default** | **Description**                                                                                     |
|--------------|-------------------------------------------------|-------------|-----------------------------------------------------------------------------------------------------|
| data         | [`PieChartDataItem[]`](./types.ts)              | -           | Data that will be used to plot the Pie Chart.                                                       |
| isDonut      | `boolean` (optional)                            | -           | if true, a pie chart with a hole in the center, which makes it look like an donut.                  |
| isHalfPie    | `boolean` (optional)                            | -           | if true, create half pie chart is a 180 degree graph that represents the composition of a whole.    |
| width        | `number` (optional)                             | -           | The width of the chart container. If not provided, it will fit the width of the parent container.   |
| height       | `number` (optional)                             | -           | The height of the chart container. If not provided, it will fit the height of the parent container. |
| onClick      | `(data: PieChartDataItem) => void` (optional)   | -           | Fires when user clicks a slice of the pie chart.                                                    |
| onMouseEnter | `(data: PieChartDataItem) => void` (optional)   | -           | Fires when user hovers a slice of the pie chart.                                                    |
| onMouseLeave | `() => void` (optional)                         | -           | Fires when user leaves a slice of the pie chart.                                                    |                                                  


**Basic Example**
---

Here is an example of plotting a Pie chart.
```js
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

**Customized Styles**
---

Here is an example of using customized colors for each slice:
```js
<PieChart
  data={[
    {
      key: 'CA',
      value: 2,
      tooltip: 'this is a tooltip',
      color: 'steelblue'
    },
    {
      key: 'CO',
      value: 4,
      tooltip: 'this is a tooltip',
      color: 'skyblue'
    },
    //...
  ]}
/>
```

You can create a donut pie chart:
```js
<PieChart
  isDonut={true}
  data={[
    {
      key: 'CA',
      value: 2,
      tooltip: 'this is a tooltip',
      color: 'steelblue'
    },
    //...
  ]}
/>
```

You can create a half pie chart, it is recommended to specify the dimension of the container as a rectangle instead of a square. This will ensure that the half pie chart fits properly into the container.
```js
<PieChart
  isHalfPie={true}
  height={60} // use the height as half of the width so the half pie chart can fit into the container
  width={120}
  data={[
    {
      key: 'CA',
      value: 2,
      tooltip: 'this is a tooltip',
      color: 'steelblue'
    },
    //...
  ]}
/>
```