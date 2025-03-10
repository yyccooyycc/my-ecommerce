const theme = {
    productGrid: {
      container: "w-[1408px] flex flex-col gap-16 p-24",
      title: "font-semibold text-3xl text-neutral-900",
      viewAllButton:
        "flex justify-center items-center gap-1.5 bg-white px-4 py-2.5 rounded border-[0.5px] border-solid border-neutral-200",
      viewAllText: "font-medium text-base text-neutral-900",
    },
    productCard: {
      card: "w-[280px] flex flex-col",
      image: "w-[280px] h-[300px] object-cover rounded-lg",
      details: "flex flex-col gap-3 self-stretch h-[168px] py-4",
      color: "font-normal text-xs text-neutral-600",
      name: "font-medium text-lg text-neutral-900",
      price: "font-normal text-lg text-neutral-500",
      discount: "font-normal text-xs strikethrough text-neutral-600",
      colorOptions: "flex justify-center items-center gap-2 p-1 rounded",
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
      },
    },
  };  

export default theme;