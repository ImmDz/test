import { FC, useState, useEffect } from "react";
import { useSelector } from "react-redux";
import { Content } from "antd/es/layout/layout";
import { Form, Input, Button, message } from "antd";
import { Link } from "react-router-dom";
import { userActions, getIsAuthValue, getUserLoadStatus } from "src/store";
import { useAppDispatch } from "src/hooks/useAppDispatch";
import { useNavigate } from "react-router-dom";
import css from "./login.module.css";

export const LoginPage: FC = () => {
    const dispatch = useAppDispatch();
    const isAuth = useSelector(getIsAuthValue);
    const navigate = useNavigate();
    const loadStatus = useSelector(getUserLoadStatus);
    const [login, setLogin] = useState<string>('');
    const [password, setPassword] = useState<string>('');

    useEffect(() => {
        if (loadStatus === "ERROR") {
            message.open({ type: "warning", content: "Неверный пользователь" });
        }
        if (isAuth) {
            message.open({ type: "success", content: "Успешный вход" });
            navigate("/");
        }
    }, [loadStatus])
    return (
        <Content className="content">
            <h2 className="categoryTitle">Вход</h2>
            <Form className={css.loginForm}
            >
                <Form.Item
                    label="Логин"
                    name="логин"
                    rules={[{ required: true, message: 'обязательное поле!' }]}
                >
                    <Input onChange={(e) => setLogin(e.target.value)} />
                </Form.Item>
                <Form.Item
                    label="Пароль"
                    name="пароль"
                    rules={[{ required: true, message: 'обязательное поле!' }]}
                >
                    <Input onChange={(e) => setPassword(e.target.value)} />
                </Form.Item>
                <Form.Item>
                    <Button className={css.loginButton} onClick={() => {
                        if (!login.trim() || !password.trim()) {
                            message.open({ type: 'warning', content: "Оба поля должны быть заполнены!" });
                        } else {
                            dispatch(userActions.login({ login: login, password: password }));
                        }
                    }} type="primary" htmlType="submit">Войти</Button>
                    <Button className={css.signInButton}><Link to="/registration">Зарегистрироваться</Link></Button>
                </Form.Item>
            </Form>
        </Content>
    )
}