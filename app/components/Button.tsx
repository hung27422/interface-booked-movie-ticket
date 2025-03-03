import { Box } from "@mui/material";
import ButtonMUI from "@mui/material/Button";
import { OverridableStringUnion } from "@mui/types";
interface ButtonProps {
  variant: OverridableStringUnion<"contained" | "text" | "outlined">;
  color: OverridableStringUnion<
    "primary" | "inherit" | "secondary" | "success" | "error" | "info" | "warning"
  >;
  onClick?: () => void;
  title: string;
}
function Button({ title, variant, color, onClick }: ButtonProps) {
  return (
    <Box>
      <ButtonMUI variant={variant} color={color} onClick={onClick}>
        {title}
      </ButtonMUI>
    </Box>
  );
}

export default Button;
