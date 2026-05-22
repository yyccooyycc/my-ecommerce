'use client';

import { useEffect, useMemo, useState } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import theme from '../assets/styles/theme';
import {
  formatPrice,
  getCartItems,
  getCartSubtotal,
  removeCartItem,
  updateCartItemQuantity,
} from '../components/common/utils/cartUtils';

function CartPage() {
  const router = useRouter();
  const [cartItems, setCartItems] = useState([]);

  useEffect(() => {
    const syncCart = () => {
      setCartItems(getCartItems());
    };

    syncCart();
    window.addEventListener('cartUpdated', syncCart);
    window.addEventListener('storage', syncCart);

    return () => {
      window.removeEventListener('cartUpdated', syncCart);
      window.removeEventListener('storage', syncCart);
    };
  }, []);

  const subtotal = useMemo(() => getCartSubtotal(cartItems), [cartItems]);
  const shipping = 0;
  const total = subtotal + shipping;

  const handleDecrease = (item) => {
    if (item.quantity <= 1) return;
    updateCartItemQuantity(item.cartKey, item.quantity - 1);
  };

  const handleIncrease = (item) => {
    updateCartItemQuantity(item.cartKey, item.quantity + 1);
  };

  const handleRemove = (cartKey) => {
    removeCartItem(cartKey);
  };

  if (!cartItems.length) {
    return (
      <section className={theme.cartPage.page}>
        <div className={theme.cartPage.container}>
          <h1 className={theme.cartPage.title}>Shopping Cart</h1>

          <div className={theme.cartPage.emptyWrap}>
            <h2 className={theme.cartPage.emptyTitle}>Your cart is empty</h2>
            <p className={theme.cartPage.emptyText}>
              Looks like you haven’t added anything yet. Start exploring and add your favorite
              pieces to the cart.
            </p>
            <button
              type="button"
              className={theme.cartPage.emptyButton}
              onClick={() => router.push('/')}
            >
              Continue shopping
            </button>
          </div>
        </div>
      </section>
    );
  }

  return (
    <section className={theme.cartPage.page}>
      <div className={theme.cartPage.container}>
        <h1 className={theme.cartPage.title}>Shopping Cart</h1>

        <div className={theme.cartPage.layout}>
          <div className={theme.cartPage.itemsColumn}>
            {cartItems.map((item) => (
              <article key={item.cartKey} className={theme.cartItem.row}>
                <Link href={`/product/${item.productId}`} className={theme.cartItem.imageLink}>
                  <div className={theme.cartItem.imageWrap}>
                    <img src={item.image} alt={item.name} className={theme.cartItem.image} />
                  </div>
                </Link>

                <div className={theme.cartItem.infoWrap}>
                  <h2>
                    <Link
                      href={`/product/${item.productId}`}
                      className={theme.cartItem.productNameLink}
                    >
                      {item.name}
                    </Link>
                  </h2>

                  <p className={theme.cartItem.meta}>
                    {[item.color, item.size].filter(Boolean).join(' • ')}
                  </p>

                  {!!item.description && (
                    <p className={theme.cartItem.description}>{item.description}</p>
                  )}

                  <div className={theme.cartItem.actionsRow}>
                    <div className={theme.cartItem.quantityWrap}>
                      <button
                        type="button"
                        className={theme.cartItem.quantityButton}
                        onClick={() => handleDecrease(item)}
                        disabled={item.quantity <= 1}
                      >
                        −
                      </button>

                      <span className={theme.cartItem.quantityValue}>{item.quantity}</span>

                      <button
                        type="button"
                        className={theme.cartItem.quantityButton}
                        onClick={() => handleIncrease(item)}
                      >
                        +
                      </button>
                    </div>

                    <button
                      type="button"
                      className={theme.cartItem.removeButton}
                      onClick={() => handleRemove(item.cartKey)}
                    >
                      Remove
                    </button>
                  </div>
                </div>

                <div className={theme.cartItem.priceWrap}>
                  <div className={theme.cartItem.price}>
                    {formatPrice(item.price * item.quantity)}
                  </div>

                  {item.originalPrice ? (
                    <div className={theme.cartItem.originalPrice}>
                      {formatPrice(item.originalPrice * item.quantity)}
                    </div>
                  ) : null}
                </div>
              </article>
            ))}
          </div>

          <aside className={theme.cartPage.summaryColumn}>
            <div className={theme.orderSummary.card}>
              <h2 className={theme.orderSummary.title}>Order Summary</h2>

              <div className={theme.orderSummary.row}>
                <span>Subtotal</span>
                <span className={theme.orderSummary.value}>{formatPrice(subtotal)}</span>
              </div>

              <div className={theme.orderSummary.row}>
                <span>Shipping</span>
                <span className={theme.orderSummary.freeValue}>FREE</span>
              </div>

              <button type="button" className={theme.orderSummary.couponButton}>
                Add coupon code
              </button>

              <div className={theme.orderSummary.divider} />

              <div className={theme.orderSummary.totalRow}>
                <span className={theme.orderSummary.totalLabel}>Total</span>
                <span className={theme.orderSummary.totalValue}>{formatPrice(total)}</span>
              </div>

              <button
                onClick={() => router.push('/checkout')}
                type="button"
                className={theme.orderSummary.checkoutButton}
              >
                Checkout
              </button>

              <p className={theme.orderSummary.helperText}>
                Taxes and payment-step details can be calculated during checkout.
              </p>
            </div>
          </aside>
        </div>
      </div>
    </section>
  );
}

export default CartPage;
