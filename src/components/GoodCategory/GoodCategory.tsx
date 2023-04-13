import { FC } from "react";
import { Card } from "src/components";
import type { Good } from "src/types/general";
import { List } from "antd";
import css from "./goodCategory.module.css";

interface GoodCategoryProps {
    label: string;
    goods: Good[];
}

export const GoodCategory: FC<GoodCategoryProps> = ({ label, goods }) => {
    return (
        <section className="category">
            <h2 className="categoryTitle" style={{ textAlign: "center" }}>{label}</h2>
            <List
                grid={{
                    gutter: 10,
                    xs: 1,
                    sm: 2,
                    md: 2,
                    lg: 2,
                    xl: 4,
                    xxl: 4,
                }}
                dataSource={goods}
                pagination={{ align: "center", pageSize: 4 }}
                renderItem={(good) => (
                    <List.Item>
                        <Card good={good} />
                    </List.Item>
                )}>
            </List>
        </section>
    )
}