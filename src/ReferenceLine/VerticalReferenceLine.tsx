import './VerticalReferenceLine.css';

import React, { CSSProperties, FC, useEffect, useMemo, useRef } from 'react';
import { select } from 'd3';
import { SvgContainerData } from '../SvgContainer/SvgContainer';

type Props = {
    /**
     * position on x-axis to place this vertical reference line
     */
    xPosition: number;
    /**
     * The stroke color of this specific vertical reference line
     */
    strokeColor?: string;
    /**
     * The stroke width of this specific vertical reference line
     */
    strokeWidth?: string;
    /**
     * The stroke dash array of this specific vertical reference line
     */
    strokeDashArray?: string;
    svgContainerData?: SvgContainerData;
    onMouseEnter?: () => void;
    onMouseLeave?: () => void;
};

const POINTER_EVENTS_BUFFER_RECT_WIDTH = 16;

export const VerticalReferenceLine: FC<Props> = ({
    xPosition,
    strokeColor,
    strokeWidth,
    strokeDashArray,
    svgContainerData,
    onMouseEnter,
    onMouseLeave,
}) => {
    const containerGroupRef = useRef<SVGGElement>();

    /**
     * CSS Properties contains values to override the default css variables
     */
    const cssProperties: CSSProperties = useMemo(() => {
        const output: {
            [key: string]: string;
        } = {};

        if (strokeColor) {
            output['--vertical-reference-line-color'] = strokeColor;
        }

        if (strokeWidth) {
            output['--vertical-reference-line-width'] = strokeWidth;
        }

        if (strokeDashArray) {
            output['--vertical-reference-line-stroke-dasharray'] =
                strokeDashArray;
        }

        return output as CSSProperties;
    }, [strokeColor, strokeWidth, strokeDashArray]);

    const drawRefLine = () => {
        const { dimension } = svgContainerData;

        const { height } = dimension;

        const group = select(containerGroupRef.current);

        const refLine = group.select('line');

        const xPos: number = xPosition | 0;

        if (refLine.size()) {
            const refLine = group.select(`line`);
            refLine.attr('x1', xPos).attr('x2', xPos);

            const rect = group.select(`rect`);
            rect.attr('x', xPos - POINTER_EVENTS_BUFFER_RECT_WIDTH / 2);
        } else {
            group
                .append('line')
                .attr('x1', xPos)
                .attr('y1', 0)
                .attr('x2', xPos)
                .attr('y2', height)
                .attr('fill', 'none');

            if (onMouseEnter && onMouseLeave) {
                group
                    .append('rect')
                    .attr('x', xPos - POINTER_EVENTS_BUFFER_RECT_WIDTH / 2)
                    .attr('y', 0)
                    .attr('width', POINTER_EVENTS_BUFFER_RECT_WIDTH)
                    .attr('height', height)
                    .attr('fill', 'transparent')
                    .on('mouseenter', () => {
                        // console.log('mouse enters ref line rect')
                        onMouseEnter();
                    })
                    .on('mouseleave', () => {
                        // console.log('mouse leaves ref line rect')
                        onMouseLeave();
                    });
            }
        }
    };

    useEffect(() => {
        if (svgContainerData) {
            drawRefLine();
        }
    }, [xPosition, svgContainerData]);

    return (
        <g
            className="vertical-reference-line-group"
            style={cssProperties}
            ref={containerGroupRef}
        />
    );
};
