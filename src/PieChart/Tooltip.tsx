import React, { FC, useEffect, useMemo } from 'react';

export type TooltipPosition = {
    x: number;
    y: number;
};

type Props = {
    content: string;
    position: TooltipPosition;
};

export const Tooltip: FC<Props> = ({ content, position }) => {
    const tooltipRef = React.useRef<HTMLDivElement>();

    if (!content || !position) {
        return null;
    }

    return (
        <div
            ref={tooltipRef}
            style={{
                position: 'absolute',
                left: `${position.x + 15 || 0}px`,
                top: `${position.y + 15 || 0}px`,
                padding: '.1rem .2rem',
                pointerEvents: 'none',
                boxSizing: 'border-box',
                boxShadow: `0 0 5px 2px var(--tooltip-dropshadow-color)`,
                maxWidth: 'var(--tooltip-max-width)',
                zIndex: 5,
                background: 'var(--tooltip-background-color)',
                color: 'var(--tooltip-text-color)',
                fontSize: 'var(--tooltip-text-font-size)',
                border: `solid 1px var(--tooltip-border-color)`,
                whiteSpace: 'nowrap',
            }}
            dangerouslySetInnerHTML={{ __html: content }}
        ></div>
    );
};
