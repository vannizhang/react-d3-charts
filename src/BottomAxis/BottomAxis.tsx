import '../styles/axis.css';
import { AxisScale } from 'd3-axis';
import React, { FC, useEffect } from 'react';
import { select, axisBottom, timeFormat, Selection } from 'd3';
import { SvgContainerData } from '../SvgContainer/SvgContainer';
import { BottomAxisOptions } from './types';

type Props = BottomAxisOptions & {
    /**
     * A scale function that has numeric output
     */
    scale: AxisScale<string | number>;
    svgContainerData?: SvgContainerData;
};

/**
 * Horizontal Axis at Bottom of the Graph
 * Good Resources to learn how axes in d3 work
 * @see https://www.d3indepth.com/axes/
 */
export const BottomAxis: FC<Props> = ({
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
