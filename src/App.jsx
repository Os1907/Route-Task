import { useState } from "react";
import Title from "./Components/Title/Title";
import Tables from "./Components/Tables/Tables";
import UseFetch from "./Hook/UseFetch";
import Graph from "./Components/Graph/Graph";
import PieGraph from "./Components/Graph/PieGraph";

function App() {
  let itemCust = UseFetch("customers");
  let itemTrans = UseFetch("transactions");
  // console.log(itemCust , itemTrans)
  const { customers, transactions } = UseFetch();

  if (customers && transactions) {
    itemCust = customers;
    itemTrans = transactions;
  }
  const [filtered, setFiltered] = useState();
  const [filteredTrans, setfilteredTrans] = useState();

  const sorts = (e) => {
    if (e.length === 0) {
      setFiltered(itemCust);
      setfilteredTrans(itemTrans);
    } else if (0 < e == false) {
      const filteredCustomers = itemCust.filter((customer) =>
        customer.name.toLowerCase().includes(e.toLowerCase())
      );
     

      setFiltered(filteredCustomers);
    } else if (0 < e == true) {
      const filteredCustomers = itemTrans.filter((customer) =>
        customer.amount.toString().includes(e)
      );
    
      setfilteredTrans(filteredCustomers);
    } else if (e.length == 0) {
      
      setfilteredTrans(itemCust);
    }
  };

  return (
    <>
      <div className="wallpaper ">
        <Title />

        <div className="mx-4 lg:mx-20 grid grid-cols-1 lg:grid-cols-2 gap-y-3   ">
          <div className="col-span-1 lg:mx-10">
            <Graph
              people={filtered ? filtered : itemCust}
              transactions={filteredTrans ? filteredTrans : itemTrans}
            />
          </div>
          <div className="col-span-1 lg:mx-10">
            <PieGraph
              people={filtered ? filtered : itemCust}
              transactions={filteredTrans ? filteredTrans : itemTrans}
            />
          </div>
        </div>

        <div className=" mx-4 lg:mx-20 my-3">
          <input
            onKeyUp={(e) => sorts(e.target.value)}
            type="text"
            className=" rounded-3xl w-full p-2 pl-5 lg:pl-8 placeholder:text-main placeholder:text-xs placeholder:md:text-sm placeholder:lg:text-base placeholder:font-semibold text-main font-semibold  lg:text-lg"
            placeholder="Search by customer name or amount....."
          />

          <div className="w-full flex gap-x-3">
            <select onChange={(e) => sorts(e.target.value)} className="select w-full  rounded-full  p-2 pl-5 lg:pl-8 my-3 text-xs lg:text-base text-main font-semibold  ">
              <option disabled selected>
                Filter by customer name 
              </option>
              {
                itemCust.map((person) => <option  key={person.id + person.name}>{person.name}</option>)
              }
              <option  value={""} className="font-bold ">
                Reset All 
              </option>
              
            </select>
            <select onChange={(e) => sorts(e.target.value)} className="select w-full  rounded-full  p-2 pl-5 lg:pl-8 my-3 text-xs lg:text-base text-main font-semibold  ">
              <option disabled selected>
              Filter by amount  
              </option>
              {
                itemTrans.sort((a, b) =>
                  a.amount - b.amount 
                ).map((amount) => <option  key={amount.id + amount.id}>{amount.amount}</option>)
              }
              <option  value={""} className="font-bold ">
                Reset All 
              </option>
              
            </select>
          </div>
        </div>

        <div>
          <Tables
            people={filtered ? filtered : itemCust}
            transactions={filteredTrans ? filteredTrans : itemTrans}
          />
        </div>
      </div>
    </>
  );
}

export default App;
