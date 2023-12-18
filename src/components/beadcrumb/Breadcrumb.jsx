import { HomeOutlined, RightOutlined } from "@ant-design/icons";
import { Breadcrumb as BreadcrumbAntd } from "antd";
import { useTranslation } from "react-i18next";
import { Link } from "react-router-dom";
import "./breadcrumb.css";

const { Item } = BreadcrumbAntd;

export const Breadcrumb = ({ items }) => {
  const { t } = useTranslation();

  return (
    <BreadcrumbAntd
      style={{ paddingBottom: 15 }}
      separator={<RightOutlined style={{ fontSize: 10 }} />}
    >
      <Item>
        <Link to="/">
          <HomeOutlined />
        </Link>
      </Item>

      {items.map(({ key, route, title }, index, items) => {
        if (index === items.length - 1) {
          return (
            <Item key={index}>
              {key && t(`BREADCRUMB.${key.toUpperCase()}`)} {title}
            </Item>
          );
        }

        return (
          <Item key={index}>
            <Link to={route ?? `/${key}`}>
              {t(`BREADCRUMB.${key.toUpperCase()}`)} {title}
            </Link>
          </Item>
        );
      })}
    </BreadcrumbAntd>
  );
};
