import React, { Component } from "react";
import PropsTypes from "prop-types";

type Props = {
  link: string;
  owner: any;
  creation_date: number;
  title: string;
};

const Row = (props: Props) => {
  return (
    <tr
      className="cursor-pointer"
      onClick={() => {
        window.open(props.link);
      }}
    >
      {/* 
    Using dangerouslySetInnerHTML for non sensitive data
    We can create component here which can check if any one written 
    XSS attack code Then we can remove it.
    */}
      <td
        dangerouslySetInnerHTML={{
          __html: props.owner.display_name
        }}
      ></td>
      <td dangerouslySetInnerHTML={{ __html: props.title }}></td>
      <td>{new Date(props.creation_date * 1000).toLocaleString()}</td>
    </tr>
  );
};

Row.propTypes = {
  link: PropsTypes.string.isRequired,
  owner: PropsTypes.any.isRequired,
  creation_date: PropsTypes.number.isRequired,
  title: PropsTypes.string.isRequired
};

export default Row;
