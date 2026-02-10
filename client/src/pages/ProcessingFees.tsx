export default function ProcessingFees() {
  const fees = [
    { type: "Chargeback fee", amount: "$15.00" },
    { type: "ACH return fee", amount: "$25.00" },
    { type: "Voice authorization", amount: "$0.45" },
    { type: "Retrieval request", amount: "$5.00" },
    { type: "Monthly minimum", amount: "$10.00" },
  ];

  return (
    <div className="min-h-screen bg-white">
      <section className="py-20">
        <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8">
          <h1 className="text-3xl font-bold text-gray-900 mb-2">
            Processing Fees
          </h1>
          <p className="text-gray-500 mb-8">
            Operational fees that may apply in addition to your plan's per-transaction rate.
          </p>
          <div className="bg-white rounded-[7px] border border-gray-200 overflow-hidden">
            {fees.map((fee, idx) => (
              <div
                key={fee.type}
                className={`flex justify-between px-6 py-3 text-sm ${
                  idx % 2 === 1 ? "bg-gray-50" : "bg-white"
                } ${idx > 0 ? "border-t border-gray-100" : ""}`}
              >
                <span className="text-gray-500">{fee.type}</span>
                <span className="text-gray-500 font-medium">{fee.amount}</span>
              </div>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
}
