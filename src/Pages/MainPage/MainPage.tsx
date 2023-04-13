import { FC, useEffect, useState } from "react";
import { GoodCategory, Menu } from "src/components";
import { getPopularCategories, getPopularLoadStatus, popularActions, categoryActions } from "src/store";
import { Layout, Image, Skeleton, Spin, Drawer, FloatButton, Button } from "antd";
import { useAppDispatch } from "src/hooks/useAppDispatch";
import { useSelector } from "react-redux";
import css from "./mainPage.module.css";
const { Content, Sider } = Layout;

export const MainPage: FC = () => {
    const dispatch = useAppDispatch();
    const popularCategories = useSelector(getPopularCategories);
    const loadStatus = useSelector(getPopularLoadStatus);
    const [open, setOpen] = useState(false);
    useEffect(() => {
        categoryRequest();
        popularRequest();
    }, [])
    const categoryRequest = () => dispatch(categoryActions.serverRequest());
    const popularRequest = () => dispatch(popularActions.serverRequest());
    const showDrawer = () => {
        setOpen(true);
    };

    const onClose = () => {
        setOpen(false);
    };
    return (
        <>
            <Sider className={css.categoriesMenu} theme="light">
                <Menu />
            </Sider>
            <Content className="content">
                <Drawer placement="left" className={css.hiddenMenu} onClose={onClose} open={open}>
                    <Menu />
                </Drawer>
                <FloatButton className={css.floatButton} onClick={showDrawer} />
                <div className={css.banner}>
                    <Skeleton.Node className={css.imgPlug} active={true}>
                        <Image className={css.bannerImg} preview={false} src="https://source.unsplash.com/featured/1320x488?store" alt="banner-image" />
                    </Skeleton.Node>
                </div>
                {loadStatus === "LOADING" ? <div className="loading"><Spin tip={loadStatus} /></div> :
                    <ul className={css.popularCategories}>
                        {popularCategories.map((category) => <li key={category.category.id}><GoodCategory label={category.category.label} goods={category.items} /></li>)}
                    </ul>
                }
            </Content>
        </>
    )
}