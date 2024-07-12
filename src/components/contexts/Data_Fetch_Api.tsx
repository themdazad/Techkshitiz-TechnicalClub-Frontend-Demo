import { useEffect, useState } from "react";
const baseUrl = process.env.REACT_APP_BACKEND_URL
const Data_Fetch_Api = (url) => {
  const [IsLoader, SetIsLoader] = useState<boolean>(false);
  const [Error, setError] = useState<boolean>(false);
  const [data, setdata] = useState<string[]>([]);
  useEffect(() => {
    (async () => {
      try {
        setError(false);
        SetIsLoader(true);
        const res = await fetch(`${baseUrl + url}`, {
          method: "GET",
          credentials: "include",
        });
        const data = await res.json();
        setdata(data);
        SetIsLoader(false);
      } catch (error) {
        SetIsLoader(false);
        setError(true);
      }
    })();
  }, []);
  return [IsLoader, Error, data];
};
export default Data_Fetch_Api;
