import { memo } from "react"

  const Title = memo( function  Title() {
  return (
    <>
    <div className="text-slate-200 py-3">
      <h1 className="text-3xl lg:text-6xl font-bold text-center">Transaction Data</h1>
    </div>
    <p className="text-[#bd4ae0]  text-xs lg:text-lg text-center my-1 ">
          a table that displays the list of customers along with their
          transaction data.
        </p>
    
    </>
  )
} )
export default Title