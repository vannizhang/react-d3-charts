import type { Meta, StoryObj } from '@storybook/react';
import React from 'react';

import { MultipleLinesChart } from './MultipleLinesChart';
import { data, dataTimestampForX, dataWithDashPattern } from './examples.data';
import { DEFAULT_MARGINS } from '../SvgContainer/constants';

// More on how to set up stories at: https://storybook.js.org/docs/react/writing-stories/introduction#default-export
const meta: Meta<typeof MultipleLinesChart> = {
    title: 'Example/MultipleLinesChart',
    component: MultipleLinesChart,
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
type Story = StoryObj<typeof MultipleLinesChart>;

// More on component templates: https://storybook.js.org/docs/react/writing-stories/introduction#using-args
export const BasicExample: Story = {
    // More on args: https://storybook.js.org/docs/react/writing-stories/args
    args: {
        data,
    },
};

export const MetaAndMicrosoftAverageClosingPriceOn2022: Story = {
    // More on args: https://storybook.js.org/docs/react/writing-stories/args
    args: {
        data,
        yScaleOptions: {
            domain: [50, 450],
        },
        leftAxisOptions: {
            // showGridLines: true,
            numberOfTicks: 3,
            tickFormatFunction: (val: number | string) => {
                return '$' + val.toString();
            },
        },
        bottomAxisOptions: {
            showGridLines: true,
            // numberOfTicks: 5,
            tickFormatFunction: (val: number | string, index) => {
                const monthAbbreviations = [
                    'Jan',
                    'Feb',
                    'Mar',
                    'Apr',
                    'May',
                    'Jun',
                    'Jul',
                    'Aug',
                    'Sep',
                    'Oct',
                    'Nov',
                    'Dec',
                ];

                return monthAbbreviations[index as number];
            },
        },
        horizontalReferenceLines: [
            {
                y: 382,
                label: 'Meta Highest Closing Price on 2021: $382',
            } as any,
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

export const CustomizeBottomAxis: Story = {
    // More on args: https://storybook.js.org/docs/react/writing-stories/args
    args: {
        data,
        bottomAxisOptions: {
            showGridLines: true,
            // numberOfTicks: 5,
            shouldRotateTextLabels: true,
            tickFormatFunction: (val: number | string, index) => {
                const monthAbbreviations = [
                    'Jan',
                    'Feb',
                    'Mar',
                    'Apr',
                    'May',
                    'Jun',
                    'Jul',
                    'Aug',
                    'Sep',
                    'Oct',
                    'Nov',
                    'Dec',
                ];

                return monthAbbreviations[index as number];
            },
        },
    },
};

export const CustomizeLeftAxis: Story = {
    // More on args: https://storybook.js.org/docs/react/writing-stories/args
    args: {
        data,
        leftAxisOptions: {
            // showGridLines: true,
            numberOfTicks: 3,
            tickFormatFunction: (val: number | string) => {
                return '$' + val.toString();
            },
        },
    },
};

export const UseTimeScaleForXScale: Story = {
    // More on args: https://storybook.js.org/docs/react/writing-stories/args
    args: {
        data: dataTimestampForX,
        xScaleOptions: {
            useTimeScale: true,
        },
        bottomAxisOptions: {
            showGridLines: true,
            tickFormatFunction: (val: number | string) => {
                const month = [
                    'January',
                    'February',
                    'March',
                    'April',
                    'May',
                    'June',
                    'July',
                    'August',
                    'September',
                    'October',
                    'November',
                    'December',
                ];
                return month[new Date(val).getMonth()];
            },
        },
        margin: {
            ...DEFAULT_MARGINS,
            right: 30,
        },
    },
};

export const UseCustomizedDomainForYScale: Story = {
    // More on args: https://storybook.js.org/docs/react/writing-stories/args
    args: {
        data,
        showTooltip: true,
        yScaleOptions: {
            domain: [50, 350],
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
                tooltip:
                    'Meta hit Lowest Closing Price<br/> $93.16 on Oct 2022 ',
            },
        ],
    },
};

export const AddVerticalReferenceLinesWithDifferentStyles: Story = {
    // More on args: https://storybook.js.org/docs/react/writing-stories/args
    args: {
        data,
        showTooltip: true,
        verticalReferenceLines: [
            {
                x: 5,
                tooltip: 'Reference Line uses default style ',
            },
            {
                x: 6,
                tooltip: 'Reference Line uses default style',
                strokeColor: 'orange',
                strokeWidth: '2px',
                strokeDashArray: '1, 2',
            },
            {
                x: 10,
                tooltip: 'Reference Line uses custome style',
                strokeColor: 'red',
                strokeWidth: '4px',
            },
        ],
    },
};

export const AddHorizontalReferenceLines: Story = {
    // More on args: https://storybook.js.org/docs/react/writing-stories/args
    args: {
        data,
        yScaleOptions: {
            domain: [50, 400],
        },
        horizontalReferenceLines: [
            {
                y: 382,
                label: 'Meta Highest Closing Price on 2021: $382',
            } as any,
        ],
    },
};

export const AddReferenceRectangles: Story = {
    // More on args: https://storybook.js.org/docs/react/writing-stories/args
    args: {
        data,
        referenceRectangels: [
            {
                key: 'rectangle-1',
                xMin: 4,
                xMax: 9,
                fillColor: 'rgba(50,50,50,.1)',
            } as any,
        ],
    },
};

export const UseDashPattern: Story = {
    // More on args: https://storybook.js.org/docs/react/writing-stories/args
    args: {
        data: dataWithDashPattern,
        strokeWidth: 3,
    },
};
