import '../variables.css';
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
import Bars from './Bars';
import { MARGIN, SCALE_BAND_PADDING_INNER } from '../constants';
import { XAxis } from '../XAxis/XAxis';
import { YAxis } from '../YAxis/YAxis';
import {
    HoveredChartItem,
    PointerEventsOverlay,
} from '../PointerEventOverlay/PointerEventsOverlay';
import { TooltipOnTop } from '../Tooltip/TooltipOnTop';
import { PointerReferenceLine } from '../PointerEventOverlay/PointerReferenceLine';

export type BarChartDataItem = {
    key: string | number;
    value: number;
    tooltip?: string;
};

export type BarChartData = BarChartDataItem[];

type XScale = ScaleBand<string | number>;

type YScale = ScaleLinear<number, number>;

type Props = {
    data: BarChartData;
    /**
     * fill color of the Bar Rectange
     */
    color?: string;
    /**
     * if ture, show horizontal grid lines
     */
    showHorizontalGridLine: boolean;
    /**
     * if ture, show vertical grid lines
     */
    showVerticalGridLine: boolean;
    /**
     * By default, D3 shows ticks for all items in the data on the x-axis.
     * Pass an array of tick values or an array of keys of the input data to override that behavior
     * and only render ticks for items that have their keys in `tickValuesOnXAxis`.
     */
    tickValuesOnXAxis: (string | number)[];
    /**
     * if true, show tooltip when user hovers a bar element
     */
    showTooltip: boolean;
    /**
     * custom margins space
     */
    margin?: SvgContainerMargins;
};

/**
 * Basic Bar Chart
 * @param param0
 * @returns
 */
export const BarChartBasic: FC<Props> = ({
    data,
    color,
    showHorizontalGridLine,
    showVerticalGridLine,
    tickValuesOnXAxis,
    showTooltip,
    margin = MARGIN,
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
            return typeof d.key === 'number' ? d.key.toString() : d.key;
        });
    }, [data]);

    const xScale = useMemo((): XScale => {
        const { width } = dimension;

        return scaleBand()
            .paddingInner(SCALE_BAND_PADDING_INNER)
            .range([0, width])
            .domain(xDomain);
    }, [dimension, xDomain]);

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
                <Bars
                    data={data}
                    xScale={xScale}
                    yScale={yScale}
                    color={color}
                />

                <XAxis
                    scale={xScale}
                    showGridLines={showVerticalGridLine}
                    tickValues={tickValuesOnXAxis}
                />

                <YAxis scale={yScale} showGridLines={showHorizontalGridLine} />

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
