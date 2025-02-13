"use client";
import { Button, TextField } from "@mui/material";
import { useState } from "react";

export default function Home() {
  const [count, setCount] = useState(0);
  const handleChang = () => {
    console.log(123);
  };
  return (
    <div className="grid grid-rows-[20px_1fr_20px] items-center justify-items-center min-h-screen p-8 pb-20 gap-16 sm:p-20 font-[family-name:var(--font-geist-sans)]">
      <p>{count}</p>
      <h2>Hello</h2>
      <TextField
        id="outlined-basic"
        label="Outlined"
        variant="outlined"
        onChange={handleChang}
      />
      <Button onClick={() => setCount(count + 1)}>123</Button>
    </div>
  );
}
