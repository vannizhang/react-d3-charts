export type BarChartDataItem = {
    key: string | number;
    value: number;
    tooltip?: string;
};

export type BarChartData = BarChartDataItem[];

export type LineChartDataItem = {
    key: number;
    value: number;
    tooltip?: string;
};

export type LineChartData = LineChartDataItem[];

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
