import React from 'react';
import type { Meta, StoryObj } from '@storybook/react';

import { PieChart } from './PieChart';
import { data } from './data';

// More on how to set up stories at: https://storybook.js.org/docs/react/writing-stories/introduction#default-export
const meta: Meta<typeof PieChart> = {
    title: 'Example/PieChart',
    component: PieChart,
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
type Story = StoryObj<typeof PieChart>;

// More on component templates: https://storybook.js.org/docs/react/writing-stories/introduction#using-args
export const BasicExample: Story = {
    // More on args: https://storybook.js.org/docs/react/writing-stories/args
    args: {
        data,
        width: 200,
        height: 200,
    },
};

// More on component templates: https://storybook.js.org/docs/react/writing-stories/introduction#using-args
export const DonutChartExample: Story = {
    // More on args: https://storybook.js.org/docs/react/writing-stories/args
    args: {
        data,
        isDonut: true,
        width: 200,
        height: 200,
    },
};

// More on component templates: https://storybook.js.org/docs/react/writing-stories/introduction#using-args
export const HalfDonutChartExample: Story = {
    // More on args: https://storybook.js.org/docs/react/writing-stories/args
    args: {
        data,
        isDonut: true,
        isHalfPie: true,
        width: 200,
        height: 100,
    },
};

// More on component templates: https://storybook.js.org/docs/react/writing-stories/introduction#using-args
export const ShowTooltip: Story = {
    // More on args: https://storybook.js.org/docs/react/writing-stories/args
    args: {
        data,
        showTooltip: true,
        width: 200,
        height: 200,
    },
};

// More on component templates: https://storybook.js.org/docs/react/writing-stories/introduction#using-args
export const AddCustomEvents: Story = {
    // More on args: https://storybook.js.org/docs/react/writing-stories/args
    args: {
        data,
        width: 200,
        height: 200,
        onClick: (data) => {
            alert('clicked on a pie chart ' + data.tooltip);
        },
        onMouseEnter: (data) => {
            console.log('mouse pointer has entered pie chart path', data);
        },
        onMouseLeave: () => {
            console.log('mouse pointer has left the pie chart path');
        },
    },
};
