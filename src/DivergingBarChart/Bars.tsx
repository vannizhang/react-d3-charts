import React, { useRef, useEffect } from 'react';

import { select, ScaleBand, ScaleLinear } from 'd3';
import { SvgContainerData } from '../SvgContainer/SvgContainer';
import { DivergingBarChartDataItem } from './types';

type Props = {
    xScale: ScaleBand<string | number>;
    yScale: ScaleLinear<number, number>;
    svgContainerData?: SvgContainerData;
    data: DivergingBarChartDataItem[];
    /**
     * fill color of bar rects
     */
    fill?: string;
};

const Bars: React.FC<Props> = ({
    xScale,
    yScale,
    data,
    svgContainerData,
    fill = 'steelblue',
}) => {
    const barsGroup = useRef<SVGGElement>();

    const draw = () => {
        const { dimension } = svgContainerData;

        // const { height } = dimension;

        const existingBars = select(barsGroup.current).selectAll('rect');

        if (existingBars.size()) {
            existingBars.remove();
        }

        select(barsGroup.current)
            .selectAll(`rect`)
            .data(data)
            .enter()
            .append('rect')
            .style('fill', (d) => d.fill || fill)
            .attr('x', (d) => {
                return typeof d.x === 'number'
                    ? xScale(d.x.toString())
                    : xScale(d.x);
            })
            .attr('width', xScale.bandwidth())
            .attr('y', (d) => {
                return yScale(Math.max(0, d.y));
            })
            .attr('height', (d) => {
                return Math.abs(yScale(d.y) - yScale(0));
            });
    };

    useEffect(() => {
        if (svgContainerData && xScale && yScale && data) {
            draw();
        }
    }, [xScale, yScale, data]);

    return <g ref={barsGroup} className="bar-group"></g>;
};

export default Bars;
