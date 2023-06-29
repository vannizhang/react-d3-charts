import React, { useRef, useEffect, useLayoutEffect, ReactNode } from 'react';

import { select } from 'd3';

import { SvgContainerData, Margin, Dimension } from '../types';

import { MARGIN } from '../constants';

type Props = {
    margin?: Margin;
    children?: ReactNode;
    dimensionOnChange?: (dimension: Dimension) => void;
};

const SvgContainer: React.FC<Props> = ({
    margin = MARGIN,
    children,
    dimensionOnChange,
}) => {
    const svgRef = useRef<SVGSVGElement>();
    const rootGroupRef = useRef<SVGGElement>();

    const [svgContainerData, setSvgContainerData] =
        React.useState<SvgContainerData>();

    const updateDimension = () => {
        const svg = select(svgRef.current).node();
        const rootGroup = select(rootGroupRef.current).node();

        const bbox = svg.getBBox();
        const width = bbox.width - margin.left - margin.right;
        const height = bbox.height - margin.top - margin.bottom;

        const dimension: Dimension = {
            height,
            width,
        };

        if (dimensionOnChange) {
            dimensionOnChange(dimension);
        }

        setSvgContainerData({
            svg,
            rootGroup,
            margin,
            dimension,
        });
    };

    useEffect(() => {
        updateDimension();
    }, []);

    useLayoutEffect(() => {
        window.addEventListener('resize', updateDimension);

        return () => {
            window.removeEventListener('resize', updateDimension);
        };
    }, []);

    return (
        <svg
            ref={svgRef}
            style={{
                position: 'relative',
                width: '100%',
                height: '100%',
            }}
        >
            <g
                ref={rootGroupRef}
                style={{
                    transform: `translate(${margin.left}px, ${margin.top}px)`,
                }}
            >
                {svgContainerData
                    ? React.Children.map(children, (child) => {
                          return React.cloneElement(
                              child as React.ReactElement<any>,
                              {
                                  svgContainerData,
                              }
                          );
                      })
                    : null}
            </g>
        </svg>
    );
};

export default SvgContainer;
