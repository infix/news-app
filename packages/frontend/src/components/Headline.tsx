import React from "react";
import { Card, Typography } from "antd";
import { Article } from "./NewsFeed";
import { HeartOutlined, LinkOutlined } from "@ant-design/icons";

export const Headline: React.FC<{ article: Article }> = ({ article }) => {
  return (
    <Card
      cover={<img alt="example" src={article.urlToImage} />}
      style={{ width: "100%", margin: "0.5rem 0" }}
      actions={[<HeartOutlined key="heart" />, <LinkOutlined key="source" />]}
    >
      <Card.Meta
        title={article.title}
        description={article.content}
        avatar={() => <Typography.Text>{article.author}</Typography.Text>}
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
