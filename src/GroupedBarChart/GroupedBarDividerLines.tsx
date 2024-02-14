import './GroupedBarDividerLines.css';
import React, { FC, useCallback, useEffect, useMemo, useRef } from 'react';
import { select, ScaleBand, ScaleLinear } from 'd3';
import { SvgContainerData } from '../SvgContainer/SvgContainer';
import { GroupedBarChartGroupData } from './types';

type Props = {
    xScale: ScaleBand<string>;
    xScaleSubgroup: ScaleBand<string>;
    yScale: ScaleLinear<number, number>;
    svgContainerData?: SvgContainerData;
    groupedData: GroupedBarChartGroupData[];
};

/**
 * data that will be used to render the divider line
 */
type DividerLineData = {
    /**
     * x value of the bar this divider is associated with.
     * This value will be used to determine the x position of this divider line.
     */
    x: string;
    /**
     * if ture, place this divider line at the right side of the bar.
     * by default, the divider bar will be placed at the left side of each bar.
     */
    shoulBePlacedAtRightSide?: boolean;
};

export const GroupedBarDividerLines: FC<Props> = ({
    xScale,
    xScaleSubgroup,
    yScale,
    groupedData,
    svgContainerData,
}) => {
    const containerGroup = useRef<SVGGElement>();

    /**
     * Generate data for the divider lines between groups of bars.
     * @returns An array of DividerLineData objects representing the divider lines.
     */
    const data4DividerLines: DividerLineData[] = useMemo(() => {
        if (!groupedData || !groupedData.length) {
            return [];
        }

        // Extract x values for all bars in the first group
        const data = groupedData[0].data.map((d) => d.x);

        // Add the a redundant x value of the last item to the end of the array.
        // This ensures that a divider line is rendered at the end of the group
        // The purpose is to balance the appearance of divider lines between bars.
        data.push(data[data.length - 1]);

        return data.map((x, index) => {
            return {
                x,
                // Determine whether the divider line should be placed at the right side for the last item
                shoulBePlacedAtRightSide: index === data.length - 1,
            } as DividerLineData;
        });
    }, [groupedData]);

    const calcXPosition = useCallback(
        (d: DividerLineData) => {
            const padding =
                xScaleSubgroup.step() * xScaleSubgroup.paddingInner() * 0.5;

            const { x, shoulBePlacedAtRightSide } = d;

            if (shoulBePlacedAtRightSide) {
                return xScaleSubgroup(x) + xScaleSubgroup.bandwidth() + padding;
            }

            return xScaleSubgroup(x) - padding;
        },
        [xScaleSubgroup, xScale]
    );

    /**
     * Draws bars and divider lines within the SVG container.
     */
    const draw = () => {
        const { dimension } = svgContainerData;
        const { height } = dimension;

        const existingText = select(containerGroup.current).selectAll('text');

        if (existingText.size()) {
            existingText.remove();
        }

        const existingGroups = select(containerGroup.current).selectAll('g');

        if (existingGroups.size()) {
            existingGroups.remove();
        }

        select(containerGroup.current)
            .selectAll('g')
            // Enter in data = loop group per group
            .data(groupedData)
            .join('g')
            .attr('transform', (d) => `translate(${xScale(d.title)}, 0)`)
            .selectAll('line')
            // Select all lines within each group and bind data for divider lines
            .data(data4DividerLines)
            .join('line')
            .attr('class', 'grouped-bar-divider-line')
            .attr('x1', (d) => calcXPosition(d))
            .attr('y1', 0)
            .attr('x2', (d) => calcXPosition(d))
            .attr('y2', height);
    };

    useEffect(() => {
        if (
            svgContainerData &&
            xScale &&
            yScale &&
            xScaleSubgroup &&
            data4DividerLines?.length
        ) {
            draw();
        }
    }, [xScale, yScale, data4DividerLines]);

    return (
        <g ref={containerGroup} className="grouped-bar-divider-line-group"></g>
    );
};
