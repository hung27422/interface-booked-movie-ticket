import React, { forwardRef } from "react";
import { Box, Typography } from "@mui/material";
import TextFieldInput from "../TextFieldInput";
import Button from "../Button";

const style = {
  position: "absolute",
  color: "white",
  top: "50%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  width: 600,
  bgcolor: "rgba(0, 0, 0, 0.6)",
  border: "2px solid #ff00ff",
  boxShadow: 24,
  p: 4,
  borderRadius: 4,
};

interface FormLoginProps {
  setIsLoginPage: (value: boolean) => void;
  setOpen: (value: boolean) => void;
}

const FormLogin = forwardRef<HTMLDivElement, FormLoginProps>((props, ref) => {
  return (
    <Box tabIndex={-1} ref={ref} sx={style}>
      <Box sx={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}>
        <Box></Box>
        <Typography
          className="text-3xl text-center font-bold"
          id="modal-modal-title"
          variant="h6"
          component="h2"
        >
          ĐĂNG NHẬP
        </Typography>
        <Button
          className="text-sm"
          title="X"
          variant="outlined"
          color="error"
          size="small"
          onClick={() => props.setOpen(false)}
        />
      </Box>
      <Box id="modal-modal-description" sx={{ mt: 2 }}>
        <TextFieldInput label="Tài khoản" />
        <TextFieldInput label="Mật khẩu" />

        <Box sx={{ textAlign: "center", mt: 2 }}>
          <Button className="text-lg" title="Đăng Nhập" variant="outlined" color="primary" />
        </Box>

        <Typography sx={{ mt: 2, textAlign: "center" }}>
          Bạn chưa có tài khoản?{" "}
          <a href="#" onClick={() => props.setIsLoginPage(false)} className="text-blue-500">
            Đăng ký ngay
          </a>
        </Typography>

        <Typography sx={{ mt: 2, textAlign: "center" }}>
          Quên mật khẩu?{" "}
          <a href="#" className="text-blue-500">
            Quên
          </a>
        </Typography>
      </Box>
    </Box>
  );
});

FormLogin.displayName = "FormLogin";

export default FormLogin;
