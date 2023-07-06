export type BarLineComboChartDataItem = {
    /**
     * A string or numerical value that determines the x position of this item.
     */
    x: string | number;
    /**
     * A numerical value that determines the height of Bar that represents this item.
     */
    yBar: number;
    /**
     * A numerical value that determines the y position of the node in Line that represents this item.
     */
    yLine: number;
    /**
     * The tooltip associated with this item, which can be plain text or an HTML string.
     */
    tooltip?: string;
};
