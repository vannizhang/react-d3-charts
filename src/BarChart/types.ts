export type BarChartDataItem = {
    /**
     * A string or numerical value that determines the x position of this item.
     */
    x: string | number;
    /**
     * A numerical value that determines the height of this item in Bar chart.
     */
    y: number;
    /**
     * The tooltip associated with this item, which can be plain text or an HTML string.
     */
    tooltip?: string;
    /**
     * The label text to be place on top of each bar
     */
    labelOnTop?: string;
};

export type YScaleOptions = {
    /**
     * Custom domain used to create the scale function for the y-axis.
     * If not provided, the domain will be determined by the maximum values of the `y` property among all items, and the minimum value of the domain will be 0.
     */
    domain?: number[];
};

export type VerticalReferenceLineData = {
    /**
     * A string or numerical value that determines the x position of this vertical reference line.
     */
    x: string | number;
    /**
     * tooltip to be displayed on top of the vertical reference line.
     */
    tooltip: string;
};
