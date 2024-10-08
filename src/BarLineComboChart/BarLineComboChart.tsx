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
import { BottomAxis } from '../Axis/BottomAxis';
import { BottomAxisOptions } from '../Axis/types';
import { LeftAxis } from '../Axis/LeftAxis';
import { LeftAxisOptions } from '../Axis/types';
import {
    PointerEventDataItem,
    PointerEventsOverlay,
} from '../PointerEventOverlay/PointerEventsOverlay';
import { TooltipOnTop } from '../Tooltip/TooltipOnTop';
import { DEFAULT_MARGINS } from '../SvgContainer/constants';
import { VerticalCrosshairLine } from '../CrosshairReferenceLine/VerticalCrosshairLine';
import Line from './Line';
import { BarLineComboChartDataItem, VerticalReferenceLineData } from './types';
import { VerticalReferenceLine } from '../ReferenceLine/VerticalReferenceLine';
import { HorizontalReferenceLine } from '../ReferenceLine/HorizontalReferenceLine';
import { HorizontalReferenceLineData } from '../ReferenceLine/types';

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
     * Array of data that will be used to draw vertical reference lines
     */
    verticalReferenceLines?: VerticalReferenceLineData[];
    /**
     * Array of data that will be used to draw horizontal reference lines
     */
    horizontalReferenceLines?: HorizontalReferenceLineData[];
    /**
     * Options used to customize the x-axis at bottom.
     */
    bottomAxisOptions?: BottomAxisOptions;
    /**
     * Options used to customize the y-axis at left.
     */
    leftAxisOptions?: LeftAxisOptions;
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
    bottomAxisOptions = {},
    leftAxisOptions = {},
    verticalReferenceLines = [],
    horizontalReferenceLines = [],
    fill,
    strokeColor,
    strokeWidth,
    innerPadding = 0.2,
    width,
    height,
    margin = DEFAULT_MARGINS,
}: Props) => {
    const [dimension, setDimension] = useState<SvgContainerDimension>({
        height: 0,
        width: 0,
    });

    const [hoveredChartItem, setHoveredChartItem] =
        useState<PointerEventDataItem>();

    /**
     * data of the reference line that is currently hovered by the mouse pointer
     */
    const [hoveredVerticalReferenceLine, setHoveredVerticalReferenceLine] =
        useState<VerticalReferenceLineData>();

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
    }, [dimension, data, yScaleOptions]);

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

                <BottomAxis
                    scale={xScale}
                    showGridLines={bottomAxisOptions.showGridLines}
                    tickValues={bottomAxisOptions.tickValues}
                    tickFormatFunction={bottomAxisOptions.tickFormatFunction}
                    shouldRotateTextLabels={
                        bottomAxisOptions.shouldRotateTextLabels
                    }
                />

                <LeftAxis
                    scale={yScale}
                    showGridLines={leftAxisOptions.showGridLines}
                    numberOfTicks={leftAxisOptions.numberOfTicks}
                    tickFormatFunction={leftAxisOptions.tickFormatFunction}
                />

                {showTooltip ? (
                    <VerticalCrosshairLine
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

                {verticalReferenceLines && verticalReferenceLines.length ? (
                    verticalReferenceLines.map((d) => {
                        return (
                            <VerticalReferenceLine
                                key={d.x + '-' + Math.random().toString()}
                                xPosition={xScale(d.x) + xScale.bandwidth() / 2}
                                onMouseEnter={setHoveredVerticalReferenceLine.bind(
                                    null,
                                    d
                                )}
                                onMouseLeave={setHoveredVerticalReferenceLine.bind(
                                    null,
                                    null
                                )}
                            />
                        );
                    })
                ) : (
                    <></>
                )}

                {horizontalReferenceLines && horizontalReferenceLines.length ? (
                    horizontalReferenceLines.map((d) => {
                        return (
                            <HorizontalReferenceLine
                                key={`${d.y1}-${d.y2}`}
                                y1={yScale(d.y1)}
                                y2={yScale(d.y2)}
                                label={d.label}
                            />
                        );
                    })
                ) : (
                    <></>
                )}
            </SvgContainer>

            {showTooltip && hoveredChartItem && (
                <TooltipOnTop
                    content={data[hoveredChartItem.index]?.tooltip}
                    xPosition={hoveredChartItem.xPosition}
                    dimension={dimension}
                    margin={margin}
                />
            )}

            {hoveredVerticalReferenceLine && (
                <TooltipOnTop
                    content={hoveredVerticalReferenceLine.tooltip}
                    xPosition={
                        xScale(hoveredVerticalReferenceLine.x) +
                        xScale.bandwidth() / 2
                    }
                    dimension={dimension}
                    margin={margin}
                />
            )}
        </div>
    );
};
