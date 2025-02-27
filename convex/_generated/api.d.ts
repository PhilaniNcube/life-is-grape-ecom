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
import type * as banner from "../banner.js";
import type * as bookings from "../bookings.js";
import type * as buttons from "../buttons.js";
import type * as categories from "../categories.js";
import type * as contact_form_submissions from "../contact_form_submissions.js";
import type * as custom_label_messages from "../custom_label_messages.js";
import type * as gifts from "../gifts.js";
import type * as gift_vouchers from "../gift_vouchers.js";
import type * as http from "../http.js";
import type * as orders from "../orders.js";
import type * as order_items from "../order_items.js";
import type * as personalised_labels from "../personalised_labels.js";
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
  banner: typeof banner;
  bookings: typeof bookings;
  buttons: typeof buttons;
  categories: typeof categories;
  contact_form_submissions: typeof contact_form_submissions;
  custom_label_messages: typeof custom_label_messages;
  gifts: typeof gifts;
  gift_vouchers: typeof gift_vouchers;
  http: typeof http;
  orders: typeof orders;
  order_items: typeof order_items;
  personalised_labels: typeof personalised_labels;
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
