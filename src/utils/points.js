const generatePoints = (n, dim, decimal=false) => {
    const points = [];
    for (let i = 0; i < n; i++) {
        const point = [];
        for (let j = 0; j < dim.length; j++) {
            const [min, max] = dim[j];
            let value = Math.random() * (max - min) + min;
            if(!decimal) {
                value = Math.round(value);
            }
            point.push(value);
        }
        points.push(point);
    }
    return points;
}

export {generatePoints};