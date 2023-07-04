import './YAxis.css';
import React, { FC, useEffect } from 'react';
import { select, axisLeft, AxisScale, Selection } from 'd3';
import { SvgContainerData } from '../SvgContainer/SvgContainer';

export type YAxisOptions = {
    /**
     * Indicate number of ticks that should be renderder.
     * If not provided, d3 will try to render as many ticks as possible
     */
    numberOfTicks?: number;
    /**
     * if true, create grid lines by setting the tick size to your chart width
     */
    showGridLines?: boolean;
    /**
     * custom format function mapping a value from the axis Domain to a formatted string for display purposes.
     * @param domainValue original domain value
     * @param index
     * @returns formatted string
     */
    tickFormatFunction?: (domainValue: number, index?: number) => string;
};

type Props = YAxisOptions & {
    /**
     * Linear scale function used by yaxis
     */
    scale: AxisScale<number>;
    svgContainerData?: SvgContainerData;
};

export const YAxis: FC<Props> = ({
    scale,
    numberOfTicks = 5,
    showGridLines,
    tickFormatFunction,
    svgContainerData,
}) => {
    const drawYAxis = () => {
        const { rootGroup, dimension } = svgContainerData;

        const { width } = dimension;

        const yAxis = axisLeft(scale).ticks(numberOfTicks);

        if (showGridLines) {
            yAxis.tickSizeInner(-width);
            yAxis.tickPadding(5);
        }

        if (tickFormatFunction) {
            yAxis.tickFormat(tickFormatFunction);
        }

        const yAxisGroup: Selection<SVGSVGElement, any, any, any> =
            select(rootGroup).select('.y.axis');

        // y axis is already existed, only need to update it
        if (yAxisGroup.size()) {
            yAxisGroup
                // add a call to `.transition` to make the axis animate
                .transition()
                // axis can be updated by calling `.call(yAxis)` again
                .call(yAxis);

            return;
        }

        select(rootGroup)
            .append('g')
            .attr('class', () => {
                const classNames = ['y', 'axis'];

                // add 'show-grid' class to show grid lines
                if (showGridLines) {
                    classNames.push('show-grid');
                }

                return classNames.join(' ');
            })
            .call(yAxis);
    };

    useEffect(() => {
        if (svgContainerData) {
            drawYAxis();
        }
    }, [scale, svgContainerData]);

    return null;
};
