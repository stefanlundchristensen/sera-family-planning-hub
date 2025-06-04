import React from "react";

export default function WeeklyPlanning() {
  return (
    <div className="min-h-screen flex flex-col items-center justify-start bg-gray-50 py-12">
      <div className="w-full max-w-2xl bg-white rounded-lg shadow p-8">
        <h1 className="text-3xl font-bold mb-2 text-center">Weekly Planning Flow</h1>
        <p className="mb-6 text-gray-600 text-center">This is the dedicated page for the weekly planning flow. More features coming soon.</p>
        {/* Progress Indicator Placeholder */}
        <div className="w-full flex justify-center mb-8">
          <div className="h-2 w-2/3 bg-gray-200 rounded-full">
            <div className="h-2 bg-blue-400 rounded-full" style={{ width: '20%' }} />
          </div>
        </div>
        {/* Future Steps Section */}
        <section className="mt-4">
          <h2 className="text-lg font-semibold mb-2">Planning Steps (coming soon)</h2>
          <ul className="list-disc list-inside text-gray-500">
            <li>Review schedule changes</li>
            <li>Auto-populate recurring events</li>
            <li>Assign responsibilities</li>
            <li>Resolve conflicts</li>
            <li>Finalize and sync plan</li>
          </ul>
        </section>
      </div>
    </div>
  );
} 