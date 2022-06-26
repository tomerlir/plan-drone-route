import React, { Fragment, useEffect, useState } from "react";
import { Button, Modal, ModalHeader, ModalBody, ModalFooter } from "reactstrap";

const ConfirmationModal = ({ openModal, modalAction, handleConfirmClick }) => {
  const [show, setShow] = useState(false);
  const [actionColor, setActionColor] = useState("primary");

  // pass confirmed to parent
  const handleConfirm = (confirmation) => {
    handleConfirmClick(confirmation);
    setShow(false);
  };

  // check if user has opened modal
  useEffect(() => {
    if (openModal) {
      setShow(true);
      if (modalAction === "Delete" || modalAction === "Clear")
        setActionColor("danger");
    }
  }, [openModal, setShow, modalAction, setActionColor]);

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
            Cancel
          </Button>
          <Button
            color={actionColor}
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
