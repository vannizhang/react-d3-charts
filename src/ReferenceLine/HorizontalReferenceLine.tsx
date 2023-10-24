import './HorizontalReferenceLine.css';

import React, { FC, useEffect, useRef } from 'react';
import { select } from 'd3';
import { SvgContainerData } from '../SvgContainer/SvgContainer';
import { HorizontalReferenceLineData } from './types';

type Props = HorizontalReferenceLineData & {
    svgContainerData?: SvgContainerData;
};

const LABEL_TEXT_MARGIN = 5;

export const HorizontalReferenceLine: FC<Props> = ({
    y1,
    y2,
    label,
    svgContainerData,
}) => {
    const containerGroupRef = useRef<SVGGElement>();

    const drawRefLine = () => {
        const { dimension } = svgContainerData;

        const { height, width } = dimension;

        const group = select(containerGroupRef.current);

        const refLine = group.select('line');

        const yPos4LabelText: number = y2 || 0;

        if (refLine.size()) {
            const refLine = group.select(`line`);
            refLine.attr('y1', y1).attr('y2', y2);

            if (label) {
                group
                    .select(`text`)
                    .attr('y', yPos4LabelText - LABEL_TEXT_MARGIN)
                    .text(label);
            }
        } else {
            group
                .append('line')
                .attr('x1', 0)
                .attr('y1', y1)
                .attr('x2', width)
                .attr('y2', y2)
                .attr('fill', 'none');

            if (label) {
                group
                    .append('text')
                    .attr('x', width - LABEL_TEXT_MARGIN)
                    .attr('y', yPos4LabelText - LABEL_TEXT_MARGIN)
                    .attr('text-anchor', 'end')
                    .text(label);
            }
        }
    };

    useEffect(() => {
        if (svgContainerData) {
            drawRefLine();
        }
    }, [y1, y2, label, svgContainerData]);

    return (
        <g
            className="horizontal-reference-line-group"
            ref={containerGroupRef}
        />
    );
};
