/**
 * Represents a vertex of a single line.
 */
export type LineVertexData = {
    /**
     * A numerical value that determines the x position of this vertex.
     */
    x: number;
    /**
     * A numerical value that determines the y position of this vertex.
     */
    y: number;
    /**
     * An optional tooltip associated with this data item.
     * It can be plain text or an HTML string.
     */
    tooltip?: string;
};

/**
 * Represents a single line in the multiple lines chart.
 */
export type LineGroupData = {
    /**
     * key/name of this line group
     */
    key: string;
    /**
     * fill color of this line group
     */
    fill?: string;
    /**
     * The stroke-dasharray property (e.g. '4 4') that will be used to render this line as a dashed line
     */
    dashPattern?: string;
    /**
     * data that will be used plot the line for this group
     */
    values: LineVertexData[];
};

export type XScaleOptions = {
    /**
     * If set to true, a time scale will be used instead of a linear scale for the x-axis.
     */
    useTimeScale?: boolean;
    /**
     * Custom domain that will be used to create a scale function for the x-axis.
     * If not provided, the minimum and maximum values of the `x` property of all items will be used as the domain.
     */
    domain?: number[];
};

export type YScaleOptions = {
    /**
     * Custom domain that will be used to create a scale function for the y-axis.
     * If not provided, the minimum and maximum values of the `y` property of all items will be used as the domain.
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
    /**
     * The stroke color of this specific vertical reference line,
     * useful when you need to differentiate it from other reference lines.
     *
     * Note: It's recommended to use the CSS variable `--vertical-reference-line-color`
     * to manage the stroke color for consistency.
     */
    strokeColor?: string;
    /**
     * The stroke width of this specific vertical reference line,
     * useful when you need to differentiate it from other reference lines.
     *
     * Note: It's recommended to use the CSS variable `--vertical-reference-line-width`
     * to manage the stroke width for consistency.
     */
    strokeWidth?: string;
    /**
     * The stroke dash array of this specific vertical reference line,
     * useful when you need to differentiate it from other reference lines.
     *
     * Note: It's recommended to use the CSS variable `--vertical-reference-line-stroke-dasharray`
     * to manage the stroke dash pattern for consistency.
     */
    strokeDashArray?: string;
};

export type ReferenceRectangleData = {
    /**
     * Unique identifier for this reference rectangle.
     */
    key: string;

    /**
     * The x-coordinate of the rectangle's top-left corner.
     */
    xMin: number;

    /**
     * The x-coordinate of the rectangle's bottom-right corner.
     */
    xMax: number;

    /**
     * The fill color of the rectangle (optional).
     */
    fillColor?: string;
};
