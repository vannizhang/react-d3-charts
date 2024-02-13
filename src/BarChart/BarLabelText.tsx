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
};

export const BarLabelText: React.FC<Props> = ({
    xScale,
    yScale,
    data,
    svgContainerData,
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
            .text(function (d) {
                return d.label || '';
            })
            .attr('x', (d) => xScale(d.x) + xScale.bandwidth() / 2)
            .attr('y', (d) => {
                const yPos = yScale(d.y);

                // add this offset value to y position to make the text element not to overlap with the bar rect
                const yPosOffset = d.y < 0 ? 15 : -5;

                return yPos + yPosOffset;
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

export const BarLabelTextOnTop: React.FC<Props> = ({
    xScale,
    yScale,
    data,
    svgContainerData,
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
            .text(function (d) {
                return d.labelOnTop || d.label || '';
            })
            .attr('x', (d) => xScale(d.x) + xScale.bandwidth() / 2)
            .attr('y', (d) => {
                // use a fixed y value, no need to calculate y position
                return 0;
            })
            .attr('text-anchor', 'middle');
    };

    useEffect(() => {
        if (svgContainerData && xScale && yScale && data) {
            draw();
        }
    }, [xScale, yScale, data]);

    return (
        <g ref={barsLabelTextGroup} className="sticky-bar-label-text-group"></g>
    );
};
