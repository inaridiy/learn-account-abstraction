import { useEffect, useState } from "react";

export const useMiniForm = <T = Record<string, string>>(initialState?: Partial<T>) => {
  const [form, setForm] = useState<Partial<T>>(initialState || {});

  //良くない黒魔術気味、後からデバッグがしにくい
  useEffect(() => {
    if (initialState) {
      setForm(initialState);
    }
  }, [initialState]);

  const updateForm = (key: keyof T, value: any) => {
    setForm((prev) => ({
      ...prev,
      [key]: value,
    }));
  };

  const register = (key: keyof T) => (e: { target: { value: any } }) => {
    updateForm(key, e.target.value);
  };

  return { form, register, updateForm };
};
