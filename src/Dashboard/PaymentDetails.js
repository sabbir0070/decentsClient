import Swal from "sweetalert2";

const PaymentDetails = ({ payments, index,refetch}) => {
  const { bitcoinAddress,address, price, email, practice, status, date, _id } = payments;
  // pending user approve function
  const handleStatus = ( payments,status) => {

    fetch(
      `http://localhost:5000/payments-history/${payments._id}/?status=${status}`,
      {
        method: "PATCH",
      }
    )
      .then((res) => res.json())
      .then((data) => {
        console.log(data);
        if (data.modifiedCount > 0) {
     refetch()
          Swal.fire({
            position: "top-end",
            icon: "success",
            title: "Status Update Successfully",
            showConfirmButton: "false",
            timer: 1500,
          });
        }
      });
  };


  return (
    <>
      <tr>
        <th className="border px-4 py-2"> {index + 1}</th>
        <td className="border px-4 py-2">{email}</td>
        <td className="border px-4 py-2">{practice}</td>
        <td className="border px-4 py-2">{bitcoinAddress || 'Stipe Pay'}</td>
        <td className="border px-4 py-2">${price}</td>
        {/* <td className="border px-4 py-2">{status || 'anonymous'}</td> */}
        <td  className="border px-4 py-2">
          {" "}
          <button className="btn bnt-primary btn-sm">{status}</button>{" "}
        </td>
        {
          <>
            {" "}
            <td  className="border px-4 py-2">
              <button
                // disabled={status === "deny" || status === "approved"}
                onClick={() => handleStatus(payments, "approved")}
                className="btn btn-primary btn-sm hover:bg-orange-600"
              >
                Approve
              </button>
            </td>
            <td  className="border px-4 py-2">
              <button
                // disabled={status === "deny" || status === "approved"}
                onClick={() => handleStatus(payments, "deny")}
                className="btn btn-primary btn-sm hover:bg-orange-500"
              >
                Deny
              </button>
            </td>{" "}
          </>
        }
        <td className="border px-4 py-2">{new Date(date).toLocaleString()}</td>
      </tr>

    </>
  );
};

export default PaymentDetails;