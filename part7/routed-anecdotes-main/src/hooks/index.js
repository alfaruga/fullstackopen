import { useState } from "react";

export const useField = (type, name) => {
  const [value, setValue] = useState("");

  const reset = () => setValue("");
  let shouldReset = false;

  let tagContent = shouldReset? "": value
  const onChange = (event) => {
    setValue(event.target.value);
  };

  return { type, name, value, onChange, reset };
};
