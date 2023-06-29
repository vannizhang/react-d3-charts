import './YAxis.css';
import React, { FC, useEffect } from 'react';
import { select, axisLeft, AxisScale, ScaleLinear, Selection } from 'd3';
import { SvgContainerData } from '../types';

type Props = {
    /**
     * Linear scale function used by yaxis
     */
    scale: ScaleLinear<number, number>;
    /**
     * specify how many ticks the axis has
     */
    numTicks?: number;
    /**
     * if true, create grid lines by setting the tick size to your chart width
     */
    showGridLines?: boolean;
    svgContainerData?: SvgContainerData;
};

export const YAxis: FC<Props> = ({
    scale,
    numTicks,
    showGridLines,
    svgContainerData,
}) => {
    const drawYAxis = () => {
        const { rootGroup, dimension } = svgContainerData;

        const { width } = dimension;

        const yAxis = axisLeft(scale).ticks(numTicks | 5);

        if (showGridLines) {
            yAxis.tickSizeInner(-width);
            // .tickPadding(5);
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
