import { Box, Typography } from "@mui/material";
import TextFieldInput from "../TextFieldInput";
import Button from "../Button";
import { forwardRef } from "react";
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
interface FormRegisterProps {
  setIsLoginPage: (value: boolean) => void;
}
const FormRegister = forwardRef<HTMLDivElement, FormRegisterProps>((props, ref) => {
  return (
    <Box ref={ref} sx={style} {...props}>
      <Typography
        className="text-3xl text-center font-bold"
        id="modal-modal-title"
        variant="h6"
        component="h2"
      >
        ĐĂNG KÝ
      </Typography>
      <Box id="modal-modal-description" sx={{ mt: 2 }}>
        <TextFieldInput label="Tài khoản" />
        <TextFieldInput label="Mật khẩu" />
        <TextFieldInput label="Nhập lại mật khẩu" />

        <Box sx={{ textAlign: "center", mt: 2 }}>
          <Button title="Đăng Ký" variant="contained" color="primary" />
        </Box>

        <Typography sx={{ mt: 2, textAlign: "center" }}>
          Đã có tài khoản?{" "}
          <a href="#" className="text-blue-500" onClick={() => props.setIsLoginPage(true)}>
            Đăng Nhập
          </a>
        </Typography>
      </Box>
    </Box>
  );
});
FormRegister.displayName = "FormRegister";
export default FormRegister;
