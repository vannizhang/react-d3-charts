export type HorizontalBarChartDataItem = {
    /**
     * A numerical value that determines the width of this item in Bar chart.
     */
    x: number;
    /**
     * A string or numerical value that determines the y position of this item.
     */
    y: string | number;
    /**
     * The tooltip associated with this item, which can be plain text or an HTML string.
     */
    tooltip?: string;
};

export type LeftAxisOptions = {
    /**
     * custom format function mapping a value from the axis Domain to a formatted string for display purposes.
     * @param domainValue original domain value
     * @param index
     * @returns formatted string
     */
    tickFormatFunction?: (
        domainValue: number | string,
        index?: number
    ) => string;
};

export type BottomAxisOptions = {
    /**
     * Indicate number of ticks that should be renderder.
     * If not provided, d3 will try to render as many ticks as possible
     */
    numberOfTicks?: number;
    /**
     * if true, create grid lines by setting the tick size to your chart width
     */
    showGridLines?: boolean;
    /**
     * custom format function mapping a value from the axis Domain to a formatted string for display purposes.
     * @param domainValue original domain value
     * @param index
     * @returns formatted string
     */
    tickFormatFunction?: (domainValue: number, index?: number) => string;
};
