import React, { useState } from 'react';
import PlanCard from '../components/subscribe/PlanCard';

const SubscribePage = () => {
  const [selectedPlanIndex, setSelectedPlanIndex] = useState(null);

  const plans = [
    {
      title: "Monthly Plan",
      price: "0",
      period: "month",
      description: "For building your first simple dream site.",
      features: [
        "Unlimited pages",
        "Typedream.app domain",
        "Typedream badge",
        "5 CMS items",
        "5 form submissions",
        "Sell digital products: 5% transaction fee"
      ]
    },
    {
      title: "Three-Month Plan",
      price: "12",
      period: "month",
      description: "For product launches, landing pages, and more",
      features: [
        "Everything in the free plan",
        "Custom domain",
        "Remove Typedream badge",
        "Sell digital products: 2% transaction fee",
        "SEO & metadata",
        "Code injection",
        "Analytics",
        "Free 1-Year .xyz domain"
      ]
    },
    {
      title: "Annual Plan",
      price: "20",
      period: "Year",
      description: "For products, directories, and commercial websites",
      features: [
        "Everything in the launch plan",
        "Protected pages",
        "5000 CMS items",
        "5000 form submissions",
        "Priority support on Discord"
      ]
    }
  ];

  const handlePlanClick = (index) => {
    setSelectedPlanIndex(index);
  };

  const handleSubscribe = (planTitle) => {
    // Handle subscription logic here
    console.log(`Subscribing to ${planTitle}`);
  };

  return (
    <div className="min-h-screen bg-gray-50 py-20 px-4">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div className="text-center mb-16">
          <h1 className="text-4xl font-bold text-gray-900 mb-4">
            Find the right pricing plan for you
          </h1>
          <p className="text-lg text-gray-600 max-w-2xl mx-auto">
            Watch most courses with a monthly or yearly subscription. Continue developing yourself effectively with our expert trainers in various fields.
          </p>
        </div>

        {/* Plans Grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-5xl mx-auto">
          {plans.map((plan, index) => (
            <PlanCard
              key={index}
              {...plan}
              isActive={selectedPlanIndex === index}
              onCardClick={() => handlePlanClick(index)}
              onSubscribe={() => handleSubscribe(plan.title)}
            />
          ))}
        </div>
      </div>
    </div>
  );
};

export default SubscribePage;
