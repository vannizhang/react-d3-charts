import React from 'react';
import type { Meta, StoryObj } from '@storybook/react';

import { DivergingBarChart } from './DivergingBarChart';
import { data, dataNumbericalX, dataWithLabelOnTop } from './data';
import { DEFAULT_MARGINS } from '../SvgContainer/constants';

// More on how to set up stories at: https://storybook.js.org/docs/react/writing-stories/introduction#default-export
const meta: Meta<typeof DivergingBarChart> = {
    title: 'Example/DivergingBarChart',
    component: DivergingBarChart,
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
type Story = StoryObj<typeof DivergingBarChart>;

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
        data: dataNumbericalX,
        fill: 'orange',
        innerPadding: 0.05,
        width: 450,
        height: 300,
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
            /**
             * set to true to extend ticks on x axis and show them as grid lines
             */
            showGridLines: true,
            // /**
            //  * Specified values to be used for ticks rather than using the scale’s automatic tick generator.
            //  */
            // tickValues: ['Trees', 'Crops', 'Bare'],
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

                return `Change of ${val}`;
            },
        },
        height: 300,
        margin: {
            ...DEFAULT_MARGINS,
            bottom: 120,
        },
    },
};

export const CustomizedYAxisOptions: Story = {
    // More on args: https://storybook.js.org/docs/react/writing-stories/args
    args: {
        data,
        leftAxisOptions: {
            showGridLines: true,
            numberOfTicks: 3,
            tickFormatFunction: (domainValue, index) => {
                return domainValue + '%';
            },
        },
    },
};

export const CustomizedOptionsForYScale: Story = {
    // More on args: https://storybook.js.org/docs/react/writing-stories/args
    args: {
        data,
        yScaleOptions: {
            domain: [-200, 200],
        },
    },
};

export const ShowLabelOnTop: Story = {
    // More on args: https://storybook.js.org/docs/react/writing-stories/args
    args: {
        data: dataWithLabelOnTop,
        showLabelOnTop: true,
        leftAxisOptions: {
            shouldHide: true,
        },
        margin: {
            top: 30,
            right: 15,
            bottom: 30,
            left: 30,
        },
    },
};
