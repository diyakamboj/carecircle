import React from "react";

const LandingPage: React.FC = () => {
  return (
    <div className="min-h-screen bg-gray-50 flex flex-col items-center justify-center">
      <h1 className="text-4xl font-bold text-blue-600">Medical Maternity Support Group</h1>
      <p className="mt-4 text-gray-700 text-lg">
        Join us for expert advice, support, and resources for mothers-to-be.
      </p>
      <div className="mt-6">
        <button className="px-6 py-3 bg-blue-500 text-white rounded-lg shadow-md hover:bg-blue-600">
          Learn More
        </button>
      </div>
    </div>
  );
};

export default LandingPage;
