"use client";
import { useState, useEffect } from "react";

type InputCurrencyProps = {
  value: number;
  onChange: (value: number) => void;
  placeholder?: string;
  id?: string;
};

export function InputCurrency({
  value,
  onChange,
  placeholder,
}: InputCurrencyProps) {
  const [displayValue, setDisplayValue] = useState("");

  useEffect(() => {
    // Update display ketika value dari luar berubah
    if (value) {
      setDisplayValue(`Rp ${new Intl.NumberFormat("id-ID").format(value)}`);
    } else {
      setDisplayValue("");
    }
  }, [value]);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const raw = e.target.value.replace(/\D/g, ""); // hanya angka
    const num = Number(raw);
    setDisplayValue(
      raw ? `Rp ${new Intl.NumberFormat("id-ID").format(num)}` : ""
    );
    onChange(num); // kirim angka bersih ke react-hook-form
  };

  return (
    <input
      type="text"
      placeholder={placeholder}
      value={displayValue}
      onChange={handleChange}
      className="w-full border rounded px-2 py-1"
    />
  );
}
