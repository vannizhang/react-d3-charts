import React, { FC, useEffect } from 'react';
import {
    SvgContainerDimension,
    SvgContainerMargins,
} from '../SvgContainer/SvgContainer';

type Props = {
    content: string;
    dimension: SvgContainerDimension;
    xPosition: number;
    margin: SvgContainerMargins;
};

export const TooltipOnTop: FC<Props> = ({
    content,
    dimension,
    xPosition,
    margin,
}) => {
    const tooltipRef = React.useRef<HTMLDivElement>();

    const [tooltipPos, setTooltipPos] = React.useState<{
        top: number;
        left: number;
    }>({
        top: 0,
        left: 0,
    });

    const updateTooltipPosition = () => {
        const tooltipDiv = tooltipRef.current;

        if (!tooltipDiv) {
            return;
        }

        const { width } = dimension;

        /**
         * postion of the left end of the chart area on x axis
         */
        const xMin = margin.left;
        /**
         * postion of the right end of the chart area on x axis
         */
        const xMax = width + margin.left;

        const tooltipDivWidth = tooltipDiv.offsetWidth;
        const tooltipDivHeight = tooltipDiv.offsetHeight;

        const topPos = -(tooltipDivHeight - margin.top);

        // postion on x axis for the chart item that is being hovered
        const xPosForItemOnHover = xPosition + margin.left;

        /**
         * position of the left end of the tooltip container
         */
        let leftPos = xPosForItemOnHover - tooltipDivWidth / 2;

        // make sure the left end of the tooltip won't go beyond eft end of the chart
        leftPos = Math.max(leftPos, xMin);

        // make sure the right end of the tooltip won't go beyond right end of the chart
        leftPos = Math.min(leftPos, xMax - tooltipDivWidth);

        setTooltipPos({
            top: topPos,
            left: leftPos,
        });
    };

    useEffect(() => {
        if (xPosition !== null && content !== null) {
            updateTooltipPosition();
        }
    }, [xPosition, content]);

    if (!content) {
        return null;
    }

    return (
        <div
            ref={tooltipRef}
            style={{
                position: 'absolute',
                left: `${tooltipPos.left}px`,
                top: `${tooltipPos.top}px`,
                padding: '.1rem .2rem',
                pointerEvents: 'none',
                boxSizing: 'border-box',
                boxShadow: `0 0 5px 2px var(--tooltip-dropshadow-color)`,
                maxWidth: 'var(--tooltip-max-width)',
                zIndex: 5,
                background: 'var(--tooltip-background-color)',
                color: 'var(--tooltip-text-color)',
                fontSize: 'var(--tooltip-text-font-size)',
                // border: `solid 1px var(--tooltip-border-color)`
            }}
            dangerouslySetInnerHTML={{ __html: content }}
        ></div>
    );
};
