'use client';
import React, { useState } from 'react';
import Header from './components/header';
import HeroSection from './components/herosection';
import Footer from './components/footer';
import ProjectForm from './components/ProjectForm';

const Page = () => {
  const [results, setResults] = useState<string>(''); // Specifies that results is a string
  const [isLoading, setIsLoading] = useState<boolean>(false); // Specifies that isLoading is a boolean
  const [error, setError] = useState<string>(''); // Specifies that error is a string

  // Correctly typing the 'timeline' parameter as a string
  const handleProjectSubmit = (timeline: string) => {
    setIsLoading(true);
    setError('');
    try {
      setResults(timeline);
    } catch (error: any) { // Consider typing the error correctly based on what you expect
      setError('Failed to generate the timeline. Please try again.');
      setResults('');
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex flex-col">
      <Header />
      <main className="flex-grow">
        <HeroSection />
        <div className="container mx-auto p-8">
          <h1 className="text-4xl font-bold mb-4">Deadline Architect</h1>
          <ProjectForm onSubmit={handleProjectSubmit} />
          {isLoading && <p>Loading...</p>}
          {error && <p className="text-red-500">{error}</p>}
          {results && (
            <div>
              <h2 className="text-xl font-bold">Generated Timeline</h2>
              <pre className="bg-gray-100 p-4 rounded-md whitespace-pre-wrap text-gray-800">{results}</pre>
            </div>
          )}
        </div>
      </main>
      <Footer />
    </div>
  );
};

export default Page;
