import Product from '@/components/global/Product';
import axios from 'axios';

async function getProduct(id: string) {
  const response = await axios.get(
    `https://sourcerer-production.up.railway.app/api/products/${id}`,
    {
      headers: {
        Authorization: `Bearer eyJhbGciOiJSUzI1NiIsImtpZCI6ImRmOGIxNTFiY2Q5MGQ1YjMwMjBlNTNhMzYyZTRiMzA3NTYzMzdhNjEiLCJ0eXAiOiJKV1QifQ.eyJuYW1lIjoiTWQgSmFoaWQiLCJwaWN0dXJlIjoiaHR0cHM6Ly9saDMuZ29vZ2xldXNlcmNvbnRlbnQuY29tL2EvQUNnOG9jS2EtOGd4ZlB2M0Q5ZlNhLWtzTmtOSzlVeW9BUU8xenJvalhQS2xQWUhBQkQ3Z2M0VHE9czk2LWMiLCJpc3MiOiJodHRwczovL3NlY3VyZXRva2VuLmdvb2dsZS5jb20vcmFzdHJvLWFpIiwiYXVkIjoicmFzdHJvLWFpIiwiYXV0aF90aW1lIjoxNzE4ODE0NTA0LCJ1c2VyX2lkIjoiTUNkQlVyNWFTRlk3bGhjclN0b3ZLcTZMbEtIMyIsInN1YiI6Ik1DZEJVcjVhU0ZZN2xoY3JTdG92S3E2TGxLSDMiLCJpYXQiOjE3MTg5MzY2NDgsImV4cCI6MTcxODk0MDI0OCwiZW1haWwiOiJtb2hhbW1hZGphaGlkMDAwN0BnbWFpbC5jb20iLCJlbWFpbF92ZXJpZmllZCI6dHJ1ZSwiZmlyZWJhc2UiOnsiaWRlbnRpdGllcyI6eyJnb29nbGUuY29tIjpbIjExMTMxMzQ0MzQwNDE0NzE1NTExOCJdLCJlbWFpbCI6WyJtb2hhbW1hZGphaGlkMDAwN0BnbWFpbC5jb20iXX0sInNpZ25faW5fcHJvdmlkZXIiOiJnb29nbGUuY29tIn19.ABStM6MhIHmodyurtKvAUBbePI4sKp5cpPoZB32pg1TdBXpzZUYjlMjrIuK04U5IkK5Q5Pap1QCfmDadUtUVf8P09pD6QolfVl58-4izQ8eHCD3EAqGe8OhEYet0JN17JmcKPPbJQAY3KgS2aJh3s7Cd4FNl9muPnGOijeaR8uk9GrlHZO9juVHk_2EQSO9_wvPqUcIG3Vs5oBvFDe8UgGDbUZS4vz4k4UAYNoBTnzEKukZLHcHyV0c6A9_BkB3-NvKAZg-p2GUJSBYtxhDl0118E3eXcSXbSF8zskZG13mos0Y7GrTEnD--hGS-03CzqqhUvd5f8zfxLWklg0ehCA`,
      },
    }
  );

  return response?.data;
}

const page = async ({ params }: any) => {
  const product = await getProduct(params.id);

  return (
    <div>
      <Product product={product} />
    </div>
  );
};

export default page;
