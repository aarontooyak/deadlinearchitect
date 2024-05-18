// app/home.page.tsx
import { useState } from 'react';

const HomePage = () => {
  const [description, setDescription] = useState<string>('');

  return (
    <html>
      <body>
    <div className="p-4 max-w-xl mx-auto">
      <h1 className="text-xl font-bold">Welcome to Deadline Architect</h1>
      <textarea
        className="mt-2 p-2 border border-gray-300 rounded w-full"
        value={description}
        onChange={(e) => setDescription(e.target.value)}
      />
      {/* Other form elements and functionality */}
    </div>
    </body>
    </html>
  );
};

export default HomePage;

