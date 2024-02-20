import React, { useRef, useEffect, FC } from 'react';

import { select, ScaleBand, ScaleLinear, ScaleTime } from 'd3';
import { SvgContainerData } from '../SvgContainer/SvgContainer';

export type PointerEventDataItem = {
    /**
     * index of the item that is being hovered by the pointer
     */
    index: number;
    /**
     * x position of the item that is being hovered by the pointer
     */
    xPosition: number;
};

type XScale =
    | ScaleBand<string | number>
    | ScaleLinear<number, number>
    | ScaleTime<number, number>;

type XDomain = (string | number)[];

type Props = {
    /**
     * scale function for for x axis
     */
    xScale: XScale;
    /**
     * domain of the x scale
     */
    xDomain: XDomain;
    /**
     * fires when user hover/leave a chart item
     * @param data
     * @returns
     */
    hoveredChartItemOnChange: (data: PointerEventDataItem) => void;
    svgContainerData?: SvgContainerData;
};

export const PointerEventsOverlay: FC<Props> = ({
    xScale,
    xDomain,
    svgContainerData,
    hoveredChartItemOnChange,
}: Props) => {
    const containerGroupRef = useRef<SVGGElement>();

    const xScaleRef = useRef<XScale>();

    const xDomainRef = useRef<XDomain>();

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

        // console.log(itemOnHover.current)
        hoveredChartItemOnChange(itemOnHover);
    };

    /**
     * Calculates and returns the corresponding position on the x-axis range for a given value from the x domain.
     * @param value value from the x domain
     * @returns position from the range on x scale
     */
    const getRangePositionOnXScale = (
        value: string | number | Date
    ): number => {
        const xScale = xScaleRef.current;

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
     * @returns {PointerEventDataItem} - An object containing the index and x-position of the item on hover.
     */
    const findItemOnHoverByMousePos = (
        mousePosX: number
    ): PointerEventDataItem => {
        if (!mousePosX) {
            return null;
        }

        const { margin } = svgContainerData;

        const xDomain = xDomainRef.current;

        // Subtract the left margin space to get the accurate mouse position x relative to the rectangle
        mousePosX -= margin.left;

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
    };

    useEffect(() => {
        if (svgContainerData) {
            // createRefLine();
            createOverlayRect();
        }
    }, [svgContainerData]);

    useEffect(() => {
        if (xScale) {
            xScaleRef.current = xScale;
        }

        if (xDomain) {
            xDomainRef.current = xDomain;
        }
    }, [xScale, xDomain]);

    return (
        <g className="pointer-event-overlay-group" ref={containerGroupRef} />
    );
};
