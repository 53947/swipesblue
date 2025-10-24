import { storage } from "./storage";

async function seed() {
  console.log("Seeding database...");

  const existingGateway = await storage.getDefaultPaymentGateway();
  if (!existingGateway) {
    const nmiGateway = await storage.createPaymentGateway({
      name: "NMI Payment Gateway",
      type: "nmi",
      isActive: true,
      isDefault: true,
      config: {
        apiKey: process.env.NMI_API_KEY || "your-nmi-api-key-here",
        apiUrl: "https://secure.networkmerchants.com/api/transact.php",
      },
    });
    console.log("Created NMI payment gateway:", nmiGateway.id);
  } else {
    console.log("Payment gateway already exists");
  }

  const existingProducts = await storage.getAllProducts();
  if (existingProducts.length === 0) {
    const products = [
      {
        name: "Premium Payment Gateway Integration",
        description: "Full-featured payment gateway integration with NMI support, transaction management, and analytics dashboard",
        price: "299.99",
        category: "Integration",
        stock: 100,
        isActive: true,
      },
      {
        name: "Custom Branding Package",
        description: "Customize your payment pages with your brand identity - logos, colors, and custom domains",
        price: "149.99",
        category: "Branding",
        stock: 100,
        isActive: true,
      },
      {
        name: "Advanced Analytics Dashboard",
        description: "Comprehensive analytics and reporting tools for tracking payments, revenue, and customer insights",
        price: "199.99",
        category: "Analytics",
        stock: 100,
        isActive: true,
      },
      {
        name: "Shopping Cart Pro",
        description: "Full-featured e-commerce shopping cart with product catalog, inventory management, and order tracking",
        price: "349.99",
        category: "E-commerce",
        stock: 50,
        isActive: true,
      },
      {
        name: "Checkout Optimizer",
        description: "Multi-step checkout flow with shipping calculation, tax management, and order confirmation",
        price: "249.99",
        category: "E-commerce",
        stock: 75,
        isActive: true,
      },
      {
        name: "Transaction Security Suite",
        description: "PCI-DSS compliant security features, fraud detection, and encrypted payment processing",
        price: "399.99",
        category: "Security",
        stock: 60,
        isActive: true,
      },
      {
        name: "Multi-Gateway Support",
        description: "Support for multiple payment gateways - switch between providers or use multiple simultaneously",
        price: "449.99",
        category: "Integration",
        stock: 40,
        isActive: true,
      },
      {
        name: "Customer Portal Access",
        description: "Self-service customer portal for viewing orders, downloading invoices, and managing subscriptions",
        price: "179.99",
        category: "Customer Service",
        stock: 90,
        isActive: true,
      },
    ];

    for (const product of products) {
      const created = await storage.createProduct(product);
      console.log("Created product:", created.name);
    }
  } else {
    console.log("Products already seeded");
  }

  console.log("Database seeded successfully!");
}

seed().catch(console.error);
