const CART_KEY = 'my_ecommerce_cart';

export function getCartItems() {
  try {
    const raw = localStorage.getItem(CART_KEY);
    return raw ? JSON.parse(raw) : [];
  } catch (error) {
    console.error('Failed to parse cart from localStorage:', error);
    return [];
  }
}

export function saveCartItems(items) {
  localStorage.setItem(CART_KEY, JSON.stringify(items));
  window.dispatchEvent(new Event('cartUpdated'));
}

export function getCartCount(items = []) {
  return items.reduce((sum, item) => sum + Number(item.quantity || 0), 0);
}

export function getCartSubtotal(items = []) {
  return items.reduce((sum, item) => {
    return sum + Number(item.price || 0) * Number(item.quantity || 0);
  }, 0);
}

export function addToCart(cartItem) {
  const cartItems = getCartItems();

  const existingIndex = cartItems.findIndex((item) => item.cartKey === cartItem.cartKey);

  if (existingIndex > -1) {
    cartItems[existingIndex].quantity += cartItem.quantity;
  } else {
    cartItems.push(cartItem);
  }

  saveCartItems(cartItems);
}

export function updateCartItemQuantity(cartKey, nextQuantity) {
  const cartItems = getCartItems();

  const updatedItems = cartItems.map((item) =>
    item.cartKey === cartKey ? { ...item, quantity: Math.max(1, nextQuantity) } : item
  );

  saveCartItems(updatedItems);
}

export function removeCartItem(cartKey) {
  const cartItems = getCartItems();
  saveCartItems(cartItems.filter((item) => item.cartKey !== cartKey));
}

export function formatPrice(value) {
  return `$${Number(value || 0).toFixed(2)}`;
}
