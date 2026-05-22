'use client';

import orderSuccessImageFromDenis from '../assets/images/orderSuccess/orderSuccessImageFromDenis.jpg';
import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import orderSuccessTheme from '../assets/styles/theme/orderSuccess';

const ORDER_SUCCESS_IMAGE = orderSuccessImageFromDenis.src || orderSuccessImageFromDenis;
function OrderSuccess() {
  const router = useRouter();
  const [order, setOrder] = useState(null);
  const [hasHydrated, setHasHydrated] = useState(false);

  useEffect(() => {
    const rawOrder = sessionStorage.getItem('stylenest:lastOrder');
    if (!rawOrder) {
      setHasHydrated(true);
      return;
    }

    try {
      setOrder(JSON.parse(rawOrder));
    } catch {
      setOrder(null);
    } finally {
      setHasHydrated(true);
    }
  }, []);

  if (!hasHydrated) {
    return null;
  }

  if (!order) {
    return (
      <section className={orderSuccessTheme.page}>
        <div className={orderSuccessTheme.container}>
          <div className={orderSuccessTheme.emptyState}>
            <h1 className={orderSuccessTheme.emptyTitle}>No order found</h1>
            <p className={orderSuccessTheme.emptyText}>
              We could not find your latest order details. Please return to shopping and try again.
            </p>
            <button
              type="button"
              className={orderSuccessTheme.emptyButton}
              onClick={() => router.push('/product-listing')}
            >
              Continue shopping
            </button>
          </div>
        </div>
      </section>
    );
  }

  const {
    orderNumber,
    items = [],
    subtotal = 0,
    shipping = 0,
    discount = 0,
    total = 0,
    shippingAddress,
    payment,
  } = order;

  return (
    <section className={orderSuccessTheme.page}>
      <div className={orderSuccessTheme.container}>
        <div className={orderSuccessTheme.shell}>
          <div className={orderSuccessTheme.card}>
            <div className={orderSuccessTheme.layout}>
              <div className={orderSuccessTheme.mediaWrap}>
                <img
                  src={ORDER_SUCCESS_IMAGE}
                  alt="Order confirmation"
                  className={orderSuccessTheme.media}
                />
              </div>

              <div className={orderSuccessTheme.content}>
                <h1 className={orderSuccessTheme.heading}>Your order is confirmed.</h1>
                <p className={orderSuccessTheme.subheading}>
                  Your order is now in the queue and being processed. We will let you know when we
                  ship it out.
                </p>

                <div className={orderSuccessTheme.orderMeta}>
                  <p className={orderSuccessTheme.orderMetaLabel}>Order Number</p>
                  <p className={orderSuccessTheme.orderMetaValue}>
                    <span>{orderNumber}</span>
                    <span className={orderSuccessTheme.copyIcon} aria-hidden="true">
                      ⧉
                    </span>
                  </p>
                </div>

                <div className={orderSuccessTheme.itemList}>
                  {items.map((item, index) => {
                    const quantity = Number(item.quantity || 1);

                    const unitSalePrice =
                      Number(item.unit?.sale_price) ||
                      Number(item.sale_price) ||
                      Number(item.price) ||
                      0;

                    const unitListPrice =
                      Number(item.unit?.list_price) ||
                      Number(item.originalPrice) ||
                      Number(item.compareAtPrice) ||
                      unitSalePrice;

                    const lineSalePrice =
                      item.total_sale_price !== undefined && item.total_sale_price !== null
                        ? Number(item.total_sale_price)
                        : unitSalePrice * quantity;

                    const lineListPrice =
                      item.total_list_price !== undefined && item.total_list_price !== null
                        ? Number(item.total_list_price)
                        : unitListPrice * quantity;

                    return (
                      <div
                        key={`${item.productId || item.sku || item.name}-${index}`}
                        className={orderSuccessTheme.itemRow}
                      >
                        <img
                          src={item.image}
                          alt={item.name}
                          className={orderSuccessTheme.itemImage}
                        />

                        <div className={orderSuccessTheme.itemInfo}>
                          <div className={orderSuccessTheme.itemTop}>
                            <div>
                              <p className={orderSuccessTheme.itemName}>{item.name}</p>
                              <p className={orderSuccessTheme.itemMeta}>
                                {item.color || 'Default'}
                                {item.size ? ` • ${item.size}` : ''}
                              </p>
                              <p className={orderSuccessTheme.itemQty}>Quantity: {quantity}</p>
                            </div>

                            <div className={orderSuccessTheme.itemPriceWrap}>
                              <p className={orderSuccessTheme.itemSalePrice}>
                                ${lineSalePrice.toFixed(2)}
                              </p>
                              {lineListPrice > lineSalePrice && (
                                <p className={orderSuccessTheme.itemListPrice}>
                                  ${lineListPrice.toFixed(2)}
                                </p>
                              )}
                            </div>
                          </div>
                        </div>
                      </div>
                    );
                  })}
                </div>

                <div className={orderSuccessTheme.totals}>
                  <div className={orderSuccessTheme.totalRow}>
                    <span>Subtotal</span>
                    <span className={orderSuccessTheme.totalStrong}>${subtotal.toFixed(2)}</span>
                  </div>

                  <div className={orderSuccessTheme.totalRow}>
                    <span>Shipping</span>
                    <span className={orderSuccessTheme.totalStrong}>
                      {shipping === 0 ? 'FREE' : `$${shipping.toFixed(2)}`}
                    </span>
                  </div>

                  <div className={orderSuccessTheme.totalRow}>
                    <span>Coupon discount</span>
                    <div className="flex items-center gap-3">
                      <span className={orderSuccessTheme.couponBadge}>GR8FRNTND24</span>
                      <span className={orderSuccessTheme.totalStrong}>-${discount.toFixed(2)}</span>
                    </div>
                  </div>

                  <div className={orderSuccessTheme.grandTotalRow}>
                    <span className={orderSuccessTheme.grandTotalLabel}>Total</span>
                    <span className={orderSuccessTheme.grandTotalValue}>${total.toFixed(2)}</span>
                  </div>
                </div>

                <div className={orderSuccessTheme.infoGrid}>
                  <div className={orderSuccessTheme.infoBlock}>
                    <p className={orderSuccessTheme.infoTitle}>Shipping address</p>
                    <div className={orderSuccessTheme.infoText}>
                      <p>
                        {shippingAddress?.firstName} {shippingAddress?.lastName}
                      </p>
                      <p>{shippingAddress?.address1}</p>
                      {shippingAddress?.address2 ? <p>{shippingAddress.address2}</p> : null}
                      <p>
                        {shippingAddress?.city}, {shippingAddress?.state} {shippingAddress?.zip}
                      </p>
                      <p>{shippingAddress?.country}</p>
                      <p>{shippingAddress?.email}</p>
                    </div>
                  </div>

                  <div className={orderSuccessTheme.infoBlock}>
                    <p className={orderSuccessTheme.infoTitle}>Payment</p>
                    <div className={orderSuccessTheme.infoText}>
                      <div className={orderSuccessTheme.paymentRow}>
                        <span className={orderSuccessTheme.paymentBadge}>
                          {payment?.brand || 'CARD'}
                        </span>
                        <div>
                          <p>Ending with {payment?.last4 || '1234'}</p>
                          <p>Expires {payment?.expiry || '--/--'}</p>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>

                <div className={orderSuccessTheme.actionRow}>
                  <button
                    type="button"
                    className={orderSuccessTheme.actionButton}
                    onClick={() => router.push('/product-listing')}
                  >
                    Continue Shopping →
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

export default OrderSuccess;
