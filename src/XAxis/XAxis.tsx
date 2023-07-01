import './XAxis.css';
import { AxisScale } from 'd3-axis';
import React, { FC, useEffect } from 'react';
import { select, axisBottom, timeFormat, Selection } from 'd3';
import { SvgContainerData } from '../SvgContainer/SvgContainer';

type Props = {
    /**
     * A scale function that has numeric output
     */
    scale: AxisScale<string | number>;
    /**
     * if true, create grid lines by setting the tick size to your chart height
     */
    showGridLines?: boolean;
    /**
     * Indicate number of ticks that should be renderder.
     * If not provided, d3 will try to render as many ticks as possible
     */
    numberOfTicks?: number;
    /**
     * Specified values to be used for ticks rather than using the scale’s automatic tick generator
     */
    tickValues?: (string | number)[];
    /**
     * formatter that will be used to format timestamp of each item
     */
    timeformatSpecifier?: string;
    /**
     * custom format function mapping a value from the axis Domain to a formatted string for display purposes.
     * @param domainValue original domain value
     * @param index
     * @returns formatted string
     */
    tickFormatFunction?: (
        domainValue: number | string,
        index?: number
    ) => string;
    svgContainerData?: SvgContainerData;
};

/**
 *
 * @param param0
 * @returns void
 *
 * Good Resources to learn how axes in d3 work
 * @see https://www.d3indepth.com/axes/
 */
export const XAxis: FC<Props> = ({
    scale,
    showGridLines,
    numberOfTicks,
    tickValues,
    timeformatSpecifier,
    tickFormatFunction,
    svgContainerData,
}) => {
    const formatTime = timeformatSpecifier
        ? timeFormat(timeformatSpecifier)
        : null;

    const drawXAxis = () => {
        const { rootGroup, dimension } = svgContainerData;

        const { height } = dimension;

        const xAxis = axisBottom(scale);

        if (showGridLines) {
            xAxis.tickSizeInner(-height);
            // .tickPadding(5);
        }

        if (tickValues) {
            xAxis.tickValues(tickValues);
        }

        if (numberOfTicks) {
            xAxis.ticks(numberOfTicks);
        }

        if (formatTime) {
            xAxis.tickFormat((d: number) => {
                const date = new Date(+d);
                return formatTime(date);
            });
        }

        if (!formatTime && tickFormatFunction) {
            xAxis.tickFormat(tickFormatFunction);
        }

        const xAxisGroup: Selection<SVGSVGElement, any, any, any> =
            select(rootGroup).select('.x.axis');
        // console.log(xAxisLabel)

        // x axis is already existed, only need to update it
        if (xAxisGroup.size()) {
            xAxisGroup
                .attr('transform', `translate(0, ${height})`)
                .transition()
                .call(xAxis);
            return;
        }

        select(rootGroup)
            .append('g')
            .attr('class', () => {
                const classNames = ['x', 'axis'];

                // add 'show-grid' class to show grid lines
                if (showGridLines) {
                    classNames.push('show-grid');
                }

                return classNames.join(' ');
            })
            .attr('transform', `translate(0,${height})`)
            .call(xAxis);
    };

    useEffect(() => {
        if (svgContainerData) {
            drawXAxis();
        }
    }, [scale, svgContainerData]);

    return null;
};
