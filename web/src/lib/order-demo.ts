/** Browser demo persistence for order desk UX — replace with auth + API. */
export const LS_ORDERS_KEY = "ek-orders-demo-v1";

export type DemoOrder = {
  id: string;
  kitName: string;
  status: "processing" | "in_transit" | "delivered";
  placedAt: string;
};

export const DEMO_SEED_ORDERS: DemoOrder[] = [
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
