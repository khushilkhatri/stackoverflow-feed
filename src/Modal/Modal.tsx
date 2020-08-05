import React from "react";
import { Modal, Button } from "react-bootstrap";
import PropsTypes from "prop-types";

type Props = {
  body: string;
  link: string;
  title: string;
  onHide: any;
};

const CustomModal = (props: Props) => {
  const { body, link, title, onHide } = props;
  return (
    <Modal
      show={true}
      size="lg"
      aria-labelledby="contained-modal-title-vcenter"
      centered
    >
      <Modal.Header>
        <Modal.Title dangerouslySetInnerHTML={{ __html: title }}></Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <p>
          <b>Link</b> <br />
          <a target="_blank" href={link}>
            {link}
          </a>
        </p>
        <b>Body</b>
        <p dangerouslySetInnerHTML={{ __html: body }}></p>
      </Modal.Body>
      <Modal.Footer>
        <Button variant="secondary" onClick={onHide}>
          Close
        </Button>
      </Modal.Footer>
    </Modal>
  );
};

CustomModal.propTypes = {
  body: PropsTypes.string.isRequired,
  link: PropsTypes.string.isRequired,
  title: PropsTypes.string.isRequired,
  onHide: PropsTypes.any.isRequired
};

export default CustomModal;
