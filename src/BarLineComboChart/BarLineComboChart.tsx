import '../styles/variables.css';
import React, { FC, useMemo, useState } from 'react';
import {
    ScaleBand,
    scaleLinear,
    // scaleTime,
    ScaleLinear,
    scaleBand,
    max,
    min,
} from 'd3';
import SvgContainer, {
    SvgContainerDimension,
    SvgContainerMargins,
} from '../SvgContainer/SvgContainer';
import Bars from '../BarChart/Bars';
import { XAxis, XAxisOptions } from '../XAxis/XAxis';
import { YAxis, YAxisOptions } from '../YAxis/YAxis';
import {
    HoveredChartItem,
    PointerEventsOverlay,
} from '../PointerEventOverlay/PointerEventsOverlay';
import { TooltipOnTop } from '../Tooltip/TooltipOnTop';
import { SCALE_BAND_PADDING_INNER } from '../BarChart/constants';
import { DEFAULT_MARGINS } from '../SvgContainer/constants';
import { VerticalReferenceLine } from '../ReferenceLine/VerticalReferenceLine';
import Line from './Line';

export type BarLineComboChartDataItem = {
    /**
     * A string or numerical value that determines the x position of this item.
     */
    x: string | number;
    /**
     * A numerical value that determines the height of Bar that represents this item.
     */
    yBar: number;
    /**
     * A numerical value that determines the y position of the node in Line that represents this item.
     */
    yLine: number;
    /**
     * The tooltip associated with this item, which can be plain text or an HTML string.
     */
    tooltip?: string;
};

export type XScaleBarLineComboChart = ScaleBand<string | number>;

type YScale = ScaleLinear<number, number>;

type Props = {
    /**
     * The data used to render the bar and line combo chart.
     */
    data: BarLineComboChartDataItem[];
    /**
     * Determines whether to show a tooltip when the user hovers over a bar element.
     */
    showTooltip?: boolean;
    // xScaleOptions?: {
    // };
    /**
     * Options used to customize the scale function for the y-axis.
     */
    yScaleOptions?: {
        /**
         * Custom domain used to create the scale function for the y-axis.
         * If not provided, the domain will be determined by the maximum values of the `y` property among all items, and the minimum value of the domain will be 0.
         */
        domain?: number[];
    };
    /**
     * Options used to customize the x-axis.
     */
    xAxisOptions?: XAxisOptions;
    /**
     * Options used to customize the y-axis.
     */
    yAxisOptions?: YAxisOptions;
    /**
     * The fill color of the bar rectangles.
     */
    fill?: string;
    /**
     * color for the Line
     */
    strokeColor?: string;
    /**
     * width of the line
     */
    strokeWidth?: number;
    /**
     * The inner padding determines the blank space between bands.
     * The value which must be in the range [0, 1]. A value `0` of innerPadding indicates no blank space betwwen bands.
     * The default value is 0.2.
     */
    innerPadding?: number;
    /**
     * The width of the chart container. If not provided, it will fit the width of the parent container.
     */
    width?: number;
    /**
     * The height of the chart container. If not provided, it will fit the height of the parent container.
     */
    height?: number;
    /**
     * Custom margin space around the chart area.
     */
    margin?: SvgContainerMargins;
};

/**
 * A combo chart with Bar and Line
 * @param param0
 * @returns
 */
export const BarLineComboChart: FC<Props> = ({
    data,
    showTooltip = false,
    // xScaleOptions = {},
    yScaleOptions = {},
    xAxisOptions = {},
    yAxisOptions = {},
    fill,
    strokeColor,
    strokeWidth,
    innerPadding = SCALE_BAND_PADDING_INNER,
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

    const xDomain = useMemo(() => {
        if (!data || !data.length) {
            return [];
        }

        return data.map((d) => {
            return typeof d.x === 'number' ? d.x.toString() : d.x;
        });
    }, [data]);

    const xScale = useMemo((): XScaleBarLineComboChart => {
        const { width } = dimension;

        return scaleBand()
            .paddingInner(innerPadding)
            .range([0, width])
            .domain(xDomain);
    }, [dimension, xDomain]);

    const yScale = useMemo((): YScale => {
        const { height } = dimension;

        let domain = yScaleOptions?.domain || [];

        if (!domain.length) {
            const ymax = max([
                ...data.map((d) => d.yBar),
                ...data.map((d) => d.yLine),
            ]);

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
                <Bars
                    data={data.map((d) => {
                        return {
                            x: d.x,
                            y: d.yBar,
                        };
                    })}
                    xScale={xScale}
                    yScale={yScale}
                    fill={fill}
                />

                <Line
                    xScale={xScale}
                    yScale={yScale}
                    data={data}
                    stroke={strokeColor}
                    width={strokeWidth}
                />

                <XAxis
                    scale={xScale}
                    showGridLines={xAxisOptions.showGridLines}
                    tickValues={xAxisOptions.tickValues}
                    tickFormatFunction={xAxisOptions.tickFormatFunction}
                />

                <YAxis
                    scale={yScale}
                    showGridLines={yAxisOptions.showGridLines}
                    numberOfTicks={yAxisOptions.numberOfTicks}
                    tickFormatFunction={yAxisOptions.tickFormatFunction}
                />

                {showTooltip ? (
                    <VerticalReferenceLine
                        xPosition={
                            hoveredChartItem ? hoveredChartItem.xPosition : null
                        }
                    />
                ) : (
                    <></>
                )}

                <PointerEventsOverlay
                    xScale={xScale}
                    xDomain={xDomain}
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