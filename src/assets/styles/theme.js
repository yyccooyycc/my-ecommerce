const theme = {
  shared: {
    header: "flex justify-between items-center",
    title: "font-semibold",
  },
  latestArrivals: {
    container: "px-6 py-10 max-w-7xl mx-auto",
    header: "flex justify-between items-center mb-6 w-full",
    title: "text-xl font-semibold",
    viewAllText: "font-medium",
    gridWrapper: "",
    grid: "grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6",
    noProducts: "text-center text-gray-500",
    viewAllButton:
    "inline-flex items-center px-4 py-2 rounded-md border border-gray-300 bg-gray-100 text-gray-800 hover:bg-gray-200 focus:outline-none focus:ring-2 focus:ring-gray-300",
  },

  productListing: {
    container: "flex-1 p-4 w-full",
    header: "mb-4 w-full",
    title: "text-lg font-semibold",
    grid: "grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-3 gap-6 sm:gap-8 md:gap-12 lg:gap-16",
    sortSelect: "border rounded px-3 py-2 text-sm bg-gray-100",
  },
  productCard: {
    card: "w-full sm:w-[280px] flex flex-col transition-shadow duration-200",
    image:
      "w-full sm:w-[280px] h-[300px] object-cover rounded-lg transition-opacity duration-300",
    skeleton:
      "absolute top-0 left-0 w-full h-[300px] bg-gray-200 animate-pulse rounded-lg",
    details: "flex flex-col gap-3 self-stretch h-[168px] py-4",
    color: "font-normal text-xs text-neutral-600 px-4",
    name: "font-medium text-lg text-neutral-900 px-4",
    price: "font-normal text-lg text-neutral-500",
    discount: "font-normal text-xs line-through text-neutral-600",
    colorOptions: "flex justify-start items-center gap-2 p-1 rounded",
    hoverShadow: "shadow-lg",
    outOfStockOverlay:
      "absolute top-0 left-0 w-full h-full bg-gray-400 opacity-50 flex justify-center items-center text-white font-bold",
    noImage:
      "w-full h-[300px] bg-gray-200 flex items-center justify-center text-gray-500 rounded-lg",
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
      xs: "480px",
      sm: "640px",
      md: "768px",
      lg: "1025px", //for ipad pro which is 1024*1366px will be squeezed into 4 cols if it's 1024
    },
  },
filterSidebar: {
 container: "w-64 p-4 border-r bg-gray-100 h-screen sticky top-0",
  header: "text-lg font-semibold mb-4",
  sectionButton: "flex justify-between w-full text-left font-medium py-2",
  sectionContent: "pl-4",
  colorButtonBase: "w-6 h-6 rounded-full border-2",
  colorButtonSelected: "border-black",
  colorButtonUnselected: "border-transparent",
  clearButton: "mt-4 text-sm text-red-500 underline",
},
};

export default theme;
