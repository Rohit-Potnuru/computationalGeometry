import Point from "./Point";

export default class LineSegment {
    static MAX_DIMENSION = 3;
    static MIN_DIMENSION = 1;
    constructor(pointX, pointY, options = {}) {
        const {
            strokeStyle = 'red',
            closePath = false,
            lineWidth = 2,
            dotted = false,
            lineDash = [5, 5] // Default pattern for dotted lines
        } = options;

        this.options = {...options,
                        strokeStyle: strokeStyle,
                        closePath: closePath,
                        lineWidth: lineWidth,
                        dotted: dotted,
                        lineDash: lineDash
                       }
        if((pointX instanceof Point) && LineSegment.MIN_DIMENSION <= pointX.getDimension()
           && pointX.getDimension() <= LineSegment.MAX_DIMENSION &&
           (pointY instanceof Point) && pointY.getDimension() === pointX.getDimension()) {
            this.pointX = pointX;
            this.pointY = pointY;
            this.dimension = pointX.getDimension();
        }
    }

    getPoints() {
        return [this.pointX, this.pointY];
    }

    getDimension() {
        return this.dimension;
    }

    render2D(ctx, canvas) {
        if(this.dimension === 2) {
            const {
                strokeStyle = 'red',
                closePath = false,
                lineWidth = 3,
                dotted = false,
                lineDash = [5, 5] // Default pattern for dotted lines
            } = this.options;

            const x = this.pointX.getX();
            const y = this.pointY.getX();

            ctx.strokeStyle = strokeStyle;
            ctx.lineWidth = lineWidth;
            if (dotted) {
                ctx.setLineDash(lineDash);
            } 

            ctx.beginPath();
            ctx.moveTo(x[0], x[1]);
            ctx.lineTo(y[0], y[1]);
            if (closePath) {
                ctx.closePath();
            }
            ctx.stroke();
        
            // Reset the dashed line to solid for subsequent drawings
            if (dotted) {
                ctx.setLineDash([]);
            }
        }
    }
}