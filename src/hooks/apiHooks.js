import axios from "axios";
import { useEffect, useState } from "react";


export const useApiHooks = (apiUrl, params) => {
  const [data, setData] = useState();
  const [load, setLoad] = useState(false);
  const [err, setErr] = useState();

  const getData = async () => {
    setLoad(true);
    try {
      const response = await axios.get(apiUrl, { params: params });
      setLoad(false);
      setData(response.data);
    } catch (err) {
      setLoad(false);
      setErr(err.message);
    }
  }

  useEffect(() => {
    getData();
  }, []);

  return [data, load, err];


}







