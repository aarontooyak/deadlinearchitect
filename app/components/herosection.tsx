import React from 'react';

const HeroSection: React.FC = () => {
  return (
    <section className="bg-gray-900 py-20">
      <div className="container mx-auto px-4">
        <h1 className="text-4xl font-bold mb-4 text-center text-white">
          Reverse Engineer Your Deadlines
        </h1>
        <p className="text-lg text-gray-300 mb-8 text-center">
          Take control of your project timelines and generate key Agile/Scrum milestones effortlessly.
        </p>
        <div className="flex justify-center">
          <button className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded">
            Get Started
          </button>
        </div>
      </div>
    </section>
  );
};

export default HeroSection;