import { ReactNode } from 'react';
import './globals.css';


type LayoutProps = {
  children: ReactNode;
};

export default function RootLayout({ children }: LayoutProps) {
  return (
    <html>
      <head>
        {/* Add any custom head elements here */}
      </head>
      <body>
        <div>
          {/* Navigation, etc. */}
          <main>{children}</main>
          {/* Footer, etc. */}
        </div>
      </body>
    </html>
  );
}