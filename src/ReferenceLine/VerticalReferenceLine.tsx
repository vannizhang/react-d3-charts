import './ReferenceLine.css';

import React, { FC, useEffect, useRef } from 'react';
import { select } from 'd3';
import { SvgContainerData } from '../SvgContainer/SvgContainer';

type Props = {
    /**
     * position on x-axis to place this vertical reference line
     */
    xPosition: number;
    svgContainerData?: SvgContainerData;
};

export const VerticalReferenceLine: FC<Props> = ({
    xPosition,
    svgContainerData,
}) => {
    const containerGroupRef = useRef<SVGGElement>();

    const drawRefLine = () => {
        const { dimension } = svgContainerData;

        const { height } = dimension;

        const group = select(containerGroupRef.current);

        const refLine = group.select('line');

        const xPos: number = xPosition | 0;

        if (refLine.size()) {
            const refLine = group.select(`line`);
            refLine.attr('x1', xPos).attr('x2', xPos);
        } else {
            group
                .append('line')
                .attr('x1', xPos)
                .attr('y1', 0)
                .attr('x2', xPos)
                .attr('y2', height)
                .attr('fill', 'none');
        }
    };

    useEffect(() => {
        if (svgContainerData) {
            drawRefLine();
        }
    }, [xPosition, svgContainerData]);

    return <g className="reference-line-group" ref={containerGroupRef} />;
};
