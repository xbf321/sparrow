import React from "react";
import { Provider } from "mobx-react";
import { Layout } from 'antd';
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";

import Header from './components/Header';
import HomePage from './pages/home/';
import EditPage from './pages/edit/';
import SettingsPage from './pages/settings';
import NotFoundPage from './pages/notFound';

const rootStore = window.g_config || {};
const url_prefix = `${rootStore.settings.site_url || ''}/pagesadmin`;
const menus = [{
    label: '工作台',
    to: url_prefix
},{
    label: '设置',
    to: `${url_prefix}/settings`
}];
const routes = [{
    path: `${url_prefix}`,
    component: HomePage,
}, {
    path: `${url_prefix}/posts/:uuid`,
    component: EditPage
}, {
    path: `${url_prefix}/settings`,
    component: SettingsPage
}];
const headerProps = {
    ...rootStore,
    menus,
    onLogout: () => {
        // 退出
        window.location.href = `${url_prefix}/logout`;
    }
};
function AppRouter() {
    return (
        <Provider rootStore={rootStore}>
            <Router>
                <Layout className="g-viewport">
                    <Header {...headerProps} />
                    <Layout.Content className="g-main">
                        <Switch>
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
                            <Route component={NotFoundPage} />
                        </Switch>
                    </Layout.Content>
                </Layout>
            </Router>
        </Provider>
    );
}

export default AppRouter;
