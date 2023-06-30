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
    xScale:
        | ScaleBand<string | number>
        | ScaleLinear<number, number>
        | ScaleTime<number, number>;
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
                console.log(evt);
                handleMouseMoveEvent(evt.offsetX);
            });
    };

    /**
     * Find the data of the item that is closest to the input mouse position on the x-axis.
     * Updates the position of the vertical reference line to indicate the closest item
     * and calls the itemOnHoverChanged callback function.
     *
     * If the input mouse position is null, it means the user has moved the mouse out of
     * the chart.
     *
     * @param mouseXPosition The mouse position on the x-axis.
     */
    const handleMouseMoveEvent = (mouseXPosition: number) => {
        // console.log(mouseXPosition)

        // Find the item that is being hovered over based on the mouse position.
        const itemOnHover = findItemOnHoverByMousePos(mouseXPosition);

        updateVerticalRefLinePos(itemOnHover);

        // console.log(itemOnHover.current)
        itemOnHoverChanged(itemOnHover);
    };

    /**
     * Calculates and returns the corresponding position on the x-axis range for a given value from the x domain.
     * @param value value from the x domain
     * @returns position from the range on x scale
     */
    const getRangePositionOnXScale = (
        value: string | number | Date
    ): number => {
        // set offset if typeof xScale is ScaleBand
        const offset = 'bandwidth' in xScale ? xScale.bandwidth() / 2 : 0;

        // Calculate and return the x-axis position based on the type of xScale.
        return 'bandwidth' in xScale
            ? xScale(value as string | number) + offset
            : xScale(+value);
    };

    /**
     * Finds the item on hover based on the mouse position.
     *
     * @param {number} mousePosX - The x-coordinate of the mouse position.
     * @returns {DataOfItemOnHover} - An object containing the index and x-position of the item on hover.
     */
    const findItemOnHoverByMousePos = (
        mousePosX: number
    ): DataOfItemOnHover => {
        if (!mousePosX) {
            return null;
        }

        const { margin } = svgContainerData;

        // Subtract the left margin space to get the accurate mouse position x relative to the rectangle
        mousePosX -= margin.left;

        const xDomain = xScale.domain();

        let left = 0;
        let right = xDomain.length - 1;

        while (left < right) {
            // If there are only two items left, it means the mouse pointer must be between these two items
            if (right - left <= 1) {
                const leftItem = xDomain[left];
                const rightItem = xDomain[right];

                // find distance of the mouse pointer to left and right items
                const distance2Left = Math.abs(
                    mousePosX - getRangePositionOnXScale(leftItem)
                );
                const distance2Right = Math.abs(
                    mousePosX - getRangePositionOnXScale(rightItem)
                );

                // Adjust the left/right pointer to terminate the binary search
                if (distance2Left <= distance2Right) {
                    right--;
                } else {
                    left++;
                }
            }

            // find item in the middle
            const idxOfItemInMiddle = Math.floor((right - left) / 2) + left;
            const xPosOfItenInMiddle = getRangePositionOnXScale(
                xDomain[idxOfItemInMiddle]
            );

            // Adjust the pointer by comparing the x position of the mouse pointer and the x position of the item in the middle
            if (mousePosX <= xPosOfItenInMiddle) {
                right = idxOfItemInMiddle;
            } else {
                left = idxOfItemInMiddle;
            }
        }

        return {
            index: left,
            xPosition: getRangePositionOnXScale(xDomain[left]),
        };

        // // set offset if typeof xScale is ScaleBand
        // const offset = 'bandwidth' in xScale ? xScale.bandwidth() / 2 : 0;
        // // console.log(offset)

        // // when pointer at left half of first bar OR at right half of last bar
        // if (mousePosX < offset || mousePosX > width - offset) {
        //     const index = mousePosX < offset ? 0 : xDomain.length - 1;

        //     const value = xDomain[index];

        //     // const xPosition =
        //     //     'bandwidth' in xScale ? xScale(value as (string | number)) + offset : xScale(+value);

        //     return {
        //         index,
        //         xPosition: getRangePositionOnXScale(value),
        //     };
        // }

        // let itemIndex = -1;
        // let xPositionOfItemOnHover = 0;

        // for (let i = 0; i < xDomain.length; i++) {
        //     const currItem = xDomain[i];
        //     const currItemPos = getRangePositionOnXScale(currItem);
        //     // 'bandwidth' in xScale
        //     //     ? xScale(currItem as (string | number)) + offset
        //     //     : xScale(+currItem);

        //     const nextItemIndex = xDomain[i + 1] ? i + 1 : i;
        //     const nextItem = xDomain[nextItemIndex];
        //     const nextItemPos = getRangePositionOnXScale(nextItem);
        //     // 'bandwidth' in xScale
        //     //     ? xScale(nextItem as (string | number)) + offset
        //     //     : xScale(+nextItem);

        //     if (mousePosX >= currItemPos && mousePosX <= nextItemPos) {
        //         const distToCurrItem = Math.abs(mousePosX - currItemPos);
        //         const distToNextItem = Math.abs(mousePosX - nextItemPos);

        //         itemIndex = distToCurrItem < distToNextItem ? i : nextItemIndex;

        //         xPositionOfItemOnHover =
        //             distToCurrItem < distToNextItem ? currItemPos : nextItemPos;

        //         break;
        //     }
        // }

        // return {
        //     index: itemIndex,
        //     xPosition: xPositionOfItemOnHover,
        // };
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
