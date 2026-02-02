import { Code, Key, Webhook, Book, ArrowRight, Check, Terminal, Zap, Shield } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Link } from "wouter";

const features = [
  {
    icon: Key,
    title: "API Keys",
    description: "Generate and manage API keys for your integrations. Test in sandbox before going live.",
    link: "/dashboard/api-keys",
    linkText: "Manage Keys",
  },
  {
    icon: Webhook,
    title: "Webhooks",
    description: "Receive real-time notifications for payment events. Easy setup with retry logic built-in.",
    link: "/dashboard/webhooks",
    linkText: "Setup Webhooks",
  },
  {
    icon: Book,
    title: "Documentation",
    description: "Comprehensive API reference with code examples in multiple languages.",
    link: "/dashboard",
    linkText: "Read Docs",
  },
  {
    icon: Terminal,
    title: "SDKs",
    description: "Official SDKs for JavaScript, Python, Ruby, Go, and more. Coming soon.",
    link: "/dashboard",
    linkText: "View SDKs",
  },
];

const apiFeatures = [
  "RESTful JSON API",
  "Idempotent requests",
  "Rate limiting with clear headers",
  "Sandbox testing environment",
  "Webhook event notifications",
  "PCI-compliant infrastructure",
];

export default function Developers() {
  return (
    <div className="min-h-screen bg-white">
      {/* Hero */}
      <section className="bg-gradient-to-br from-swipes-blue-deep to-swipes-teal py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            <div className="text-white">
              <h1 className="text-4xl md:text-5xl font-bold mb-6" data-testid="text-developers-title">
                Build with SwipesBlue
              </h1>
              <p className="text-xl text-gray-200 mb-8">
                Integrate payments in minutes with our developer-friendly API. Clear documentation, predictable responses, and real-time webhooks.
              </p>
              <div className="flex flex-wrap gap-4">
                <Link href="/dashboard/api-keys">
                  <Button 
                    size="lg" 
                    className="group bg-white text-swipes-blue-deep"
                    data-testid="button-get-api-keys"
                  >
                    <span className="flex items-center">
                      Get API Keys
                      <span className="inline-flex w-0 opacity-0 group-hover:w-5 group-hover:opacity-100 transition-all duration-200 overflow-hidden">
                        <ArrowRight className="h-4 w-4 ml-1" />
                      </span>
                    </span>
                  </Button>
                </Link>
                <Link href="/dashboard">
                  <Button 
                    size="lg" 
                    variant="outline" 
                    className="border-white text-white"
                    data-testid="button-view-docs"
                  >
                    View Documentation
                  </Button>
                </Link>
              </div>
            </div>
            
            <div className="hidden lg:block bg-swipes-black rounded-[7px] p-6 overflow-x-auto">
              <pre className="text-sm font-mono">
                <code className="text-gray-300">
{`curl https://api.swipesblue.com/v1/payments \\
  -H "Authorization: Bearer sk_live_..." \\
  -d amount=2000 \\
  -d currency=usd \\
  -d description="Order #1234"

# Response
{
  "id": "pay_abc123",
  "amount": 2000,
  "currency": "usd",
  "status": "succeeded"
}`}
                </code>
              </pre>
            </div>
          </div>
        </div>
      </section>

      {/* API Features */}
      <section className="py-20 bg-gray-50" data-testid="section-api-features">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-swipes-black mb-4">
              Developer-First API Design
            </h2>
            <p className="text-lg text-swipes-pro-gray max-w-2xl mx-auto">
              We built our API the way we'd want to use it ourselves.
            </p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-4 max-w-4xl mx-auto">
            {apiFeatures.map((feature) => (
              <div key={feature} className="flex items-center gap-3 p-4 bg-white rounded-[7px] border border-gray-200">
                <Check className="h-5 w-5 text-swipes-trusted-green flex-shrink-0" />
                <span className="text-swipes-black">{feature}</span>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Developer Tools Grid */}
      <section className="py-20" data-testid="section-dev-tools">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-swipes-black mb-4">
              Everything you need to integrate
            </h2>
          </div>

          <div className="grid md:grid-cols-2 gap-6">
            {features.map((feature) => {
              const Icon = feature.icon;
              return (
                <Card 
                  key={feature.title}
                  className="border border-gray-200 rounded-[7px]"
                  data-testid={`card-dev-${feature.title.toLowerCase().replace(/\s+/g, '-')}`}
                >
                  <CardContent className="p-8">
                    <div className="w-12 h-12 rounded-[7px] bg-swipes-blue-deep/10 flex items-center justify-center mb-6">
                      <Icon className="h-6 w-6 text-swipes-blue-deep" />
                    </div>
                    <h3 className="text-xl font-semibold text-swipes-black mb-3">
                      {feature.title}
                    </h3>
                    <p className="text-swipes-pro-gray mb-6">
                      {feature.description}
                    </p>
                    <Link href={feature.link}>
                      <Button 
                        variant="outline" 
                        className="group border-swipes-teal text-swipes-teal"
                        data-testid={`button-dev-${feature.title.toLowerCase().replace(/\s+/g, '-')}`}
                      >
                        <span className="flex items-center">
                          {feature.linkText}
                          <span className="inline-flex w-0 opacity-0 group-hover:w-5 group-hover:opacity-100 transition-all duration-200 overflow-hidden">
                            <ArrowRight className="h-4 w-4 ml-1" />
                          </span>
                        </span>
                      </Button>
                    </Link>
                  </CardContent>
                </Card>
              );
            })}
          </div>
        </div>
      </section>

      {/* Pricing */}
      <section className="py-20 bg-gray-50" data-testid="section-dev-pricing">
        <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-swipes-black mb-4">
              Simple pricing for developers
            </h2>
          </div>

          <div className="grid md:grid-cols-2 gap-8">
            <Card className="border border-gray-200 rounded-[7px] bg-white">
              <CardContent className="p-8 text-center">
                <h3 className="text-xl font-semibold text-swipes-black mb-4">Payment API</h3>
                <div className="mb-6">
                  <span className="text-4xl font-bold text-swipes-blue-deep">2.70% + $0.30</span>
                  <div className="text-sm text-swipes-pro-gray mt-1">per transaction</div>
                </div>
                <ul className="space-y-3 text-left mb-8">
                  {["Full API access", "Webhooks", "API keys", "Documentation", "Community support"].map((item) => (
                    <li key={item} className="flex items-center gap-2 text-swipes-pro-gray">
                      <Check className="h-4 w-4 text-swipes-trusted-green flex-shrink-0" />
                      <span>{item}</span>
                    </li>
                  ))}
                </ul>
                <Link href="/dashboard/api-keys">
                  <Button 
                    className="w-full group bg-swipes-blue-deep text-white"
                    data-testid="button-pricing-api"
                  >
                    <span className="flex items-center justify-center">
                      Get API Keys
                      <span className="inline-flex w-0 opacity-0 group-hover:w-5 group-hover:opacity-100 transition-all duration-200 overflow-hidden">
                        <ArrowRight className="h-4 w-4 ml-1" />
                      </span>
                    </span>
                  </Button>
                </Link>
              </CardContent>
            </Card>

            <Card className="border border-gray-200 rounded-[7px] bg-white">
              <CardContent className="p-8 text-center">
                <h3 className="text-xl font-semibold text-swipes-black mb-4">API Pro</h3>
                <div className="mb-6">
                  <span className="text-4xl font-bold text-swipes-blue-deep">$99/mo</span>
                  <div className="text-sm text-swipes-pro-gray mt-1">+ 2.70% + $0.30 per transaction</div>
                </div>
                <ul className="space-y-3 text-left mb-8">
                  {["Everything in Payment API", "Higher rate limits", "Priority support", "Technical account manager"].map((item) => (
                    <li key={item} className="flex items-center gap-2 text-swipes-pro-gray">
                      <Check className="h-4 w-4 text-swipes-trusted-green flex-shrink-0" />
                      <span>{item}</span>
                    </li>
                  ))}
                </ul>
                <Link href="/pricing">
                  <Button 
                    variant="outline"
                    className="w-full group border-swipes-teal text-swipes-teal"
                    data-testid="button-pricing-api-pro"
                  >
                    <span className="flex items-center justify-center">
                      Contact Sales
                      <span className="inline-flex w-0 opacity-0 group-hover:w-5 group-hover:opacity-100 transition-all duration-200 overflow-hidden">
                        <ArrowRight className="h-4 w-4 ml-1" />
                      </span>
                    </span>
                  </Button>
                </Link>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="py-20 bg-gradient-to-r from-swipes-blue-deep to-swipes-teal">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-3xl font-bold text-white mb-6">
            Ready to integrate?
          </h2>
          <p className="text-lg text-gray-300 mb-8 max-w-xl mx-auto">
            Get your API keys and start accepting payments in minutes.
          </p>
          <Link href="/dashboard/api-keys">
            <Button 
              size="lg" 
              className="group bg-white text-swipes-blue-deep"
              data-testid="button-cta-get-started"
            >
              <span className="flex items-center">
                Get Started
                <span className="inline-flex w-0 opacity-0 group-hover:w-5 group-hover:opacity-100 transition-all duration-200 overflow-hidden">
                  <ArrowRight className="h-4 w-4 ml-1" />
                </span>
              </span>
            </Button>
          </Link>
        </div>
      </section>
    </div>
  );
}
