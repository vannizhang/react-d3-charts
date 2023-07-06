import React, { useEffect, useMemo } from 'react';
import { select, line, ScaleLinear, curveMonotoneX } from 'd3';

import { SvgContainerData } from '../SvgContainer/SvgContainer';
import { XScaleBarLineComboChart } from './BarLineComboChart';
import { BarLineComboChartDataItem } from './types';

type Props = {
    xScale: XScaleBarLineComboChart;
    yScale: ScaleLinear<number, number>;
    svgContainerData?: SvgContainerData;
    data: BarLineComboChartDataItem[];
    stroke?: string;
    width?: number;
};

const Line: React.FC<Props> = ({
    xScale,
    yScale,
    data,
    svgContainerData,
    stroke = 'orange',
    width = 1,
}) => {
    const lineGroup = React.useRef<SVGGElement>();

    const xOffset = useMemo(() => {
        return xScale.bandwidth() / 2;
    }, [xScale]);

    const valueline = useMemo(() => {
        return line<BarLineComboChartDataItem>()
            .curve(curveMonotoneX)
            .x((d) => xScale(d.x) + xOffset)
            .y((d) => yScale(d.yLine));
    }, [xScale, yScale]);

    const draw = () => {
        remove();

        select(lineGroup.current)
            .append('path')
            .data([data])
            .attr('d', valueline)
            .style('fill', 'none')
            .style('stroke', stroke)
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
