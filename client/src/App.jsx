import { useEffect, useState } from "react";
import "./App.css";


const Data = ({ data }) => {
  console.log('dd',data)
  const [orders,setOrders] = useState(data)
  console.log('oo',orders)

  useEffect(()=>{
    setOrders(data)
  },[data])


  const updateStatus = async (id)=>{
    await fetch(`http://localhost:3000/orders/${id}`,{
      method: "POST",
      body: JSON.stringify({status:'Complete'}),
      headers: {"Content-Type":"application/json"}
    })
    .then((res)=>{
      return res.json
    })
    .then(updated=>{
      data = orders?.map((order)=>order.id==id?updated:order)
    })
  }

  return (
    <table className="table-fixed">
      <thead>
        <tr>
          <th>buyerId</th>
          <th>merchantId</th>
          <th>orderDate</th>
          <th>productId</th>
          <th>status</th>
          <th>Update Status</th>
        </tr>
      </thead>
      <tbody>
        {orders?.map((order)=>(
          <tr key={order._id}>
          <td>{order.buyerId}</td>
          <td>{order.merchantId}</td>
          <td>{order.orderDate}</td>
          <td>{order.productId}</td>
          <td>{order.status}</td>
         <button onClick={()=>updateStatus(order._id)} disabled={order.status=='Complete'}>Mark as delivered</button>
          </tr>
        ))}
      </tbody>
    </table>
  );
};

function App() {
  let [data, setData] = useState([]);

  useEffect(() => {
    fetch("http://localhost:3000/orders/")
      .then((res) => {
        return res.json();
      })
      .then((d) => setData(d));
  }, []);

  if (data) console.log(data);

  return (
    <>
      <h1>Nodeship</h1>
      <Data data={data} />
    </>
  );
}

export default App;
