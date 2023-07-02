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
    /**
     * array of `LineChartDataItem` that will be used to plot the Line Chart
     */
    data: LineChartData;
    /**
     * stroke color of the Line
     */
    stroke?: string;
    /**
     * width of the line
     */
    strokeWidth?: number;
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

        const xmin = min(data, (d) => d.key);
        const xmax = max(data, (d) => d.key);

        return xScaleOptions?.useTimeScale
            ? scaleTime().range([0, width]).domain([xmin, xmax])
            : scaleLinear().range([0, width]).domain([xmin, xmax]);
    }, [dimension, data]);

    const yScale = useMemo((): YScale => {
        const { height } = dimension;

        let domain = yScaleOptions?.domain || [];

        if (!domain.length) {
            const ymax = data && data.length ? max(data, (d) => d.value) : 0;

            const ymin = 0;

            domain = [ymin, ymax];
        }

        return scaleLinear<number, number>().range([height, 0]).domain(domain);
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
                    stroke={stroke}
                    width={strokeWidth}
                />

                <XAxis
                    scale={xScale as AxisScale<number>}
                    showGridLines={xAxisOptions?.showGridLines}
                    timeformatSpecifier={xAxisOptions?.timeformatSpecifier}
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
