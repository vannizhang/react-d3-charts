import React from 'react';
import type { Meta, StoryObj } from '@storybook/react';

import { BarLineComboChart } from './BarLineComboChart';
import { UnemploymentData, data } from './data';

// More on how to set up stories at: https://storybook.js.org/docs/react/writing-stories/introduction#default-export
const meta: Meta<typeof BarLineComboChart> = {
    title: 'Example/BarLineComboChart',
    component: BarLineComboChart,
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
type Story = StoryObj<typeof BarLineComboChart>;

// More on component templates: https://storybook.js.org/docs/react/writing-stories/introduction#using-args
export const BasicExample: Story = {
    // More on args: https://storybook.js.org/docs/react/writing-stories/args
    args: {
        data,
    },
};

export const CaliforniaUnemploymentRateMay2022ToJune2023: Story = {
    // More on args: https://storybook.js.org/docs/react/writing-stories/args
    args: {
        data: UnemploymentData,
        showTooltip: true,
        fill: '#FF8000',
        strokeColor: '#136AA4',
        strokeWidth: 2,
        innerPadding: 0.8,
        bottomAxisOptions: {
            tickFormatFunction: (
                val: number | string,
                index: number | undefined
            ) => {
                const ticks = [
                    'May 2022',
                    'Jun',
                    'Jul',
                    'Aug',
                    'Sep',
                    'Oct',
                    'Nov',
                    'Dec',
                    'Jan 2023',
                    'Feb',
                    'Mar',
                    'Apr',
                    'May',
                    'Jun',
                ];

                return ticks[index as any];
            },
        },
    },
};

export const CustomizeChartStyles: Story = {
    // More on args: https://storybook.js.org/docs/react/writing-stories/args
    args: {
        data,
        fill: 'orange',
        strokeColor: 'lightseagreen',
        innerPadding: 0.05,
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

export const CustomizeBottomAxis: Story = {
    // More on args: https://storybook.js.org/docs/react/writing-stories/args
    args: {
        data,
        bottomAxisOptions: {
            /**
             * set to true to extend ticks on x axis and show them as grid lines
             */
            showGridLines: true,
            /**
             * Specified values to be used for ticks rather than using the scale’s automatic tick generator.
             */
            tickValues: ['12/1', '12/5', '12/10'],
            shouldRotateTextLabels: true,
            /**
             * You can provide a custom format function mapping a value from the axis Domain to a formatted string for display purposes.
             * @param val
             * @returns
             */
            tickFormatFunction: (val: number | string) => {
                if (typeof val === 'number') {
                    val = val.toString();
                }

                const [month, day] = val.split('/');
                return `${month}-${day}`;
            },
        },
    },
};

export const CustomizeLeftAxis: Story = {
    // More on args: https://storybook.js.org/docs/react/writing-stories/args
    args: {
        data,
        leftAxisOptions: {
            showGridLines: true,
            numberOfTicks: 3,
        },
    },
};

export const UseCustomizedDomainForYScale: Story = {
    // More on args: https://storybook.js.org/docs/react/writing-stories/args
    args: {
        data,
        yScaleOptions: {
            domain: [0, 200],
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
                x: '12/9',
                tooltip: 'tooltip comes with reference line',
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
                y: 35,
                label: 'text label with reference line',
            },
        ],
    },
};
