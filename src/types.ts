export type BarChartDataItem = {
    key: string | number;
    value: number;
    tooltip?: string;
};

export type BarChartData = BarChartDataItem[];

export type LineChartDataItem = {
    /**
     * key is a numerical value that determines the x position of this item.
     * key can be used to contain values like:
     * - unix timestamp (e.g. 1688167415)
     * - year (e.g. 2014)
     * - order of the item (e.g. 1)
     */
    key: number;
    /**
     * value is numerical value that determines the y position of this item
     */
    value: number;
    /**
     * tooltip assoicated with this item, can be plain text or html string
     */
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
