import React from 'react';
import { Outlet, Link } from 'react-router-dom';

function ComputationalGeometry() {
    return (
        <div>
            <h1>Computational Geometry Topics</h1>
            <nav>
            <ul>
                <li>
                <Link to="/computationalGeometry/convexhull">Convex Hull</Link>
                </li>
            </ul>
            </nav>
            <Outlet />
        </div>
    );
}

export default ComputationalGeometry;