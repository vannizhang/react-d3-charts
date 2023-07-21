import React, { useEffect, useMemo } from 'react';
import { select, ScaleLinear, ScaleTime, curveMonotoneX, area } from 'd3';
// import { LineChartDataItem } from './LineChartBasic';
import { SvgContainerData } from '../SvgContainer/SvgContainer';
import { AreaChartDataItem } from './types';

type Props = {
    xScale: ScaleTime<number, number> | ScaleLinear<number, number>;
    yScale: ScaleLinear<number, number>;
    svgContainerData?: SvgContainerData;
    data: AreaChartDataItem[];
    stroke?: string;
    fill?: string;
};

export const Area: React.FC<Props> = ({
    xScale,
    yScale,
    data,
    svgContainerData,
    fill = 'skyblue',
}) => {
    const areaGroup = React.useRef<SVGGElement>();

    const valueArea = useMemo(() => {
        return area<AreaChartDataItem>()
            .x((d) => xScale(d.x))
            .y0(yScale(0))
            .y1((d) => yScale(d.y));
    }, [xScale, yScale]);

    const draw = () => {
        remove();

        select(areaGroup.current)
            .append('path')
            .data([data])
            .style('fill', fill)
            // .style('stroke', stroke)
            // .style('stroke-width', 0)
            .attr('d', valueArea);
    };

    const remove = () => {
        const area = select(areaGroup.current).select('path');

        // check the number of existing area path, if greater than 0; remove all existing ones
        if (area.size()) {
            area.remove().exit();
        }
    };

    useEffect(() => {
        if (svgContainerData && xScale && yScale && data) {
            draw();
        }
    }, [xScale, yScale, data]);

    return <g ref={areaGroup} className="area-group"></g>;
};
