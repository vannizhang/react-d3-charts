import React, { useEffect, useMemo } from 'react';
import {
    select,
    line,
    ScaleBand,
    ScaleLinear,
    ScaleTime,
    curveMonotoneX,
} from 'd3';
import { LineChartData, LineChartDataItem } from './LineChartBasic';
import { SvgContainerData } from '../SvgContainer/SvgContainer';

type Props = {
    xScale: ScaleTime<number, number> | ScaleLinear<number, number>;
    yScale: ScaleLinear<number, number>;
    svgContainerData?: SvgContainerData;
    data: LineChartData;
    color?: string;
    width?: number;
};

const Line: React.FC<Props> = ({
    xScale,
    yScale,
    data,
    svgContainerData,
    color = 'steelblue',
    width = 1,
}) => {
    const lineGroup = React.useRef<SVGGElement>();

    const valueline = useMemo(() => {
        return line<LineChartDataItem>()
            .curve(curveMonotoneX)
            .x((d) => xScale(d.key))
            .y((d) => yScale(d.value));
    }, [xScale, yScale]);

    const draw = () => {
        remove();

        select(lineGroup.current)
            .append('path')
            .data([data])
            .attr('d', valueline)
            .style('fill', 'none')
            .style('stroke', color)
            .style('stroke-width', width);
    };

    const remove = () => {
        const lines = select(lineGroup.current).selectAll('path');

        // check the number of existing lines, if greater than 0; remove all existing ones
        if (lines.size()) {
            lines.remove().exit();
        }
    };

    useEffect(() => {
        if (svgContainerData && xScale && yScale && data) {
            draw();
        }
    }, [xScale, yScale, data]);

    return <g ref={lineGroup} className="line-group"></g>;
};

export default Line;