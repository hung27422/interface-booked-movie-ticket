import * as React from "react";
import ButtonModal from "@mui/material/Button";
import Modal from "@mui/material/Modal";
import User from "@mui/icons-material/AccountCircle";
import FormLogin from "./FormLogin";
import { useState } from "react";
import FormRegister from "./FormRegister";

export default function ModalLAuth() {
  const [open, setOpen] = React.useState(false);
  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);

  const [isLoginPage, setIsLoginPage] = useState(true);

  return (
    <div>
      <ButtonModal onClick={handleOpen}>
        <User className="ml-3 text-red-500 text-4xl" />
      </ButtonModal>
      <Modal
        open={open}
        onClose={handleClose}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
        {isLoginPage ? (
          <FormLogin setIsLoginPage={setIsLoginPage} />
        ) : (
          <FormRegister setIsLoginPage={setIsLoginPage} />
        )}
      </Modal>
    </div>
  );
}
