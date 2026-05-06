/** Local persistence for the order desk until authenticated order APIs are available. */
export const LS_ORDERS_KEY = "ek-orders-local-v1";

export type LocalOrder = {
  id: string;
  kitName: string;
  status: "processing" | "in_transit" | "delivered";
  placedAt: string;
};

/** Initial rows on first visit—kit names match the catalog. */
export const INITIAL_LOCAL_ORDERS: LocalOrder[] = [
  {
    id: "EK-20481",
    kitName: "Signal Lab",
    status: "in_transit",
    placedAt: new Date(Date.now() - 86400000 * 2).toISOString(),
  },
  {
    id: "EK-20490",
    kitName: "Design Sprint Kit",
    status: "processing",
    placedAt: new Date(Date.now() - 86400000 * 5).toISOString(),
  },
];
