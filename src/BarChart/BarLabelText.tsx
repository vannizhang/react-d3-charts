import './BarLabelText.css';

import React, { useRef, useEffect } from 'react';

import { select, ScaleBand, ScaleLinear } from 'd3';
import { SvgContainerData } from '../SvgContainer/SvgContainer';
import { BarChartDataItem } from './types';

type Props = {
    xScale: ScaleBand<string | number>;
    yScale: ScaleLinear<number, number>;
    svgContainerData?: SvgContainerData;
    data: BarChartDataItem[];
    isSticky?: boolean;
};

export const BarLabelText: React.FC<Props> = ({
    xScale,
    yScale,
    data,
    svgContainerData,
    isSticky,
}) => {
    const barsLabelTextGroup = useRef<SVGGElement>();

    const draw = () => {
        const existingText = select(barsLabelTextGroup.current).selectAll(
            'text'
        );

        if (existingText.size()) {
            existingText.remove();
        }

        select(barsLabelTextGroup.current)
            .selectAll(`text`)
            .data(data)
            .enter()
            .append('text')
            .attr('class', (d) => {
                return isSticky ? 'is-sticky' : '';
            })
            .text(function (d) {
                if (isSticky) {
                    return d.labelOnTop || d.label;
                }

                return d.label || '';
            })
            .attr('x', (d) => xScale(d.x) + xScale.bandwidth() / 2)
            .attr('y', (d) => {
                if (isSticky) {
                    return 0;
                }

                const yPos = yScale(d.y);

                // // add this offset value to y position to make the text element not to overlap with the bar rect
                // const yPosOffset = 0 //d.y < 0 ? 15 : -5;

                return yPos;
            })
            .attr('text-anchor', 'middle');
    };

    useEffect(() => {
        if (svgContainerData && xScale && yScale && data) {
            draw();
        }
    }, [xScale, yScale, data]);

    return <g ref={barsLabelTextGroup} className="bar-label-text-group"></g>;
};
