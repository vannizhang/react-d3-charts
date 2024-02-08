import { DivergingBarChartDataItem } from './types';

export const data: DivergingBarChartDataItem[] = [
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
    {
        x: 'Crops',
        y: 25,
        tooltip: 'this is a tooltip',
        fill: 'wheat',
    },
    {
        x: 'Built',
        y: 38,
        tooltip: 'this is a tooltip',
        fill: 'red',
    },
    {
        x: 'Bare',
        y: 22,
        tooltip: 'this is a tooltip',
        fill: 'lightgrey',
    },
    {
        x: 'Range',
        y: 50,
        tooltip: 'this is a tooltip',
        fill: 'khaki',
    },
];

export const dataNumbericalX: DivergingBarChartDataItem[] = [
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
    {
        x: 2020,
        y: 25,
        tooltip: 'this is a tooltip',
    },
    {
        x: 2021,
        y: 38,
        tooltip: 'this is a tooltip',
    },
    {
        x: 2022,
        y: 22,
        tooltip: 'this is a tooltip',
    },
    {
        x: 2023,
        y: 50,
        tooltip: 'this is a tooltip',
    },
];

export const dataWithLabelOnTop: DivergingBarChartDataItem[] = [
    {
        x: 'Trees',
        y: -40,
        tooltip: 'this is a tooltip',
        fill: 'green',
        labelOnTop: '40%',
    },
    {
        x: 'Water',
        y: -10,
        tooltip: 'this is a tooltip',
        fill: 'dodgerblue',
        labelOnTop: '30%',
    },
    {
        x: 'Crops',
        y: 25,
        tooltip: 'this is a tooltip',
        fill: 'wheat',
        labelOnTop: '75%',
    },
    {
        x: 'Built',
        y: 38,
        tooltip: 'this is a tooltip',
        fill: 'red',
        labelOnTop: '-25%',
    },
    {
        x: 'Bare',
        y: 22,
        tooltip: 'this is a tooltip',
        fill: 'lightgrey',
        labelOnTop: '50%',
    },
    {
        x: 'Range',
        y: 50,
        tooltip: 'this is a tooltip',
        fill: 'khaki',
        labelOnTop: '10%',
    },
];
