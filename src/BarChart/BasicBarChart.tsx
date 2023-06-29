import '../style.css';
import React, { FC, useMemo, useState } from 'react';
import {
    ScaleBand,
    scaleLinear,
    // scaleTime,
    ScaleLinear,
    scaleBand,
    max,
    min,
} from 'd3';
import SvgContainer from '../SvgContainer/SvgContainer';
import Bars from './Bars';
import { Dimension, ReactD3ChartData } from '../types';
import { SCALE_BAND_PADDING_INNER } from '../constants';
import { XAxis } from '../XAxis/XAxis';
import { YAxis } from '../YAxis/YAxis';
import { PointerEventsOverlay } from '../PointerEventOverlay/PointerEventsOverlay';

type XScale = ScaleBand<string | number>;

type YScale = ScaleLinear<number, number>;

type Props = {
    data: ReactD3ChartData;
    /**
     * fill color of the Bar Rectange
     */
    color?: string;
    /**
     * if ture, show horizontal grid lines
     */
    showHorizontalGridLine: boolean;
    /**
     * By default, D3 shows ticks for all items in the data on the x-axis.
     * Pass an array of tick values or an array of keys of the input data to override that behavior
     * and only render ticks for items that have their keys in `tickValuesOnXAxis`.
     */
    tickValuesOnXAxis: (string | number)[];
};

/**
 * Basic Bar Chart
 * @param param0
 * @returns
 */
export const BasicBarChart: FC<Props> = ({
    data,
    color,
    showHorizontalGridLine,
    tickValuesOnXAxis,
}: Props) => {
    const [dimension, setDimension] = useState<Dimension>({
        height: 0,
        width: 0,
    });

    const xDomain = useMemo(() => {
        if (!data || !data.length) {
            return [];
        }

        return data.map((d) => {
            return typeof d.key === 'number' ? d.key.toString() : d.key;
        });
    }, [data]);

    const xScale = useMemo((): XScale => {
        const { width } = dimension;

        return scaleBand()
            .paddingInner(SCALE_BAND_PADDING_INNER)
            .range([0, width])
            .domain(xDomain);
    }, [dimension, xDomain]);

    const yScale = useMemo((): YScale => {
        const { height } = dimension;

        const ymax = data && data.length ? max(data, (d) => d.value) : 0;

        const ymin = 0;

        return scaleLinear<number, number>()
            .range([height, 0])
            .domain([ymin, ymax]);
    }, [dimension, data]);

    return (
        <div
            style={{
                position: 'relative',
                width: '100%',
                height: '100%',
            }}
        >
            <SvgContainer dimensionOnChange={setDimension}>
                <Bars
                    data={data}
                    xScale={xScale}
                    yScale={yScale}
                    color={color}
                />

                <XAxis scale={xScale} tickValues={tickValuesOnXAxis} />

                <YAxis scale={yScale} showGridLines={showHorizontalGridLine} />

                <PointerEventsOverlay
                    xScale={xScale}
                    itemOnHoverChanged={(data) => {
                        console.log(data);
                    }}
                />
            </SvgContainer>
        </div>
    );
};
