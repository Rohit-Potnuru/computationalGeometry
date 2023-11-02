function GrahamScanAlgorithm(points) {
    if (points.length < 3) return null;

    // Sort points lexicographically
    points.sort((a, b) => a[0] === b[0] ? a[1] - b[1] : a[0] - b[0]);

    // Find the pivot point, which is the point with the lowest y-coordinate
    const pivot = points[0];

    // // Sort the points based on polar angle with pivot
    // points.sort((a, b) => {
    //     const angleA = Math.atan2(a[1] - pivot[1], a[0] - pivot[0]);
    //     const angleB = Math.atan2(b[1] - pivot[1], b[0] - pivot[0]);
    //     return angleA - angleB;
    // });

    // Build the convex hull
    const uhull = [pivot, points[1]];
    for (let i = 2; i < points.length; i++) {
        while (uhull.length >= 2 && cross(uhull[uhull.length - 2], uhull[uhull.length - 1], points[i]) <= 0) {
            uhull.pop();
        }
        uhull.push(points[i]);
    }

    const lhull = [pivot, points[1]];
    for (let i = 2; i < points.length; i++) {
        while (lhull.length >= 2 && cross(lhull[lhull.length - 2], lhull[lhull.length - 1], points[i]) >= 0) {
            lhull.pop();
        }
        lhull.push(points[i]);
    }

    return [...uhull, ...lhull.reverse()];
}

// Helper function to calculate the cross product of three points
function cross(o, a, b) {
    return (a[0] - o[0]) * (b[1] - o[1]) - (a[1] - o[1]) * (b[0] - o[0]);
}

export default GrahamScanAlgorithm;