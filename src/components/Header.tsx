import { Menu, Row } from "antd";
import { Header } from "antd/lib/layout/layout";
import React from "react";
import { useDispatch } from "react-redux";
import { useAction } from "../hooks/useActions";
import { useTypedSelector } from "../hooks/useTypedSelector";
import { AuthActionCreators } from "../store/reducers/auth/action-creators";

export const Navbar = () => {
  const { logout } = useAction();
  const { isAuth, user } = useTypedSelector(({ auth }) => auth);

  const onLogout = () => logout();

  return (
    <Header>
      {isAuth && (
        <div style={{ color: "white", float: "left" }}>{user.username}</div>
      )}
      <Menu theme="dark" mode="horizontal" selectable={false}>
        {isAuth ? (
          <Menu.Item onClick={onLogout} key="1">
            Выйти
          </Menu.Item>
        ) : (
          <Menu.Item key="1">Логин</Menu.Item>
        )}
      </Menu>
    </Header>
  );
};
