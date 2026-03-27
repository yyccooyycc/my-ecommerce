const checkoutTheme = {
  page: 'bg-[#f7f7f8] min-h-screen py-8 md:py-10 print:bg-white print:py-0',
  container: 'mx-auto max-w-[1440px] px-4 sm:px-6 lg:px-8',
  panel:
    'rounded-[24px] border border-neutral-200 bg-white px-5 py-6 shadow-[0_1px_2px_rgba(0,0,0,0.04)] sm:px-8 sm:py-8 lg:px-10 lg:py-10 print:shadow-none print:border-0 print:px-0 print:py-0',

  layout: 'grid grid-cols-1 gap-8 xl:grid-cols-[1.05fr_0.95fr] print:grid-cols-1',
  left: 'min-w-0',
  right: 'min-w-0 xl:border-l xl:border-neutral-200 xl:pl-8 print:border-0 print:pl-0',

  backLink:
    'inline-flex items-center gap-2 text-sm font-medium text-indigo-600 transition hover:text-indigo-700 print:hidden',
  title: 'mt-8 text-4xl font-semibold tracking-tight text-neutral-900',
  section: 'mt-10 border-t border-neutral-200 pt-8',
  firstSection: 'mt-8 pt-0',
  sectionTitle: 'text-[18px] font-semibold text-neutral-800',

  formGrid: 'mt-6 grid grid-cols-1 gap-4 md:grid-cols-2',
  fieldGroup: 'flex flex-col gap-2',
  full: 'md:col-span-2',

  label: 'text-sm font-medium text-neutral-700',
  input:
    'h-12 w-full rounded-[10px] border border-neutral-200 bg-white px-4 text-[15px] text-neutral-900 outline-none transition placeholder:text-neutral-400 focus:border-indigo-500',
  select:
    'h-12 w-full rounded-[10px] border border-neutral-200 bg-white px-4 text-[15px] text-neutral-900 outline-none transition focus:border-indigo-500',
  cardInputWrap:
    'flex h-12 items-center gap-3 rounded-[10px] border border-neutral-200 bg-white px-4 focus-within:border-indigo-500',
  cardIcon: 'text-lg',
  cardInput:
    'w-full border-0 bg-transparent p-0 text-[15px] text-neutral-900 outline-none placeholder:text-neutral-400',

  shippingOptions: 'mt-6 grid grid-cols-1 gap-4 md:grid-cols-2',
  shippingCard: 'relative rounded-[12px] border border-neutral-200 bg-white p-4 transition',
  shippingCardActive: 'relative rounded-[12px] border-2 border-indigo-500 bg-white p-4 shadow-sm',
  shippingTop: 'flex items-start justify-between gap-3',
  shippingName: 'text-[15px] font-semibold text-neutral-900',
  shippingDays: 'mt-1 text-sm text-neutral-500',
  shippingPrice: 'mt-5 text-[15px] font-semibold text-neutral-900',
  radioCircle: 'flex h-5 w-5 items-center justify-center rounded-full border border-neutral-300',
  radioCircleActive:
    'flex h-5 w-5 items-center justify-center rounded-full bg-indigo-500 text-white text-[11px]',

  summaryTitle: 'text-[18px] font-semibold text-neutral-900',
  summaryList: 'mt-6',
  summaryItem: 'flex gap-4 py-6 border-b border-dashed border-neutral-200',
  summaryImage: 'h-20 w-20 rounded-[12px] object-cover bg-neutral-100',
  summaryInfo: 'min-w-0 flex-1',
  summaryRow: 'flex items-start justify-between gap-4',
  summaryName: 'text-[16px] font-semibold text-neutral-900',
  summaryCurrentPrice: 'text-[15px] font-semibold text-neutral-900',
  summaryOldPrice: 'mt-3 text-[15px] text-neutral-400 line-through',
  summaryMeta: 'mt-2 text-sm text-neutral-500',
  summaryQty: 'mt-2 text-sm text-neutral-600',

  totals: 'mt-6 space-y-4',
  totalRow: 'flex items-center justify-between text-[15px] text-neutral-600',
  totalStrong: 'font-semibold text-neutral-900',
  coupon:
    'inline-flex items-center rounded-full border border-indigo-200 bg-indigo-50 px-3 py-1 text-xs font-medium text-indigo-600',
  totalWrap: 'mt-10 border-t border-neutral-200 pt-8',
  totalBigLabel: 'text-[20px] font-semibold text-neutral-900',
  totalBigValue: 'text-[28px] font-semibold tracking-tight text-neutral-900',

  confirmButton:
    'mt-8 inline-flex h-12 w-full items-center justify-center rounded-[10px] bg-indigo-600 px-6 text-sm font-semibold text-white transition hover:bg-indigo-700',
  ghostButton:
    'mt-3 inline-flex h-12 w-full items-center justify-center rounded-[10px] border border-neutral-300 bg-white px-6 text-sm font-semibold text-neutral-900 transition hover:bg-neutral-50 print:hidden',

  emptyState: 'rounded-[24px] border border-neutral-200 bg-white px-6 py-16 text-center shadow-sm',
  emptyTitle: 'text-2xl font-semibold text-neutral-900',
  emptyText: 'mt-3 text-sm text-neutral-500',
};

export default checkoutTheme;
