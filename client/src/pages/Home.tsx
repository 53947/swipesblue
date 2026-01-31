import { CreditCard, Code, LayoutDashboard, ShoppingCart, ArrowRight, Check, Shield, Zap, Clock } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Link } from "wouter";

const stats = [
  { value: "$2.4M+", label: "Processed" },
  { value: "99.99%", label: "Uptime" },
  { value: "500+", label: "Businesses" },
  { value: "<2 sec", label: "Avg Response" },
];

const features = [
  {
    icon: CreditCard,
    title: "Payment Processing",
    description: "Accept all major cards online and in-person. Competitive rates with no hidden fees.",
    link: "/demo",
    linkText: "Learn more",
    color: "#E00420",
  },
  {
    icon: Code,
    title: "Developer API",
    description: "RESTful API with clear docs. Integrate in minutes, not days.",
    link: "/admin/api-keys",
    linkText: "View docs",
    color: "#0000FF",
  },
  {
    icon: LayoutDashboard,
    title: "Merchant Dashboard",
    description: "Real-time transaction monitoring. See every payment as it happens.",
    link: "/dashboard",
    linkText: "See dashboard",
    color: "#1844A6",
  },
  {
    icon: ShoppingCart,
    title: "E-commerce Tools",
    description: "Cart, checkout, and subscription management for your online store.",
    link: "/products",
    linkText: "Explore tools",
    color: "#A855F7",
  },
];

const demos = [
  { icon: ShoppingCart, label: "Cart", href: "/shoppingcart" },
  { icon: CreditCard, label: "Checkout", href: "/checkout" },
  { icon: LayoutDashboard, label: "Orders", href: "/orders" },
];

