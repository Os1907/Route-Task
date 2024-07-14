import { useEffect, useState } from "react";

function useFetch(value) {
  const [data, setData] = useState([]);

  const dataTransactions = async () => {
    //  you Can use local host by using this link =>  " http://localhost:4000/${value} " and run in terminal "json-server --watch db.json --port 4000"
    const fetch1 = await  fetch(`https://os1907.github.io/JSON/db.json`)
    const finalFetch = await fetch1.json();
    setData(finalFetch);
  }
  useEffect(() => {
    dataTransactions();
  }, []);

  return data;
}

export default useFetch;
