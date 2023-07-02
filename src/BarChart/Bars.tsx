import React, { useRef, useEffect } from 'react';

import { select, ScaleBand, ScaleLinear } from 'd3';
import { SvgContainerData } from '../SvgContainer/SvgContainer';
import { BarChartData } from './BarChartBasic';

type Props = {
    xScale: ScaleBand<string | number>;
    yScale: ScaleLinear<number, number>;
    svgContainerData?: SvgContainerData;
    data: BarChartData;
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

        const { height } = dimension;

        const existingBars = select(barsGroup.current).selectAll('rect');

        if (existingBars.size()) {
            existingBars.remove();
        }

        select(barsGroup.current)
            .selectAll(`rect`)
            .data(data)
            .enter()
            .append('rect')
            .style('fill', fill)
            .attr('x', (d) => xScale(d.key))
            .attr('width', xScale.bandwidth())
            .attr('y', (d) => yScale(d.value))
            .attr('height', (d) => {
                return height - yScale(d.value);
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
