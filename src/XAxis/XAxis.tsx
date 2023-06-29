import './XAxis.css';
import { AxisScale } from 'd3-axis';
import React, { FC, useEffect } from 'react';
import { SvgContainerData } from '../types';
import { select, axisBottom, timeFormat, Selection } from 'd3';

type Props = {
    /**
     * A scale function that has numeric output
     */
    scale: AxisScale<string | number>;
    /**
     * specify how many ticks the axis has
     */
    numTicks?: number;
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
export const XAxis: FC<Props> = ({ scale, svgContainerData, numTicks }) => {
    const drawXAxis = () => {
        const { rootGroup, dimension } = svgContainerData;

        const { height } = dimension;

        const xAxis = axisBottom(scale);

        if (numTicks) {
            xAxis.ticks(numTicks);
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
            .attr('class', 'x axis')
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
