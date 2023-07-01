import '../variables.css';
import React, { FC, useMemo, useState } from 'react';
import {
    ScaleBand,
    scaleLinear,
    // scaleTime,
    ScaleLinear,
    scaleTime,
    max,
    min,
    ScaleTime,
    AxisScale,
} from 'd3';
import SvgContainer, {
    SvgContainerDimension,
    SvgContainerMargins,
} from '../SvgContainer/SvgContainer';
import { MARGIN } from '../constants';
import { XAxis } from '../XAxis/XAxis';
import { YAxis } from '../YAxis/YAxis';
import {
    HoveredChartItem,
    PointerEventsOverlay,
} from '../PointerEventOverlay/PointerEventsOverlay';
import { TooltipOnTop } from '../Tooltip/TooltipOnTop';
import { PointerReferenceLine } from '../PointerEventOverlay/PointerReferenceLine';
import Line from './Line';

export type LineChartDataItem = {
    /**
     * key is a numerical value that determines the x position of this item.
     * key can be used to contain values like:
     * - unix timestamp (e.g. 1688167415)
     * - year (e.g. 2014)
     * - order of the item (e.g. 1)
     */
    key: number;
    /**
     * value is numerical value that determines the y position of this item
     */
    value: number;
    /**
     * tooltip assoicated with this item, can be plain text or html string
     */
    tooltip?: string;
};

export type LineChartData = LineChartDataItem[];

type XScale = ScaleLinear<number, number> | ScaleTime<number, number>;

type YScale = ScaleLinear<number, number>;

type Props = {
    data: LineChartData;
    /**
     * fill color of the Line
     */
    color?: string;
    /**
     * width of the line
     */
    strokeWidth?: number;
    /**
     * if true, show tooltip when user hovers the chart
     */
    showTooltip?: boolean;
    /**
     * custom margin space
     */
    margin?: SvgContainerMargins;
    /**
     * indicate number of ticks that should be renderder on x axis
     */
    numberOfTicksOnXAxis?: number;
    /**
     * indicate number of ticks that should be renderder on y axis
     */
    numberOfTicksOnYAxis?: number;
    /**
     * if ture, show horizontal grid lines
     */
    showHorizontalGridLine?: boolean;
    /**
     * if ture, show vertical grid lines
     */
    showVerticalGridLine?: boolean;
    /**
     * custom format function mapping a value from the axis Domain to a formatted string for display purposes.
     * @param domainValue original domain value
     * @param index
     * @returns formatted string
     */
    tickFormatFunction4XAxis?: (
        domainValue: number | string,
        index?: number
    ) => string;
    /**
     * custom format function mapping a value from the axis Domain to a formatted string for display purposes.
     * @param domainValue original domain value
     * @param index
     * @returns formatted string
     */
    tickFormatFunction4YAxis?: (domainValue: number, index?: number) => string;
    /**
     * A string with the desired format directives that will be used to format the key of each item.
     * When timeformatSpecifier is provided, scale time will be used on x axis instead of scale linear.
     *
     * @see https://github.com/d3/d3-time-format
     */
    timeformatSpecifier4XAxis?: string;
};

/**
 * Basic Line Chart
 * @param param0
 * @returns
 */
export const LineChartBasic: FC<Props> = ({
    data,
    color,
    strokeWidth,
    showHorizontalGridLine,
    showVerticalGridLine,
    numberOfTicksOnXAxis,
    numberOfTicksOnYAxis,
    tickFormatFunction4XAxis,
    tickFormatFunction4YAxis,
    showTooltip,
    timeformatSpecifier4XAxis,
    margin = MARGIN,
}: Props) => {
    const [dimension, setDimension] = useState<SvgContainerDimension>({
        height: 0,
        width: 0,
    });

    const [hoveredChartItem, setHoveredChartItem] =
        useState<HoveredChartItem>();

    const xScale = useMemo((): XScale => {
        const { width } = dimension;

        const shouldUseTimeScale = timeformatSpecifier4XAxis !== undefined;

        const xmin = min(data, (d) => d.key);
        const xmax = max(data, (d) => d.key);

        return shouldUseTimeScale
            ? scaleTime().range([0, width]).domain([xmin, xmax])
            : scaleLinear().range([0, width]).domain([xmin, xmax]);
    }, [dimension, data]);

    const yScale = useMemo((): YScale => {
        const { height } = dimension;

        const ymax = data && data.length ? max(data, (d) => d.value) : 0;

        const ymin = 0;

        return scaleLinear<number, number>()
            .range([height, 0])
            .domain([ymin, ymax]);
    }, [dimension, data]);

    return (
        <div
            style={{
                position: 'relative',
                width: '100%',
                height: '100%',
            }}
        >
            <SvgContainer margin={margin} dimensionOnChange={setDimension}>
                <Line
                    xScale={xScale}
                    yScale={yScale}
                    data={data}
                    color={color}
                    width={strokeWidth}
                />

                <XAxis
                    scale={xScale as AxisScale<number>}
                    showGridLines={showVerticalGridLine}
                    timeformatSpecifier={timeformatSpecifier4XAxis}
                    numberOfTicks={numberOfTicksOnXAxis}
                    tickFormatFunction={tickFormatFunction4XAxis}
                />

                <YAxis
                    scale={yScale}
                    showGridLines={showHorizontalGridLine}
                    numberOfTicks={numberOfTicksOnYAxis}
                    tickFormatFunction={tickFormatFunction4YAxis}
                />

                {showTooltip ? (
                    <PointerReferenceLine
                        xPosition={
                            hoveredChartItem ? hoveredChartItem.xPosition : null
                        }
                    />
                ) : (
                    <></>
                )}

                <PointerEventsOverlay
                    xScale={xScale}
                    xDomain={data.map((d) => d.key)}
                    hoveredChartItemOnChange={setHoveredChartItem}
                />
            </SvgContainer>

            {showTooltip && hoveredChartItem && (
                <TooltipOnTop
                    content={data[hoveredChartItem.index]?.tooltip}
                    xPosition={hoveredChartItem.xPosition}
                    dimension={dimension}
                    margin={margin}
                />
            )}
        </div>
    );
};
