import Navbar from '@/components/global/Navbar';
import Products from '@/components/global/Products';
import Image from 'next/image';

export default function Home() {
  return (
    <div className='mx-auto p-5 md:p-10'>
      <Navbar />
      <Products />
    </div>
  );
}
