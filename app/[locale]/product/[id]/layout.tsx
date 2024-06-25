import Navbar from '@/components/global/Navbar';
import { Toaster } from '@/components/ui/sonner';
import React from 'react';

type Props = {
  children: React.ReactNode;
};

const layout = ({ children }: Props) => {
  return (
    <div>
      <Navbar />
      {children}
    </div>
  );
};

export default layout;