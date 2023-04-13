import { type FC, useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { Header as HeaderAntd } from "antd/es/layout/layout";
import { ShoppingCartOutlined } from "@ant-design/icons";
import { Badge, Button, Row, Col, Space, message, Typography, Input, Dropdown, Modal, Layout } from "antd";
import { getCartGoods, getGoods, getIsAuthValue, getUserLogin } from "src/store";
import { useSelector } from "react-redux";
import { userActions, cartActions, goodActions } from "src/store";
import { useAppDispatch } from "src/hooks/useAppDispatch";
import type { Good } from "src/types/general";
import { debounce } from "lodash";
import css from "./header.module.css";

export const Header: FC = () => {
    const cartGoods = useSelector(getCartGoods);
    const isAuth = useSelector(getIsAuthValue);
    const dispatch = useAppDispatch();
    const login = useSelector(getUserLogin);
    const [searchedGoods, setSearchedGoods] = useState<Good[]>([]);
    const [isModalOpen, setIsModalOpen] = useState(false);
    const goods = useSelector(getGoods);

    useEffect(() => {
        if (!isAuth && login) {
            dispatch(cartActions.setCart());
        }
    }, [isAuth]);

    useEffect(() => {
        setSearchedGoods(goods);
    }, [goods]);

    const items = searchedGoods.length > 0 ? searchedGoods.map((good) => ({
        key: good.id,
        label: <Link to={`/product/${good.id}`}>{good.label}</Link>
    })) : [{ key: "noResults", label: "Ничего не найдено, попробуйте изменить запрос" }]

    const searchHandle = debounce((value: string) => {
        if (value.trim().length > 0) {
            dispatch(goodActions.serverRequest({ text: value }))
        } else setSearchedGoods([])
    }, 1_500)

    const showModal = () => {
        setIsModalOpen(true);
    };

    const handleOk = () => {
        setIsModalOpen(false);
        dispatch(userActions.setAuth(false));
        dispatch(userActions.resetLogin());
        localStorage.clear();
        message.open({ type: "info", content: "Вы вышли из профиля" })
    };

    const handleCancel = () => {
        setIsModalOpen(false);
    };

    return (
        <Layout.Header className={css.header}>
            <Modal title="Подтвердите действие" open={isModalOpen} onOk={handleOk} onCancel={handleCancel}>
                <p>Уверены, что хотите выйти?</p>
            </Modal>
            <Row className={css.headerContainer}>
                <h1><Link className="storeTitle" to="/">Banana Store</Link></h1>
                <Col className={css.searchInput}>
                    <Dropdown menu={{ items }} trigger={['click']}>
                        <Input.Search onChange={(e) => searchHandle(e.target.value)} />
                    </Dropdown>
                </Col>
                <Col className={css.login}>
                    {login === "admin" &&
                        <Col>
                            <Link to="/goods">
                                <Typography.Text className={css.adminLink} underline>Все товары</Typography.Text>
                            </Link>
                        </Col>}
                    <Col>{!isAuth ?
                        <Col>
                            <Button><Link to="/login">Войти</Link></Button>
                            <Button><Link to="/registration">Зарегистрироваться </Link></Button>
                        </Col> :
                        <Space size={"large"}>
                            <Typography.Text mark italic>{localStorage.getItem('login')}</Typography.Text>
                            <Button onClick={showModal}>Выйти</Button>

                        </Space>}
                    </Col>
                </Col>
                <Col>
                    <Link onClick={() => {
                        if (!isAuth) {
                            message.open({ type: "error", content: "Только для зарегистрированных пользователей" });
                        }
                    }} to="/cart">
                        <Badge count={cartGoods.map(good => good.count).reduce((acc, curr) => {
                            return acc + curr;
                        }, 0)}>
                            <ShoppingCartOutlined className={css.cartIcon} /></Badge>
                    </Link>
                </Col>
            </Row>
        </Layout.Header>
    )
}