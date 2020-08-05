import React from "react";
import { Col } from "react-bootstrap";
import PropsTypes from "prop-types";

type Props = {
  owner: any;
  creation_date: number;
  title: string;
  index: number;
  onSelect: any;
};

const Row = (props: Props) => {
  return (
    <Col
      md={12}
      className="row-col cursor-pointer"
      onClick={() => {
        props.onSelect(props.index);
      }}
    >
      {/* 
    Using dangerouslySetInnerHTML for non sensitive data
    We can create component here which can check if any one written 
    XSS attack code Then we can remove it.
    */}
      <div
        className="row-title"
        dangerouslySetInnerHTML={{ __html: props.title }}
      ></div>
      <div className="row-desc">
        <div
          className="pull-left"
          dangerouslySetInnerHTML={{
            __html: props.owner.display_name
          }}
        ></div>
        <div className="pull-right">
          {new Date(props.creation_date * 1000).toLocaleString()}
        </div>
      </div>
    </Col>
  );
};

Row.propTypes = {
  owner: PropsTypes.any.isRequired,
  creation_date: PropsTypes.number.isRequired,
  title: PropsTypes.string.isRequired,
  index: PropsTypes.number.isRequired,
  onSelect: PropsTypes.any.isRequired
};

export default Row;
