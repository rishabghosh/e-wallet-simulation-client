import React, { useState, useEffect } from "react";

const useInput = function(initialValue) {
  const [state, setState] = useState(initialValue);
  const resetState = () => setState(initialValue);
  const handleStateChange = event => setState(event.target.value);
  return [state, handleStateChange, resetState];
};

const useAction = function(initialValue, renderOnChangeOf = []) {
  const [state, setState] = useState(initialValue);
  useEffect(() => setState(initialValue), renderOnChangeOf);
  return [state, setState];
};

export { useInput, useAction };
