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
    x: string | number;
    y: number;
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
    showTooltip?: boolean;
    // xScaleOptions?: {
    // };
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
     * width of the chart conatiner, if not provided, it will fit to width of parent container
     */
    width?: number;
    /**
     * height of the chart conatiner, if not provided, it will fit to height of parent container
     */
    height?: number;
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
    fill,
    showTooltip = false,
    // xScaleOptions = {},
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
            .paddingInner(SCALE_BAND_PADDING_INNER)
            .range([0, width])
            .domain(xDomain);
    }, [dimension, xDomain]);

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
