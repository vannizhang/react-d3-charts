import React, { useRef, useEffect, FC } from 'react';

import { select, ScaleBand, ScaleLinear } from 'd3';
import { SvgContainerData } from '../SvgContainer/SvgContainer';

type Props = {
    xScale: ScaleBand<string | number>;
    yScale: ScaleLinear<number, number>;
    svgContainerData?: SvgContainerData;
};

export const HorizontalDividerLine: FC<Props> = ({
    xScale,
    yScale,
    svgContainerData,
}) => {
    const containerGroupRef = useRef<SVGGElement>();

    const draw = () => {
        const { dimension } = svgContainerData;

        const { width } = dimension;

        const group = select(containerGroupRef.current);

        const refLine = group.select('line');

        if (refLine.size()) {
            refLine.attr('x1', 0).attr('x2', width);
        } else {
            group
                .append('line')
                .attr('x1', 0)
                .attr('y1', yScale(0))
                .attr('x2', width)
                .attr('y2', yScale(0))
                .attr('stroke-width', 'var(--divider-line-width)')
                .attr('stroke', 'var(--divider-line-color)')
                .style('fill', 'none');
        }
    };

    useEffect(() => {
        if (svgContainerData) {
            draw();
        }
    }, [svgContainerData]);

    return <g className="divider-line-group" ref={containerGroupRef} />;
};
