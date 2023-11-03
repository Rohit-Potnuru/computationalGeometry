function DrawHull(ctx, points, strokeStyle= 'red', closePath = false) {
    ctx.strokeStyle = strokeStyle;
    ctx.lineWidth = 2;
    ctx.beginPath();
    ctx.moveTo(points[0][0], points[0][1]);
    for (let i = 1; i < points.length; i++) {
        ctx.lineTo(points[i][0], points[i][1]);
    }
    if(closePath) {
        ctx.closePath();
    }
    ctx.stroke();
}

export default DrawHull;
export {DrawHull};