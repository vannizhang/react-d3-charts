import type { Meta, StoryObj } from '@storybook/react';
import React from 'react';

import { AreaChart } from './AreaChart';
import { data, dataTimestampForX } from './data';

// More on how to set up stories at: https://storybook.js.org/docs/react/writing-stories/introduction#default-export
const meta: Meta<typeof AreaChart> = {
    title: 'Example/AreaChart',
    component: AreaChart,
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
type Story = StoryObj<typeof AreaChart>;

// More on component templates: https://storybook.js.org/docs/react/writing-stories/introduction#using-args
export const BasicExample: Story = {
    // More on args: https://storybook.js.org/docs/react/writing-stories/args
    args: {
        data,
    },
};

export const CustomizedStyles: Story = {
    // More on args: https://storybook.js.org/docs/react/writing-stories/args
    args: {
        data,
        fill: 'rgba(255, 165, 0, .8)',
        width: 350,
        height: 150,
    },
};

export const ShowTooltipAndReferenceLine: Story = {
    // More on args: https://storybook.js.org/docs/react/writing-stories/args
    args: {
        data,
        showTooltip: true,
    },
};

export const CustomizedXAxisOptions: Story = {
    // More on args: https://storybook.js.org/docs/react/writing-stories/args
    args: {
        data,
        bottomAxisOptions: {
            showGridLines: true,
            numberOfTicks: 5,
            shouldRotateTextLabels: true,
            tickFormatFunction: (val: number | string) => {
                return val.toString();
            },
        },
    },
};

export const CustomizedYAxisOptions: Story = {
    // More on args: https://storybook.js.org/docs/react/writing-stories/args
    args: {
        data,
        leftAxisOptions: {
            showGridLines: true,
            numberOfTicks: 2,
            tickFormatFunction: (val: number | string) => {
                return '+' + val.toString();
            },
        },
    },
};

export const CustomizedOptionsForXScale: Story = {
    // More on args: https://storybook.js.org/docs/react/writing-stories/args
    args: {
        data: dataTimestampForX,
        showTooltip: true,
        xScaleOptions: {
            useTimeScale: true,
        },
        bottomAxisOptions: {
            tickFormatFunction: (val: number | string) => {
                return new Date(val).getFullYear().toString();
            },
        },
    },
};

export const CustomizedOptionsForYScale: Story = {
    // More on args: https://storybook.js.org/docs/react/writing-stories/args
    args: {
        data,
        showTooltip: true,
        yScaleOptions: {
            domain: [0, 200],
        },
    },
};

export const CustomizedVerticalReferenceLines: Story = {
    // More on args: https://storybook.js.org/docs/react/writing-stories/args
    args: {
        data,
        showTooltip: true,
        verticalReferenceLines: [
            {
                x: 2020,
                tooltip: 'text label with reference line',
            },
        ],
    },
};