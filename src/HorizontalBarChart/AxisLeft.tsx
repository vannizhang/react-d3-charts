import '../styles/axis.css';
import { AxisScale } from 'd3-axis';
import React, { FC, useEffect } from 'react';
import { select, axisLeft, Selection } from 'd3';
import { SvgContainerData } from '../SvgContainer/SvgContainer';

export type LeftAxisOptions = {
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

type Props = LeftAxisOptions & {
    /**
     * A scale function that has numeric output
     */
    scale: AxisScale<string | number>;
    svgContainerData?: SvgContainerData;
};

export const AxisLeft: FC<Props> = ({
    scale,
    tickFormatFunction,
    svgContainerData,
}) => {
    const drawAxis = () => {
        const { rootGroup } = svgContainerData;

        const xAxis = axisLeft(scale);
        console.log(scale.domain());

        if (tickFormatFunction) {
            xAxis.tickFormat(tickFormatFunction);
        }

        const xAxisGroup: Selection<SVGSVGElement, any, any, any> =
            select(rootGroup).select('.left.axis');
        // console.log(xAxisLabel)

        // x axis is already existed, only need to update it
        if (xAxisGroup.size()) {
            xAxisGroup.call(xAxis);
        } else {
            select(rootGroup)
                .append('g')
                .attr('class', () => {
                    const classNames = ['left', 'axis'];
                    return classNames.join(' ');
                })
                .call(xAxis);
        }
    };

    useEffect(() => {
        if (svgContainerData) {
            drawAxis();
        }
    }, [scale, svgContainerData]);

    return null;
};
