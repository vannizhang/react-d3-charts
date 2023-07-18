/**
 * Represents a data item for the basic line chart.
 */
export type LineChartDataItem = {
    /**
     * A numerical value that determines the x position of this item.
     * Examples of valid `x` values:
     * - Unix timestamp (e.g., 1688167415)
     * - Year (e.g., 2014)
     * - Order of the item (e.g., 1)
     */
    x: number;
    /**
     * A numerical value that determines the y position of this item.
     */
    y: number;
    /**
     * An optional tooltip associated with this data item.
     * It can be plain text or an HTML string.
     */
    tooltip?: string;
};

export type XScaleOptions = {
    /**
     * If set to true, a time scale will be used instead of a linear scale for the x-axis.
     */
    useTimeScale?: boolean;
};

export type YScaleOptions = {
    /**
     * Custom domain that will be used to create a scale function for the y-axis.
     * If not provided, the minimum and maximum values of the `value` property of all items will be used as the domain.
     */
    domain?: number[];
};

export type VerticalReferenceLineData = {
    /**
     * A numerical value that determines the x position of this vertical reference line
     */
    x: number;
    /**
     * tooltip to be displayed on top of the vertical reference line
     */
    tooltip: string;
};
