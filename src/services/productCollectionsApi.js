export async function fetchProductCollections() {
  const response = await fetch(
    'https://www.greatfrontend.com/api/projects/challenges/e-commerce/collections'
  );

  if (!response.ok) {
    throw new Error('Failed to fetch collections');
  }

  const result = await response.json();
  return result?.data ?? [];
}
