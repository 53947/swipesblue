import { Mail, Briefcase } from "lucide-react";

export default function Careers() {
  return (
    <div className="min-h-screen bg-white">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-16 md:py-24">
        <div className="text-center mb-16">
          <h1 className="text-4xl font-bold text-gray-900 mb-4">Careers</h1>
          <p className="text-lg text-gray-600">
            Build the future of payments with us.
          </p>
        </div>

        <div className="border border-gray-200 rounded-[7px] p-8 mb-8">
          <p className="text-gray-700 leading-relaxed">
            swipesblue is part of the triadblue ecosystem — a family of platforms built to help businesses grow.
            We're always looking for people who want to build things that matter.
          </p>
        </div>

        {/* No open positions */}
        <div className="border border-gray-200 rounded-[7px] p-8 text-center mb-8">
          <div className="w-12 h-12 bg-blue-50 rounded-[7px] flex items-center justify-center mx-auto mb-4">
            <Briefcase className="h-6 w-6 text-[#1844A6]" />
          </div>
          <h2 className="text-xl font-semibold text-gray-900 mb-3">
            No open positions right now
          </h2>
          <p className="text-gray-600 max-w-lg mx-auto">
            We don't have any roles listed at the moment, but we're always interested in hearing from talented people.
          </p>
        </div>

        {/* Contact */}
        <div className="border border-gray-200 rounded-[7px] p-8 text-center">
          <div className="flex items-center justify-center gap-2 mb-3">
            <Mail className="h-5 w-5 text-[#1844A6]" />
            <span className="text-sm font-semibold text-gray-900">Interested in working with us?</span>
          </div>
          <p className="text-sm text-gray-600">
            Send your resume to{" "}
            <a href="mailto:careers@swipesblue.com" className="text-[#1844A6] font-medium">
              careers@swipesblue.com
            </a>
          </p>
        </div>
      </div>
    </div>
  );
}
