import "./RecentSales.css";
import trans from "../../../assets/DashboardImg/trans.png";
import boughtImg from "../../../assets/DashboardImg/ArrowDown.png"
import Table from "react-bootstrap/Table";

function RecentSales({ user, sales }) {
  return (
    <>
      <div className="RecentSales">
        <p className="p1">Recent Sales</p>
        <Table responsive>
          <thead>
            <tr className="heading">
              <th scope="col">Transaction</th>
              <th scope="col">NFT name</th>
              <th scope="col">From</th>
              <th scope="col">To</th>
              <th scope="col">Amount</th>
              <th scope="col">Status</th>
            </tr>
          </thead>
          <tbody>
            {sales.map((sale, index) => {
              return (
                <tr key={index}>
                  <td className="dd">
                    {sale.From.username !== user ?<img src={boughtImg} alt="tran" />  :<img src={trans} alt="tran" />}
                    {sale.From.username !== user ? "Bought" : "Sold"}
                  </td>
                  <td>{sale.nft.name}</td>
                  <td>{sale.From.username.length>8?(sale.From.username).slice(0,8)+"...":sale.From.username}</td>
                  <td>{sale.to.username.length>8?(sale.to.username).slice(0,8)+"...":sale.to.username}</td>
                  <td>{sale.amount} ETH</td>
                  <td className={sale.status}>{sale.status}</td>
                </tr>
              );
            })}
          </tbody>
        </Table>
      </div>
    </>
  );
}

export default RecentSales;
