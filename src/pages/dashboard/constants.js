export const ID_COLUMN = "RFQ #";

export const STATUS_LEVELS = [
  { label: "New", slug: "new" },
  { label: "Quoted", slug: "quoted" },
  { label: "Awaiting PO", slug: "awaiting-po" },
  { label: "In Production", slug: "in-production" },
  { label: "Shipped", slug: "shipped" },
];

export const STATUS_OPTIONS = STATUS_LEVELS.map((s) => s.label);

export const CUSTOMER_STATUS_OPTIONS = ["New Customer", "Returning Customer"];
