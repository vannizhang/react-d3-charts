import type { Meta, StoryObj } from '@storybook/react';

import { BarChartBasic } from './BarChartBasic';

// More on how to set up stories at: https://storybook.js.org/docs/react/writing-stories/introduction#default-export
const meta: Meta<typeof BarChartBasic> = {
    title: 'Example/BarChartBasic',
    component: BarChartBasic,
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
type Story = StoryObj<typeof BarChartBasic>;

const data = [
    {
        key: '12/1',
        value: 26,
        tooltip: 'this is a tooltip',
    },
    {
        key: '12/2',
        value: 38,
        tooltip: 'this is a tooltip',
    },
    {
        key: '12/3',
        value: 10,
        tooltip: 'this is a tooltip',
    },
    {
        key: '12/4',
        value: 45,
        tooltip: 'this is a tooltip',
    },
    {
        key: '12/5',
        value: 10,
        tooltip: 'this is a tooltip',
    },
    {
        key: '12/6',
        value: 12,
        tooltip: 'this is a tooltip',
    },
    {
        key: '12/7',
        value: 15,
        tooltip: 'this is a tooltip',
    },
    {
        key: '12/8',
        value: 7,
        tooltip: 'this is a tooltip',
    },
    {
        key: '12/9',
        value: 23,
        tooltip: 'this is a tooltip',
    },
    {
        key: '12/10',
        value: 4,
        tooltip: 'this is a tooltip, and it is longer than other ones',
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

export const CustomColorAndTickValues: Story = {
    // More on args: https://storybook.js.org/docs/react/writing-stories/args
    args: {
        data,
        color: 'orange',
        tickValuesOnXAxis: ['12/1', '12/5', '12/10'],
    },
};

export const ShowTooltipAndReferenceLine: Story = {
    // More on args: https://storybook.js.org/docs/react/writing-stories/args
    args: {
        data,
        showTooltip: true,
    },
};
