/* eslint-disable */
/**
 * Generated `api` utility.
 *
 * THIS CODE IS AUTOMATICALLY GENERATED.
 *
 * To regenerate, run `npx convex dev`.
 * @module
 */

import type {
  ApiFromModules,
  FilterApi,
  FunctionReference,
} from "convex/server";
import type * as bookings from "../bookings.js";
import type * as categories from "../categories.js";
import type * as gifts from "../gifts.js";
import type * as http from "../http.js";
import type * as orders from "../orders.js";
import type * as producers from "../producers.js";
import type * as products from "../products.js";
import type * as tasting_experiences from "../tasting_experiences.js";
import type * as users from "../users.js";

/**
 * A utility for referencing Convex functions in your app's API.
 *
 * Usage:
 * ```js
 * const myFunctionReference = api.myModule.myFunction;
 * ```
 */
declare const fullApi: ApiFromModules<{
  bookings: typeof bookings;
  categories: typeof categories;
  gifts: typeof gifts;
  http: typeof http;
  orders: typeof orders;
  producers: typeof producers;
  products: typeof products;
  tasting_experiences: typeof tasting_experiences;
  users: typeof users;
}>;
export declare const api: FilterApi<
  typeof fullApi,
  FunctionReference<any, "public">
>;
export declare const internal: FilterApi<
  typeof fullApi,
  FunctionReference<any, "internal">
>;
