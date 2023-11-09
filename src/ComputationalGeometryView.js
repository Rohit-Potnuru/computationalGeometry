import React from 'react';
import { Outlet, Link } from 'react-router-dom';
import ROUTE_COMPUTATION_GEOMETRY from "./RouteComputationGeometry";

function ComputationalGeometry() {
    return (
        <div>
            <h1>Computational Geometry Topics</h1>
            <nav>
                {
                    Object.keys(ROUTE_COMPUTATION_GEOMETRY).map((key) => (
                        <ul>
                            <li>
                                <Link to={"/computationalGeometry/" + key}>
                                    {ROUTE_COMPUTATION_GEOMETRY[key]["name"]}
                                </Link>
                            </li>
                        </ul>
                    ))
                }
            </nav>
            <Outlet />
        </div>
    );
}

export default ComputationalGeometry;