import { Spinner } from '@/components/ui/spinner';
import React from 'react';

type Props = {};

const loading = (props: Props) => {
  return (
    <div className='h-[80vh] flex items-center justify-center'>
      <Spinner />
    </div>
  );
};

export default loading;
