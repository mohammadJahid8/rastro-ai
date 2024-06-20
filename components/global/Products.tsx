/* eslint-disable @next/next/no-img-element */
'use client';

import axios from 'axios';

import React, { useEffect, useState } from 'react';

const Products = () => {
  const [products, setProducts] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get(
          `https://sourcerer-production.up.railway.app/api/products?page_size=20`,
          {
            headers: {
              Authorization: `Bearer eyJhbGciOiJSUzI1NiIsImtpZCI6ImRmOGIxNTFiY2Q5MGQ1YjMwMjBlNTNhMzYyZTRiMzA3NTYzMzdhNjEiLCJ0eXAiOiJKV1QifQ.eyJuYW1lIjoiTWQgSmFoaWQiLCJwaWN0dXJlIjoiaHR0cHM6Ly9saDMuZ29vZ2xldXNlcmNvbnRlbnQuY29tL2EvQUNnOG9jS2EtOGd4ZlB2M0Q5ZlNhLWtzTmtOSzlVeW9BUU8xenJvalhQS2xQWUhBQkQ3Z2M0VHE9czk2LWMiLCJpc3MiOiJodHRwczovL3NlY3VyZXRva2VuLmdvb2dsZS5jb20vcmFzdHJvLWFpIiwiYXVkIjoicmFzdHJvLWFpIiwiYXV0aF90aW1lIjoxNzE4ODE0NTA0LCJ1c2VyX2lkIjoiTUNkQlVyNWFTRlk3bGhjclN0b3ZLcTZMbEtIMyIsInN1YiI6Ik1DZEJVcjVhU0ZZN2xoY3JTdG92S3E2TGxLSDMiLCJpYXQiOjE3MTg4NjU0MDAsImV4cCI6MTcxODg2OTAwMCwiZW1haWwiOiJtb2hhbW1hZGphaGlkMDAwN0BnbWFpbC5jb20iLCJlbWFpbF92ZXJpZmllZCI6dHJ1ZSwiZmlyZWJhc2UiOnsiaWRlbnRpdGllcyI6eyJnb29nbGUuY29tIjpbIjExMTMxMzQ0MzQwNDE0NzE1NTExOCJdLCJlbWFpbCI6WyJtb2hhbW1hZGphaGlkMDAwN0BnbWFpbC5jb20iXX0sInNpZ25faW5fcHJvdmlkZXIiOiJnb29nbGUuY29tIn19.DgGWJY0DJ-ocrEmW0xHOZEJIqFXwdGBkJSRvkHzkiQ1lAoveyOmfsQNmiloyia2ZiCDvhsOkunMZG2qO2roncbJJNUTP0QLc6nKWY29q7MvKRcaS2sKeqJE-RHyAMcQ-yTk_pXPFkftT7IFjqTdcdAcazvVF6sSAslIE0gB8QCg70ekXII_4agEqWBnSJ5LY8I4JfcohItl27Nu-1a8_fbb_fI4qpY6ahhrvCPeWwSJhgxbEOpjiZiiwREtGrLiW4l9BwtKqOIm0N_LDgi6PAmLHVTDNecWhYuFsQOU59xQRgY9p7Ge2SU89tyYmPp0iXEM5dgYeCR-879Gls2NXoA`,
            },
          }
        );
        console.log(response?.data);
        setProducts(response?.data);
      } catch (error) {
        console.error('Error fetching liked products:', error);
      }
    };

    fetchData();
  }, []);

  return (
    <div className='columns-1 xs:columns-2 md:columns-3 lg:columns-5 2xl:columns-6 gap-4 p-4'>
      {products?.map((item: any, index) => (
        <div
          key={index}
          className='mb-4 break-inside-avoid bg-gray-200 p-1 rounded-sm'
        >
          <img
            src={item.scanned_product.image_public_urls[0]}
            alt={item.title_french}
            className='w-full rounded-lg'
          />
          <p className='mt-2 text-center'>{item?.title}</p>
        </div>
      ))}
    </div>
  );
};

export default Products;
