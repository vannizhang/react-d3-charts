import './GroupedBarLabelText.css';
import React, { FC, useEffect, useRef } from 'react';
import { select, ScaleBand, ScaleLinear } from 'd3';
import { SvgContainerData } from '../SvgContainer/SvgContainer';
import { GroupedBarChartGroupData } from './types';

type Props = {
    xScale: ScaleBand<string>;
    xScaleSubgroup: ScaleBand<string>;
    yScale: ScaleLinear<number, number>;
    svgContainerData?: SvgContainerData;
    groupedData: GroupedBarChartGroupData[];
    /**
     * if true, show label text that will be placed at a fixed position on top of chart container.
     */
    isSticky?: boolean;
};

export const GroupedBarLabelText: FC<Props> = ({
    xScale,
    xScaleSubgroup,
    yScale,
    groupedData,
    svgContainerData,
    isSticky,
}) => {
    const containerGroup = useRef<SVGGElement>();

    const draw = () => {
        const existingText = select(containerGroup.current).selectAll('text');

        if (existingText.size()) {
            existingText.remove();
        }

        const existingGroups = select(containerGroup.current).selectAll('g');

        if (existingGroups.size()) {
            existingGroups.remove();
        }

        select(containerGroup.current)
            .selectAll('g')
            // Enter in data = loop group per group
            .data(groupedData)
            .join('g')
            .attr('transform', (d) => `translate(${xScale(d.title)}, 0)`)
            .selectAll('text')
            .data(function (d) {
                // console.log(d)
                return d.data;
            })
            .join('text')
            .attr('class', (d) => {
                return isSticky ? 'is-sticky' : '';
            })
            .text(function (d) {
                if (isSticky) {
                    return d.labelOnTop || d.label;
                }

                return d.label || '';
            })
            .attr(
                'x',
                (d) => xScaleSubgroup(d.x) + xScaleSubgroup.bandwidth() / 2
            )
            .attr('y', (d) => {
                if (isSticky) {
                    return 0;
                }

                const yPos = yScale(d.y);

                return yPos;
            })
            .attr('text-anchor', 'middle');
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
    }, [xScale, yScale, groupedData]);

    return (
        <g ref={containerGroup} className="grouped-bar-label-text-group"></g>
    );
};
