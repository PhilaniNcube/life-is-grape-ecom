/* prettier-ignore-start */

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
import type * as brands from "../brands.js";
import type * as http from "../http.js";
import type * as tasting_experiences from "../tasting_experiences.js";
import type * as users from "../users.js";
import type * as wineries from "../wineries.js";
import type * as wines from "../wines.js";

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
  brands: typeof brands;
  http: typeof http;
  tasting_experiences: typeof tasting_experiences;
  users: typeof users;
  wineries: typeof wineries;
  wines: typeof wines;
}>;
export declare const api: FilterApi<
  typeof fullApi,
  FunctionReference<any, "public">
>;
export declare const internal: FilterApi<
  typeof fullApi,
  FunctionReference<any, "internal">
>;

/* prettier-ignore-end */
