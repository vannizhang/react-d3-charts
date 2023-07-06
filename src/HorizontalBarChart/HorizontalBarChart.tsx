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
import Bars from './Bars';
// import { SCALE_BAND_PADDING_INNER } from './constants';
import { DEFAULT_MARGINS } from '../SvgContainer/constants';
import { AxisLeft, LeftAxisOptions } from './AxisLeft';
import { AxisBottom, BottomAxisOptions } from './AxisBottom';

export type HorizontalBarChartDataItem = {
    /**
     * A numerical value that determines the width of this item in Bar chart.
     */
    x: number;
    /**
     * A string or numerical value that determines the y position of this item.
     */
    y: string | number;
    /**
     * The tooltip associated with this item, which can be plain text or an HTML string.
     */
    tooltip?: string;
};

type XScale = ScaleLinear<number, number>;

type YScale = ScaleBand<string | number>;

type Props = {
    /**
     * The data used to render the bar chart.
     *
     * @example
     * ```
     * [
     *   {
     *     y: 'California',
     *     x: 50,
     *     tooltip: 'this is a tooltip'
     *   }
     *   //...
     * ]
     * ```
     */
    data: HorizontalBarChartDataItem[];
    // /**
    //  * Determines whether to show a tooltip when the user hovers over a bar element.
    //  */
    // showTooltip?: boolean;
    // /**
    //  * Options used to customize the scale function for the x-axis.
    //  */
    xScaleOptions?: {
        /**
         * Custom domain used to create the scale function for the x-axis.
         * If not provided, the domain will be determined by the maximum values of the `x` property among all items, and the minimum value of the domain will be 0.
         */
        domain?: number[];
    };
    /**
     * Options used to customize the axis on left
     */
    leftAxisOptions?: LeftAxisOptions;
    /**
     * Options used to customize the axis on bottom.
     */
    bottomAxisOptions?: BottomAxisOptions;
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
};

/**
 * Basic Bar Chart
 * @param param0
 * @returns
 */
export const HorizontalBarChart: FC<Props> = ({
    data,
    // showTooltip = false,
    xScaleOptions = {},
    leftAxisOptions = {},
    bottomAxisOptions = {},
    fill,
    innerPadding = 0.2,
    width,
    height,
    margin = DEFAULT_MARGINS,
}: Props) => {
    const [dimension, setDimension] = useState<SvgContainerDimension>({
        height: 0,
        width: 0,
    });

    const yDomain = useMemo(() => {
        if (!data || !data.length) {
            return [];
        }

        return data.map((d) => {
            return typeof d.y === 'number' ? d.y.toString() : d.y;
        });
    }, [data]);

    const xScale = useMemo((): XScale => {
        const { width } = dimension;

        let domain = xScaleOptions.domain || [];

        if (!domain.length) {
            const xmax = data && data.length ? max(data, (d) => d.x) : 0;

            const xmin = 0;

            domain = [xmin, xmax];
        }

        return scaleLinear<number, number>().range([0, width]).domain(domain);
    }, [dimension, data]);

    const yScale = useMemo((): YScale => {
        const { height } = dimension;

        return scaleBand()
            .paddingInner(innerPadding)
            .range([0, height])
            .domain(yDomain);
    }, [dimension, yDomain]);

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

                <AxisLeft
                    scale={yScale}
                    tickFormatFunction={leftAxisOptions?.tickFormatFunction}
                />

                <AxisBottom
                    scale={xScale}
                    showGridLines={bottomAxisOptions.showGridLines}
                    numberOfTicks={bottomAxisOptions.numberOfTicks}
                    tickFormatFunction={bottomAxisOptions.tickFormatFunction}
                />
            </SvgContainer>
        </div>
    );
};
