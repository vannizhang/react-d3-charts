export type BottomAxisOptions = {
    /**
     * Indicate number of ticks that should be renderder, this only works with Scale Linear, for Scale Band, use `tickValues` option
     * If not provided, d3 will try to render as many ticks as possible
     */
    numberOfTicks?: number;
    /**
     * if true, create grid lines by setting the tick size to your chart height
     */
    showGridLines?: boolean;
    /**
     * Specified values to be used for ticks rather than using the scale’s automatic tick generator.
     * By default, D3 shows ticks for all items in the data on the x-axis.
     * Pass an array of tick values or an array of keys of the input data to override that behavior
     * and only render ticks for items that have their keys in `tickValuesOnXAxis`.
     */
    tickValues?: (string | number)[];
    /**
     * if true, rotate the label text to provide more space
     */
    shouldRotateTextLabels?: boolean;
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
