import '../styles/axis.css';
import React, { FC, useEffect } from 'react';
import { select, axisBottom, AxisScale, Selection } from 'd3';
import { SvgContainerData } from '../SvgContainer/SvgContainer';
import { BottomAxisOptions } from './types';

type Props = BottomAxisOptions & {
    /**
     * Linear scale function used by x-axis
     */
    scale: AxisScale<number>;
    svgContainerData?: SvgContainerData;
};

export const AxisBottom: FC<Props> = ({
    scale,
    numberOfTicks = 5,
    showGridLines,
    tickFormatFunction,
    svgContainerData,
}) => {
    const drawBottomAxis = () => {
        const { rootGroup, dimension } = svgContainerData;

        const { height } = dimension;

        const axisBottomGenerator = axisBottom(scale).ticks(numberOfTicks);

        if (showGridLines) {
            axisBottomGenerator.tickSizeInner(-height);
            axisBottomGenerator.tickPadding(5);
        }

        if (tickFormatFunction) {
            axisBottomGenerator.tickFormat(tickFormatFunction);
        }

        const yAxisGroup: Selection<SVGSVGElement, any, any, any> =
            select(rootGroup).select('.bottom.axis');

        // y axis is already existed, only need to update it
        if (yAxisGroup.size()) {
            yAxisGroup
                .attr('transform', `translate(0, ${height})`)
                // add a call to `.transition` to make the axis animate
                .transition()
                // axis can be updated by calling `.call(yAxis)` again
                .call(axisBottomGenerator);

            return;
        }

        select(rootGroup)
            .append('g')
            .attr('class', () => {
                const classNames = ['bottom', 'axis'];

                // add 'show-grid' class to show grid lines
                if (showGridLines) {
                    classNames.push('show-grid');
                }

                return classNames.join(' ');
            })
            .attr('transform', `translate(0,${height})`)
            .call(axisBottomGenerator);
    };

    useEffect(() => {
        if (svgContainerData) {
            drawBottomAxis();
        }
    }, [scale, svgContainerData]);

    return null;
};
