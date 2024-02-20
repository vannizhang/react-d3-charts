import '../styles/variables.css';
import React, { FC, useEffect, useMemo, useState } from 'react';
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
import Bars from './Bars';
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
import {
    DivergingBarChartDataItem,
    YScaleOptions,
    VerticalReferenceLineData,
} from './types';
import { HorizontalDividerLine } from './HorizontalDividerLine';
import { BarLabelText } from '../BarChart/BarLabelText';
// import { VerticalReferenceLine } from '../ReferenceLine/VerticalReferenceLine';

type XScale = ScaleBand<string | number>;

type YScale = ScaleLinear<number, number>;

type Props = {
    /**
     * The data used to render the diverging bar chart.
     */
    data: DivergingBarChartDataItem[];
    /**
     * Determines whether to show a tooltip when the user hovers over a bar element.
     */
    showTooltip?: boolean;
    /**
     * if true, show sticky label text on top of the bar
     */
    showStickyLabelText?: boolean;
    /**
     * Options used to customize the scale function for the y-axis.
     */
    yScaleOptions?: YScaleOptions;
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
    /**
     * Emits when user clicks on a Bar element
     * @param data {PointerEventDataItem} that contains the index of the bar element that is clicked and the x position of the click event.
     * @returns void
     */
    onBarClick?: (data: PointerEventDataItem) => void;
    /**
     * Emits when user hovers on a Bar element
     * @param data {PointerEventDataItem} that contains the index of the bar item that is hovered and the x position of the hover event
     * @returns void
     */
    onBarMouseEnter?: (data: PointerEventDataItem) => void;
    /**
     * Emits when user moves the pointer out of Bar elements
     * @returns void
     */
    onBarMouseLeave?: () => void;
};

/**
 * A diverging bar chart is a type of bar chart that can be used to visualize the spread between values, generally positive and negative.
 * @param param0
 * @returns
 */
export const DivergingBarChart: FC<Props> = ({
    data,
    showTooltip = false,
    showStickyLabelText = false,
    yScaleOptions = {},
    bottomAxisOptions = {},
    leftAxisOptions = {},
    // verticalReferenceLines = [],
    fill,
    innerPadding = 0.2,
    width,
    height,
    margin = DEFAULT_MARGINS,
    onBarClick,
    onBarMouseEnter,
    onBarMouseLeave,
}: Props) => {
    const [dimension, setDimension] = useState<SvgContainerDimension>({
        height: 0,
        width: 0,
    });

    const [hoveredChartItem, setHoveredChartItem] =
        useState<PointerEventDataItem>();

    const xDomain = useMemo(() => {
        if (!data || !data.length) {
            return [];
        }

        return data.map((d) => {
            return typeof d.x === 'number' ? d.x.toString() : d.x;
        });
    }, [data]);

    const xScale = useMemo((): XScale => {
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
            const absYMax =
                data && data.length ? max(data, (d) => Math.abs(d.y)) : 0;

            domain = [0 - absYMax, absYMax];
        }
        return scaleLinear<number, number>().range([height, 0]).domain(domain);
    }, [dimension, data, yScaleOptions]);

    useEffect(() => {
        if (!onBarMouseEnter && !onBarMouseLeave) {
            return;
        }

        if (hoveredChartItem) {
            onBarMouseEnter(hoveredChartItem);
        } else {
            onBarMouseLeave();
        }
    }, [hoveredChartItem?.index]);

    return (
        <div
            style={{
                position: 'relative',
                width: width || '100%',
                height: height || '100%',
            }}
        >
            <SvgContainer margin={margin} dimensionOnChange={setDimension}>
                <Bars data={data} xScale={xScale} yScale={yScale} fill={fill} />

                <HorizontalDividerLine xScale={xScale} yScale={yScale} />

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
                    {...leftAxisOptions}
                    scale={yScale}
                    tickFormatFunction={leftAxisOptions.tickFormatFunction}
                />

                {showStickyLabelText ? (
                    <BarLabelText
                        data={data}
                        xScale={xScale}
                        yScale={yScale}
                        isSticky={true}
                    />
                ) : (
                    <></>
                )}

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
                    onClick={onBarClick}
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
