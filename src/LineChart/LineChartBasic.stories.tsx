import type { Meta, StoryObj } from '@storybook/react';
import React from 'react';

import { LineChartBasic } from './LineChartBasic';
import {
    californiaUnemploymentData,
    data,
    dataTimestampForX,
} from './examples.data';
import { DEFAULT_MARGINS } from '../SvgContainer/constants';

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

// More on component templates: https://storybook.js.org/docs/react/writing-stories/introduction#using-args
export const BasicExample: Story = {
    // More on args: https://storybook.js.org/docs/react/writing-stories/args
    args: {
        data,
    },
};

export const CaliforniaUnemploymentRateApril2022ToMay2023: Story = {
    // More on args: https://storybook.js.org/docs/react/writing-stories/args
    args: {
        data: californiaUnemploymentData,
        showTooltip: true,
        stroke: 'rgba(20,106,164,1)',
        yScaleOptions: {
            domain: [3, 5],
        },
        leftAxisOptions: {
            tickFormatFunction: (val: number) => {
                return `${val.toFixed(1)}%`;
            },
        },
        bottomAxisOptions: {
            tickFormatFunction: (val, index) => {
                const tickValues = [
                    '2022 Apr',
                    'May',
                    'Jun',
                    'Jul',
                    'Aug',
                    'Sep',
                    'Oct',
                    'Nov',
                    'Dec',
                    '2023 Jan',
                    'Feb',
                    'Mar',
                    'Apr',
                    'May',
                ];

                return tickValues[index as number];
            },
            showGridLines: true,
        },
        horizontalReferenceLines: [
            {
                y1: 3.6,
                y2: 3.6,
                label: '2022 national average: 3.6%',
            },
        ],
        margin: {
            ...DEFAULT_MARGINS,
            left: 40,
        },
    },
};

export const CustomizeChartStyles: Story = {
    // More on args: https://storybook.js.org/docs/react/writing-stories/args
    args: {
        data,
        stroke: 'orange',
        strokeWidth: 3,
        width: 350,
        height: 150,
    },
};

export const ShowTooltipAndCrosshairReferenceLine: Story = {
    // More on args: https://storybook.js.org/docs/react/writing-stories/args
    args: {
        data,
        showTooltip: true,
    },
};

export const CustomizeXAxis: Story = {
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

export const CustomizeYAxis: Story = {
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

export const UseTimeScaleForXScale: Story = {
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

export const UseCustomizedDomainForXScale: Story = {
    // More on args: https://storybook.js.org/docs/react/writing-stories/args
    args: {
        data,
        xScaleOptions: {
            domain: [1, 24],
        },
    },
};

export const UseCustomizedDomainForYScale: Story = {
    // More on args: https://storybook.js.org/docs/react/writing-stories/args
    args: {
        data,
        showTooltip: true,
        yScaleOptions: {
            domain: [0, 100],
        },
    },
};

export const AddVerticalReferenceLines: Story = {
    // More on args: https://storybook.js.org/docs/react/writing-stories/args
    args: {
        data,
        showTooltip: true,
        verticalReferenceLines: [
            {
                x: 10,
                tooltip: 'text label with reference line',
            },
        ],
    },
};

export const AddHorizontalReferenceLines: Story = {
    // More on args: https://storybook.js.org/docs/react/writing-stories/args
    args: {
        data,
        showTooltip: true,
        horizontalReferenceLines: [
            {
                y1: 10,
                y2: 35,
                label: 'text label with reference line',
            },
        ],
    },
};

export const AddCustomEventHandler: Story = {
    // More on args: https://storybook.js.org/docs/react/writing-stories/args
    args: {
        data,
        showTooltip: true,
        onClick: (index: number) => {
            alert(`clicked on data at index of ${index}`);
        },
    },
};
