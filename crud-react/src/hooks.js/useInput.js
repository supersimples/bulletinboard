import { useState } from "react";

function useInput() {
  const [input, setInput] = useState();

  const onChange = (event) => {
    const inputData = event.target.value;

    setInput(inputData);
  };

  return [input, setInput, onChange];
}

export default useInput;