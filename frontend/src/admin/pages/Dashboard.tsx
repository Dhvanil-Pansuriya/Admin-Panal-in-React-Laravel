import React from 'react';

const Dashboard : React.FC = () => {
  return (
    <div className="bg-white rounded-lg shadow p-6">
      <h1 className="text-2xl font-semibold mb-4">Dashboard</h1>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        <div className="bg-blue-50 p-4 rounded-lg">
          <h2 className="text-lg font-medium mb-2">Total Users</h2>
          <p className="text-3xl font-bold">1,234</p>
        </div>
        <div className="bg-green-50 p-4 rounded-lg">
          <h2 className="text-lg font-medium mb-2">Revenue</h2>
          <p className="text-3xl font-bold">$12,345</p>
        </div>
        <div className="bg-purple-50 p-4 rounded-lg">
          <h2 className="text-lg font-medium mb-2">Active Projects</h2>
          <p className="text-3xl font-bold">42</p>
        </div>
      </div>
    </div>
  );
}

export default Dashboard;