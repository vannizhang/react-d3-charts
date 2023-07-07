export type PieChartDataItem = {
    /**
     * key/category of the pie slice
     */
    key: string | number;
    /**
     * value of the pie slice
     */
    value: number;
    /**
     * tooltip text
     */
    tooltip?: string;
    /**
     * color for the pie slice
     */
    color?: string;
};
