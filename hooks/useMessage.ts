"use client";

import { useState } from "react";

export const useMessage = () => {
  const [message, setMessage] = useState<string>("");

  const showMessage = (text: string) => {
    console.log(message);
    setMessage(text);
  };

  const hideMessage = () => {
    setMessage("");
  };

  return { message, showMessage, hideMessage };
};