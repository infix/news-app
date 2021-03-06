import React from "react";
import { Col, Row, Select, Switch } from "antd";

const { Option } = Select;

interface Props {
  country: string;
  setCountry: React.Dispatch<React.SetStateAction<string>>;
  category: string;
  setCategory: React.Dispatch<React.SetStateAction<string>>;
  showFav: boolean;
  setShowFav: React.Dispatch<React.SetStateAction<boolean>>;
}

export const NewsFeedOptionsSelector: React.FC<Props> = ({
  country,
  setCountry,
  category,
  setCategory,
  showFav,
  setShowFav,
}) => (
  <>
    <Row style={{ justifyContent: "space-between" }}>
      <Col flex={1}>
        <Select
          style={{ width: "100%" }}
          onSelect={country => setCountry(country as string)}
          value={country}
        >
          <Option value="eg">Egypt</Option>
          <Option value="ae">United Arab Emirates</Option>
        </Select>
      </Col>
      <col style={{ width: 10 }} />
      <Col flex={1}>
        <Select
          style={{ width: "100%" }}
          onSelect={category => setCategory(category as string)}
          value={category}
        >
          <Option value="sports">Sports</Option>
          <Option value="business">Business</Option>
        </Select>
      </Col>
    </Row>
    <Row>
      <span>Show Favourites: </span>
      <Switch onChange={checked => setShowFav(checked)} checked={showFav} />
    </Row>
  </>
);
