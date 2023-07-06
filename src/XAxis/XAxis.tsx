import '../styles/axis.css';
import { AxisScale } from 'd3-axis';
import React, { FC, useEffect } from 'react';
import { select, axisBottom, timeFormat, Selection } from 'd3';
import { SvgContainerData } from '../SvgContainer/SvgContainer';

export type XAxisOptions = {
    /**
     * Indicate number of ticks that should be renderder, this only works with Scale Linear, for Scale Band, use `tickValues` option
     * If not provided, d3 will try to render as many ticks as possible
     */
    numberOfTicks?: number;
    /**
     * if true, create grid lines by setting the tick size to your chart height
     */
    showGridLines?: boolean;
    /**
     * Specified values to be used for ticks rather than using the scale’s automatic tick generator.
     * By default, D3 shows ticks for all items in the data on the x-axis.
     * Pass an array of tick values or an array of keys of the input data to override that behavior
     * and only render ticks for items that have their keys in `tickValuesOnXAxis`.
     */
    tickValues?: (string | number)[];
    /**
     * if true, rotate the label text to provide more space
     */
    shouldRotateTextLabels?: boolean;
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
};

type Props = XAxisOptions & {
    /**
     * A scale function that has numeric output
     */
    scale: AxisScale<string | number>;
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
    shouldRotateTextLabels,
    tickFormatFunction,
    svgContainerData,
}) => {
    const drawXAxis = () => {
        const { rootGroup, dimension } = svgContainerData;

        const { height } = dimension;

        const xAxis = axisBottom(scale);

        if (showGridLines) {
            xAxis.tickSizeInner(-height);
            xAxis.tickPadding(6);
        }

        if (tickValues) {
            xAxis.tickValues(tickValues);
        }

        if (numberOfTicks) {
            xAxis.ticks(numberOfTicks);
        }

        if (tickFormatFunction) {
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
        } else {
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
        }

        if (shouldRotateTextLabels) {
            select(rootGroup)
                .selectAll('.x.axis text')
                .style('text-anchor', 'end')
                .attr('dx', '-.8em')
                .attr('dy', '.15em')
                .attr('transform', 'rotate(-45)');
        }
    };

    useEffect(() => {
        if (svgContainerData) {
            drawXAxis();
        }
    }, [scale, svgContainerData]);

    return null;
};
