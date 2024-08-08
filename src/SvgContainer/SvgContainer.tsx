import React, { useRef, useEffect, useLayoutEffect, ReactNode } from 'react';

import { select } from 'd3';
import { DEFAULT_MARGINS } from './constants';

export type SvgContainerDimension = {
    height: number;
    width: number;
};

export type SvgContainerMargins = {
    left: number;
    right: number;
    top: number;
    bottom: number;
};

export type SvgContainerData = {
    svg: SVGSVGElement;
    rootGroup: SVGGElement;
    margin: SvgContainerMargins;
    dimension: SvgContainerDimension;
};

type Props = {
    margin?: SvgContainerMargins;
    children?: ReactNode;
    dimensionOnChange?: (dimension: SvgContainerDimension) => void;
};

const SvgContainer: React.FC<Props> = ({
    margin = DEFAULT_MARGINS,
    children,
    dimensionOnChange,
}) => {
    const containerRef = useRef<HTMLDivElement>();
    const svgRef = useRef<SVGSVGElement>();
    const rootGroupRef = useRef<SVGGElement>();

    const [svgContainerData, setSvgContainerData] =
        React.useState<SvgContainerData>();

    const updateDimension = () => {
        const svg = select(svgRef.current).node();
        const rootGroup = select(rootGroupRef.current).node();

        const container = containerRef.current;
        const width = container.offsetWidth - margin.left - margin.right;
        const height = container.offsetHeight - margin.top - margin.bottom;

        const dimension: SvgContainerDimension = {
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

    // useLayoutEffect(() => {
    //     window.addEventListener('resize', updateDimension);

    //     return () => {
    //         window.removeEventListener('resize', updateDimension);
    //     };
    // }, []);

    useEffect(() => {
        const resizeObserver = new ResizeObserver((entries) => {
            if (entries[0]) {
                // const { width, height } = entries[0].contentRect;
                // setSize({ width, height });
                updateDimension();
            }
        });

        if (containerRef.current) {
            resizeObserver.observe(containerRef.current);
        }

        return () => {
            if (containerRef.current) {
                resizeObserver.unobserve(containerRef.current);
            }

            resizeObserver.disconnect();
        };
    }, []);

    return (
        <div
            ref={containerRef}
            style={{
                position: 'relative',
                width: '100%',
                height: '100%',
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
        </div>
    );
};

export default SvgContainer;
