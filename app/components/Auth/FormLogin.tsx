"use client";
import React, { forwardRef, useContext, useState } from "react";
import { Box, Typography } from "@mui/material";
import TextFieldInput from "../TextFieldInput";
import Button from "../Button";
import { Account } from "@/app/types/User";
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

interface FormLoginProps {
  setIsLoginPage: (value: boolean) => void;
  setOpen: (value: boolean) => void;
}

const FormLogin = forwardRef<HTMLDivElement, FormLoginProps>((props, ref) => {
  const { showSnackbar } = useSnackbar();
  const { login } = useContext(AuthContext);

  const [valueAccount, setValueAccount] = useState<Account>({ username: "", password: "" });
  const { username, password } = valueAccount;
  const [helperText, setHelperText] = useState<string>("");

  const handleChangValueAccount = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setValueAccount((prev) => ({ ...prev, [name]: value }));
  };

  const handleLogin = async () => {
    const loginData = await login(valueAccount);

    if (loginData.success) {
      showSnackbar("Đăng nhập thành công", "success");
      props.setOpen(false);
    } else {
      setHelperText("Tài khoản hoặc mật khẩu không đúng");
    }
  };

  return (
    <Box tabIndex={-1} ref={ref} sx={style}>
      <Box sx={{ display: "flex", alignItems: "center" }}>
        <div className="w-10 sm:w-16"></div>

        <Typography
          className="text-2xl sm:text-3xl font-bold"
          id="modal-modal-title"
          variant="h6"
          component="h2"
          sx={{ flexGrow: 1, textAlign: "center" }}
        >
          ĐĂNG NHẬP
        </Typography>

        <Button
          className="w-10 sm:w-16"
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
          helperText={helperText}
        />
        <TextFieldInput
          label="Mật khẩu"
          name="password"
          value={password}
          onChange={handleChangValueAccount}
          helperText={helperText}
        />

        <Box sx={{ textAlign: "center", mt: 2 }}>
          <Button
            onClick={handleLogin}
            className="text-base sm:text-lg"
            title="Đăng Nhập"
            variant="outlined"
            color="primary"
          />
        </Box>

        <Typography sx={{ mt: 2, textAlign: "center", fontSize: { xs: 13, sm: 15 } }}>
          Bạn chưa có tài khoản?{" "}
          <a
            href="#"
            onClick={() => props.setIsLoginPage(false)}
            className="text-blue-500 underline"
          >
            Đăng ký ngay
          </a>
        </Typography>

        <Typography sx={{ mt: 1, textAlign: "center", fontSize: { xs: 13, sm: 15 } }}>
          Quên mật khẩu?{" "}
          <a href="#" className="text-blue-500 underline">
            Quên
          </a>
        </Typography>
      </Box>
    </Box>
  );
});

FormLogin.displayName = "FormLogin";

export default FormLogin;
