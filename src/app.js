import React from "react";
import { BrowserRouter as Router, Route, Link } from "react-router-dom";
import HomePage from './pages/home/';
import EditPage from './pages/edit/';
// const menus = [];
const routes = [{
    path: '/pagesadmin',
    component: HomePage,
}, {
    path: '/pagesadmin/posts/:uuid',
    component: EditPage
}];


function AppRouter() {
    return (
        <Router>
            <div className="g-viewport">
                <nav className="g-sidebar">
                    <ul>
                        <li>
                            <Link to="/pagesadmin">Home</Link>
                        </li>
                        <li>
                            <Link to="/pagesadmin/create/">create</Link>
                        </li>
                        <li>
                            <Link to="/pagesadmin/users/">Users</Link>
                        </li>
                    </ul>
                </nav>
                <main className="g-main">
                    {
                        routes.map(item => {
                            return (
                                <Route
                                    key={item.path}
                                    path={item.path}
                                    exact
                                    component={item.component}
                                />
                            );
                        })
                    }
                </main>
            </div>
        </Router>
    );
}

export default AppRouter;
