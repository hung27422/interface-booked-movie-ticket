import { Box, Typography } from "@mui/material";
import TextFieldInput from "../TextFieldInput";
import Button from "../Button";
import React, { forwardRef, useContext, useState } from "react";
import { Register } from "@/app/types/User";
import { AuthContext } from "@/app/contexts/AuthContextProvider/AuthContextProvider";
import useSnackbar from "../Hooks/useSnackbar";
const style = {
  position: "absolute" as const,
  color: "white",
  top: "50%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  width: "90%",
  maxWidth: 500,
  bgcolor: "rgba(0, 0, 0, 0.9)",
  border: "2px solid #ff00ff",
  boxShadow: 24,
  p: { xs: 2, sm: 4 },
  borderRadius: 4,
};
interface FormRegisterProps {
  setIsLoginPage: (value: boolean) => void;
  setOpen: (value: boolean) => void;
}
const FormRegister = forwardRef<HTMLDivElement, FormRegisterProps>((props, ref) => {
  //Context
  const { register } = useContext(AuthContext);
  // State
  const [valueRegister, setValueRegister] = useState<Register>({
    fullName: "",
    username: "",
    password: "",
    confirmPassword: "",
    email: "",
    phone: "",
  });
  // Snackbar
  const { showSnackbar } = useSnackbar();
  // Function
  const handleChangValueRegister = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setValueRegister((prev) => ({ ...prev, [name]: value }));
  };
  const handleRegister = async () => {
    if (valueRegister.password !== valueRegister.confirmPassword) {
      showSnackbar("Mật khẩu không thống nhất", "error");
      return;
    }
    const registerData = await register(valueRegister);
    console.log({ registerData });

    if (registerData.success) {
      showSnackbar("Đăng Ký thành công", "success");
      props.setOpen(false);
    }
  };
  return (
    <Box ref={ref} sx={style}>
      <Box sx={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}>
        <div className="w-16"></div>
        <Typography
          className="text-3xl text-center font-bold"
          id="modal-modal-title"
          variant="h6"
          component="h2"
        >
          ĐĂNG KÝ
        </Typography>
        <Button
          className="text-sm w-16"
          title="X"
          variant="outlined"
          color="error"
          size="small"
          onClick={() => props.setOpen(false)}
        />
      </Box>
      <Box id="modal-modal-description" sx={{ mt: 2 }}>
        <TextFieldInput label="Họ tên" name="fullName" onChange={handleChangValueRegister} />
        <TextFieldInput label="Email" name="email" onChange={handleChangValueRegister} />
        <TextFieldInput label="Tài khoản" name="username" onChange={handleChangValueRegister} />
        <TextFieldInput label="Mật khẩu" name="password" onChange={handleChangValueRegister} />
        <TextFieldInput
          label="Nhập lại mật khẩu"
          name="confirmPassword"
          onChange={handleChangValueRegister}
        />
        <TextFieldInput label="Số điện thoại" name="phone" onChange={handleChangValueRegister} />

        <Box sx={{ textAlign: "center", mt: 2 }}>
          <Button
            onClick={handleRegister}
            className="text-lg"
            title="Đăng Ký"
            variant="outlined"
            color="primary"
          />
        </Box>

        <Typography sx={{ mt: 2, textAlign: "center" }}>
          Đã có tài khoản?
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
