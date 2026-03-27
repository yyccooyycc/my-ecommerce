const orderSuccessTheme = {
  page: 'bg-neutral-950 px-4 py-8 sm:px-6 lg:px-8',
  container: 'mx-auto max-w-6xl',
  shell: 'rounded-[24px] bg-neutral-100 p-3 shadow-[0_24px_80px_rgba(0,0,0,0.18)] sm:p-5 lg:p-8',
  card: 'overflow-hidden rounded-[20px] border border-neutral-200 bg-white',
  layout: 'grid lg:grid-cols-[1.05fr_1fr]',
  mediaWrap: 'hidden bg-neutral-100 lg:block',
  media: 'h-full w-full object-cover',
  content: 'p-6 sm:p-8',
  heading: 'text-3xl font-semibold tracking-tight text-neutral-900',
  subheading: 'mt-2 max-w-xl text-sm leading-6 text-neutral-500',
  orderMeta: 'mt-6',
  orderMetaLabel: 'text-xs font-medium uppercase tracking-[0.18em] text-neutral-400',
  orderMetaValue: 'mt-2 inline-flex items-center gap-2 text-sm font-medium text-indigo-600',
  copyIcon:
    'inline-flex h-5 w-5 items-center justify-center rounded-md border border-indigo-200 bg-indigo-50 text-[11px] text-indigo-600',
  itemList: 'mt-6 divide-y divide-neutral-200 rounded-2xl border border-neutral-200 bg-white',
  itemRow: 'flex items-start gap-4 p-4',
  itemImage: 'h-16 w-16 rounded-xl object-cover ring-1 ring-neutral-200',
  itemInfo: 'min-w-0 flex-1',
  itemTop: 'flex items-start justify-between gap-4',
  itemName: 'text-sm font-semibold text-neutral-900',
  itemMeta: 'mt-1 text-sm text-neutral-500',
  itemQty: 'mt-1 text-xs text-neutral-400',
  itemPriceWrap: 'text-right',
  itemSalePrice: 'text-sm font-semibold text-neutral-900',
  itemListPrice: 'mt-1 text-sm text-neutral-400 line-through',
  totals: 'mt-6 space-y-4 border-t border-neutral-200 pt-6',
  totalRow: 'flex items-center justify-between gap-4 text-sm text-neutral-600',
  totalStrong: 'font-medium text-neutral-900',
  couponBadge:
    'inline-flex items-center rounded-full bg-indigo-50 px-2.5 py-1 text-[11px] font-medium text-indigo-600',
  grandTotalRow: 'flex items-center justify-between gap-4 border-t border-neutral-200 pt-4',
  grandTotalLabel: 'text-sm font-medium text-neutral-900',
  grandTotalValue: 'text-2xl font-semibold tracking-tight text-neutral-900',
  infoGrid: 'mt-6 grid gap-6 border-t border-neutral-200 pt-6 sm:grid-cols-2',
  infoBlock: 'space-y-2',
  infoTitle: 'text-xs font-medium uppercase tracking-[0.18em] text-neutral-400',
  infoText: 'text-sm leading-6 text-neutral-600',
  paymentRow: 'flex items-center gap-3',
  paymentBadge:
    'inline-flex rounded-md border border-blue-200 bg-blue-50 px-2 py-1 text-xs font-semibold tracking-wide text-blue-700',
  actionRow: 'mt-8',
  actionButton:
    'inline-flex w-full items-center justify-center rounded-xl border border-neutral-200 bg-white px-4 py-3 text-sm font-medium text-neutral-900 transition hover:bg-neutral-50',
  emptyState:
    'mx-auto max-w-xl rounded-[24px] border border-dashed border-neutral-300 bg-white px-6 py-12 text-center shadow-sm',
  emptyTitle: 'text-2xl font-semibold text-neutral-900',
  emptyText: 'mt-2 text-sm leading-6 text-neutral-500',
  emptyButton:
    'mt-6 inline-flex items-center justify-center rounded-xl bg-neutral-900 px-5 py-3 text-sm font-medium text-white transition hover:bg-neutral-800',
};

export default orderSuccessTheme;
