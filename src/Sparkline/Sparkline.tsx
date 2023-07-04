import '../styles/variables.css';
import React, { FC, useMemo, useState } from 'react';
import { scaleLinear, ScaleLinear, scaleTime, max, min } from 'd3';
import SvgContainer, {
    SvgContainerDimension,
    SvgContainerMargins,
} from '../SvgContainer/SvgContainer';
import Line from './Line';
import { DEFAULT_MARGINS } from '../SvgContainer/constants';

type XScale = ScaleLinear<number, number>;

type YScale = ScaleLinear<number, number>;

type Props = {
    /**
     * array of numbers that will be used to plot the Sparkline Chart
     */
    data: number[];
    /**
     * stroke color of the Line
     */
    stroke?: string;
    /**
     * width of the line
     */
    strokeWidth?: number;
    /**
     * width of the chart conatiner, if not provided, it will fit to width of parent container
     */
    width?: number;
    /**
     * height of the chart conatiner, if not provided, it will fit to height of parent container
     */
    height?: number;
    /**
     * custom margin space
     */
    margin?: SvgContainerMargins;
};

/**
 * Sparline Line Chart
 */
export const Sparkline: FC<Props> = ({
    data,
    stroke,
    strokeWidth,
    width,
    height,
    margin = DEFAULT_MARGINS,
}: Props) => {
    const [dimension, setDimension] = useState<SvgContainerDimension>({
        height: 0,
        width: 0,
    });

    const xScale = useMemo((): XScale => {
        const { width } = dimension;

        return scaleLinear<number, number>()
            .range([0, width])
            .domain([0, data.length - 1]);
    }, [dimension, data]);

    const yScale = useMemo((): YScale => {
        const { height } = dimension;

        return scaleLinear<number, number>()
            .range([height, 0])
            .domain([min(data), max(data)]);
    }, [dimension, data]);

    return (
        <div
            style={{
                position: 'relative',
                width: width || '100%',
                height: height || '100%',
            }}
        >
            <SvgContainer margin={margin} dimensionOnChange={setDimension}>
                <Line
                    xScale={xScale}
                    yScale={yScale}
                    data={data}
                    stroke={stroke}
                    width={strokeWidth}
                />
            </SvgContainer>
        </div>
    );
};
