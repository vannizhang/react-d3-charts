import React from 'react';
import type { Meta, StoryObj } from '@storybook/react';

import { HorizontalBarChart } from './HorizontalBarChart';
import { data } from './data';

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
        data,
        margin: {
            left: 100,
            right: 15,
            top: 30,
            bottom: 30,
        },
    },
};

// export const BasicExampleNumericaValueForXAxis: Story = {
//     // More on args: https://storybook.js.org/docs/react/writing-stories/args
//     args: {
//         data: dataNumbericalX,
//     },
// };

export const CustomizedStyles: Story = {
    // More on args: https://storybook.js.org/docs/react/writing-stories/args
    args: {
        data,
        fill: 'orange',
        innerPadding: 0.3,
        // width: 300,
        height: 400,
        margin: {
            left: 100,
            right: 15,
            top: 30,
            bottom: 30,
        },
    },
};

export const CustomizedLeftAxisOptions: Story = {
    // More on args: https://storybook.js.org/docs/react/writing-stories/args
    args: {
        data,
        leftAxisOptions: {
            tickFormatFunction: (val: number | string) => {
                val = typeof val === 'number' ? val.toString() : val;

                return val.slice(0, 2).toUpperCase();
            },
        },
        height: 300,
    },
};

export const CustomizedBottomAxisOptions: Story = {
    // More on args: https://storybook.js.org/docs/react/writing-stories/args
    args: {
        data,
        bottomAxisOptions: {
            showGridLines: true,
            numberOfTicks: 10,
            tickFormatFunction: (val: string | number) => {
                return `$${val}`;
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

export const CustomizedOptionsForXScale: Story = {
    // More on args: https://storybook.js.org/docs/react/writing-stories/args
    args: {
        data,
        xScaleOptions: {
            domain: [0, 100],
        },
        bottomAxisOptions: {
            showGridLines: true,
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
