import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  Tooltip,
  Legend,
  ResponsiveContainer,
  CartesianGrid
} from "recharts";

export default function Graph(props) {
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
        date: transaction.date.slice(8,10),
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

  // let transformData = (data) => {
  //   let groupedByDate = {};

  //   data.forEach(item => {
  //     let date = item.date;
  //     let name = item.name;

  //     if (!groupedByDate[date]) {
  //       groupedByDate[date] = {};
  //     }

  //     if (!groupedByDate[date][name]) {
  //       groupedByDate[date][name] = { name: name,  total_amount: 0 };
  //     }

  //     groupedByDate[date][name]. total_amount += item. total_amount;
  //   });

  //   let result = Object.keys(groupedByDate).map(date => ({
  //     date: date,
  //     items: Object.values(groupedByDate[date])
  //   }));

  //   return result;
  // };
  let finalResult = amounts(filtered).sort((a, b) =>
    a.date > b.date ? 1 : -1
  );


  return (
    <div
      style={{ width: "100%", height: 300 }}
      className="blurr rounded-3xl pt-3  pr-5"
    >
      <ResponsiveContainer>
        <LineChart data={finalResult}>
          <Line
            type="bump"
            dataKey="total_amount"
            stroke="#f333ff"
            strokeWidth={2}
          />
          <Line
            type="monotone"
            dataKey="name"
            stroke="#ff7300"
            strokeWidth={2}
          />
          <XAxis dataKey="date" stroke="#e2e8f0" />
          <YAxis dataKey="total_amount" stroke="#e2e8f0" />
          <Tooltip  />
          <Legend />

          <CartesianGrid />
        </LineChart>
      </ResponsiveContainer>
    </div>
  );
}
