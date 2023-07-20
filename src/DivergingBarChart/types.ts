export type DivergingBarChartDataItem = {
    /**
     * A string or numerical value that determines the x position of this item.
     */
    x: string | number;
    /**
     * A numerical value that determines the height of this item in Bar chart.
     */
    y: number;
    /**
     * color that will be used to render the bar rectangle of this item
     */
    fill?: string;
    /**
     * The tooltip associated with this item, which can be plain text or an HTML string.
     */
    tooltip?: string;
};

export type YScaleOptions = {
    /**
     * Custom domain used to create the scale function for the y-axis.
     * If not provided, the maximum value of the domain will be determined by the maximum absolute values of the `y` property among all items.
     * The minimum value will be the negative value of the maximum value.
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
