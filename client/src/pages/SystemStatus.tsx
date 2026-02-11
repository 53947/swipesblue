import { CheckCircle2 } from "lucide-react";

const services = [
  { name: "Payment Processing", status: "Operational" },
  { name: "API", status: "Operational" },
  { name: "Dashboard", status: "Operational" },
  { name: "Webhooks", status: "Operational" },
];

export default function SystemStatus() {
  return (
    <div className="min-h-screen bg-white">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-16 md:py-24">
        <div className="text-center mb-16">
          <h1 className="text-4xl font-bold text-gray-900 mb-4">System Status</h1>
          <p className="text-lg text-gray-600">
            Current operational status of swipesblue services.
          </p>
        </div>

        {/* Overall status banner */}
        <div className="bg-green-50 border border-green-200 rounded-[7px] p-6 mb-8 flex items-center justify-center gap-3">
          <CheckCircle2 className="h-6 w-6 text-green-600" />
          <span className="text-lg font-semibold text-green-800">All Systems Operational</span>
        </div>

        {/* Service status list */}
        <div className="border border-gray-200 rounded-[7px] overflow-hidden mb-8">
          {services.map((service, index) => (
            <div
              key={service.name}
              className={`flex items-center justify-between px-6 py-4 ${
                index < services.length - 1 ? "border-b border-gray-200" : ""
              }`}
            >
              <span className="text-sm font-medium text-gray-900">{service.name}</span>
              <div className="flex items-center gap-2">
                <span className="h-2.5 w-2.5 rounded-full bg-green-500" />
                <span className="text-sm text-green-700">{service.status}</span>
              </div>
            </div>
          ))}
        </div>

        {/* Uptime stat */}
        <div className="text-center mb-8">
          <div className="text-3xl font-bold text-gray-900">99.99%</div>
          <div className="text-sm text-gray-500 mt-1">uptime over the last 90 days</div>
        </div>

        {/* Note */}
        <p className="text-sm text-gray-500 text-center">
          For real-time incident updates, follow @swipesblue on X.
        </p>
      </div>
    </div>
  );
}
