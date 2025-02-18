import React from "react";
import DummyBarGraph from "../../utils/DummyBarGraph";

const ReportsPage: React.FC = () => {

  return (
    <div className="space-y-6">
      <h1 className="text-2xl font-semibold text-gray-900">Reports</h1>
      <div className="bg-white shadow rounded-sm">
        <div className="px-4 py-5 sm:p-6">
          <div className="space-y-8">
            <div>
              <h2 className="text-lg font-medium text-gray-900">Monthly Overview</h2>
              <div className="mt-4 h-96 bg-gray-50 rounded-sm flex items-center justify-center">
                <DummyBarGraph />
              </div>
            </div>
            <div>
              <h2 className="text-lg font-medium text-gray-900">Recent Reports</h2>
              <div className="mt-4">
                <div className="overflow-hidden shadow ring-1 ring-black ring-opacity-5 sm:rounded-sm">
                  <table className="min-w-full divide-y divide-gray-300">
                    <thead className="bg-gray-50">
                      <tr>
                        <th className="py-3.5 pl-4 pr-3 text-left text-sm font-semibold text-gray-900">Report Name</th>
                        <th className="px-3 py-3.5 text-left text-sm font-semibold text-gray-900">Date</th>
                        <th className="px-3 py-3.5 text-left text-sm font-semibold text-gray-900">Status</th>
                      </tr>
                    </thead>
                    <tbody className="divide-y divide-gray-200 bg-white">
                      {[
                        { name: 'Q1 Performance', date: '2024-03-31', status: 'Completed' },
                        { name: 'User Growth', date: '2024-03-15', status: 'In Progress' },
                        { name: 'Revenue Analysis', date: '2024-03-01', status: 'Completed' },

                      ].map((report) => (
                        <tr key={report.name}>
                          <td className="whitespace-nowrap py-4 pl-4 pr-3 text-sm text-gray-900">{report.name}</td>
                          <td className="whitespace-nowrap px-3 py-4 text-sm text-gray-500">{report.date}</td>
                          <td className="whitespace-nowrap px-3 py-4 text-sm">
                            <span className={`inline-flex rounded-sm px-2 text-xs font-semibold leading-5 ${report.status === 'Completed'
                              ? 'bg-green-100 text-green-800'
                              : 'bg-yellow-100 text-yellow-800'
                              }`}>
                              {report.status}
                            </span>
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
      <div className="bg-white shadow rounded-sm">
        <div className="px-4 py-5 sm:p-6">
          <div className="space-y-8">
            <div>
              <h2 className="text-lg font-medium text-gray-900">Yearly Overview</h2>
              <div className="mt-4 h-96 bg-gray-50 rounded-sm flex items-center justify-center">
                <DummyBarGraph />
              </div>
            </div>
            <div>
              <h2 className="text-lg font-medium text-gray-900">Recent Reports</h2>
              <div className="mt-4">
                <div className="overflow-hidden shadow ring-1 ring-black ring-opacity-5 sm:rounded-sm">
                  <table className="min-w-full divide-y divide-gray-300">
                    <thead className="bg-gray-50">
                      <tr>
                        <th className="py-3.5 pl-4 pr-3 text-left text-sm font-semibold text-gray-900">Report Name</th>
                        <th className="px-3 py-3.5 text-left text-sm font-semibold text-gray-900">Date</th>
                        <th className="px-3 py-3.5 text-left text-sm font-semibold text-gray-900">Status</th>
                      </tr>
                    </thead>
                    <tbody className="divide-y divide-gray-200 bg-white">
                      {[
                        { name: 'Q1 Performance', date: '2024-03-31', status: 'Completed' },
                        { name: 'User Growth', date: '2024-03-15', status: 'In Progress' },
                        { name: 'Revenue Analysis', date: '2024-03-01', status: 'Completed' },
                        { name: 'Q4 Performance', date: '2024-02-29', status: 'Completed' },
                        { name: 'User Growth', date: '2024-02-15', status: 'Completed' },
                        { name: 'Revenue Analysis', date: '2024-02-01', status: 'In Progress' },
                        { name: 'Revenue Analysis', date: '2024-01-01', status: 'In Progress' },
                      ].map((report) => (
                        <tr key={report.name}>
                          <td className="whitespace-nowrap py-4 pl-4 pr-3 text-sm text-gray-900">{report.name}</td>
                          <td className="whitespace-nowrap px-3 py-4 text-sm text-gray-500">{report.date}</td>
                          <td className="whitespace-nowrap px-3 py-4 text-sm">
                            <span className={`inline-flex rounded-sm px-2 text-xs font-semibold leading-5 ${report.status === 'Completed'
                              ? 'bg-green-100 text-green-800'
                              : 'bg-yellow-100 text-yellow-800'
                              }`}>
                              {report.status}
                            </span>
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ReportsPage;