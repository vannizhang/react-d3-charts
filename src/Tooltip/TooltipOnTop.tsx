import React, { FC, useEffect } from 'react';
import { Dimension, Margin } from '../types';

type Props = {
    content: string;
    dimension: Dimension;
    xPosition: number;
    margin: Margin;
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

        const tooltipDivWidth = tooltipDiv.offsetWidth;
        const tooltipDivHeight = tooltipDiv.offsetHeight;

        const top = -(tooltipDivHeight - margin.top);
        const xPosForItemOnHover = xPosition + margin.left;

        let left =
            xPosForItemOnHover + tooltipDivWidth / 2 >= width + margin.left
                ? xPosForItemOnHover - tooltipDivWidth
                : xPosForItemOnHover - tooltipDivWidth / 2;

        left = left >= margin.left ? left : margin.left;

        setTooltipPos({
            top,
            left,
        });
    };

    useEffect(() => {
        if (xPosition) {
            updateTooltipPosition();
        }
    }, [xPosition]);

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
                padding: '.25rem',
                pointerEvents: 'none',
                boxSizing: 'border-box',
                // boxShadow: `0 0 10px 2px ${TOOLTIP_BOXSHADOW_COLOR}`,
                maxWidth: 'var(--tooltip-max-width)',
                zIndex: 5,
                background: 'var(--tooltip-background-color)',
                color: 'var(--tooltip-text-color)',
                fontSize: 'var(--tooltip-text-font-size)',
            }}
            dangerouslySetInnerHTML={{ __html: content }}
        ></div>
    );
};
