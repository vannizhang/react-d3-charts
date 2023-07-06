export type LeftAxisOptions = {
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
