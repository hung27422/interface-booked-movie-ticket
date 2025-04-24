import { IconButton, TextField, Stack } from "@mui/material";
import { Add, Remove } from "@mui/icons-material";
import { useState } from "react";

interface QuantityInputProps {
  value?: number;
  onChange?: (value: number) => void;
  min?: number;
  max?: number;
}

export default function QuantityInput({
  value = 1,
  onChange,
  min = 1,
  max = 99,
}: QuantityInputProps) {
  const [quantity, setQuantity] = useState<number>(value);

  const handleChange = (newValue: number) => {
    if (newValue >= min && newValue <= max) {
      setQuantity(newValue);
      onChange?.(newValue);
    }
  };

  return (
    <Stack
      direction="row"
      alignItems="center"
      spacing={1}
      sx={{ color: "white", fontSize: "12px" }}
    >
      <IconButton
        sx={{ color: "white" }}
        onClick={() => handleChange(quantity - 1)}
        disabled={quantity <= min}
      >
        <Remove />
      </IconButton>
      <TextField
        size="small"
        value={quantity}
        onChange={(e) => handleChange(Number(e.target.value))}
        inputProps={{
          min,
          max,
          style: {
            textAlign: "center",
            width: "20px",
            padding: "6px",
            color: "white", // chữ trắng
            fontSize: "14px",
          },
        }}
        sx={{
          "& .MuiOutlinedInput-root": {
            "& fieldset": {
              borderColor: "white", // border trắng
            },
            "&:hover fieldset": {
              borderColor: "white",
            },
            "&.Mui-focused fieldset": {
              borderColor: "white",
            },
          },
        }}
      />
      <IconButton
        sx={{ color: "white" }}
        onClick={() => handleChange(quantity + 1)}
        disabled={quantity >= max}
      >
        <Add />
      </IconButton>
    </Stack>
  );
}