export default function Home() {
  return (
    <div className="min-h-screen bg-white">
      {/* Hero Section with marching colored rods */}
      <section className="relative overflow-hidden bg-white min-h-[600px]">
        {/* Marching Colored Rods - Stadium of colors visual */}
        <div className="absolute right-0 top-0 w-3/5 h-full overflow-hidden pointer-events-none hidden lg:block">
          <svg 
            className="absolute inset-0 w-full h-full"
            viewBox="0 0 600 500" 
            preserveAspectRatio="xMaxYMid slice"
            fill="none"
          >
            <defs>
              {/* Gradient for perspective fade */}
              <linearGradient id="fadeMask" x1="0%" y1="50%" x2="100%" y2="50%">
                <stop offset="0%" stopColor="white" stopOpacity="0" />
                <stop offset="30%" stopColor="white" stopOpacity="0.3" />
                <stop offset="100%" stopColor="white" stopOpacity="1" />
              </linearGradient>
              {/* Rod gradients for 3D effect */}
              <linearGradient id="rodBlue" x1="0%" y1="0%" x2="100%" y2="0%">
                <stop offset="0%" stopColor="#0066FF" />
                <stop offset="50%" stopColor="#0000FF" />
                <stop offset="100%" stopColor="#000099" />
              </linearGradient>
              <linearGradient id="rodTeal" x1="0%" y1="0%" x2="100%" y2="0%">
                <stop offset="0%" stopColor="#0891B2" />
                <stop offset="50%" stopColor="#064A6C" />
                <stop offset="100%" stopColor="#042F44" />
              </linearGradient>
              <linearGradient id="rodPurple" x1="0%" y1="0%" x2="100%" y2="0%">
                <stop offset="0%" stopColor="#C084FC" />
                <stop offset="50%" stopColor="#A855F7" />
                <stop offset="100%" stopColor="#7C3AED" />
              </linearGradient>
              <linearGradient id="rodPink" x1="0%" y1="0%" x2="100%" y2="0%">
                <stop offset="0%" stopColor="#F472B6" />
                <stop offset="50%" stopColor="#EC4899" />
                <stop offset="100%" stopColor="#BE185D" />
              </linearGradient>
              <linearGradient id="rodRed" x1="0%" y1="0%" x2="100%" y2="0%">
                <stop offset="0%" stopColor="#FF4060" />
                <stop offset="50%" stopColor="#E00420" />
                <stop offset="100%" stopColor="#991B1B" />
              </linearGradient>
              <linearGradient id="rodOrange" x1="0%" y1="0%" x2="100%" y2="0%">
                <stop offset="0%" stopColor="#FDBA74" />
                <stop offset="50%" stopColor="#F97316" />
                <stop offset="100%" stopColor="#C2410C" />
              </linearGradient>
              <linearGradient id="rodYellow" x1="0%" y1="0%" x2="100%" y2="0%">
                <stop offset="0%" stopColor="#FDE047" />
                <stop offset="50%" stopColor="#FBBF24" />
                <stop offset="100%" stopColor="#D97706" />
              </linearGradient>
              <linearGradient id="rodDeepBlue" x1="0%" y1="0%" x2="100%" y2="0%">
                <stop offset="0%" stopColor="#3B82F6" />
                <stop offset="50%" stopColor="#1844A6" />
                <stop offset="100%" stopColor="#1E3A5F" />
              </linearGradient>
            </defs>
            
            {/* Generate marching rods in curved formation */}
            {/* Row 1 - Front row (tallest, closest) - Blues and Teals */}
            {[...Array(25)].map((_, i) => {
              const x = 50 + i * 22;
              const curve = Math.sin((i / 24) * Math.PI) * 40;
              const height = 180 + Math.random() * 60;
              const y = 320 - curve;
              const gradient = i % 3 === 0 ? 'rodBlue' : i % 3 === 1 ? 'rodTeal' : 'rodDeepBlue';
              return <rect key={`r1-${i}`} x={x} y={y - height} width="4" height={height} rx="2" fill={`url(#${gradient})`} opacity={0.95} />;
            })}
            
            {/* Row 2 - Purples and Pinks */}
            {[...Array(30)].map((_, i) => {
              const x = 35 + i * 19;
              const curve = Math.sin((i / 29) * Math.PI) * 50;
              const height = 160 + Math.random() * 50;
              const y = 280 - curve;
              const gradient = i % 3 === 0 ? 'rodPurple' : i % 3 === 1 ? 'rodPink' : 'rodPurple';
              return <rect key={`r2-${i}`} x={x} y={y - height} width="3.5" height={height} rx="1.75" fill={`url(#${gradient})`} opacity={0.9} />;
            })}
            
            {/* Row 3 - Reds and Oranges */}
            {[...Array(35)].map((_, i) => {
              const x = 20 + i * 17;
              const curve = Math.sin((i / 34) * Math.PI) * 60;
              const height = 140 + Math.random() * 45;
              const y = 240 - curve;
              const gradient = i % 3 === 0 ? 'rodRed' : i % 3 === 1 ? 'rodOrange' : 'rodPink';
              return <rect key={`r3-${i}`} x={x} y={y - height} width="3" height={height} rx="1.5" fill={`url(#${gradient})`} opacity={0.85} />;
            })}
            
            {/* Row 4 - Yellows and Oranges (back, smaller) */}
            {[...Array(40)].map((_, i) => {
              const x = 10 + i * 15;
              const curve = Math.sin((i / 39) * Math.PI) * 70;
              const height = 120 + Math.random() * 40;
              const y = 200 - curve;
              const gradient = i % 3 === 0 ? 'rodYellow' : i % 3 === 1 ? 'rodOrange' : 'rodYellow';
              return <rect key={`r4-${i}`} x={x} y={y - height} width="2.5" height={height} rx="1.25" fill={`url(#${gradient})`} opacity={0.75} />;
            })}
            
            {/* Row 5 - Far back (tiny, fading) */}
            {[...Array(50)].map((_, i) => {
              const x = 5 + i * 12;
              const curve = Math.sin((i / 49) * Math.PI) * 80;
              const height = 80 + Math.random() * 30;
              const y = 160 - curve;
              const colors = ['rodBlue', 'rodPurple', 'rodTeal', 'rodDeepBlue'];
              const gradient = colors[i % 4];
              return <rect key={`r5-${i}`} x={x} y={y - height} width="2" height={height} rx="1" fill={`url(#${gradient})`} opacity={0.5} />;
            })}
            
            {/* Sparkle/light effects */}
            {[...Array(15)].map((_, i) => {
              const x = 100 + Math.random() * 400;
              const y = 80 + Math.random() * 200;
              return <circle key={`sp-${i}`} cx={x} cy={y} r={1 + Math.random() * 2} fill="white" opacity={0.6 + Math.random() * 0.4} />;
            })}
          </svg>
          
          {/* White gradient fade on left edge */}
          <div 
            className="absolute inset-y-0 left-0 w-1/3"
            style={{
              background: 'linear-gradient(to right, white 0%, rgba(255,255,255,0.8) 40%, transparent 100%)'
            }}
          />
        </div>

        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20 md:py-28 relative">
          <div className="lg:grid lg:grid-cols-2 lg:gap-16 items-center">
            {/* Left side - Content */}
            <div className="space-y-6 text-left">
              <p className="text-sm font-medium text-gray-500 tracking-wide">
                Payments processed on SwipesBlue: <span className="text-swipes-blue font-semibold">$2.4M+</span>
              </p>
              
              <h1 className="text-3xl md:text-4xl lg:text-5xl font-bold tracking-tight text-gray-900 leading-tight">
                Built for businesses to grow
              </h1>
              
              <p className="text-lg md:text-xl font-medium text-swipes-red">
                Less fees. More revenue.
              </p>
              
              <p className="text-base md:text-lg text-gray-600 max-w-lg leading-relaxed">
                Simple payment processing for small businesses and developers. Accept cards, manage transactions, and scale without complexity.
              </p>

              <div className="flex flex-col sm:flex-row items-start gap-4 pt-2">
                <Link href="/shoppingcart">
                  <Button 
                    size="lg" 
                    className="bg-swipes-red hover:bg-swipes-red/90 text-white px-6 py-3 shadow-md transition-all font-medium"
                    style={{ borderRadius: '7px' }}
                    data-testid="button-hero-get-started"
                  >
                    Get Started
                    <ArrowRight className="ml-2 h-4 w-4" />
                  </Button>
                </Link>
                <Link href="/dashboard">
                  <Button 
                    size="lg" 
                    variant="outline" 
                    className="border-gray-300 text-gray-700 hover:bg-gray-50 px-6 py-3 font-medium"
                    style={{ borderRadius: '7px' }}
                    data-testid="button-hero-documentation"
                  >
                    View Documentation
                  </Button>
                </Link>
              </div>
            </div>

            {/* Right side - Mobile rods fallback */}
            <div className="lg:hidden mt-12 h-48 relative overflow-hidden">
              <svg 
                className="w-full h-full"
                viewBox="0 0 400 150" 
                preserveAspectRatio="xMidYMax slice"
                fill="none"
              >
                {[...Array(40)].map((_, i) => {
                  const x = 5 + i * 10;
                  const height = 60 + Math.sin(i * 0.3) * 40 + Math.random() * 20;
                  const colors = ['#0000FF', '#064A6C', '#A855F7', '#EC4899', '#E00420', '#F97316', '#FBBF24', '#1844A6'];
                  const color = colors[i % colors.length];
                  return <rect key={`m-${i}`} x={x} y={150 - height} width="6" height={height} rx="3" fill={color} opacity={0.85} />;
                })}
              </svg>
            </div>
          </div>
        </div>

        {/* Company logos bar */}
        <div className="border-t border-gray-100 bg-white/80 backdrop-blur-sm">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
            <div className="flex flex-wrap items-center justify-center gap-8 md:gap-12 text-gray-400">
              <span className="text-sm font-medium tracking-wide">Trusted by growing businesses</span>
              <div className="flex items-center gap-2">
                <Shield className="h-4 w-4 text-green-600" />
                <span className="text-sm text-gray-600">PCI Compliant</span>
              </div>
              <div className="flex items-center gap-2">
                <Zap className="h-4 w-4 text-amber-500" />
                <span className="text-sm text-gray-600">Real-time</span>
              </div>
              <div className="flex items-center gap-2">
                <Clock className="h-4 w-4 text-indigo-500" />
                <span className="text-sm text-gray-600">24/7 Support</span>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Stats Bar */}
      <section className="bg-swipes-gray-light border-y border-gray-200">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
            {stats.map((stat, index) => (
              <div key={index} className="text-center">
                <div className="text-3xl md:text-4xl font-bold text-swipes-blue-deep">
                  {stat.value}
                </div>
                <div className="text-sm text-swipes-gray mt-1">
                  {stat.label}
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Features Grid */}
      <section className="py-20 md:py-28">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold text-swipes-black">
              Everything you need to accept payments
            </h2>
            <p className="mt-4 text-lg text-swipes-gray max-w-2xl mx-auto">
              Modular tools that work together seamlessly. Start small and scale as you grow.
            </p>
          </div>

          <div className="grid md:grid-cols-2 gap-6">
            {features.map((feature) => {
              const Icon = feature.icon;
              return (
                <Card 
                  key={feature.title}
                  className="border border-gray-200 rounded-card shadow-card-subtle hover:shadow-card-hover transition-all duration-200 hover:-translate-y-0.5"
                >
                  <CardContent className="p-8">
                    <div 
                      className="w-12 h-12 rounded-lg flex items-center justify-center mb-6"
                      style={{ backgroundColor: `${feature.color}15` }}
                    >
                      <Icon className="h-6 w-6" style={{ color: feature.color }} />
                    </div>
                    <h3 className="text-xl font-semibold text-swipes-black mb-3">
                      {feature.title}
                    </h3>
                    <p className="text-swipes-gray mb-6 leading-relaxed">
                      {feature.description}
                    </p>
                    <Link href={feature.link}>
                      <span className="inline-flex items-center text-swipes-blue-pure font-medium hover:underline">
                        {feature.linkText}
                        <ArrowRight className="ml-1 h-4 w-4" />
                      </span>
                    </Link>
                  </CardContent>
                </Card>
              );
            })}
          </div>
        </div>
      </section>

      {/* Pricing Preview */}
      <section className="py-20 md:py-28 bg-swipes-gray-light">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold text-swipes-black">
              Simple, transparent pricing
            </h2>
          </div>

          <div className="grid md:grid-cols-2 gap-8 max-w-4xl mx-auto">
            <Card className="border border-gray-200 rounded-card bg-white">
              <CardContent className="p-8 text-center">
                <div className="text-sm font-semibold text-swipes-gray uppercase tracking-wider mb-4">
                  Transaction
                </div>
                <div className="mb-6">
                  <span className="text-4xl font-bold text-swipes-red">2.9% + 30¢</span>
                  <div className="text-sm text-swipes-gray mt-1">per transaction</div>
                </div>
                <ul className="space-y-3 text-left mb-8">
                  {["No monthly fees", "No setup fees", "No hidden costs"].map((item) => (
                    <li key={item} className="flex items-center gap-2 text-swipes-gray">
                      <Check className="h-4 w-4 text-swipes-blue-pure flex-shrink-0" />
                      <span>{item}</span>
                    </li>
                  ))}
                </ul>
                <Link href="/shoppingcart">
                  <Button className="w-full bg-swipes-red hover:bg-swipes-red/90 text-white">
                    Start processing
                    <ArrowRight className="ml-2 h-4 w-4" />
                  </Button>
                </Link>
              </CardContent>
            </Card>

            <Card className="border border-gray-200 rounded-card bg-white">
              <CardContent className="p-8 text-center">
                <div className="text-sm font-semibold text-swipes-gray uppercase tracking-wider mb-4">
                  E-commerce
                </div>
                <div className="mb-6">
                  <span className="text-sm text-swipes-gray">Starting at</span>
                  <div className="text-4xl font-bold text-swipes-red">$99/month</div>
                </div>
                <ul className="space-y-3 text-left mb-8">
                  {["Shopping cart", "Checkout system", "Subscription billing"].map((item) => (
                    <li key={item} className="flex items-center gap-2 text-swipes-gray">
                      <Check className="h-4 w-4 text-swipes-blue-pure flex-shrink-0" />
                      <span>{item}</span>
                    </li>
                  ))}
                </ul>
                <Link href="/pricing">
                  <Button variant="outline" className="w-full border-swipes-blue-deep text-swipes-blue-deep hover:bg-swipes-blue-deep hover:text-white">
                    View plans
                    <ArrowRight className="ml-2 h-4 w-4" />
                  </Button>
                </Link>
              </CardContent>
            </Card>
          </div>

          <div className="text-center mt-8">
            <Link href="/pricing">
              <span className="text-swipes-blue-pure font-medium hover:underline inline-flex items-center">
                See full pricing details
                <ArrowRight className="ml-1 h-4 w-4" />
              </span>
            </Link>
          </div>
        </div>
      </section>

      {/* Developer Preview */}
      <section className="py-20 md:py-28">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            <div>
              <h2 className="text-3xl md:text-4xl font-bold text-swipes-black mb-6">
                Start accepting payments in minutes
              </h2>
              <p className="text-lg text-swipes-gray mb-8 leading-relaxed">
                Our RESTful API is designed for developers who want to integrate fast without the complexity. 
                Clear documentation, predictable responses, and sandbox testing.
              </p>
              <div className="flex flex-wrap gap-4">
                <Link href="/dashboard">
                  <Button className="bg-swipes-red hover:bg-swipes-red/90 text-white">
                    Read the docs
                    <ArrowRight className="ml-2 h-4 w-4" />
                  </Button>
                </Link>
                <Link href="/admin/api-keys">
                  <Button variant="outline" className="border-swipes-blue-deep text-swipes-blue-deep hover:bg-swipes-blue-deep hover:text-white">
                    Get API keys
                  </Button>
                </Link>
              </div>
            </div>

            <div className="bg-swipes-black rounded-card p-6 overflow-x-auto">
              <pre className="text-sm font-mono">
                <code className="text-gray-300">
{`curl https://api.swipesblue.com/v1/payments \\
  -H "Authorization: Bearer sk_live_..." \\
  -d amount=2000 \\
  -d currency=usd \\
  -d description="Payment for order #1234"`}
                </code>
              </pre>
            </div>
          </div>
        </div>
      </section>

      {/* Demo Section */}
      <section className="py-20 md:py-28 bg-swipes-gray-light">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-bold text-swipes-black">
              See it in action
            </h2>
            <p className="mt-4 text-lg text-swipes-gray">
              Experience SwipesBlue-powered commerce with our live demos.
            </p>
          </div>

          <div className="grid grid-cols-3 gap-4 md:gap-6 max-w-lg mx-auto">
            {demos.map((demo) => {
              const Icon = demo.icon;
              return (
                <Link key={demo.label} href={demo.href}>
                  <Card className="border border-gray-200 rounded-card bg-white hover:shadow-card-hover transition-all duration-200 hover:-translate-y-0.5 cursor-pointer">
                    <CardContent className="p-6 text-center">
                      <Icon className="h-8 w-8 mx-auto mb-3 text-swipes-blue-deep" />
                      <div className="font-medium text-swipes-black mb-2">{demo.label}</div>
                      <span className="text-sm text-swipes-blue-pure inline-flex items-center">
                        Try
                        <ArrowRight className="ml-1 h-3 w-3" />
                      </span>
                    </CardContent>
                  </Card>
                </Link>
              );
            })}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 md:py-28 bg-gradient-to-r from-swipes-blue-deep to-swipes-teal">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-3xl md:text-4xl font-bold text-white mb-6">
            Ready to get started?
          </h2>
          <p className="text-lg text-gray-300 mb-8 max-w-xl mx-auto">
            Create your account in minutes and start accepting payments today.
          </p>
          <Link href="/shoppingcart">
            <Button 
              size="lg" 
              className="bg-swipes-red hover:bg-swipes-red/90 text-white px-10 shadow-lg hover:shadow-cta-glow transition-all"
              data-testid="button-cta-get-started"
            >
              Get Started Free
            </Button>
          </Link>
        </div>
      </section>
    </div>
  );
}
