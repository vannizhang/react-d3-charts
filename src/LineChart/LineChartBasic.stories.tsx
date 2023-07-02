import type { Meta, StoryObj } from '@storybook/react';

import { LineChartBasic } from './LineChartBasic';
import { data } from './data';

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
export const Default: Story = {
    // More on args: https://storybook.js.org/docs/react/writing-stories/args
    args: {
        data,
    },
};

export const CustomStyle: Story = {
    // More on args: https://storybook.js.org/docs/react/writing-stories/args
    args: {
        data,
        stroke: 'orange',
        strokeWidth: 3,
    },
};

export const CustomAxisOptions: Story = {
    // More on args: https://storybook.js.org/docs/react/writing-stories/args
    args: {
        data,
        xAxisOptions: {
            showGridLines: true,
            numberOfTicks: 5,
            tickFormatFunction: (val: number) => {
                return val.toString();
            },
        },
        yAxisOptions: {
            showGridLines: true,
            numberOfTicks: 2,
            tickFormatFunction: (val: number) => {
                return '+' + val.toString();
            },
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
        xAxisOptions: {
            timeformatSpecifier: '%Y %b',
        },

        margin: {
            top: 15,
            right: 20,
            bottom: 30,
            left: 30,
        },
    },
};
