import '../variables.css';
import React, { FC, useMemo, useState } from 'react';
import {
    // ScaleBand,
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
import { XAxis, XAxisOptions } from '../XAxis/XAxis';
import { YAxis, YAxisOptions } from '../YAxis/YAxis';
import {
    HoveredChartItem,
    PointerEventsOverlay,
} from '../PointerEventOverlay/PointerEventsOverlay';
import { TooltipOnTop } from '../Tooltip/TooltipOnTop';
import { PointerReferenceLine } from '../PointerEventOverlay/PointerReferenceLine';
import Line from './Line';
import { DEFAULT_MARGINS } from '../SvgContainer/constants';

export type LineChartDataItem = {
    /**
     * A numerical value that determines the x position of this item.
     * Here are some examples of data that can be used as `x`:
     * - Unix timestamp (e.g., 1688167415)
     * - Year (e.g., 2014)
     * - Order of the item (e.g., 1)
     */
    x: number;
    /**
     * A numerical value that determines the y position of this item.
     */
    y: number;
    /**
     * The tooltip associated with this item, which can be plain text or an HTML string.
     */
    tooltip?: string;
};

// export type LineChartData = LineChartDataItem[];

type XScale = ScaleLinear<number, number> | ScaleTime<number, number>;

type YScale = ScaleLinear<number, number>;

type Props = {
    /**
     * array of `LineChartDataItem` that will be used to plot the Line Chart
     */
    data: LineChartDataItem[];
    /**
     * if true, show tooltip when user hovers the chart
     */
    showTooltip?: boolean;
    /**
     * options that will be used to create scale function for the x-axis
     */
    xScaleOptions?: {
        /**
         * If set to true, a time scale will be used instead of a linear scale for the x-axis.
         */
        useTimeScale?: boolean;
    };
    /**
     * options that will be used to create scale function for the y-axis
     */
    yScaleOptions?: {
        /**
         * Custom domain that will be used to create a scale function for the y-axis.
         * If not provided, the minimum and maximum values of the `value` property of all items will be used as the domain.
         */
        domain?: number[];
    };
    /**
     * options to customized x axis
     */
    xAxisOptions?: XAxisOptions;
    /**
     * options to customized y axis
     */
    yAxisOptions?: YAxisOptions;
    /**
     * stroke color of the Line
     */
    stroke?: string;
    /**
     * width of the line
     */
    strokeWidth?: number;
    /**
     * width of the chart conatiner, if not provided, it will fit to width of parent container
     */
    width?: number;
    /**
     * height of the chart conatiner, if not provided, it will fit to height of parent container
     */
    height?: number;
    /**
     * custom margin space
     */
    margin?: SvgContainerMargins;
};

/**
 * Basic Line Chart
 * @param param0
 * @returns
 */
export const LineChartBasic: FC<Props> = ({
    data,
    stroke,
    strokeWidth,
    showTooltip,
    xScaleOptions = {},
    yScaleOptions = {},
    xAxisOptions = {},
    yAxisOptions = {},
    width,
    height,
    margin = DEFAULT_MARGINS,
}: Props) => {
    const [dimension, setDimension] = useState<SvgContainerDimension>({
        height: 0,
        width: 0,
    });

    const [hoveredChartItem, setHoveredChartItem] =
        useState<HoveredChartItem>();

    const xScale = useMemo((): XScale => {
        const { width } = dimension;

        const xmin = min(data, (d) => d.x);
        const xmax = max(data, (d) => d.x);

        return xScaleOptions?.useTimeScale
            ? scaleTime().range([0, width]).domain([xmin, xmax])
            : scaleLinear().range([0, width]).domain([xmin, xmax]);
    }, [dimension, data]);

    const yScale = useMemo((): YScale => {
        const { height } = dimension;

        let domain = yScaleOptions?.domain || [];

        if (!domain.length) {
            const ymax = data && data.length ? max(data, (d) => d.y) : 0;

            const ymin = 0;

            domain = [ymin, ymax];
        }

        return scaleLinear<number, number>().range([height, 0]).domain(domain);
    }, [dimension, data]);

    return (
        <div
            style={{
                position: 'relative',
                width: width || '100%',
                height: height || '100%',
            }}
        >
            <SvgContainer margin={margin} dimensionOnChange={setDimension}>
                <Line
                    xScale={xScale}
                    yScale={yScale}
                    data={data}
                    stroke={stroke}
                    width={strokeWidth}
                />

                <XAxis
                    scale={xScale as AxisScale<number>}
                    showGridLines={xAxisOptions?.showGridLines}
                    numberOfTicks={xAxisOptions?.numberOfTicks}
                    tickFormatFunction={xAxisOptions?.tickFormatFunction}
                />

                <YAxis
                    scale={yScale}
                    showGridLines={yAxisOptions.showGridLines}
                    numberOfTicks={yAxisOptions.numberOfTicks}
                    tickFormatFunction={yAxisOptions?.tickFormatFunction}
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
                    xDomain={data.map((d) => d.x)}
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
