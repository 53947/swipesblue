import { useState } from "react";
import { Link } from "wouter";
import { FileText, ArrowRight } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useToast } from "@/hooks/use-toast";

export default function Blog() {
  const [email, setEmail] = useState("");
  const { toast } = useToast();

  const handleSubscribe = (e: React.FormEvent) => {
    e.preventDefault();
    toast({
      title: "Thanks!",
      description: "We'll notify you when we launch the blog.",
    });
    setEmail("");
  };

  return (
    <div className="min-h-screen bg-white">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-16 md:py-24">
        <div className="text-center mb-16">
          <h1 className="text-4xl font-bold text-gray-900 mb-4">Blog</h1>
          <p className="text-lg text-gray-600">
            News, updates, and insights from the swipesblue team.
          </p>
        </div>

        {/* Coming soon message */}
        <div className="border border-gray-200 rounded-[7px] p-8 text-center mb-12">
          <div className="w-12 h-12 bg-blue-50 rounded-[7px] flex items-center justify-center mx-auto mb-4">
            <FileText className="h-6 w-6 text-[#1844A6]" />
          </div>
          <h2 className="text-xl font-semibold text-gray-900 mb-3">
            We're preparing our first posts.
          </h2>
          <p className="text-gray-600 mb-6 max-w-lg mx-auto">
            In the meantime, check out our developer documentation for the latest on swipesblue capabilities.
          </p>
          <Link href="/developers">
            <Button className="bg-[#1844A6] text-white rounded-[7px]">
              View Documentation <ArrowRight className="ml-2 h-4 w-4" />
            </Button>
          </Link>
        </div>

        {/* Newsletter signup */}
        <div className="border border-gray-200 rounded-[7px] p-8 text-center">
          <h3 className="text-lg font-semibold text-gray-900 mb-2">
            Get notified when we publish
          </h3>
          <p className="text-sm text-gray-600 mb-6">
            Be the first to read our posts on payments, e-commerce, and building with swipesblue.
          </p>
          <form onSubmit={handleSubscribe} className="flex flex-col sm:flex-row gap-3 max-w-md mx-auto">
            <input
              type="email"
              required
              placeholder="you@example.com"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="flex-1 px-4 py-2 border border-gray-200 rounded-[7px] text-sm focus:outline-none focus:ring-2 focus:ring-[#1844A6]/20 focus:border-[#1844A6]"
            />
            <Button type="submit" className="bg-[#1844A6] text-white rounded-[7px]">
              Subscribe
            </Button>
          </form>
        </div>
      </div>
    </div>
  );
}
