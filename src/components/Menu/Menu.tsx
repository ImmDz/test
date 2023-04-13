import { FC } from "react";
import { useSelector } from "react-redux";
import { getCategories } from "src/store";
import { Menu as AntdMenu } from "antd";
import { Link } from "react-router-dom";

export const Menu: FC = () => {
    const categories = useSelector(getCategories);
    return (
        <AntdMenu items={categories.map((category) => ({
            label: <Link to={`/category/${category.id}`}>{category.label}</Link>,
            key: category.id
        }))}>
        </AntdMenu>
    )
}