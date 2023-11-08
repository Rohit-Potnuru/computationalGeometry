import DrawHull from "../../draw/DrawHull";
import HullStyleOptions from "./HullStyleOptions";

export default class AlgorithmStep {
    constructor(hull, state) {
        this.hull = hull;
        this.options = HullStyleOptions(state);
    }

    getHull() {
        return this.hull;
    }

    getOptions() {
        return this.options;
    }

    render(ctx, canvas) {
        DrawHull(ctx, this.hull, this.options);
    }
}