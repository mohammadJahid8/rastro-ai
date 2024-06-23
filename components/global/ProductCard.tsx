'use client';
import Image from 'next/image';

import { Button } from '../ui/button';
import { useRouter } from 'next/navigation';
import { ChevronDown, ChevronLeft, ExternalLinkIcon } from 'lucide-react';
import { formatDate } from '@/utils/formatDate';
import { useState } from 'react';
import Link from 'next/link';
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from '../ui/carousel';

const ProductCard = ({ product }: any) => {
  const [isOpen, setIsOpen] = useState(false);
  const [isImageLoading, setImageLoading] = useState(true);
  const toggleDescription = () => {
    setIsOpen(!isOpen);
  };

  const copyLinkToClipboard = (productUrl: string) => {
    navigator.clipboard.writeText(productUrl).then(
      () => {
        alert('Link copied to clipboard!');
      },
      (err) => {
        console.error('Failed to copy: ', err);
      }
    );
  };

  const router = useRouter();
  const closesAt: Date = new Date(product.closes_at);
  const closesAtLocal = formatDate(closesAt);
  const now: Date = new Date();
  const isLessThan24: boolean =
    (closesAt.getTime() - now.getTime()) / (1000 * 60 * 60) < 24;

  const imageUrls = product?.scanned_product?.image_public_urls;

  return (
    <div className='mb-4 rounded-md  lg:shadow-custom w-full lg:max-h-[800px] lg:overflow-y-auto'>
      <div className='hidden lg:flex justify-end items-center gap-2 px-2 py-3'>
        <Buttons router={router} productUrl={product.url} />
      </div>
      <div className='relative lg:mx-2'>
        <Carousel className=''>
          <CarouselContent>
            {imageUrls.map((url: string, i: number) => (
              <CarouselItem key={i}>
                <Image
                  src={url}
                  alt={product.title_french}
                  width='0'
                  height='0'
                  quality={100}
                  unoptimized
                  priority
                  onLoad={() => setImageLoading(false)}
                  className={`${
                    isImageLoading ? 'bg-gray-200 min-h-40' : ''
                  } max-h-[600px] object-cover w-full lg:rounded-lg`}
                />
              </CarouselItem>
            ))}
          </CarouselContent>
          <CarouselPrevious className='absolute top-1/2 left-2 z-20' />
          <CarouselNext className='absolute top-1/2 right-2 z-20' />
        </Carousel>

        <div className='flex justify-end items-center gap-2 my-2 lg:hidden px-5'>
          <Buttons router={router} productUrl={product.url} />
        </div>
        <Link
          href={'/'}
          className='lg:hidden absolute top-2 left-2 bg-white shadow-md w-9 h-9 rounded-[8px] p-1 flex justify-center items-center group m-4'
        >
          <ChevronLeft className='h-6 w-6 text-black ' />
        </Link>
        <div className='absolute top-2 right-2 flex justify-center items-center gap-2 p-4 '>
          {isLessThan24 && (
            <div className=' '>
              <svg
                xmlns='http://www.w3.org/2000/svg'
                width='20'
                height='20'
                viewBox='0 0 20 20'
                fill='none'
              >
                <path
                  d='M10 0.25C4.61547 0.25 0.25 4.61547 0.25 10C0.25 15.3845 4.61547 19.75 10 19.75C15.3845 19.75 19.75 15.3845 19.75 10C19.75 4.61547 15.3845 0.25 10 0.25ZM14.5 11.5H10C9.80109 11.5 9.61032 11.421 9.46967 11.2803C9.32902 11.1397 9.25 10.9489 9.25 10.75V4C9.25 3.80109 9.32902 3.61032 9.46967 3.46967C9.61032 3.32902 9.80109 3.25 10 3.25C10.1989 3.25 10.3897 3.32902 10.5303 3.46967C10.671 3.61032 10.75 3.80109 10.75 4V10H14.5C14.6989 10 14.8897 10.079 15.0303 10.2197C15.171 10.3603 15.25 10.5511 15.25 10.75C15.25 10.9489 15.171 11.1397 15.0303 11.2803C14.8897 11.421 14.6989 11.5 14.5 11.5Z'
                  fill='#ED0000'
                />
              </svg>
            </div>
          )}
          <p className='bg-white shadow-sm rounded-[8px]  px-[6px] py-[3px] sm:px-2 sm:py-1 font-semibold sm:text-sm w-full h-9 flex justify-center items-center'>{`€ ${Math.round(
            product.estimated_price_min
          )} - ${Math.round(product.estimated_price_max)}`}</p>
        </div>
      </div>

      <div className='px-5 lg:px-3 flex flex-col gap-4'>
        <p className='mt-2 text-start font-semibold text-[20px]'>
          {product?.title}
        </p>

        <div className='flex flex-col justify-start items-start gap-1'>
          <p className=' text-start font-semibold text-sm '>
            Closing:{' '}
            <span className='text-[#ED0000] font-normal'>{closesAtLocal}</span>{' '}
          </p>

          <p className='text-start font-semibold text-sm '>
            Country:{' '}
            <span className='font-normal'>{product.location_country}</span>{' '}
          </p>
        </div>

        <div className='flex flex-col justify-start items-start gap-1 pb-2'>
          <p
            className='flex items-center justify-between text-start font-semibold text-[16px] cursor-pointer'
            onClick={toggleDescription}
          >
            Description
            <span className='font-normal'>
              <ChevronDown
                className={`ml-2 h-4 w-4 transition-transform duration-300 ${
                  isOpen ? 'rotate-180' : ''
                }`}
              />
            </span>
          </p>
          <p
            className={`text-base font-normal transition-opacity duration-300 ${
              isOpen ? 'opacity-100' : 'opacity-0 hidden'
            }`}
          >
            {product.description}
          </p>

          <p
            className={`text-base underline cursor-pointer mt-2 transition-opacity duration-300 ${
              isOpen ? 'opacity-100' : 'opacity-0 hidden'
            }`}
            onClick={() => copyLinkToClipboard(product.url)}
          >
            Copy Link
          </p>
        </div>
      </div>
    </div>
  );
};

export default ProductCard;

const Buttons = ({
  router,
  productUrl,
}: {
  router: any;
  productUrl: string;
}) => (
  <>
    <Button
      onClick={() => {
        router.push(productUrl);
        alert('Done');
      }}
      variant={'outline'}
      className='gap-1 sm:px-[12px] py-0 sm:py-2 px-[8px] text-[10px] sm:text-[14px] font-medium sm:h-[40px] h-[32px]'
    >
      Drouot
      {/* <ExternalLink /> */}
      <ExternalLinkIcon size={15} />
    </Button>
    <Button className='bg-rastro-primary py-0 sm:py-2 px-[6px] sm:px-[12px] text-[10px] sm:text-[14px] font-medium sm:h-[40px] h-[32px]'>
      Save
    </Button>
  </>
);
