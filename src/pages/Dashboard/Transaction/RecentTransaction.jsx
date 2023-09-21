import "./RecentTransaction.css";
import trans from "../../../assets/DashboardImg/trans.png";
import depImg from "../../../assets/DashboardImg/ArrowDown.png"
import Table from "react-bootstrap/Table";

function RecentTransaction({transactions,currency}) {
  let tab = document.getElementById("Transaction");
  return (
    <>
      <div id="Transaction" className="RecentTransaction">
        <p className="p1">Recent Transactions</p>
        <Table>
          <thead>
            <tr className="heading">
              <th scope="col">Transaction</th>
              <th scope="col">Amount</th>
              <th scope="col">Date</th>
              <th scope="col">Status</th>
            </tr>
          </thead>
          <tbody>
            {transactions.map((transaction,index)=>{
            return(<tr key={index} >
              <td className="dd td">
                {transaction.transaction==="deposite"?<img id="im" src={depImg} alt="tran" />:<img id="im" src={trans} alt="tran" />}
                {transaction.transaction==="deposite"?"deposit":transaction.transaction}
              </td>
              <td>{transaction.amount} {currency}</td>
              <td>{(new Date(transaction.date)).toLocaleDateString()}</td>
              <td className={transaction.status}>{transaction.status}</td>
            </tr>)
             })}
            
          </tbody>
        </Table>
      </div>
    </>
  );
}

export default RecentTransaction;
