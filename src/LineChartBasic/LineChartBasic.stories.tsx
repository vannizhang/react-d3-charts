import type { Meta, StoryObj } from '@storybook/react';

import { LineChartBasic } from './LineChartBasic';
import { MARGIN } from '../constants';

// More on how to set up stories at: https://storybook.js.org/docs/react/writing-stories/introduction#default-export
const meta: Meta<typeof LineChartBasic> = {
    title: 'Example/LineChartBasic',
    component: LineChartBasic,
    decorators: [
        (Story) => (
            <div
                style={{
                    width: '100%',
                    height: '100%',
                }}
            >
                {/* 👇 Decorators in Storybook also accept a function. Replace <Story/> with Story() to enable it  */}
                <Story />
            </div>
        ),
    ],
    // This component will have an automatically generated Autodocs entry: https://storybook.js.org/docs/react/writing-docs/autodocs
    tags: ['autodocs'],
    // More on argTypes: https://storybook.js.org/docs/react/api/argtypes
};

export default meta;
type Story = StoryObj<typeof LineChartBasic>;

const data = [
    {
        key: 2013,
        value: 26,
        tooltip: 'this is a tooltip',
    },
    {
        key: 2014,
        value: 38,
        tooltip: 'this is a <strong>tooltip</strong>',
    },
    {
        key: 2015,
        value: 10,
        tooltip: 'this is <br/>a tooltip',
    },
    {
        key: 2016,
        value: 45,
        tooltip: 'this is a tooltip',
    },
    {
        key: 2017,
        value: 10,
        tooltip: 'this is a tooltip',
    },
    {
        key: 2018,
        value: 12,
        tooltip: 'this is a tooltip',
    },
    {
        key: 2019,
        value: 15,
        tooltip: 'this is a tooltip',
    },
    {
        key: 2020,
        value: 7,
        tooltip: 'this is a tooltip',
    },
    {
        key: 2021,
        value: 23,
        tooltip: 'this is a tooltip',
    },
    {
        key: 2022,
        value: 20,
        tooltip: 'this is a tooltip',
    },
];

// More on component templates: https://storybook.js.org/docs/react/writing-stories/introduction#using-args
export const Default: Story = {
    // More on args: https://storybook.js.org/docs/react/writing-stories/args
    args: {
        data,
    },
};

export const ShowGridLine: Story = {
    // More on args: https://storybook.js.org/docs/react/writing-stories/args
    args: {
        data,
        showHorizontalGridLine: true,
        showVerticalGridLine: true,
    },
};

export const CustomStyleNumberAndFormatOfTicks: Story = {
    // More on args: https://storybook.js.org/docs/react/writing-stories/args
    args: {
        data,
        color: 'orange',
        strokeWidth: 3,
        numberOfTicksOnXAxis: 5,
        numberOfTicksOnYAxis: 2,
        tickFormatFunction4XAxis: (val: number) => {
            return val.toString();
        },
    },
};

export const ShowTooltipAndReferenceLine: Story = {
    // More on args: https://storybook.js.org/docs/react/writing-stories/args
    args: {
        data,
        showTooltip: true,
    },
};

export const UseScaleTime: Story = {
    // More on args: https://storybook.js.org/docs/react/writing-stories/args
    args: {
        data: data.map((d) => {
            return {
                ...d,
                key: new Date(d.key, 0, 1).getTime(),
            };
        }),
        showTooltip: true,
        timeformatSpecifier4XAxis: '%Y %b',
        margin: {
            ...MARGIN,
            right: 20,
        },
    },
};
