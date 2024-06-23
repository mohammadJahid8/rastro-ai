

const BASE_URL = "https://sourcerer-production.up.railway.app/api"

export async function getProduct(id: string) {
  const res = await fetch(
    `${BASE_URL}/product/${id}`
  );
  const products = await res.json();

  return products;

}

export async function getSuggestions(id: string) {
  const res = await fetch(
    `${BASE_URL}/product/${id}/nearest`
  );
  const products = await res.json();

  return products;

}



export async function getProducts() {
  const res = await fetch(
    `${BASE_URL}/products?page_size=21`,{ next: { revalidate: 30 } }
  );
  const products = await res.json();

  return products;
}
