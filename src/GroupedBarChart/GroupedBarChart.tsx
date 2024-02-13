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

import { BottomAxis } from '../Axis/BottomAxis';
import { BottomAxisOptions } from '../Axis/types';
import { LeftAxis } from '../Axis/LeftAxis';
import { LeftAxisOptions } from '../Axis/types';
import {
    HoveredChartItem,
    PointerEventsOverlay,
} from '../PointerEventOverlay/PointerEventsOverlay';
import { TooltipOnTop } from '../Tooltip/TooltipOnTop';
import { DEFAULT_MARGINS } from '../SvgContainer/constants';
import { VerticalCrosshairLine } from '../CrosshairReferenceLine/VerticalCrosshairLine';
import { GroupedBarChartGroupData, YScaleOptions } from './types';
import { VerticalReferenceLine } from '../ReferenceLine/VerticalReferenceLine';
import { HorizontalReferenceLineData } from '../ReferenceLine/types';
import { HorizontalReferenceLine } from '../ReferenceLine/HorizontalReferenceLine';
import GroupedBars from './GroupedBars';

type XScale = ScaleBand<string>;

type YScale = ScaleLinear<number, number>;

type Props = {
    /**
     * The data used to render the Grouped Bar chart.
     */
    groupedData: GroupedBarChartGroupData[];
    /**
     * Determines whether to show a tooltip when the user hovers over a bar element.
     */
    showTooltip?: boolean;
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
    // /**
    //  * Array of data that will be used to draw vertical reference lines
    //  */
    // verticalReferenceLines?: VerticalReferenceLineData[];
    /**
     * Array of data that will be used to draw horizontal reference lines
     */
    horizontalReferenceLines?: HorizontalReferenceLineData[];
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
     * if true, show label text on top of each bar rectangle
     */
    showLabelOnTop?: boolean;
    /**
     * if true. label text on top will be placed at a fixed position on top instead of being placed
     * based on the height of each bar rectangle
     */
    shouldLabelOnTopUseFixedTopPosition?: boolean;
};

export const GroupedBarChart: FC<Props> = ({
    groupedData,
    showTooltip = false,
    yScaleOptions = {},
    bottomAxisOptions = {},
    leftAxisOptions = {},
    // verticalReferenceLines = [],
    horizontalReferenceLines = [],
    innerPadding = 0.05,
    width,
    height,
    margin = DEFAULT_MARGINS,
}: Props) => {
    const [dimension, setDimension] = useState<SvgContainerDimension>({
        height: 0,
        width: 0,
    });

    /**
     * array of group titles
     */
    const groups = useMemo((): string[] => {
        return groupedData.map((d) => d.title);
    }, [groupedData]);

    const subGroups = useMemo((): string[] => {
        return groupedData[0].data.map((d) => d.x);
    }, [groupedData]);

    const xScale = useMemo((): XScale => {
        const { width } = dimension;

        return scaleBand().padding(0.15).range([0, width]).domain(groups);
    }, [dimension, groups]);

    const xScaleSubgroup = useMemo((): XScale => {
        return scaleBand()
            .paddingInner(innerPadding)
            .range([0, xScale.bandwidth()])
            .domain(subGroups);
    }, [dimension, xScale, subGroups]);

    const yScale = useMemo((): YScale => {
        const { height } = dimension;

        let domain = yScaleOptions?.domain || [];

        if (!domain.length) {
            const ymax = groupedData.reduce((result, group) => {
                const yValues = group.data.map((d) => d.y);
                return Math.max(result, ...yValues);
            }, 0);

            const ymin = 0;

            domain = [ymin, ymax];
        }
        return scaleLinear<number, number>().range([height, 0]).domain(domain);
    }, [dimension, groupedData, yScaleOptions]);

    return (
        <div
            style={{
                position: 'relative',
                width: width || '100%',
                height: height || '100%',
            }}
        >
            <SvgContainer margin={margin} dimensionOnChange={setDimension}>
                <GroupedBars
                    groupedData={groupedData}
                    xScale={xScale}
                    xScaleSubgroup={xScaleSubgroup}
                    yScale={yScale}
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
                    shouldHide={leftAxisOptions.shouldHide}
                    tickFormatFunction={leftAxisOptions.tickFormatFunction}
                />

                {/* {showLabelOnTop ? (
                    <BarLabelOnTop
                        data={data}
                        xScale={xScale}
                        yScale={yScale}
                        stickyToTop={shouldLabelOnTopUseFixedTopPosition}
                    />
                ) : (
                    <></>
                )} */}

                {/* {showTooltip ? (
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
                                key={d.x}
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
                )} */}

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

            {/* {showTooltip && hoveredChartItem && (
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
            )} */}
        </div>
    );
};
