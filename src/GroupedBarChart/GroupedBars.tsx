import React, { useRef, useEffect } from 'react';

import { select, ScaleBand, ScaleLinear } from 'd3';
import { SvgContainerData } from '../SvgContainer/SvgContainer';
import { GroupedBarChartGroupData } from './types';

type Props = {
    xScale: ScaleBand<string>;
    xScaleSubgroup: ScaleBand<string>;
    yScale: ScaleLinear<number, number>;
    svgContainerData?: SvgContainerData;
    groupedData: GroupedBarChartGroupData[];
};

const GroupedBars: React.FC<Props> = ({
    xScale,
    xScaleSubgroup,
    yScale,
    groupedData,
    svgContainerData,
}) => {
    const groupContainer = useRef<SVGGElement>();

    const draw = () => {
        const { dimension } = svgContainerData;

        const { height } = dimension;

        const existingBars = select(groupContainer.current).selectAll('g');

        if (existingBars.size()) {
            existingBars.remove();
        }

        select(groupContainer.current)
            .selectAll('g')
            // Enter in data = loop group per group
            .data(groupedData)
            .join('g')
            .attr('transform', (d) => `translate(${xScale(d.title)}, 0)`)
            .selectAll('rect')
            .data(function (d) {
                // console.log(d)
                return d.data;
            })
            .join('rect')
            .attr('x', (d) => xScaleSubgroup(d.x))
            .attr('y', (d) => yScale(d.y))
            .attr('width', xScaleSubgroup.bandwidth())
            .attr('height', (d) => height - yScale(d.y))
            .attr('fill', (d) => {
                return d.fill || 'steelblue';
            });
    };

    useEffect(() => {
        if (
            svgContainerData &&
            xScale &&
            yScale &&
            xScaleSubgroup &&
            groupedData
        ) {
            draw();
        }
    }, [xScale, xScaleSubgroup, yScale, groupedData]);

    return <g ref={groupContainer} className="grouped-bars-group"></g>;
};

export default GroupedBars;
