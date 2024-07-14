import {  ResponsiveContainer, Tooltip, YAxis,  Area,AreaChart} from 'recharts';
import { curveCardinal } from 'd3-shape';

export default function PieGraph(props) {


  // eslint-disable-next-line react/prop-types
  const { people, transactions } = props;
  // eslint-disable-next-line react/prop-types
  const mergedData = transactions?.map((transaction) => {
  // eslint-disable-next-line react/prop-types
    const person = people?.find((name) => name?.id == transaction.customer_id);
    if (person?.id == transaction.customer_id) {
      return {
        name: person?.name,
        customer_id: person.id,
        total_amount: transaction.amount,
        date: transaction.date,
        transaction: transaction.id,
      };
    }
  });

  const filtered = mergedData.filter((mergedData) => mergedData !== undefined);

  let amounts = (data) => {
    let grouped = {};

    for (let i = 0; i < data.length; i++) {
      let { name, date, total_amount } = data[i];
      let key = `${name}-${date}`;
      if (grouped[key]) {

        grouped[key].total_amount += total_amount;
      } else {
        grouped[key] = { name, date, total_amount };
      }
    }
    return Object.values(grouped);
  };

  
  let finalResult = amounts(filtered).sort((a, b) =>
    a.date > b.date ? 1 : -1
  );

const cardinal = curveCardinal.tension(0.2);
  
  return (
    // <div style={{ width: '100%' }}>
    <div
      style={{ width: "100%", height: 300 }}
      className=" blurr rounded-3xl py-3  pr-5"
    >
   <ResponsiveContainer>
        <AreaChart
          width={500}
          height={400}
          data={finalResult}
          
        >
          <YAxis dataKey="total_amount" stroke='#e2e8f0'/>
          <Tooltip />
          <Area type="step" dataKey="total_amount" stroke="#8884d8" fill="#f333ff" fillOpacity={0.3} />
          <Area type={cardinal} dataKey="date" stroke="#f333ff" fill="#e2e8f0" fillOpacity={0.3} />
          <Area type={cardinal} dataKey="name" stroke="#f333ff" fill="#e2e8f0" fillOpacity={0.3} />
        </AreaChart>
      </ResponsiveContainer>
  </div> 
  );

  
  
}
