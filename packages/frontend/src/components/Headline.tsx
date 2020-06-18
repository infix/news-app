import React from "react";
import { Card, Typography } from "antd";
import { Article } from "./NewsFeed";
import { HeartOutlined, LinkOutlined } from "@ant-design/icons";

export const Headline: React.FC<{ article: Article }> = ({ article }) => {
  return (
    <Card
      cover={<img alt="example" src={article.urlToImage} />}
      style={{ width: "100%", margin: "0.5rem 0" }}
      actions={[
        <HeartOutlined key="heart" />,
        <LinkOutlined
          key="source"
          onClick={() => window.open(article.url, "_blank")}
        />,
      ]}
    >
      <Card.Meta
        title={<p style={{ textAlign: "center" }}>{article.title}</p>}
        description={article.content}
      />

      <Typography.Text type="secondary">
        {article.publishedAt && (
          <>Published on {new Date(article.publishedAt).toDateString()}</>
        )}

        {article.author && <> by {article.author} </>}
      </Typography.Text>
    </Card>
  );
};
