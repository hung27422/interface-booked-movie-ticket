import * as React from "react";
import ButtonModal from "@mui/material/Button";
import Modal from "@mui/material/Modal";
import User from "@mui/icons-material/AccountCircle";
import FormLogin from "./FormLogin";
import { useState } from "react";
import FormRegister from "./FormRegister";
import { useAppContext } from "@/app/contexts/AppContextProvider/AppContextProvider";

export default function ModalLAuth() {
  const { openModalAuth, setOpenModalAuth } = useAppContext();
  const handleOpen = () => setOpenModalAuth(true);
  const handleClose = () => setOpenModalAuth(false);

  const [isLoginPage, setIsLoginPage] = useState(true);

  return (
    <div>
      <ButtonModal onClick={handleOpen}>
        <User className="text-red-500 text-4xl text-center mx-auto" />
      </ButtonModal>
      <Modal
        open={openModalAuth}
        onClose={handleClose}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
        sx={{
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
        }}
        disableScrollLock
      >
        {isLoginPage ? (
          <FormLogin setIsLoginPage={setIsLoginPage} setOpen={setOpenModalAuth} />
        ) : (
          <FormRegister setIsLoginPage={setIsLoginPage} setOpen={setOpenModalAuth} />
        )}
      </Modal>
    </div>
  );
}
