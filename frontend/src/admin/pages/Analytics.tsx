import React from 'react';

const Analytics : React.FC = () => {
  return (
    <div className="bg-white rounded-lg shadow p-6">
      <h1 className="text-2xl font-semibold mb-4">Analytics</h1>
      <div className="space-y-4">
        <div className="bg-gray-50 p-4 rounded-lg">
          <h2 className="text-lg font-medium mb-2">Weekly Overview</h2>
          <div className="h-64 flex items-center justify-center bg-gray-100 rounded">
            Chart Placeholder
          </div>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div className="bg-gray-50 p-4 rounded-lg">
            <h2 className="text-lg font-medium mb-2">Top Products</h2>
            <div className="space-y-2">
              {['Product A', 'Product B', 'Product C'].map((product) => (
                <div key={product} className="flex justify-between items-center">
                  <span>{product}</span>
                  <span className="text-gray-600">
                    {Math.floor(Math.random() * 1000)} sales
                  </span>
                </div>
              ))}
            </div>
          </div>
          <div className="bg-gray-50 p-4 rounded-lg">
            <h2 className="text-lg font-medium mb-2">Revenue Sources</h2>
            <div className="space-y-2">
              {['Direct', 'Affiliate', 'Social'].map((source) => (
                <div key={source} className="flex justify-between items-center">
                  <span>{source}</span>
                  <span className="text-gray-600">
                    ${Math.floor(Math.random() * 10000)}
                  </span>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Analytics;