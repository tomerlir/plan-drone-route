import React, { Fragment, useEffect, useState } from "react";
import { Button, Modal, ModalHeader, ModalBody, ModalFooter } from "reactstrap";

const ConfirmationModal = ({ openModal, modalAction, handleConfirmClick }) => {
  const [show, setShow] = useState(false);

  const handleConfirm = (confirmation) => {
    handleConfirmClick(confirmation);
    setShow(false);
  };

  useEffect(() => {
    if (openModal) {
      setShow(true);
    }
  }, [openModal, setShow]);

  return (
    <Fragment>
      <Modal isOpen={show}>
        <ModalHeader>Confirm {modalAction}</ModalHeader>
        <ModalBody>Are you sure you want to {modalAction}?</ModalBody>
        <ModalFooter>
          <Button
            color="secondary"
            className="close-modal"
            onClick={() => handleConfirm(false)}
          >
            Close
          </Button>
          <Button
            color={modalAction === "Delete" ? "danger" : "primary"}
            className="confirm-action"
            onClick={() => handleConfirm(true)}
          >
            {modalAction}
          </Button>
        </ModalFooter>
      </Modal>
    </Fragment>
  );
};

export default ConfirmationModal;
