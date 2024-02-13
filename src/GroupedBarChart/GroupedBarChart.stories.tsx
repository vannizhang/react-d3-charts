import React from 'react';
import type { Meta, StoryObj } from '@storybook/react';

import { GroupedBarChart } from './GroupedBarChart';
import { data as groupedData } from './data';

// More on how to set up stories at: https://storybook.js.org/docs/react/writing-stories/introduction#default-export
const meta: Meta<typeof GroupedBarChart> = {
    title: 'Example/GroupedBarChart',
    component: GroupedBarChart,
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
type Story = StoryObj<typeof GroupedBarChart>;

// More on component templates: https://storybook.js.org/docs/react/writing-stories/introduction#using-args
export const BasicExample: Story = {
    // More on args: https://storybook.js.org/docs/react/writing-stories/args
    args: {
        groupedData,
    },
};

// export const CustomizeChartStyles: Story = {
//     // More on args: https://storybook.js.org/docs/react/writing-stories/args
//     args: {
//         data,
//         fill: 'orange',
//         innerPadding: 0.05,
//         width: 350,
//         height: 150,
//     },
// };

// export const ShowTooltipAndReferenceLine: Story = {
//     // More on args: https://storybook.js.org/docs/react/writing-stories/args
//     args: {
//         data,
//         showTooltip: true,
//     },
// };

// export const CustomizeBottomAxis: Story = {
//     // More on args: https://storybook.js.org/docs/react/writing-stories/args
//     args: {
//         data,
//         bottomAxisOptions: {
//             /**
//              * set to true to extend ticks on x axis and show them as grid lines
//              */
//             showGridLines: true,
//             /**
//              * Specified values to be used for ticks rather than using the scale’s automatic tick generator.
//              */
//             tickValues: ['12/1', '12/5', '12/10'],
//             shouldRotateTextLabels: true,
//             /**
//              * You can provide a custom format function mapping a value from the axis Domain to a formatted string for display purposes.
//              * @param val
//              * @returns
//              */
//             tickFormatFunction: (val: number | string) => {
//                 if (typeof val === 'number') {
//                     val = val.toString();
//                 }

//                 const [month, day] = val.split('/');
//                 return `${month}-${day}`;
//             },
//         },
//     },
// };

export const CustomizeLeftAxis: Story = {
    // More on args: https://storybook.js.org/docs/react/writing-stories/args
    args: {
        groupedData,
        leftAxisOptions: {
            showGridLines: true,
            numberOfTicks: 3,
        },
    },
};

// export const HideLeftAxis: Story = {
//     // More on args: https://storybook.js.org/docs/react/writing-stories/args
//     args: {
//         data,
//         leftAxisOptions: {
//             shouldHide: true,
//         },
//     },
// };

export const UseCustomizedDomainForYScale: Story = {
    // More on args: https://storybook.js.org/docs/react/writing-stories/args
    args: {
        groupedData,
        yScaleOptions: {
            domain: [0, 100],
        },
    },
};

// export const AddVerticalReferenceLines: Story = {
//     // More on args: https://storybook.js.org/docs/react/writing-stories/args
//     args: {
//         data,
//         showTooltip: true,
//         verticalReferenceLines: [
//             {
//                 x: '12/9',
//                 tooltip: 'tooltip comes with reference line',
//             },
//         ],
//     },
// };

export const AddHorizontalReferenceLines: Story = {
    // More on args: https://storybook.js.org/docs/react/writing-stories/args
    args: {
        groupedData,
        // showTooltip: true,
        horizontalReferenceLines: [
            {
                y1: 30,
                y2: 30,
                label: 'text label with reference line',
            },
        ],
    },
};

// export const ShowLabelOnTop: Story = {
//     // More on args: https://storybook.js.org/docs/react/writing-stories/args
//     args: {
//         data: dataWithLabelOnTop,
//         showTooltip: false,
//         showLabelOnTop: true,
//         shouldLabelOnTopUseFixedTopPosition: true,
//         margin: {
//             top: 30,
//             right: 15,
//             bottom: 30,
//             left: 30,
//         },
//     },
// };
