import './CrosshairReferenceLine.css';

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

export const VerticalCrosshairLine: FC<Props> = ({
    xPosition,
    svgContainerData,
}) => {
    const containerGroupRef = useRef<SVGGElement>();

    const createRefLine = () => {
        const { dimension } = svgContainerData;

        const { height } = dimension;

        const group = select(containerGroupRef.current);

        const refLine = group.select('line');

        if (refLine.size()) {
            return;
        }

        group
            .append('line')
            .attr('x1', 0)
            .attr('y1', 0)
            .attr('x2', 0)
            .attr('y2', height)
            .style('opacity', 0)
            .attr('fill', 'none');
    };

    const updateVerticalRefLinePos = (): void => {
        const group = select(containerGroupRef.current);

        const refLine = group.select(`line`);

        const opacity = xPosition !== null ? 1 : 0;

        const xPos: number = xPosition | 0;

        refLine.attr('x1', xPos).attr('x2', xPos).style('opacity', opacity);
    };

    useEffect(() => {
        if (svgContainerData) {
            createRefLine();
        }
    }, [svgContainerData]);

    useEffect(() => {
        if (containerGroupRef.current) {
            updateVerticalRefLinePos();
        }
    }, [xPosition]);

    return (
        <g className="crosshair-reference-line-group" ref={containerGroupRef} />
    );
};
