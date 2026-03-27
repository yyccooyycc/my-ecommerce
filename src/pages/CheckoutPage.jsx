import { useMemo, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import checkoutTheme from '../assets/styles/theme/checkout';
import { getCartItems, getCartSubtotal } from '../components/common/utils/cartUtils';

function CheckoutPage() {
  const navigate = useNavigate();

  const cartItems = useMemo(() => getCartItems(), []);

  const subtotal = useMemo(() => {
    return cartItems.reduce((sum, item) => {
      const quantity = Number(item.quantity || 1);

      const itemPrice =
        Number(item.total_sale_price) ||
        Number(item.sale_price) ||
        Number(item.unit?.sale_price) ||
        Number(item.price) ||
        0;

      // If total_sale_price already represents the full line total, use it directly.
      if (item.total_sale_price !== undefined && item.total_sale_price !== null) {
        return sum + Number(item.total_sale_price || 0);
      }

      return sum + itemPrice * quantity;
    }, 0);
  }, [cartItems]);
  const [shippingMethod, setShippingMethod] = useState('standard');

  const shippingFee = shippingMethod === 'express' ? 15 : 0;
  const couponDiscount = 5;
  const total = Math.max(subtotal + shippingFee - couponDiscount, 0);

  const [formData, setFormData] = useState({
    email: '',
    country: 'United States',
    firstName: '',
    lastName: '',
    address1: '',
    address2: '',
    city: '',
    state: '',
    zip: '',
    cardNumber: '',
    cardName: '',
    expiry: '',
    cvv: '',
  });

  const handleChange = (event) => {
    const { name, value } = event.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleConfirmOrder = () => {
    window.print();
  };

  if (!cartItems.length) {
    return (
      <section className={checkoutTheme.page}>
        <div className={checkoutTheme.container}>
          <div className={checkoutTheme.emptyState}>
            <h1 className={checkoutTheme.emptyTitle}>Your cart is empty</h1>
            <p className={checkoutTheme.emptyText}>Add some items before going to checkout.</p>
            <button
              type="button"
              className={checkoutTheme.confirmButton}
              onClick={() => navigate('/product-listing')}
            >
              Continue shopping
            </button>
          </div>
        </div>
      </section>
    );
  }

  return (
    <section className={checkoutTheme.page}>
      <div className={checkoutTheme.container}>
        <div className={checkoutTheme.panel}>
          <div className={checkoutTheme.layout}>
            <div className={checkoutTheme.left}>
              <button
                type="button"
                className={checkoutTheme.backLink}
                onClick={() => navigate('/cart')}
              >
                <span aria-hidden="true">‹</span>
                Back to Shopping Cart
              </button>

              <h1 className={checkoutTheme.title}>Checkout</h1>

              <section className={`${checkoutTheme.section} ${checkoutTheme.firstSection}`}>
                <h2 className={checkoutTheme.sectionTitle}>Contact Information</h2>

                <div className={checkoutTheme.formGrid}>
                  <div className={`${checkoutTheme.fieldGroup} ${checkoutTheme.full}`}>
                    <label className={checkoutTheme.label} htmlFor="email">
                      Email
                    </label>
                    <input
                      id="email"
                      name="email"
                      type="email"
                      className={checkoutTheme.input}
                      placeholder="user@example.com"
                      value={formData.email}
                      onChange={handleChange}
                    />
                  </div>
                </div>
              </section>

              <section className={checkoutTheme.section}>
                <h2 className={checkoutTheme.sectionTitle}>Shipping Information</h2>

                <div className={checkoutTheme.formGrid}>
                  <div className={`${checkoutTheme.fieldGroup} ${checkoutTheme.full}`}>
                    <label className={checkoutTheme.label} htmlFor="country">
                      Country / Region
                    </label>
                    <select
                      id="country"
                      name="country"
                      className={checkoutTheme.select}
                      value={formData.country}
                      onChange={handleChange}
                    >
                      <option value="United States">United States</option>
                      <option value="Taiwan">Taiwan</option>
                      <option value="Japan">Japan</option>
                    </select>
                  </div>

                  <div className={checkoutTheme.fieldGroup}>
                    <label className={checkoutTheme.label} htmlFor="firstName">
                      First name
                    </label>
                    <input
                      id="firstName"
                      name="firstName"
                      type="text"
                      className={checkoutTheme.input}
                      placeholder="John"
                      value={formData.firstName}
                      onChange={handleChange}
                    />
                  </div>

                  <div className={checkoutTheme.fieldGroup}>
                    <label className={checkoutTheme.label} htmlFor="lastName">
                      Last name
                    </label>
                    <input
                      id="lastName"
                      name="lastName"
                      type="text"
                      className={checkoutTheme.input}
                      placeholder="Appleseed"
                      value={formData.lastName}
                      onChange={handleChange}
                    />
                  </div>

                  <div className={`${checkoutTheme.fieldGroup} ${checkoutTheme.full}`}>
                    <label className={checkoutTheme.label} htmlFor="address1">
                      Address
                    </label>
                    <input
                      id="address1"
                      name="address1"
                      type="text"
                      className={checkoutTheme.input}
                      placeholder="Street address"
                      value={formData.address1}
                      onChange={handleChange}
                    />
                  </div>

                  <div className={`${checkoutTheme.fieldGroup} ${checkoutTheme.full}`}>
                    <input
                      id="address2"
                      name="address2"
                      type="text"
                      className={checkoutTheme.input}
                      placeholder="Apartment, suite, etc (optional)"
                      value={formData.address2}
                      onChange={handleChange}
                    />
                  </div>

                  <div className={checkoutTheme.fieldGroup}>
                    <label className={checkoutTheme.label} htmlFor="city">
                      City
                    </label>
                    <input
                      id="city"
                      name="city"
                      type="text"
                      className={checkoutTheme.input}
                      placeholder="City"
                      value={formData.city}
                      onChange={handleChange}
                    />
                  </div>

                  <div className={checkoutTheme.fieldGroup}>
                    <label className={checkoutTheme.label} htmlFor="state">
                      State
                    </label>
                    <select
                      id="state"
                      name="state"
                      className={checkoutTheme.select}
                      value={formData.state}
                      onChange={handleChange}
                    >
                      <option value="">State</option>
                      <option value="CA">California</option>
                      <option value="NY">New York</option>
                      <option value="TX">Texas</option>
                    </select>
                  </div>

                  <div className={checkoutTheme.fieldGroup}>
                    <label className={checkoutTheme.label} htmlFor="zip">
                      Zip
                    </label>
                    <input
                      id="zip"
                      name="zip"
                      type="text"
                      className={checkoutTheme.input}
                      placeholder="12345"
                      value={formData.zip}
                      onChange={handleChange}
                    />
                  </div>
                </div>
              </section>

              <section className={checkoutTheme.section}>
                <h2 className={checkoutTheme.sectionTitle}>Delivery Method</h2>

                <div className={checkoutTheme.shippingOptions}>
                  <button
                    type="button"
                    className={
                      shippingMethod === 'standard'
                        ? checkoutTheme.shippingCardActive
                        : checkoutTheme.shippingCard
                    }
                    onClick={() => setShippingMethod('standard')}
                  >
                    <div className={checkoutTheme.shippingTop}>
                      <div>
                        <p className={checkoutTheme.shippingName}>Standard</p>
                        <p className={checkoutTheme.shippingDays}>4-10 business days</p>
                      </div>
                      <span
                        className={
                          shippingMethod === 'standard'
                            ? checkoutTheme.radioCircleActive
                            : checkoutTheme.radioCircle
                        }
                      >
                        {shippingMethod === 'standard' ? '✓' : ''}
                      </span>
                    </div>
                    <p className={checkoutTheme.shippingPrice}>FREE</p>
                  </button>

                  <button
                    type="button"
                    className={
                      shippingMethod === 'express'
                        ? checkoutTheme.shippingCardActive
                        : checkoutTheme.shippingCard
                    }
                    onClick={() => setShippingMethod('express')}
                  >
                    <div className={checkoutTheme.shippingTop}>
                      <div>
                        <p className={checkoutTheme.shippingName}>Express</p>
                        <p className={checkoutTheme.shippingDays}>2-5 business days</p>
                      </div>
                      <span
                        className={
                          shippingMethod === 'express'
                            ? checkoutTheme.radioCircleActive
                            : checkoutTheme.radioCircle
                        }
                      >
                        {shippingMethod === 'express' ? '✓' : ''}
                      </span>
                    </div>
                    <p className={checkoutTheme.shippingPrice}>$15.00</p>
                  </button>
                </div>
              </section>

              <section className={checkoutTheme.section}>
                <h2 className={checkoutTheme.sectionTitle}>Payment Method</h2>

                <div className={checkoutTheme.formGrid}>
                  <div className={`${checkoutTheme.fieldGroup} ${checkoutTheme.full}`}>
                    <label className={checkoutTheme.label} htmlFor="cardNumber">
                      Card number
                    </label>
                    <div className={checkoutTheme.cardInputWrap}>
                      <span className={checkoutTheme.cardIcon}>💳</span>
                      <input
                        id="cardNumber"
                        name="cardNumber"
                        type="text"
                        className={checkoutTheme.cardInput}
                        placeholder="1234 1234 1234 1234"
                        value={formData.cardNumber}
                        onChange={handleChange}
                      />
                    </div>
                  </div>

                  <div className={`${checkoutTheme.fieldGroup} ${checkoutTheme.full}`}>
                    <label className={checkoutTheme.label} htmlFor="cardName">
                      Name on card
                    </label>
                    <input
                      id="cardName"
                      name="cardName"
                      type="text"
                      className={checkoutTheme.input}
                      placeholder="Full name on card"
                      value={formData.cardName}
                      onChange={handleChange}
                    />
                  </div>

                  <div className={checkoutTheme.fieldGroup}>
                    <label className={checkoutTheme.label} htmlFor="expiry">
                      Expiry
                    </label>
                    <input
                      id="expiry"
                      name="expiry"
                      type="text"
                      className={checkoutTheme.input}
                      placeholder="MM/YY"
                      value={formData.expiry}
                      onChange={handleChange}
                    />
                  </div>

                  <div className={checkoutTheme.fieldGroup}>
                    <label className={checkoutTheme.label} htmlFor="cvv">
                      CVV
                    </label>
                    <input
                      id="cvv"
                      name="cvv"
                      type="text"
                      className={checkoutTheme.input}
                      placeholder="123"
                      value={formData.cvv}
                      onChange={handleChange}
                    />
                  </div>
                </div>
              </section>
            </div>

            <aside className={checkoutTheme.right}>
              <h2 className={checkoutTheme.summaryTitle}>Order Summary</h2>

              <div className={checkoutTheme.summaryList}>
                {cartItems.map((item, index) => {
                  const originalPrice = Number(
                    item.originalPrice || item.compareAtPrice || item.price || 0
                  );
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
                      className={checkoutTheme.summaryItem}
                    >
                      <img
                        src={item.image}
                        alt={item.name}
                        className={checkoutTheme.summaryImage}
                      />

                      <div className={checkoutTheme.summaryInfo}>
                        <div className={checkoutTheme.summaryRow}>
                          <div>
                            <p className={checkoutTheme.summaryName}>{item.name}</p>
                            <p className={checkoutTheme.summaryMeta}>
                              {item.color || 'Default'}
                              {item.size ? ` • ${item.size}` : ''}
                            </p>
                            <p className={checkoutTheme.summaryQty}>
                              Quantity: {item.quantity || 1}
                            </p>
                          </div>

                          <div className="text-right">
                            <p className={checkoutTheme.summaryCurrentPrice}>
                              ${lineSalePrice.toFixed(2)}
                            </p>
                            {lineListPrice > lineSalePrice && (
                              <p className={checkoutTheme.summaryOldPrice}>
                                ${originalPrice.toFixed(2)}
                              </p>
                            )}
                          </div>
                        </div>
                      </div>
                    </div>
                  );
                })}
              </div>

              <div className={checkoutTheme.totals}>
                <div className={checkoutTheme.totalRow}>
                  <span>Subtotal</span>
                  <span className={checkoutTheme.totalStrong}>${subtotal.toFixed(2)}</span>
                </div>

                <div className={checkoutTheme.totalRow}>
                  <span>Shipping</span>
                  <span className={checkoutTheme.totalStrong}>
                    {shippingFee === 0 ? 'FREE' : `$${shippingFee.toFixed(2)}`}
                  </span>
                </div>

                <div className={checkoutTheme.totalRow}>
                  <span>Coupon discount</span>
                  <div className="flex items-center gap-3">
                    <span className={checkoutTheme.coupon}>GR8FRNTND24</span>
                    <span className={checkoutTheme.totalStrong}>-${couponDiscount.toFixed(2)}</span>
                  </div>
                </div>
              </div>

              <div className={checkoutTheme.totalWrap}>
                <div className="flex items-center justify-between gap-4">
                  <span className={checkoutTheme.totalBigLabel}>Total</span>
                  <span className={checkoutTheme.totalBigValue}>${total.toFixed(2)}</span>
                </div>

                <button
                  type="button"
                  className={checkoutTheme.confirmButton}
                  onClick={handleConfirmOrder}
                >
                  Confirm order
                </button>

                <button
                  type="button"
                  className={checkoutTheme.ghostButton}
                  onClick={() => navigate('/cart')}
                >
                  Back to cart
                </button>
              </div>
            </aside>
          </div>
        </div>
      </div>
    </section>
  );
}

export default CheckoutPage;
