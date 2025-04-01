import React, { useState, useEffect } from 'react';
import PricingCard from './PricingCard';
import { fetchPlans } from '../../services/api';

const PricingPlans = () => {
  const [plans, setPlans] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const getPlans = async () => {
      try {
        setLoading(true);
        const data = await fetchPlans();
        setPlans(data);
        setError(null);
      } catch (err) {
        console.error('Failed to fetch subscription plans:', err);
        setError('Failed to load subscription plans. Please try again later.');
        setPlans([]);
      } finally {
        setLoading(false);
      }
    };

    getPlans();
  }, []);

  // Map backend plan data to frontend format
  const mapPlanData = (plan) => {
    let features = [];
    try {
      features = JSON.parse(plan.offers);
    } catch {
      // If offers is not valid JSON, use it as a single string
      features = plan.offers ? [plan.offers] : [];
    }

    let discount = null;
    // Extract discount percentage from features if it exists
    const discountFeature = features.find(feature => feature.includes('discount'));
    if (discountFeature) {
      const match = discountFeature.match(/(\d+)%/);
      if (match && match[1]) {
        discount = parseInt(match[1]);
      }
    }

    return {
      id: plan._id,
      title: plan.name,
      price: plan.price.toFixed(2),
      period: plan.duration,
      features: features,
      discount: discount
    };
  };

  return (
    <section className="py-16 px-4 md:px-8 max-w-7xl mx-auto">
      <div className="text-center mb-12">
        <h2 className="text-3xl font-bold text-blue-900 mb-4">Choose Your Plan</h2>
        <p className="text-gray-600 max-w-2xl mx-auto">
          Select the perfect learning plan that suits your needs. All plans include unlimited access to our course library.
        </p>
      </div>
      
      {loading ? (
        <div className="flex justify-center items-center h-64">
          <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-blue-500"></div>
        </div>
      ) : error ? (
        <div className="text-center text-red-500 py-8">{error}</div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {plans.map((plan, index) => (
            <PricingCard
              key={plan._id || index}
              {...mapPlanData(plan)}
            />
          ))}
        </div>
      )}
    </section>
  );
};

export default PricingPlans;
