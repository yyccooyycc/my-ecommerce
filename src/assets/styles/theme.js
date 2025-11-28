const theme = {
  /* -------------------------------------------------------------
   * Design tokens
   * ------------------------------------------------------------- */
  colors: {
    primary: '#1E40AF',
    secondary: '#9333EA',
    neutral: {
      100: '#F5F5F5',
      200: '#E5E5E5',
      500: '#888888',
      900: '#333333',
    },
    success: '#28A745',
    error: '#DC3545',
  },

  /* -------------------------------------------------------------
   * Spacing / Font / Radius
   * ------------------------------------------------------------- */
  spacing: {
    sm: '8px',
    md: '16px',
    lg: '32px',
    xl: '64px',
  },
  fontSize: {
    base: '16px',
    lg: '20px',
    xl: '24px',
  },
  borderRadius: {
    none: '0px',
    sm: '4px',
    md: '8px',
    lg: '16px',
  },

  /* -------------------------------------------------------------
   * Screens / Breakpoints
   * ------------------------------------------------------------- */
  extend: {
    screens: {
      xs: '480px',
      sm: '640px',
      md: '768px',
      lg: '1025px',
      xl: '1440px',
    },
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
    root:
      'min-h-screen bg-slate-50 text-slate-900 ' +
      'flex items-center justify-center px-4 py-8 sm:px-6 md:px-8',

    section: 'w-full max-w-sm sm:max-w-md',

    card:
      'mx-auto flex flex-col items-center text-center ' +
      'rounded-2xl bg-white shadow-lg ' +
      'px-8 py-8 sm:px-10 sm:py-9 gap-4 sm:gap-5',

    avatarWrapper:
      'h-16 w-16 sm:h-20 sm:w-20 rounded-full overflow-hidden ' + 'border-2 border-indigo-600',

    avatar: 'h-full w-full object-cover',

    name: 'text-lg sm:text-xl font-semibold text-slate-900',

    role: 'text-xs sm:text-sm text-slate-500',

    bio: 'mt-1 text-xs sm:text-sm leading-relaxed ' + 'text-slate-500 max-w-xs',

    ctaButton:
      'mt-3 w-full rounded-full ' +
      'bg-indigo-600 text-white ' +
      'text-sm sm:text-base font-medium ' +
      'py-2.5 sm:py-3 shadow-sm ' +
      'transition-colors ' +
      'hover:bg-indigo-700 ' +
      'focus-visible:outline-none ' +
      'focus-visible:ring-2 ' +
      'focus-visible:ring-indigo-600 ' +
      'focus-visible:ring-offset-2 ' +
      'focus-visible:ring-offset-white',

    socialNav: 'mt-3 flex items-center justify-center ' + 'gap-4 sm:gap-5',

    socialLink:
      'flex h-9 w-9 items-center justify-center ' +
      'rounded-full ' +
      'bg-indigo-50 text-indigo-600 text-lg ' +
      'transition-colors ' +
      'hover:bg-indigo-600 hover:text-white ' +
      'focus-visible:outline-none ' +
      'focus-visible:ring-2 ' +
      'focus-visible:ring-indigo-600 ' +
      'focus-visible:ring-offset-2 ' +
      'focus-visible:ring-offset-white',
  },

  /* -------------------------------------------------------------
   * Product Listing
   * ------------------------------------------------------------- */
  productListing: {
    container: 'flex-1 px-4 md:px-8 lg:px-8 xl:px-8 ' + 'w-full max-w-[1280px] mx-auto box-border',
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
    colorButton: 'w-6 h-6 rounded-full cursor-pointer',
    colorButtonOutOfStock: 'opacity-50 cursor-not-allowed',
    colorButtonSelected: 'border-2 border-black',
  },

  /* -------------------------------------------------------------
   * Product Grid
   * ------------------------------------------------------------- */
  productGrid: {
    container:
      'grid gap-4 md:gap-8 grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 ' +
      'w-full transition-all duration-300 ease-in-out',
    card:
      'bg-white rounded-lg overflow-hidden shadow-sm ' +
      'border border-neutral-200 hover:shadow-md ' +
      'transition-all duration-200',
    imageWrapper: 'w-full aspect-square overflow-hidden bg-neutral-100',
    image: 'w-full h-full object-cover',
    details: 'p-3 flex flex-col gap-1',
    colorDot: 'w-3 h-3 rounded-full inline-block border',
    title: 'text-sm font-medium text-gray-800 truncate',
    price: 'text-sm text-gray-600',
  },

  /* -------------------------------------------------------------
   * Filter Sidebar (RWD)
   * ------------------------------------------------------------- */
  filterSidebar: {
    container: 'w-64 p-4 border-r border-neutral-200 h-screen sticky top-0 bg-transparent',
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
};

export default theme;
