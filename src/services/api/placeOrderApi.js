import { rest } from "./rest";

export const placeOrderApi = body => rest.post("/order/add", body);
