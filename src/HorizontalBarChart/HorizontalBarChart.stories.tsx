import React from 'react';
import type { Meta, StoryObj } from '@storybook/react';

import { HorizontalBarChart } from './HorizontalBarChart';
import {
    california2022GDPByIndustry,
    top5StatesBy2022GDP,
} from './examples.data';

// More on how to set up stories at: https://storybook.js.org/docs/react/writing-stories/introduction#default-export
const meta: Meta<typeof HorizontalBarChart> = {
    title: 'Example/HorizontalBarChart',
    component: HorizontalBarChart,
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
type Story = StoryObj<typeof HorizontalBarChart>;

// More on component templates: https://storybook.js.org/docs/react/writing-stories/introduction#using-args
export const BasicExample: Story = {
    // More on args: https://storybook.js.org/docs/react/writing-stories/args
    args: {
        data: top5StatesBy2022GDP,
        margin: {
            left: 100,
            right: 15,
            top: 30,
            bottom: 30,
        },
    },
};

export const California2022GDPByIndustryInBillionDollar: Story = {
    // More on args: https://storybook.js.org/docs/react/writing-stories/args
    args: {
        data: california2022GDPByIndustry,
        fill: '#2890ce',
        xScaleOptions: {
            domain: [0, 600],
        },
        bottomAxisOptions: {
            showGridLines: true,
        },
        margin: {
            left: 300,
            right: 15,
            top: 30,
            bottom: 30,
        },
        height: 500,
    },
};

export const CustomizeChartStyles: Story = {
    // More on args: https://storybook.js.org/docs/react/writing-stories/args
    args: {
        data: top5StatesBy2022GDP,
        fill: 'orange',
        innerPadding: 0.3,
        // width: 300,
        height: 300,
        margin: {
            left: 100,
            right: 15,
            top: 30,
            bottom: 30,
        },
    },
};

export const CustomizeLeftAxis: Story = {
    // More on args: https://storybook.js.org/docs/react/writing-stories/args
    args: {
        data: top5StatesBy2022GDP,
        leftAxisOptions: {
            tickFormatFunction: (val: number | string) => {
                val = typeof val === 'number' ? val.toString() : val;

                if (val === 'New York') {
                    return 'NY';
                }

                if (val === 'Texas') {
                    return 'TX';
                }

                return val.slice(0, 2).toUpperCase();
            },
        },
        height: 300,
    },
};

export const CustomizeBottomAxis: Story = {
    // More on args: https://storybook.js.org/docs/react/writing-stories/args
    args: {
        data: top5StatesBy2022GDP,
        bottomAxisOptions: {
            showGridLines: true,
            numberOfTicks: 3,
            tickFormatFunction: (val: string | number) => {
                return `${val} Billion Dollar`;
            },
        },
        height: 300,
        margin: {
            left: 100,
            right: 15,
            top: 30,
            bottom: 30,
        },
    },
};

export const useCustomizedDomainForXScale: Story = {
    // More on args: https://storybook.js.org/docs/react/writing-stories/args
    args: {
        data: top5StatesBy2022GDP,
        xScaleOptions: {
            domain: [0, 5000],
        },
        height: 300,
        margin: {
            left: 100,
            right: 15,
            top: 30,
            bottom: 30,
        },
    },
};
