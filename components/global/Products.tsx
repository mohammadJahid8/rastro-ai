/* eslint-disable @next/next/no-img-element */
"use client";

import axios from "axios";

import React, { useEffect, useState } from "react";
import { Button } from "../ui/button";
import ExternalLink from "../icons/ExternalLink";
import { useRouter } from "next/navigation";

const Products = () => {
  const [products, setProducts] = useState([]);

  const router = useRouter();

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get(
          `https://sourcerer-production.up.railway.app/api/products?page_size=20`,
          {
            headers: {
              Authorization: `Bearer eyJhbGciOiJSUzI1NiIsImtpZCI6ImRmOGIxNTFiY2Q5MGQ1YjMwMjBlNTNhMzYyZTRiMzA3NTYzMzdhNjEiLCJ0eXAiOiJKV1QifQ.eyJuYW1lIjoiQWJkdXIgUmFobWFuIiwicGljdHVyZSI6Imh0dHBzOi8vbGgzLmdvb2dsZXVzZXJjb250ZW50LmNvbS9hL0FDZzhvY0xwOHFkS0owRkhnRUhVOEZVSTlWWTU0Mmg5cTdPTjRtOW80WVVOXzQtWW9mVXVMZ3c9czk2LWMiLCJpc3MiOiJodHRwczovL3NlY3VyZXRva2VuLmdvb2dsZS5jb20vcmFzdHJvLWFpIiwiYXVkIjoicmFzdHJvLWFpIiwiYXV0aF90aW1lIjoxNzE4ODkzNzk4LCJ1c2VyX2lkIjoiTVZ2aGhsdndQQ1ZqQmNSTVhHMXFFT1JUb09HMiIsInN1YiI6Ik1WdmhobHZ3UENWakJjUk1YRzFxRU9SVG9PRzIiLCJpYXQiOjE3MTg5Mjg5MDgsImV4cCI6MTcxODkzMjUwOCwiZW1haWwiOiJwZXJzb25hbC5hYmR1cnJhaG1hbkBnbWFpbC5jb20iLCJlbWFpbF92ZXJpZmllZCI6dHJ1ZSwiZmlyZWJhc2UiOnsiaWRlbnRpdGllcyI6eyJnb29nbGUuY29tIjpbIjExMTE1NDI0NzI5MTczMzQ2NzYwNCJdLCJlbWFpbCI6WyJwZXJzb25hbC5hYmR1cnJhaG1hbkBnbWFpbC5jb20iXX0sInNpZ25faW5fcHJvdmlkZXIiOiJnb29nbGUuY29tIn19.dGF5ftfW18C9uLgkg0SOwfBGlQ73FcYvj7v2_mbg59kP5FcIV6KKYo5TNBwHZEoEb4h4VylluIRwiU_5fXTYB_udFmQeDxbIr6b-Sv1aeAmx-ZGEo7iUOLbA6HW_pVt_xMCD6u5BKwuzfxkdI7mGXG737YkTmgfeoFrLdVu4e0n2_KpbcMMjaEmecgU2SjVr3N7SJvou1-uj0DzdlZ_-Rqs5ez5rYR9qshyuhaoUDpBZyeuilICjCUSVFvgLLk-opPfhmFb_Uvgfk6h6OSy4ZiiaSpWLOdK8AEoNjilqaqQyMLAvo_a_WmSt_K0ps_W4PG9ODoplI0Uez2T7O_WDlQ`,
            },
          }
        );
        console.log(response?.data);
        setProducts(response?.data);
      } catch (error) {
        console.error("Error fetching liked products:", error);
      }
    };

    fetchData();
  }, []);

  return (
    <div className="columns-2 xs:columns-2 md:columns-3 lg:columns-5 2xl:columns-6 gap-4 p-4 mt-10">
      {products?.map((item: any, index) => {
        const closesAt: Date = new Date(item.closes_at);
        const now: Date = new Date();
        const isLessThan24: boolean =
          (closesAt.getTime() - now.getTime()) / (1000 * 60 * 60) < 24;

        return (
          <div
            key={index}
            className="mb-4 break-inside-avoid  p-1 rounded-sm group"
          >
            <div className="relative">
              <img
                src={item.scanned_product.image_public_urls[0]}
                alt={item.title_french}
                className="w-full rounded-lg "
              />
              <div className="opacity-0 group-hover:opacity-60 absolute h-full w-full top-0 left-0 right-0 z-10 bottom-0 bg-black rounded-lg transition-opacity delay-300 "></div>
              <div className="opacity-0  absolute bottom-3 left-1/2 -translate-x-1/2 flex justify-center items-center gap-2 group-hover:opacity-100 transition-opacity delay-300 z-20">
                <Button
                  onClick={() => router.push(item.url)}
                  variant={"outline"}
                  className="gap-1"
                >
                  <span className="text-sm font-medium">Drouot</span>
                  <ExternalLink />
                </Button>
                <Button className="bg-rastro-primary">
                  <span className="text-sm font-medium">Save</span>
                </Button>
              </div>
              <div className="bg-white shadow-xl rounded-md absolute top-2 right-2 px-2 py-1">
                <p className="font-semibold text-sm">{`€ ${Math.round(
                  item.estimated_price_min
                )} - ${Math.round(item.estimated_price_max)}`}</p>
              </div>
              {isLessThan24 && (
                <div className="absolute top-2  left-1/2 transform-gpu -translate-x-1/2 ">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    width="20"
                    height="20"
                    viewBox="0 0 20 20"
                    fill="none"
                  >
                    <path
                      d="M10 0.25C4.61547 0.25 0.25 4.61547 0.25 10C0.25 15.3845 4.61547 19.75 10 19.75C15.3845 19.75 19.75 15.3845 19.75 10C19.75 4.61547 15.3845 0.25 10 0.25ZM14.5 11.5H10C9.80109 11.5 9.61032 11.421 9.46967 11.2803C9.32902 11.1397 9.25 10.9489 9.25 10.75V4C9.25 3.80109 9.32902 3.61032 9.46967 3.46967C9.61032 3.32902 9.80109 3.25 10 3.25C10.1989 3.25 10.3897 3.32902 10.5303 3.46967C10.671 3.61032 10.75 3.80109 10.75 4V10H14.5C14.6989 10 14.8897 10.079 15.0303 10.2197C15.171 10.3603 15.25 10.5511 15.25 10.75C15.25 10.9489 15.171 11.1397 15.0303 11.2803C14.8897 11.421 14.6989 11.5 14.5 11.5Z"
                      fill="#ED0000"
                    />
                  </svg>
                </div>
              )}
            </div>

            <p className="mt-2 text-start font-semibold text-sm ">
              {item?.title}
            </p>
          </div>
        );
      })}
    </div>
  );
};

export default Products;
