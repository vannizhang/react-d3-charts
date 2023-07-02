import type { Meta, StoryObj } from '@storybook/react';

import { BarChartBasic } from './BarChartBasic';
import { data } from './data';

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
        fill: 'orange',
    },
};

export const CustomizedAxisOptions: Story = {
    // More on args: https://storybook.js.org/docs/react/writing-stories/args
    args: {
        data,
        xAxisOptions: {
            showGridLines: true,
            tickValues: ['12/1', '12/5', '12/10'],
            /**
             * formar tick value from `12/1` to `12-1`
             * @param val
             * @returns
             */
            tickFormatFunction: (val: string) => {
                const [month, day] = val.split('/');
                return `${month}-${day}`;
            },
        },
        yAxisOptions: {
            showGridLines: true,
            numberOfTicks: 3,
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
