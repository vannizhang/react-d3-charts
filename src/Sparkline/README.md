## Sparkline Chart
The Sparkline chart renders a tiny line chart using an array of numbers as input data. See [examples](https://vannizhang.github.io/react-d3-charts/?path=/docs/example-sparkline--docs).

### Usage
```sh
import { Sparkline } from '@vannizhang/react-d3-charts'
```

### Props
 **Name**      | **Type**                         | **Default** | **Description**                                                                                     
---------------|----------------------------------|-------------|-----------------------------------------------------------------------------------------------------
 data          | `number[]`                       | -           | Array of numbers that will be used to plot the Sparkline Chart.                     
 stroke        | `string` (optional)              | -           | The stroke color of the line.                                                                       
 strokeWidth   | `number` (optional)              | -           | The width of the line.                                                                              
 width         | `number` (optional)              | -           | The width of the chart container. If not provided, it will fit the width of the parent container.   
 height        | `number` (optional)              | -           | The height of the chart container. If not provided, it will fit the height of the parent container. 
 margin        | `SvgContainerMargins` (optional) | -           | Custom margins for the chart container.                                                             

### Examples

**Basic**

Here is an example of plotting a sparkline chart.
```js
<Sparkline
  data={[5, 16, 26 ,31, 7, 9, 14, 38]}
/>
```

**Customized Style**

Here is an example of customizing stroke color and width for the sparkline; and the `width`, `height` and `margin` of the chart container.
```js
<Sparkline
  stroke="orange"
  strokeWidth={1}
  height={20}
  width={60}
  margin={{
    bottom: 0,
    left: 0,
    right: 0,
    top: 0
  }}
  data={[5, 16, 26 ,31, 7, 9, 14, 38]}
/>
```