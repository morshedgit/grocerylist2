import { useEffect, useState } from "react";

export const useStore = <T>(loader: () => Promise<T>) => {
  const [data, setData] = useState<T>();

  useEffect(() => {
    const init = async () => {
      const d = await loader();
      setData(d);
    };
    init();
  }, []);

  return {
    data,
    setData,
  };
};
