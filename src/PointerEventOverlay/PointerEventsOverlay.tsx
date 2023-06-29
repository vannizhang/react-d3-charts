import './PointerEventsOverlay.css';

import React, { useRef, useEffect, FC } from 'react';

import { select, ScaleBand, ScaleLinear, ScaleTime } from 'd3';
import { SvgContainerData } from '../types';

export type DataOfItemOnHover = {
    /**
     * index of the item that is being hovered
     */
    index: number;
    /**
     * x position of the item that is being hovered
     */
    xPosition: number;
};

type Props = {
    xScale: ScaleBand<string | number> | ScaleLinear<number, number>;
    svgContainerData?: SvgContainerData;
    /**
     * fires when user hover/leave a chart item
     * @param data
     * @returns
     */
    itemOnHoverChanged: (data: DataOfItemOnHover) => void;
};

export const PointerEventsOverlay: FC<Props> = ({
    xScale,
    svgContainerData,
    itemOnHoverChanged,
}: Props) => {
    const containerGroupRef = useRef<SVGGElement>();

    const createRefLine = () => {
        const { dimension } = svgContainerData;

        const { height } = dimension;

        const group = select(containerGroupRef.current);

        const refLine = group.select('line');

        if (refLine.size()) {
            return;
        }

        group
            .append('line')
            .attr('x1', 0)
            .attr('y1', 0)
            .attr('x2', 0)
            .attr('y2', height)
            .style('opacity', 0)
            .style('stoke', 'red')
            .style('fill', 'none');
    };

    const createOverlayRect = () => {
        const { dimension } = svgContainerData;

        const { height, width } = dimension;

        const group = select(containerGroupRef.current);

        group.select('rect').remove();

        group
            .append('rect')
            // .attr("class", ClassNames.BackgroundRect)
            .attr('width', width)
            .attr('height', height)
            .attr('fill', 'rgba(0,0,0,0)')
            .on('mouseleave', () => {
                handleMouseMoveEvent(null);
            })
            .on('mousemove', (evt) => {
                handleMouseMoveEvent(evt.offsetX);
            });
    };

    const handleMouseMoveEvent = (mouseXPosition: number) => {
        // console.log(mouseXPosition)

        const itemOnHover = findItemOnHoverByMousePos(mouseXPosition);

        updateVerticalRefLinePos(itemOnHover);

        // console.log(itemOnHover.current)
        itemOnHoverChanged(itemOnHover);
    };

    const findItemOnHoverByMousePos = (
        mousePosX: number
    ): DataOfItemOnHover => {
        if (!mousePosX) {
            return null;
        }

        const { dimension } = svgContainerData;

        const { width } = dimension;

        const xDomain = xScale.domain();

        // set offset if typeof xScale is ScaleBand
        const offset = 'bandwidth' in xScale ? xScale.bandwidth() / 2 : 0;

        // when pointer at left half of first bar OR at right half of last bar
        if (mousePosX < offset || mousePosX > width - offset) {
            const index = mousePosX < offset ? 0 : xDomain.length - 1;

            const value = xDomain[index];

            const xPosition =
                'bandwidth' in xScale ? xScale(value) + offset : xScale(+value);

            return {
                index,
                xPosition,
            };
        }

        let itemIndex = -1;
        let xPositionOfItemOnHover = 0;

        for (let i = 0; i < xDomain.length; i++) {
            const currItem = xDomain[i];
            const currItemPos =
                'bandwidth' in xScale
                    ? xScale(currItem) + offset
                    : xScale(+currItem);

            const nextItemIndex = xDomain[i + 1] ? i + 1 : i;
            const nextItem = xDomain[nextItemIndex];
            const nextItemPos =
                'bandwidth' in xScale
                    ? xScale(nextItem) + offset
                    : xScale(+nextItem);

            if (mousePosX >= currItemPos && mousePosX <= nextItemPos) {
                const distToCurrItem = Math.abs(mousePosX - currItemPos);
                const distToNextItem = Math.abs(mousePosX - nextItemPos);

                itemIndex = distToCurrItem < distToNextItem ? i : nextItemIndex;

                xPositionOfItemOnHover =
                    distToCurrItem < distToNextItem ? currItemPos : nextItemPos;

                break;
            }
        }

        return {
            index: itemIndex,
            xPosition: xPositionOfItemOnHover,
        };
    };

    const updateVerticalRefLinePos = (itemOnHover: DataOfItemOnHover): void => {
        const group = select(containerGroupRef.current);

        const refLine = group.select(`line`);

        const opacity = itemOnHover ? 1 : 0;

        const xPos: number = itemOnHover?.xPosition || 0;

        refLine.attr('x1', xPos).attr('x2', xPos).style('opacity', opacity);
    };

    useEffect(() => {
        if (svgContainerData) {
            createRefLine();
            createOverlayRect();
        }
    }, [svgContainerData]);

    return (
        <g className="pointer-event-overlay-group" ref={containerGroupRef} />
    );
};
