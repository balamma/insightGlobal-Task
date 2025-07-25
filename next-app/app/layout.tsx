 
// app/layout.tsx
'use client';

import { ApolloProvider } from '@apollo/client';
import client from '../lib/apolloClient';
import './globals.css';
import React from 'react';

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <body>
       <ApolloProvider client={client}>
          {children}
        </ApolloProvider>
      </body>
    </html>
  );
}

