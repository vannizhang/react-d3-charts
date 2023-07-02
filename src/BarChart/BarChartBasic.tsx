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
import { XAxis, XAxisOptions } from '../XAxis/XAxis';
import { YAxis, YAxisOptions } from '../YAxis/YAxis';
import {
    HoveredChartItem,
    PointerEventsOverlay,
} from '../PointerEventOverlay/PointerEventsOverlay';
import { TooltipOnTop } from '../Tooltip/TooltipOnTop';
import { PointerReferenceLine } from '../PointerEventOverlay/PointerReferenceLine';
import { SCALE_BAND_PADDING_INNER } from './constants';
import { DEFAULT_MARGINS } from '../SvgContainer/constants';

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
    fill?: string;
    /**
     * if true, show tooltip when user hovers a bar element
     */
    showTooltip: boolean;
    /**
     * custom margins space
     */
    margin?: SvgContainerMargins;
    /**
     * options to customized x axis
     */
    xAxisOptions?: XAxisOptions;
    /**
     * options to customized y axis
     */
    yAxisOptions?: YAxisOptions;
};

/**
 * Basic Bar Chart
 * @param param0
 * @returns
 */
export const BarChartBasic: FC<Props> = ({
    data,
    fill,
    showTooltip,
    margin = DEFAULT_MARGINS,
    xAxisOptions = {},
    yAxisOptions = {},
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
                <Bars data={data} xScale={xScale} yScale={yScale} fill={fill} />

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
