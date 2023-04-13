import { FC } from "react";
import { Good } from "src/types/general";
import { Card as AntdCard, Skeleton, Typography } from "antd";
import { Link } from "react-router-dom"
import css from "./card.module.css";
const { Text, Paragraph } = Typography;

interface CardProps {
    good: Good;
}

export const Card: FC<CardProps> = ({ good }) => {
    return (
        <AntdCard
            className={css.productCard}
            title={<Link className={css.cardTitle} to={`/product/${good.id}`}><h3>{good.label}</h3></Link>}
            cover={<Skeleton.Node className={css.imgPlug}
                active={true}
            >
                <img className={css.cardImg} alt="product_img"
                    src={`https://source.unsplash.com/featured/600x400?product`}
                />
            </Skeleton.Node>}
        >
            <AntdCard.Meta
                title={
                    <Paragraph>
                        Цена: ${good.price}{" "}
                        <Text delete type="danger">${+good.price * 2}.00</Text>
                    </Paragraph>}
                description={<Paragraph>{good.description}</Paragraph>} />
        </AntdCard>

    )
}