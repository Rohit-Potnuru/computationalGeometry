function DrawHull(ctx, points, options = {}) {
    if(points.length < 2) return;
    // Set default values for options
    const {
        strokeStyle = 'red',
        closePath = false,
        lineWidth = 3,
        dotted = false,
        lineDash = [5, 5] // Default pattern for dotted lines
    } = options;

    ctx.strokeStyle = strokeStyle;
    ctx.lineWidth = lineWidth;

    // If dotted is true, set the line dash pattern
    if (dotted) {
        ctx.setLineDash(lineDash);
    } else {
        ctx.setLineDash([]); // Reset to solid line
    }

    ctx.beginPath();
    ctx.moveTo(points[0][0], points[0][1]);
    for (let i = 1; i < points.length; i++) {
        ctx.lineTo(points[i][0], points[i][1]);
    }
    if (closePath) {
        ctx.closePath();
    }
    ctx.stroke();

    // Reset the dashed line to solid for subsequent drawings
    if (dotted) {
        ctx.setLineDash([]);
    }
}

export default DrawHull;
export {DrawHull};
