import { useEffect, useState } from "react";

export function useDebounce(value, delay) {
  const [debounce, setDebounce] = useState(value);

  useEffect(()=> {
    const timer = setTimeout(() => {
      setDebounce(value)
    }, delay || 500);
  }, [value, delay])

  return debounce
}