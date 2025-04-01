import React, { useState } from 'react';

const SubscriptionsPage = () => {
  // Sample subscription data for UI implementation
  const [subscriptionPlans, setSubscriptionPlans] = useState([
    {
      id: 1,
      name: 'Basic Plan',
      price: 9.99,
      originalPrice: 9.99,
      duration: 'monthly',
      features: [
        'Access to all basic courses',
        'Course completion certificates',
        'Email support'
      ],
      isPopular: false,
      discount: 0,
      isActive: true
    },
    {
      id: 2,
      name: 'Premium Plan',
      price: 19.99,
      originalPrice: 19.99,
      duration: 'monthly',
      features: [
        'Access to all courses including premium',
        'Priority email support',
        'Course completion certificates',
        'Access to community forums',
        'Downloadable resources'
      ],
      isPopular: true,
      discount: 0,
      isActive: true
    },
    {
      id: 3,
      name: 'Annual Plan',
      price: 179.99,
      originalPrice: 199.99,
      duration: 'yearly',
      features: [
        'All Premium features',
        'Two months free compared to monthly',
        'Early access to new courses',
        'Direct instructor communication',
        'Personalized learning path'
      ],
      isPopular: false,
      discount: 10,
      isActive: true
    }
  ]);

  // Sample subscribers
  const [subscribers] = useState([
    {
      id: 1,
      name: 'John Doe',
      email: 'john.doe@example.com',
      plan: 'Premium Plan',
      startDate: '2023-02-15',
      endDate: '2023-03-15',
      status: 'active',
      paymentMethod: 'Credit Card',
      amount: '$19.99'
    },
    {
      id: 2,
      name: 'Jane Smith',
      email: 'jane.smith@example.com',
      plan: 'Annual Plan',
      startDate: '2023-01-10',
      endDate: '2024-01-10',
      status: 'active',
      paymentMethod: 'PayPal',
      amount: '$179.99'
    },
    {
      id: 3,
      name: 'Michael Johnson',
      email: 'michael.j@example.com',
      plan: 'Basic Plan',
      startDate: '2023-02-01',
      endDate: '2023-03-01',
      status: 'expired',
      paymentMethod: 'Credit Card',
      amount: '$9.99'
    },
    {
      id: 4,
      name: 'Sarah Williams',
      email: 'sarah.w@example.com',
      plan: 'Premium Plan',
      startDate: '2023-02-20',
      endDate: '2023-03-20',
      status: 'active',
      paymentMethod: 'PayPal',
      amount: '$19.99'
    }
  ]);

  const [selectedPlan, setSelectedPlan] = useState(null);
  const [isEditModalOpen, setIsEditModalOpen] = useState(false);
  const [editedPlan, setEditedPlan] = useState({
    name: '',
    price: 0,
    originalPrice: 0,
    duration: 'monthly',
    features: [],
    isPopular: false,
    discount: 0,
    isActive: true
  });
  const [newFeature, setNewFeature] = useState('');
  const [activeTab, setActiveTab] = useState('plans');

  const openEditModal = (plan) => {
    setSelectedPlan(plan);
    setEditedPlan({
      ...plan,
      features: [...plan.features]
    });
    setIsEditModalOpen(true);
  };

  const closeEditModal = () => {
    setIsEditModalOpen(false);
    setSelectedPlan(null);
  };

  const handleInputChange = (e) => {
    const { name, value, type, checked } = e.target;
    setEditedPlan({
      ...editedPlan,
      [name]: type === 'checkbox' ? checked : type === 'number' ? parseFloat(value) : value
    });
  };

  const handleAddFeature = () => {
    if (newFeature.trim()) {
      setEditedPlan({
        ...editedPlan,
        features: [...editedPlan.features, newFeature.trim()]
      });
      setNewFeature('');
    }
  };

  const handleRemoveFeature = (index) => {
    const updatedFeatures = [...editedPlan.features];
    updatedFeatures.splice(index, 1);
    setEditedPlan({
      ...editedPlan,
      features: updatedFeatures
    });
  };

  const saveChanges = () => {
    // In a real app, this would make an API call
    const updatedPlans = subscriptionPlans.map(plan => 
      plan.id === editedPlan.id ? editedPlan : plan
    );
    setSubscriptionPlans(updatedPlans);
    closeEditModal();
  };

  const calculateSavings = () => {
    if (editedPlan.discount > 0) {
      return ((editedPlan.originalPrice - editedPlan.price) / editedPlan.originalPrice * 100).toFixed(0);
    }
    return 0;
  };

  return (
    <div>
      <div className="mb-6">
        <h1 className="text-2xl font-bold text-gray-900">Subscription Management</h1>
        <p className="text-gray-600">Manage subscription plans and view subscriber information.</p>
      </div>

      {/* Tabs */}
      <div className="mb-6 border-b border-gray-200">
        <nav className="-mb-px flex">
          <button
            className={`mr-8 py-4 px-1 border-b-2 font-medium text-sm ${
              activeTab === 'plans'
                ? 'border-blue-500 text-blue-600'
                : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'
            }`}
            onClick={() => setActiveTab('plans')}
          >
            Subscription Plans
          </button>
          <button
            className={`py-4 px-1 border-b-2 font-medium text-sm ${
              activeTab === 'subscribers'
                ? 'border-blue-500 text-blue-600'
                : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'
            }`}
            onClick={() => setActiveTab('subscribers')}
          >
            Subscribers
          </button>
        </nav>
      </div>

      {/* Subscription Plans Tab */}
      {activeTab === 'plans' && (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {subscriptionPlans.map((plan) => (
            <div 
              key={plan.id} 
              className={`bg-white rounded-lg shadow-md overflow-hidden border ${
                plan.isPopular ? 'border-blue-500' : 'border-gray-200'
              }`}
            >
              {plan.isPopular && (
                <div className="bg-blue-500 text-white py-1 px-4 text-xs font-medium text-center">
                  Most Popular
                </div>
              )}
              <div className="p-6">
                <div className="flex justify-between items-center mb-4">
                  <h2 className="text-xl font-bold text-gray-900">{plan.name}</h2>
                  <span className={`px-2 py-1 rounded text-xs font-medium ${
                    plan.isActive ? 'bg-green-100 text-green-800' : 'bg-red-100 text-red-800'
                  }`}>
                    {plan.isActive ? 'Active' : 'Inactive'}
                  </span>
                </div>
                <div className="mb-4">
                  <span className="text-3xl font-bold text-gray-900">${plan.price}</span>
                  {plan.originalPrice > plan.price && (
                    <span className="text-sm text-gray-500 line-through ml-2">${plan.originalPrice}</span>
                  )}
                  <span className="text-gray-500 text-sm">/{plan.duration === 'monthly' ? 'mo' : 'yr'}</span>
                  
                  {plan.discount > 0 && (
                    <span className="ml-2 bg-green-100 text-green-800 text-xs px-2 py-1 rounded">
                      Save {((plan.originalPrice - plan.price) / plan.originalPrice * 100).toFixed(0)}%
                    </span>
                  )}
                </div>
                <ul className="mb-6 space-y-2">
                  {plan.features.map((feature, index) => (
                    <li key={index} className="flex items-start">
                      <svg className="h-5 w-5 text-green-500 mr-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                      </svg>
                      <span className="text-gray-600 text-sm">{feature}</span>
                    </li>
                  ))}
                </ul>
                <button
                  onClick={() => openEditModal(plan)}
                  className="w-full bg-blue-600 text-white py-2 rounded-md hover:bg-blue-700 transition-colors"
                >
                  Edit Plan
                </button>
              </div>
            </div>
          ))}
        </div>
      )}

      {/* Subscribers Tab */}
      {activeTab === 'subscribers' && (
        <div className="bg-white shadow-md rounded-lg overflow-hidden">
          <div className="overflow-x-auto">
            <table className="min-w-full divide-y divide-gray-200">
              <thead className="bg-gray-50">
                <tr>
                  <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Name
                  </th>
                  <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Plan
                  </th>
                  <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Start Date
                  </th>
                  <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    End Date
                  </th>
                  <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Amount
                  </th>
                  <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Status
                  </th>
                </tr>
              </thead>
              <tbody className="bg-white divide-y divide-gray-200">
                {subscribers.map((subscriber) => (
                  <tr key={subscriber.id}>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <div className="flex items-center">
                        <div className="text-sm font-medium text-gray-900">{subscriber.name}</div>
                      </div>
                      <div className="text-sm text-gray-500">{subscriber.email}</div>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <div className="text-sm text-gray-900">{subscriber.plan}</div>
                      <div className="text-sm text-gray-500">{subscriber.paymentMethod}</div>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <div className="text-sm text-gray-900">{subscriber.startDate}</div>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <div className="text-sm text-gray-900">{subscriber.endDate}</div>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <div className="text-sm text-gray-900">{subscriber.amount}</div>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <span className={`px-2 inline-flex text-xs leading-5 font-semibold rounded-full ${
                        subscriber.status === 'active' ? 'bg-green-100 text-green-800' : 'bg-red-100 text-red-800'
                      }`}>
                        {subscriber.status.charAt(0).toUpperCase() + subscriber.status.slice(1)}
                      </span>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      )}

      {/* Edit Plan Modal */}
      {isEditModalOpen && selectedPlan && (
        <div className="fixed inset-0 overflow-y-auto z-50 flex items-center justify-center">
          <div className="fixed inset-0 bg-black opacity-50"></div>
          <div className="relative bg-white rounded-lg max-w-2xl w-full mx-4 p-6">
            <div className="flex justify-between items-center mb-4">
              <h2 className="text-xl font-bold">Edit Subscription Plan</h2>
              <button onClick={closeEditModal} className="text-gray-400 hover:text-gray-500">
                <svg className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                </svg>
              </button>
            </div>
            <form>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700">Plan Name</label>
                  <input
                    type="text"
                    name="name"
                    value={editedPlan.name}
                    onChange={handleInputChange}
                    className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm py-2 px-3 focus:outline-none focus:ring-blue-500 focus:border-blue-500"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700">Duration</label>
                  <select
                    name="duration"
                    value={editedPlan.duration}
                    onChange={handleInputChange}
                    className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm py-2 px-3 focus:outline-none focus:ring-blue-500 focus:border-blue-500"
                  >
                    <option value="monthly">Monthly</option>
                    <option value="yearly">Yearly</option>
                  </select>
                </div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700">Original Price ($)</label>
                  <input
                    type="number"
                    step="0.01"
                    name="originalPrice"
                    value={editedPlan.originalPrice}
                    onChange={handleInputChange}
                    className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm py-2 px-3 focus:outline-none focus:ring-blue-500 focus:border-blue-500"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700">Discount (%)</label>
                  <input
                    type="number"
                    min="0"
                    max="100"
                    name="discount"
                    value={editedPlan.discount}
                    onChange={(e) => {
                      const discount = Math.min(100, Math.max(0, parseInt(e.target.value) || 0));
                      const discountedPrice = editedPlan.originalPrice * (1 - discount / 100);
                      setEditedPlan({
                        ...editedPlan,
                        discount,
                        price: parseFloat(discountedPrice.toFixed(2))
                      });
                    }}
                    className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm py-2 px-3 focus:outline-none focus:ring-blue-500 focus:border-blue-500"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700">Final Price ($)</label>
                  <input
                    type="number"
                    step="0.01"
                    name="price"
                    value={editedPlan.price}
                    onChange={handleInputChange}
                    className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm py-2 px-3 focus:outline-none focus:ring-blue-500 focus:border-blue-500"
                  />
                  {calculateSavings() > 0 && (
                    <p className="mt-1 text-sm text-green-600">Save {calculateSavings()}%</p>
                  )}
                </div>
              </div>

              <div className="mb-4">
                <div className="flex justify-between items-center">
                  <label className="block text-sm font-medium text-gray-700">Features</label>
                  <div className="flex items-center">
                    <label className="mr-2 text-sm text-gray-700">Popular Plan</label>
                    <input
                      type="checkbox"
                      name="isPopular"
                      checked={editedPlan.isPopular}
                      onChange={handleInputChange}
                      className="h-4 w-4 text-blue-600 focus:ring-blue-500 border-gray-300 rounded"
                    />
                  </div>
                </div>
                <div className="mt-2 space-y-2">
                  {editedPlan.features.map((feature, index) => (
                    <div key={index} className="flex items-center">
                      <input
                        type="text"
                        value={feature}
                        onChange={(e) => {
                          const updatedFeatures = [...editedPlan.features];
                          updatedFeatures[index] = e.target.value;
                          setEditedPlan({
                            ...editedPlan,
                            features: updatedFeatures
                          });
                        }}
                        className="flex-grow border border-gray-300 rounded-l-md shadow-sm py-2 px-3 focus:outline-none focus:ring-blue-500 focus:border-blue-500"
                      />
                      <button
                        type="button"
                        onClick={() => handleRemoveFeature(index)}
                        className="bg-red-100 text-red-600 p-2 rounded-r-md border border-gray-300 border-l-0"
                      >
                        <svg className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                        </svg>
                      </button>
                    </div>
                  ))}
                </div>
              </div>

              <div className="mb-6">
                <div className="flex">
                  <input
                    type="text"
                    value={newFeature}
                    onChange={(e) => setNewFeature(e.target.value)}
                    placeholder="Add a new feature"
                    className="flex-grow border border-gray-300 rounded-l-md shadow-sm py-2 px-3 focus:outline-none focus:ring-blue-500 focus:border-blue-500"
                  />
                  <button
                    type="button"
                    onClick={handleAddFeature}
                    className="bg-blue-100 text-blue-600 px-4 rounded-r-md border border-gray-300 border-l-0"
                  >
                    Add
                  </button>
                </div>
              </div>

              <div className="flex items-center mb-4">
                <input
                  type="checkbox"
                  name="isActive"
                  checked={editedPlan.isActive}
                  onChange={handleInputChange}
                  className="h-4 w-4 text-blue-600 focus:ring-blue-500 border-gray-300 rounded"
                />
                <label className="ml-2 text-sm text-gray-700">Active Plan</label>
              </div>

              <div className="flex justify-end space-x-3">
                <button
                  type="button"
                  onClick={closeEditModal}
                  className="px-4 py-2 bg-gray-100 text-gray-700 rounded-md hover:bg-gray-200"
                >
                  Cancel
                </button>
                <button
                  type="button"
                  onClick={saveChanges}
                  className="px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700"
                >
                  Save Changes
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};

export default SubscriptionsPage; 