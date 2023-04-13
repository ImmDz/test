import { FC } from "react";
import { Layout, Row, Col, Typography } from "antd";
import { InstagramOutlined, FacebookOutlined, YoutubeOutlined, WhatsAppOutlined, CopyrightOutlined } from "@ant-design/icons";
import css from "./footer.module.css";

export const Footer: FC = () => {
    return (
        <Layout.Footer className={css.footer}>
            <Row className={css.footerContainer}>
                <Col>
                    <Typography.Paragraph className={css.footerInfo}>Следите за акциями и новостями</Typography.Paragraph>
                    <ul className={css.socialList}>
                        <li><InstagramOutlined /></li>
                        <li><FacebookOutlined /></li>
                        <li><YoutubeOutlined /></li>
                        <li><WhatsAppOutlined /></li>
                    </ul>
                </Col>
                <Col>
                    <Typography.Paragraph className={css.footerInfo}>
                        OOO "Banana Store", 1999-2023 <CopyrightOutlined />
                    </Typography.Paragraph>
                </Col>
            </Row>
        </Layout.Footer>
    )
}