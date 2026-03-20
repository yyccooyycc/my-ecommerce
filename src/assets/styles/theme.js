const theme = {
  /* -------------------------------------------------------------
   * Navbar
   * ------------------------------------------------------------- */
  navbar: {
    header: 'border-b border-neutral-200 bg-white',
    container: 'mx-auto w-full max-w-[1440px] px-4 md:px-8 lg:px-10 xl:px-12',
    row: 'flex h-16 items-center justify-between',
    leftCluster: 'flex items-center min-w-0',
    leftGroup: 'flex items-center gap-6',
    brandWrap: 'flex shrink-0 items-center',
    brandLogo: 'h-8 w-auto',
    desktopNav: 'hidden md:block md:ml-14 lg:ml-16 xl:ml-24',
    desktopNavList: 'flex items-center gap-6',
    desktopLink: 'text-[15px] font-medium text-neutral-600 transition hover:text-neutral-900',
    rightGroup: 'flex shrink-0 items-center justify-end',
    cartButton:
      'relative inline-flex h-10 w-10 shrink-0 items-center justify-center rounded-full text-neutral-900 transition hover:bg-neutral-100',
    cartIcon: 'block h-5 w-5 text-[20px] leading-none',
    cartBadge:
      'absolute -right-1 -top-1 min-w-[18px] rounded-full bg-black px-1 text-center text-[11px] font-semibold leading-[18px] text-white',
    mobileMenuButton: 'inline-flex h-10 w-10 items-center justify-center md:hidden',
    drawerOverlay: 'fixed inset-0 z-50 flex',
    drawerPanelSimple: 'relative z-10 h-full w-[82%] max-w-sm bg-white p-6 shadow-xl',
    drawerTop: 'flex items-center justify-between',
    iconButton: 'inline-flex h-10 w-10 items-center justify-center',
    drawerLinksWrap: 'mt-10',
    drawerLinks: 'space-y-6 text-lg font-medium text-neutral-900',
    drawerBackdropBtn: 'absolute inset-0 bg-black/30',
  },
  /* -------------------------------------------------------------
   * Latest Arrivals
   * ------------------------------------------------------------- */
  latestArrivals: {
    page: 'min-h-screen bg-neutral-100',
    shell: 'mx-auto w-full max-w-[1328px] px-4 md:px-8',
    container: 'mx-auto w-full max-w-[1620px] px-8 xl:px-12 mt-10',
    header: 'flex items-center justify-between mb-6 w-full px-0',
    title: 'text-lg font-semibold text-neutral-900',
    gridWrapper: '',
    viewAllButton:
      'ml-4 px-4 py-2 bg-profile-primary text-white rounded hover:bg-profile-primary-hover transition-colors',
    viewAllText: 'text-base font-medium',
    noProducts: 'text-center text-neutral-500 py-10',
  },
  /* -------------------------------------------------------------
   * Shared helpers
   * ------------------------------------------------------------- */
  shared: {
    header: 'flex justify-between items-center w-full mb-6',
    title: 'font-semibold text-xl text-neutral-900',
  },

  /* -------------------------------------------------------------
   * Layout Grid
   * ------------------------------------------------------------- */
  layout: {
    container:
      'box-border w-full px-4 grid grid-cols-4 gap-4 ' +
      'md:px-8 md:grid-cols-6 md:gap-8 ' +
      'xl:max-w-[1280px] xl:mx-auto xl:px-8 xl:grid-cols-12 xl:gap-8',
    filterSection: 'xl:col-span-3 md:hidden xl:block border-r border-neutral-200',
    productSection: 'col-span-4 md:col-span-6 xl:col-span-9 flex flex-col',
  },

  /* -------------------------------------------------------------
   * Home page (Profile Card)
   * ------------------------------------------------------------- */
  homePage: {
    root: 'min-h-screen w-full bg-profile-page-bg text-profile-text-main px-4 md:px-8',

    card:
      'mt-[200px] w-[340px] mx-auto ' +
      'bg-profile-card-bg rounded-md shadow-lg ' +
      'px-8 pt-8 pb-10 flex flex-col gap-6',

    avatarWrapper: 'h-16 w-16 sm:h-20 sm:w-20 rounded-full overflow-hidden ' + 'border-2  mx-auto',

    avatar: 'h-full w-full object-cover',

    name:
      'text-xl md:text-[20px] leading-[28px] ' + 'font-medium text-profile-text-main text-center',

    role: 'text-sm sm:text-sm text-profile-text-muted text-center',
    bio:
      'text-sm md:text-base font-normal text-profile-text-muted ' +
      'text-center max-w-[280px] mx-auto',

    ctaButton:
      'mt-3 w-full rounded-[5px] ' +
      'bg-profile-primary text-white ' +
      'text-sm sm:text-base font-normal ' +
      'py-2.5 sm:py-3 shadow-sm ' +
      'transition-colors ' +
      'hover:bg-profile-primary-hover ' +
      'focus-visible:outline-none ' +
      'focus-visible:ring-2 ' +
      'focus-visible:ring-profile-primary ' +
      'focus-visible:ring-offset-2 ' +
      'focus-visible:ring-offset-profile-card-bg',

    socialNav: 'flex items-center justify-center gap-4 sm:gap-5',

    socialLink:
      'flex h-9 w-9 items-center justify-center ' +
      'rounded-full ' +
      'bg-profile-icon-bg text-profile-icon text-lg ' +
      'transition-colors ' +
      'hover:bg-profile-primary hover:text-white ' +
      'focus-visible:outline-none ' +
      'focus-visible:ring-2 ' +
      'focus-visible:ring-profile-primary ' +
      'focus-visible:ring-offset-2 ' +
      'focus-visible:ring-offset-profile-card-bg',
  },

  /* -------------------------------------------------------------
   * Product Listing
   * ------------------------------------------------------------- */
  productListing: {
    page: 'min-h-screen bg-neutral-100',
    shell: 'mx-auto w-full max-w-[1520px] px-6 xl:px-8',
    layout: 'flex gap-10',
    container: 'flex-1 min-w-0 w-full box-border',
    header: 'flex justify-between items-center mb-6 w-full',
    title: 'text-lg font-semibold text-neutral-900',
    grid:
      'grid gap-6 sm:gap-8 md:gap-10 lg:gap-12 ' +
      'grid-cols-2 sm:grid-cols-3 xl:grid-cols-4 w-full',
    sortSelect:
      'border border-gray-300 rounded px-3 py-2 text-sm bg-white hover:bg-gray-50 ' +
      'cursor-pointer w-28 md:w-32 font-semibold text-gray-900',
    sortSelectPlaceholder: 'text-gray-400',
    sortSelectValue: 'text-gray-900',
  },

  /* -------------------------------------------------------------
   * Product Card
   * ------------------------------------------------------------- */
  productCard: {
    card:
      'flex flex-col w-full rounded-lg overflow-hidden shadow-sm ' +
      'border border-neutral-200 hover:shadow-md ' +
      'transition-all duration-200 bg-white',
    image:
      'w-full h-[240px] sm:h-[260px] md:h-[280px] object-cover ' +
      'rounded-t-lg bg-gray-100 transition-opacity duration-300',
    skeleton: 'absolute top-0 left-0 w-full h-[300px] bg-gray-200 ' + 'animate-pulse rounded-lg',
    details: 'flex flex-col gap-3 p-4',
    color: 'font-normal text-xs text-neutral-600',
    name: 'font-medium text-lg text-neutral-900 truncate',
    price: 'font-normal text-lg text-neutral-500',
    discount: 'font-normal text-xs line-through text-neutral-600',
    colorOptions: 'flex justify-start items-center gap-2 p-1 rounded',
    hoverShadow: 'shadow-lg',
    outOfStockOverlay:
      'absolute top-0 left-0 w-full h-full bg-gray-400 opacity-50 ' +
      'flex justify-center items-center text-white font-bold',
    noImage:
      'w-full h-[300px] bg-gray-200 flex items-center justify-center ' + 'text-gray-500 rounded-lg',
    priceDiscount: 'text-red-500 ml-2 px-2',
    colorButton:
      'w-6 h-6 rounded-full cursor-pointer border border-neutral-300 shadow-sm transition ' +
      'hover:scale-105 hover:shadow',
    colorButtonOutOfStock: 'opacity-50 cursor-not-allowed',
    colorButtonSelected: 'ring-2 ring-neutral-900 ring-offset-2',
  },

  /* -------------------------------------------------------------
   * Product Grid
   * ------------------------------------------------------------- */
  productGrid: {
    base:
      'grid w-full gap-6 sm:gap-8 md:gap-10 lg:gap-12 ' +
      'grid-cols-1 md:grid-cols-2 transition-all duration-300 ease-in-out',

    latestArrivalsCols: 'xl:grid-cols-4 xl:gap-10',
    productListingCols: 'xl:grid-cols-3',

    card:
      'bg-white rounded-lg overflow-hidden shadow-sm ' +
      'border border-neutral-200 hover:shadow-md transition-all duration-200',

    imageWrapper: 'w-full aspect-[4/5] overflow-hidden bg-neutral-100 relative',
    image: 'w-full h-full object-cover transition-opacity duration-300',
    details: 'p-3 flex flex-col gap-2',
  },

  /* -------------------------------------------------------------
   * Filter Sidebar (RWD)
   * ------------------------------------------------------------- */
  filterSidebar: {
    container:
      'w-64 p-4 border-r border-neutral-200 h-screen bg-white ' +
      'fixed top-0 left-0 z-40 ' + // mobile: overlay
      'lg:sticky lg:top-0 lg:z-auto lg:bg-transparent lg:block', //desktop
    sectionWrap: 'border-b border-gray-200 pb-4 px-6',
    open: 'transition-transform duration-300 ease-in-out translate-x-0',
    close: 'transition-transform duration-300 ease-in-out -translate-x-full lg:translate-x-0',
    header: 'text-lg font-semibold mb-4 flex justify-between items-center text-neutral-900',
    sectionButton: 'flex justify-between w-full text-left font-medium py-2',
    sectionContent: 'pl-4',
    clearButton: 'mt-4 text-sm text-red-500 underline hover:text-red-600 transition-colors',
    closeButton: 'p-1 rounded-md hover:bg-gray-100',
    filterButton:
      'fixed top-4 left-4 z-50 flex items-center gap-2 ' +
      'bg-white border border-gray-300 rounded-md px-3 py-2 ' +
      'shadow-sm text-gray-900 text-sm font-medium hover:bg-gray-50 lg:hidden',
  },
  filterIcon: 'w-4 h-4 text-gray-900',
  filterText: 'text-gray-900 text-sm font-medium',

  /* -------------------------------------------------------------
   * Product Detail
   * ------------------------------------------------------------- */

  productDetails: {
    page:
      'min-h-screen bg-neutral-100 flex items-start justify-center ' +
      'px-2 py-4 ' +
      'md:px-6 md:py-10 lg:px-10',
    card:
      'w-full max-w-[360px] md:max-w-3xl lg:max-w-5xl ' +
      'bg-white rounded-2xl border border-neutral-200 shadow-sm ' +
      'px-4 py-5 md:px-6 md:py-6 lg:px-8 lg:py-8 ' +
      'grid grid-cols-1 gap-6 lg:grid-cols-2',
    galleryMain:
      'w-full aspect-[4/5] md:aspect-[4/5] bg-neutral-100 rounded-xl overflow-hidden ' +
      'flex items-center justify-center',
    galleryThumbs: 'mt-4 flex gap-3 overflow-x-auto',
    galleryThumbButton:
      'relative h-24 w-24 flex-shrink-0 rounded-lg overflow-hidden border ' +
      'border-transparent hover:border-profile-primary',
    galleryThumbButtonActive: 'border-profile-primary',

    //right side details
    titleBlock: 'flex flex-col gap-2',
    category: 'text-xs md:text-sm uppercase tracking-wide text-neutral-500',
    productName: 'text-xl md:text-2xl lg:text-3xl font-semibold text-neutral-900',
    description: 'text-sm text-neutral-600',
    ratingRow: 'mt-2 flex items-center gap-2 text-sm md:text-base',
    ratingNumber: 'text-neutral-700',
    ratingLink:
      'ml-3 text-xs md:text-sm font-medium text-primary underline-offset-2 hover:underline',
    priceRow: 'flex items-baseline gap-3',
    priceCurrent: 'text-2xl md:text-3xl font-semibold text-neutral-900',
    priceOld: 'text-sm md:text-base text-neutral-400 line-through',
    priceSection: 'flex flex-col gap-1 items-start',
    priceBadge:
      'inline-flex items-center rounded-sm bg-amber-100 px-2 py-0.5 ' +
      'text-[11px] font-semibold uppercase tracking-wide text-amber-700',
    sectionLabelRow: 'flex items-center justify-between',
    sectionLabel: 'text-sm font-medium text-neutral-900',
    sectionHint: 'text-xs text-neutral-500',
    colorSwatchesRow: 'flex flex-wrap gap-2',
    colorSwatchBase:
      'h-9 w-9 rounded-full border-2 flex items-center justify-center cursor-pointer ' +
      'focus:outline-none focus-visible:ring-2 focus-visible:ring-offset-2 focus-visible:ring-primary-600',
    colorSwatchSelected: 'border-primary-600',
    colorSwatchUnselected: 'border-transparent hover:border-neutral-300',
    colorInnerCircle: 'h-7 w-7 rounded-full',
    sizeButtonsRow: 'flex flex-wrap gap-2',
    sizeButtonBase: 'min-w-[3rem] px-3 py-2 rounded-lg border text-xs md:text-sm font-medium',
    sizeButtonSelected: 'border-profile-primary bg-white',
    sizeButtonNormal: 'border-neutral-200 bg-white text-neutral-900 hover:border-neutral-400',
    sizeButtonDisabled:
      'border-neutral-200 text-neutral-400 bg-neutral-50 cursor-not-allowed line-through',
    qtyRow: 'flex items-center gap-4',
    qtyBox: 'inline-flex items-center rounded-full border border-neutral-200 bg-white px-1 py-1',
    qtyButton:
      'h-8 w-8 rounded-full text-lg leading-none flex items-center justify-center ' +
      'disabled:opacity-40 disabled:cursor-not-allowed hover:bg-neutral-100',
    qtyValue: 'w-8 text-center text-sm font-medium text-neutral-900',
    stockText: 'text-xs text-neutral-500',
    addToCartButton:
      'mt-2 inline-flex items-center justify-center rounded-[5px] ' +
      'bg-profile-primary px-6 py-3 text-sm md:text-base font-medium text-white shadow-sm ' +
      'hover:bg-primary-700 disabled:bg-neutral-200 disabled:text-neutral-500 disabled:cursor-not-allowed',
    outOfStockText: 'text-xs text-red-600 mt-1',
    accordionWrapper: 'mt-6 pt-1',
    accordionItem: '',
    accordionButton:
      'w-full flex items-center justify-between px-4 py-3 text-sm font-medium text-left ' +
      'text-neutral-900 hover:bg-neutral-50',
    accordionBody: 'px-4 pb-3 text-sm text-neutral-600',
    accordionIconWrapper:
      'flex items-center justify-center h-6 w-6 rounded-full border border-neutral-300 bg-white',
    accordionIcon: 'text-xs leading-none text-neutral-700',
  },
};

const COLOR_CLASS_MAP = {
  green: 'bg-emerald-500',
  mint: 'bg-emerald-300',
  teal: 'bg-teal-500',
  blue: 'bg-blue-500',
  navy: 'bg-slate-800',
  black: 'bg-neutral-900',
  white: 'bg-white border border-neutral-300',
  brown: 'bg-amber-700',
  tan: 'bg-amber-500',
  yellow: 'bg-yellow-400',
  orange: 'bg-orange-500',
  red: 'bg-rose-500',
  purple: 'bg-violet-500',
  pink: 'bg-pink-400',
};

export { COLOR_CLASS_MAP };
export default theme;
