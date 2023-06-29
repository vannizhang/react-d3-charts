export type ReactD3ReactD3ChartDataItem = {
    key: string | number;
    value: number;
    label?: string;
    tooltip?: string;
};

export type ReactD3ChartData = ReactD3ReactD3ChartDataItem[];

export type Dimension = {
    height: number;
    width: number;
};

export type Margin = {
    left: number;
    right: number;
    top: number;
    bottom: number;
};

export type SvgContainerData = {
    svg: SVGSVGElement;
    rootGroup: SVGGElement;
    margin: Margin;
    dimension: Dimension;
};
