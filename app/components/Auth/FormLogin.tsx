"use client";
import React, { forwardRef, useContext, useState } from "react";
import { Box, Typography } from "@mui/material";
import TextFieldInput from "../TextFieldInput";
import Button from "../Button";
import { Account } from "@/app/types/User";
import { AuthContext } from "@/app/contexts/AuthContextProvider/AuthContextProvider";
import useSnackbar from "../Hooks/useSnackbar";

const style = {
  position: "absolute",
  color: "white",
  top: "50%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  width: 600,
  bgcolor: "rgba(0, 0, 0, 0.9)",
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
  //Context
  const { login } = useContext(AuthContext);

  // State
  const [valueAccount, setValueAccount] = useState<Account>({ username: "", password: "" });
  const { username, password } = valueAccount;

  // Snackbar
  const { showSnackbar } = useSnackbar();

  // Function
  const handleChangValueAccount = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setValueAccount((prev) => ({ ...prev, [name]: value }));
  };

  const handleLogin = async () => {
    const loginData = await login(valueAccount);

    if (loginData.success) {
      showSnackbar("Đăng nhập thành công", "success");
      props.setOpen(false);
    }
  };

  return (
    <Box tabIndex={-1} ref={ref} sx={style}>
      <Box sx={{ display: "flex", alignItems: "center" }}>
        <div className="w-16"></div>

        <Typography
          className="text-3xl font-bold"
          id="modal-modal-title"
          variant="h6"
          component="h2"
          sx={{ flexGrow: 1, textAlign: "center" }}
        >
          ĐĂNG NHẬP
        </Typography>

        <Button
          className="w-16"
          title="X"
          variant="outlined"
          color="error"
          size="small"
          onClick={() => props.setOpen(false)}
        />
      </Box>

      <Box id="modal-modal-description" sx={{ mt: 2 }}>
        <TextFieldInput
          label="Tài khoản"
          name="username"
          value={username}
          onChange={handleChangValueAccount}
        />
        <TextFieldInput
          label="Mật khẩu"
          name="password"
          value={password}
          onChange={handleChangValueAccount}
        />

        <Box sx={{ textAlign: "center", mt: 2 }}>
          <Button
            onClick={handleLogin}
            className="text-lg"
            title="Đăng Nhập"
            variant="outlined"
            color="primary"
          />
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
