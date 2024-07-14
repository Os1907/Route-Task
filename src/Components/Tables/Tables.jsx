/* eslint-disable react/prop-types */

export default function Tables(props) {
  let { people, transactions } = props;
  return (
    <>


      <div className="overflow-x-auto mx-4 lg:mx-20 mBlur bg-sl ate-300 rounded-3xl  min-h-screen">
        <table className="table table-sm lg:table-lg  font-semibold text-xl ">
          <thead className="mBlur bg-[#bd4ae0]">
            <tr className="font-semibold text-xs md:text-sm lg:text-lg text-slate-200   text-center  ">
              <th>ID</th>
              <th>Name</th>
              <th>Date</th>
              <th>Amount</th>
              <th>ID Transaction</th>
            </tr>
          </thead>
          <tbody className="text-center  text-slate-200  ">
            {
              // eslint-disable-next-line react/prop-types
              transactions?.map((transaction) => {
                // eslint-disable-next-line react/prop-types
                const person = people?.find(
                  (name) => name?.id == transaction.customer_id
                );
                if (person?.id == transaction.customer_id) {
                  return (
                    <tr key={transaction.id}>
                      <td >{person?.id}</td>
                      <td>{person?.name}</td>
                      <td>{transaction.date}</td>
                      <td>{transaction.amount}</td>
                      <td>{transaction.id}</td>
                    </tr>
                  );
                }
              })
            }
          </tbody>
        </table>
      </div>
    </>
  );
}
