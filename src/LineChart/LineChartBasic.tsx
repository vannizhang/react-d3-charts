import '../styles/variables.css';
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
import { BottomAxis } from '../Axis/BottomAxis';
import { BottomAxisOptions } from '../Axis/types';
import { LeftAxis } from '../Axis/LeftAxis';
import { LeftAxisOptions } from '../Axis/types';
import {
    PointerEventDataItem,
    PointerEventsOverlay,
} from '../PointerEventOverlay/PointerEventsOverlay';
import { TooltipOnTop } from '../Tooltip/TooltipOnTop';
import Line from './Line';
import { DEFAULT_MARGINS } from '../SvgContainer/constants';
import { VerticalCrosshairLine } from '../CrosshairReferenceLine/VerticalCrosshairLine';
import {
    LineChartDataItem,
    VerticalReferenceLineData,
    XScaleOptions,
    YScaleOptions,
} from './types';
import { VerticalReferenceLine } from '../ReferenceLine/VerticalReferenceLine';
import { HorizontalReferenceLineData } from '../ReferenceLine/types';
import { HorizontalReferenceLine } from '../ReferenceLine/HorizontalReferenceLine';

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
    xScaleOptions?: XScaleOptions;
    /**
     * options that will be used to create scale function for the y-axis
     */
    yScaleOptions?: YScaleOptions;
    /**
     * options to customized x axis
     */
    bottomAxisOptions?: BottomAxisOptions;
    /**
     * Options used to customize the y-axis at left.
     */
    leftAxisOptions?: LeftAxisOptions;
    /**
     * Array of data that will be used to draw vertical reference lines
     */
    verticalReferenceLines?: VerticalReferenceLineData[];
    /**
     * Array of data that will be used to draw horizontal reference lines
     */
    horizontalReferenceLines?: HorizontalReferenceLineData[];
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
    /**
     * Emits when user clicks on the line chart
     *
     * @param index index of the LineChartDataItem that user has clicked
     */
    onClick?: (index: number) => void;
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
    bottomAxisOptions = {},
    leftAxisOptions = {},
    verticalReferenceLines = [],
    horizontalReferenceLines = [],
    width,
    height,
    margin = DEFAULT_MARGINS,
    onClick,
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

    const xScale = useMemo((): XScale => {
        const { width } = dimension;

        let domain = xScaleOptions?.domain || [];

        if (!domain.length) {
            const xmin = min(data, (d) => d.x);
            const xmax = max(data, (d) => d.x);

            domain = [xmin, xmax];
        }

        return xScaleOptions?.useTimeScale
            ? scaleTime().range([0, width]).domain(domain)
            : scaleLinear().range([0, width]).domain(domain);
    }, [dimension, data, xScaleOptions]);

    const yScale = useMemo((): YScale => {
        const { height } = dimension;

        let domain = yScaleOptions?.domain || [];

        if (!domain.length) {
            const ymax = data && data.length ? max(data, (d) => d.y) : 0;

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
            onClick={() => {
                if (!onClick || !hoveredChartItem) {
                    return;
                }

                onClick(hoveredChartItem.index);
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

                <BottomAxis
                    scale={xScale as AxisScale<number>}
                    showGridLines={bottomAxisOptions?.showGridLines}
                    numberOfTicks={bottomAxisOptions?.numberOfTicks}
                    tickFormatFunction={bottomAxisOptions?.tickFormatFunction}
                    shouldRotateTextLabels={
                        bottomAxisOptions.shouldRotateTextLabels
                    }
                />

                <LeftAxis
                    scale={yScale}
                    showGridLines={leftAxisOptions.showGridLines}
                    numberOfTicks={leftAxisOptions.numberOfTicks}
                    tickFormatFunction={leftAxisOptions?.tickFormatFunction}
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
                    xDomain={data.map((d) => d.x)}
                    hoveredChartItemOnChange={setHoveredChartItem}
                />

                {verticalReferenceLines && verticalReferenceLines.length ? (
                    verticalReferenceLines.map((d) => {
                        return (
                            <VerticalReferenceLine
                                key={d.x + '-' + Math.random().toString()}
                                xPosition={xScale(d.x)}
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
                    xPosition={xScale(hoveredVerticalReferenceLine.x)}
                    dimension={dimension}
                    margin={margin}
                />
            )}
        </div>
    );
};
