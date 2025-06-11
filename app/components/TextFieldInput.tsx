import { TextField } from "@mui/material";

interface TextFieldProps {
  label: string;
  name: string;
  value?: string | number;
  onChange?: (e: React.ChangeEvent<HTMLInputElement>) => void;
  helperText?: string;
  size?: "small" | "medium";
  type?: string;
}
function TextFieldInput({ label, name, value, helperText, size, type, onChange }: TextFieldProps) {
  return (
    <TextField
      className="w-full"
      id="outlined-basic"
      label={label}
      name={name}
      value={value}
      onChange={onChange}
      variant="outlined"
      sx={textFieldStyles}
      helperText={helperText}
      size={size}
      type={type}
    />
  );
}

export default TextFieldInput;

const textFieldStyles = {
  position: "relative",
  color: "white",
  borderRadius: "10px",
  textAlign: "center",
  fontWeight: "bold",
  textTransform: "uppercase",
  transition: "all 0.3s ease-in-out",
  margin: "8px 0px",
  "& .MuiOutlinedInput-root": {
    border: "2px solid #00eaff",
    borderRadius: "10px",
    boxShadow: "0 0 3px #00eaff, 0 0 3px #7d2aff",
    transition: "all 0.3s ease-in-out",
    "&:hover": {
      borderColor: "#7d2aff",
      boxShadow: "0 0 6px #00eaff, 0 0 6px #7d2aff",
    },
    "&.Mui-focused": {
      borderColor: "#ffffff",
      boxShadow: "0 0 10px #00eaff, 0 0 10px #7d2aff, 0 0 12px #ffffff",
      transform: "scale(1.02)",
    },
  },
  "& .MuiOutlinedInput-notchedOutline": {
    border: "none",
  },
  "& .MuiInputBase-input": {
    color: "white",
  },

  // **Label mặc định (không có border)**
  "& .MuiInputLabel-root": {
    color: "#fff",
    padding: "4px 10px",
    borderRadius: "8px",
    border: "none",
    position: "absolute",
    fontSize: "0.85rem",
    fontWeight: "bold",
    transition: "all 0.3s ease-in-out",
  },

  // **Khi label focus hoặc có giá trị (hiện viền)**
  "& .MuiInputLabel-root.Mui-focused, & .MuiInputLabel-root.MuiFormLabel-filled": {
    border: "2px solid #00eaff",
    boxShadow: "0 0 6px #00eaff, 0 0 6px #7d2aff",
    backgroundColor: "#121212",
  },
  "& .MuiFormHelperText-root": {
    color: "red",
    fontSize: "0.85rem",
    fontWeight: "bold",
  },
};
