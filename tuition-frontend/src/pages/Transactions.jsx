import { useEffect, useState } from "react";
import axios from "axios";
import jsPDF from "jspdf";

const Transactions = () => {
  const [transactions, setTransactions] = useState([]);

  useEffect(() => {
    axios.get("https://center-dashboard.onrender.com/api/students/transactions")
      .then(response => setTransactions(response.data))
      .catch(error => console.error("Error fetching transactions:", error));
  }, []);

  const downloadInvoice = (transaction) => {
    const doc = new jsPDF();

    // Header - Tuition Centre Name
    doc.setFontSize(16);
    doc.text("Tuition Centre Invoice", 105, 15, { align: "center" });

    // Student Details
    doc.setFontSize(12);
    doc.text(`Student Name: ${transaction.name}`, 15, 30);
    doc.text(`Phone: ${transaction.phone}`, 15, 40);
    doc.text(`Month: ${transaction.month}`, 15, 50);

    // Payment Details
    doc.text(`Amount Paid: ₹${transaction.amount}`, 15, 60);
    doc.text(`Payment Mode: ${transaction.paymentMode}`, 15, 70);
    doc.text(`Date: ${new Date(transaction.date).toLocaleDateString()}`, 15, 80);

    // Footer - Thank You Message & Signature
    doc.text("Thank you for your payment!", 15, 100);
    doc.text("Authorized Sign: __________________", 140, 120);

    // Save PDF
    doc.save(`Invoice_${transaction.name}_${transaction.month}.pdf`);
  };
 
  return (
    <div className=" bg-gradient-to-br from-gray-900 to-purple-900 h-screen w-full p-30">
<div className="max-w-4xl mx-auto p-6 rounded-xl bg-gradient-to-br from-gray-900 to-purple-900 bg-opacity-80 backdrop-blur-lg border border-purple-500/30 shadow-2xl">
      <h2 className="text-2xl font-bold mb-6 text-violet-100 tracking-wide">Transaction Records</h2>
      <div className="overflow-x-auto rounded-lg bg-purple-800/20 backdrop-blur-md border border-purple-500/20 shadow-lg">
        <table className="min-w-full rounded-lg overflow-hidden">
          <thead>
            <tr className="bg-violet-800/50 text-violet-100">
              <th className="p-3 font-medium">Name</th>
              <th className="p-3 font-medium">Phone</th>
              <th className="p-3 font-medium">Month</th>
              <th className="p-3 font-medium">Payment Mode</th>
              <th className="p-3 font-medium">Amount (₹)</th>
              <th className="p-3 font-medium">Invoice</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-purple-700/30">
            {transactions.length > 0 ? (
              transactions.map((transaction, index) => (
                <tr 
                  key={index} 
                  className="text-center text-violet-100 hover:bg-purple-700/30 transition-all duration-200"
                >
                  <td className="p-3">{transaction.name}</td>
                  <td className="p-3">{transaction.phone}</td>
                  <td className="p-3">{transaction.month}</td>
                  <td className="p-3">{transaction.paymentMode}</td>
                  <td className="p-3 font-medium">₹{transaction.amount}</td>
                  <td className="p-3">
                    <button
                      className="bg-violet-600 hover:bg-violet-500 text-white px-4 py-2 rounded-lg transition-colors duration-200 shadow-md border border-violet-500/50 flex items-center justify-center mx-auto"
                      onClick={() => downloadInvoice(transaction)}
                    >
                      <svg 
                        className="w-4 h-4 mr-2" 
                        fill="none" 
                        stroke="currentColor" 
                        viewBox="0 0 24 24" 
                        xmlns="http://www.w3.org/2000/svg"
                      >
                        <path 
                          strokeLinecap="round" 
                          strokeLinejoin="round" 
                          strokeWidth="2" 
                          d="M12 10v6m0 0l-3-3m3 3l3-3m2 8H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z"
                        ></path>
                      </svg>
                      PDF
                    </button>
                  </td>
                </tr>
              ))
            ) : (
              <tr>
                <td colSpan="6" className="p-6 text-center text-violet-300">
                  No transactions available
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </div>
    </div>
  );
};

export default Transactions;