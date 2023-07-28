import React, { FC, useEffect, useRef, useState } from 'react';
import { schemeSet2, select, arc, pie } from 'd3';
import { PieChartDataItem } from './types';
import { Tooltip, TooltipPosition } from './Tooltip';
import '../styles/variables.css';

type Props = {
    /**
     * data that will be used to plot the Pie Chart
     */
    data: PieChartDataItem[];
    /**
     * if true, show tooltip when user hover the Pie Chart
     */
    showTooltip: boolean;
    /**
     * if true, a pie chart with a hole in the center, which makes it look like an donut
     */
    isDonut?: boolean;
    /**
     * if true, create half pie chart is a 180 degree graph that represents the composition of a whole
     */
    isHalfPie?: boolean;
    /**
     * The width of the chart container. If not provided, it will fit the width of the parent container.
     */
    width?: number;
    /**
     * The height of the chart container. If not provided, it will fit the height of the parent container.
     */
    height?: number;
    /**
     * Fires when user clicks an arc of the pie chart
     */
    onClick?: (data: PieChartDataItem) => void;
    /**
     * Fires when user hovers an arc of the pie chart
     */
    onMouseEnter?: (data: PieChartDataItem) => void;
    /**
     * Fires when user leaves an arc of the pie chart
     */
    onMouseLeave?: () => void;
};

const ARC_GROUP_CLASSNAME = 'arc-group';
const ARC_CLASSNAME = 'arc';
const DEFAULT_THICKNESS_RATIO = 0.65;
const ColorRamp = schemeSet2;

export const PieChart: FC<Props> = ({
    data,
    showTooltip,
    isDonut,
    isHalfPie,
    width,
    height,
    onClick,
    onMouseEnter,
    onMouseLeave,
}: Props) => {
    const containerRef = useRef<HTMLDivElement>();
    const svgRef = useRef<SVGSVGElement>();
    const rootGroupRef = useRef<SVGGElement>();

    const [itemOnHOver, setItemOnHover] = useState<PieChartDataItem>();

    const [tooltipPosition, setTooltipPosition] = useState<TooltipPosition>();

    const draw = () => {
        const container = containerRef.current;
        const width = container.offsetWidth;
        const height = container.offsetHeight;

        // const arcGroup = select(container).select(`.${ARC_GROUP_CLASSNAME}`);
        const arcGroup = select(rootGroupRef.current);

        const radius = isHalfPie ? width / 2 : Math.min(width, height) / 2;

        const arcGenerator = arc<any>()
            .innerRadius(
                isDonut === true ? radius * DEFAULT_THICKNESS_RATIO : 0
            )
            .outerRadius(radius);

        const pieGenerator = pie<PieChartDataItem>()
            .value((d) => d.value)
            .sort(null);

        if (isHalfPie) {
            const anglesRange = 0.5 * Math.PI;

            pieGenerator.startAngle(anglesRange * -1).endAngle(anglesRange);
        }

        const arcs = arcGroup
            .selectAll(`.${ARC_CLASSNAME}`)
            .remove()
            .exit()
            .data(pieGenerator(data))
            .enter()
            .append('g')
            .attr('class', ARC_CLASSNAME);

        arcs.append('path')
            .attr('d', arcGenerator)
            .attr('fill', (d: d3.PieArcDatum<PieChartDataItem>, i: number) => {
                return d.data.color || ColorRamp[i];
            })
            .on('click', function (evt) {
                const d = select(
                    this
                ).data()[0] as d3.PieArcDatum<PieChartDataItem>;

                if (onClick) {
                    onClick(d.data);
                }

                // console.log('mouse pointer has entered pie chart path', d.data)
            })
            .on('mouseenter', function (evt) {
                const d = select(
                    this
                ).data()[0] as d3.PieArcDatum<PieChartDataItem>;

                if (onMouseEnter) {
                    onMouseEnter(d.data);
                }

                setItemOnHover(d.data);
            })
            .on('mouseleave', function (evt) {
                if (onMouseLeave) {
                    onMouseLeave();
                }

                setItemOnHover(null);
                setTooltipPosition(null);
            })
            .on('mousemove', function (evt: MouseEvent) {
                if (!showTooltip) {
                    return;
                }

                // console.log('mouse is moving', evt)

                setTooltipPosition({
                    x: evt.offsetX,
                    y: evt.offsetY,
                });
            });
    };

    useEffect(() => {
        draw();
    }, [data]);

    return (
        <div
            ref={containerRef}
            style={{
                position: 'relative',
                width: width || '100%',
                height: height || '100%',
            }}
        >
            <svg
                ref={svgRef}
                style={{
                    position: 'relative',
                    width: '100%',
                    height: '100%',
                }}
            >
                <g
                    className={ARC_GROUP_CLASSNAME}
                    ref={rootGroupRef}
                    style={{
                        transform: `translate(50%, ${
                            isHalfPie ? '100%' : '50%'
                        })`,
                    }}
                ></g>
            </svg>

            {showTooltip && itemOnHOver ? (
                <Tooltip
                    content={itemOnHOver?.tooltip}
                    position={tooltipPosition}
                />
            ) : null}
        </div>
    );
};
