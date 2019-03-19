import * as React from 'react';
import { Menu, Layout, Icon } from 'antd';
import { Link } from "react-router-dom";
import "./style.scss";
export default ({
    settings = {},
    user = {},
    menus = [],
    onLogout = () => {}
}) => {
    const { title = '' } = settings;
    const { userName } = user;
    return (
        <Layout.Header className="g-header">
            <div className="g-header__layout">
                <div className="g-header__title">
                    {title}
                </div>
                <Menu
                    onClick={() => {}}
                    mode="horizontal"
                    className="g-header__menus"
                >
                    {
                       menus.map(item => {
                           return (
                                <Menu.Item
                                    key={item.to}
                                >
                                    <Link to={item.to}>
                                        {item.label}
                                    </Link>
                                </Menu.Item>
                           );
                       }) 
                    }
                </Menu>
                <div className="g-header__user">
                    {userName}, <a href="javascript:void(0);" onClick={onLogout}><Icon type="logout" />退出</a>
                </div>
            </div>
        </Layout.Header>
    );
}