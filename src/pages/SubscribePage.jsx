import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import PlanCard from '../components/subscribe/PlanCard';
import { fetchPlans } from '../services/api';
import { useAuth } from '../contexts/AuthContext';

const SubscribePage = () => {
  const navigate = useNavigate();
  const { isAuthenticated, currentUser } = useAuth();
  const [selectedPlanIndex, setSelectedPlanIndex] = useState(null);
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

    return {
      id: plan._id,
      title: plan.name,
      price: plan.price.toFixed(2),
      period: plan.duration,
      description: plan.description || `For ${plan.name.toLowerCase()} subscribers`,
      features: features
    };
  };

  const handlePlanClick = (index) => {
    setSelectedPlanIndex(index);
  };

  const handleSubscribe = (planId) => {
    // Check if user is authenticated
    if (!isAuthenticated) {
      // Redirect to login with return URL
      navigate('/login', { 
        state: { 
          from: `/subscribe`,
          message: 'Please log in to subscribe to a plan'
        }
      });
      return;
    }

    // Navigate to checkout with plan details
    const selectedPlan = plans.find(plan => plan._id === planId);
    if (selectedPlan) {
      navigate('/checkout', {
        state: {
          plan: mapPlanData(selectedPlan),
          userId: currentUser.id
        }
      });
    }
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
        {loading ? (
          <div className="flex justify-center items-center h-64">
            <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-blue-500"></div>
          </div>
        ) : error ? (
          <div className="text-center text-red-500 py-8">{error}</div>
        ) : plans.length === 0 ? (
          <div className="text-center text-gray-500 py-8">No subscription plans available at the moment.</div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-5xl mx-auto">
            {plans.map((plan, index) => (
              <PlanCard
                key={plan._id || index}
                {...mapPlanData(plan)}
                isActive={selectedPlanIndex === index}
                onCardClick={() => handlePlanClick(index)}
                onSubscribe={() => handleSubscribe(plan._id)}
              />
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default SubscribePage;
