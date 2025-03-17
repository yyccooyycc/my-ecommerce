const theme = {
  latestArrivals: {
    noProducts: "flex justify-center items-center text-xl text-gray-500",
    container:
      "w-full max-w-[1408px] mx-auto flex flex-col gap-8 px-4 sm:px-8 md:px-16 lg:px-24",
    header: "flex justify-between items-center w-full max-w-[1408px] mx-auto px-4 sm:px-8 md:px-16 lg:px-24",
    title: "font-semibold text-2xl sm:text-3xl text-neutral-900",
    viewAllButton:
      "flex justify-center items-center gap-1.5 bg-white px-4 py-2.5 rounded border border-neutral-200",
    viewAllText: "font-medium text-base text-neutral-900",
    gridWrapper: "w-full",
  },
  productGrid: {
    grid: "grid grid-cols-1 sm:grid-cols-2 md:grid-cols-2 lg:grid-cols-4 gap-6 sm:gap-8 md:gap-12 lg:gap-16 xl:gap-20",
  },
  productCard: {
      card: "w-full sm:w-[280px] flex flex-col transition-shadow duration-200",
      image: "w-full sm:w-[280px] h-[300px] object-cover rounded-lg",
      details: "flex flex-col gap-3 self-stretch h-[168px] py-4",
      color: "font-normal text-xs text-neutral-600 px-4",
      name: "font-medium text-lg text-neutral-900 px-4",
      price: "font-normal text-lg text-neutral-500",
      discount: "font-normal text-xs line-through text-neutral-600",
      colorOptions: "flex justify-start items-center gap-2 p-1 rounded",
      hoverShadow: "shadow-lg",
      outOfStockOverlay: "absolute top-0 left-0 w-full h-full bg-gray-400 opacity-50 flex justify-center items-center text-white font-bold",
      noImage: "h-40 bg-gray-200 flex items-center justify-center text-gray-500",
      priceDiscount: "text-red-500 ml-2 px-2",
      colorButton: "w-6 h-6 rounded-full cursor-pointer",
      colorButtonOutOfStock: "opacity-50 cursor-not-allowed",
      colorButtonSelected: "border-2 border-black",
    },
    colors: {
      primary: "#1E40AF",
      secondary: "#9333EA",
      neutral: {
        100: "#F5F5F5",
        200: "#E5E5E5",
        500: "#888888",
        900: "#333333",
      },
      success: "#28A745",
      error: "#DC3545",
    },
    spacing: {
      sm: "8px",
      md: "16px",
      lg: "32px",
      xl: "64px",
    },
    fontSize: {
      base: "16px",
      lg: "20px",
      xl: "24px",
    },
    borderRadius: {
      none: "0px",
      sm: "4px",
      md: "8px",
      lg: "16px",
    },
    extend: {
      screens: {
        'xs': '480px',
        'sm': '640px',
        'md': '768px',
        'lg': '1025px', //for ipad pro which is 1024*1366px will be squeezed into 4 cols if it's 1024
      },
    },
  };  

export default theme;