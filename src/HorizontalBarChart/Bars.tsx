import React, { useRef, useEffect } from 'react';

import { select, ScaleBand, ScaleLinear } from 'd3';
import { SvgContainerData } from '../SvgContainer/SvgContainer';
import { HorizontalBarChartDataItem } from './types';

type Props = {
    xScale: ScaleLinear<number, number>;
    yScale: ScaleBand<string | number>;
    svgContainerData?: SvgContainerData;
    data: HorizontalBarChartDataItem[];
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
        // const { dimension } = svgContainerData;

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
                return 0;
            })
            .attr('width', (d) => {
                return xScale(d.x);
            })
            .attr('y', (d) => {
                return typeof d.y === 'number'
                    ? yScale(d.y.toString())
                    : yScale(d.y);
            })
            .attr('height', (d) => {
                return yScale.bandwidth();
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
