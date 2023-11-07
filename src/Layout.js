import React from 'react';
import { Outlet, Link } from 'react-router-dom';

function Layout() {
    return (
        <div>
            <nav>
            <ul>
                <Link to="/computationalGeometry">Home</Link>
            </ul>
            </nav>
            <Outlet />
        </div>
    );
}

export default Layout;