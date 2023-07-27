import './HorizontalReferenceLine.css';

import React, { FC, useEffect, useRef } from 'react';
import { select } from 'd3';
import { SvgContainerData } from '../SvgContainer/SvgContainer';

type Props = {
    /**
     * position on y-axis to place this horizontal reference line
     */
    yPosition: number;
    label: string;
    svgContainerData?: SvgContainerData;
};

const LABEL_TEXT_MARGIN = 5;

export const HorizontalReferenceLine: FC<Props> = ({
    yPosition,
    label,
    svgContainerData,
}) => {
    const containerGroupRef = useRef<SVGGElement>();

    const drawRefLine = () => {
        const { dimension } = svgContainerData;

        const { height, width } = dimension;

        const group = select(containerGroupRef.current);

        const refLine = group.select('line');

        const yPos: number = yPosition | 0;

        if (refLine.size()) {
            const refLine = group.select(`line`);
            refLine.attr('y1', yPos).attr('y2', yPos);

            group
                .select(`text`)
                .attr('y', yPos - LABEL_TEXT_MARGIN)
                .text(label);
        } else {
            group
                .append('line')
                .attr('x1', 0)
                .attr('y1', yPos)
                .attr('x2', width)
                .attr('y2', yPos)
                .attr('fill', 'none');

            group
                .append('text')
                .attr('x', width - LABEL_TEXT_MARGIN)
                .attr('y', yPos - LABEL_TEXT_MARGIN)
                .attr('text-anchor', 'end')
                .text(label);
        }
    };

    useEffect(() => {
        if (svgContainerData) {
            drawRefLine();
        }
    }, [yPosition, label, svgContainerData]);

    return (
        <g
            className="horizontal-reference-line-group"
            ref={containerGroupRef}
        />
    );
};
