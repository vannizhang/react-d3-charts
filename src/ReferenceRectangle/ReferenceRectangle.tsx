import './ReferenceRectangle.css';

import React, { CSSProperties, FC, useEffect, useMemo, useRef } from 'react';
import { select } from 'd3';
import { SvgContainerData } from '../SvgContainer/SvgContainer';

type Props = {
    /**
     * X-coordinate of the rectangle's top-left corner
     */
    x: number;
    /**
     * y-coordinate of the rectangle's top-left corner
     */
    y: number;
    /**
     * Width of the rectangle
     */
    width: number;
    /**
     * height of the rectangle
     */
    height: number;
    svgContainerData?: SvgContainerData;
};

export const ReferenceRectangle: FC<Props> = ({
    x,
    y,
    width,
    height,
    svgContainerData,
}) => {
    const containerGroupRef = useRef<SVGGElement>();

    const drawRefRectangle = () => {
        const { dimension } = svgContainerData;

        const { height } = dimension;

        const group = select(containerGroupRef.current);

        const rectangle = group.select('rect');

        if (rectangle.size()) {
            const rect = group.select(`rect`);
            // rect.attr('x', xPos - POINTER_EVENTS_BUFFER_RECT_WIDTH / 2);
            rect.attr('x', x);
            rect.attr('y', y);
            rect.attr('width', width);
            rect.attr('height', height);
        } else {
            group
                .append('rect')
                .attr('x', x)
                .attr('y', y)
                .attr('width', width)
                .attr('height', height);
            // .attr('fill', fillColor);
        }
    };

    useEffect(() => {
        if (svgContainerData) {
            drawRefRectangle();
        }
    }, [x, y, width, height, svgContainerData]);

    return <g className="reference-rectangle-group" ref={containerGroupRef} />;
};
