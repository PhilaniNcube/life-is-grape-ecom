"use server";

import { api } from "@/convex/_generated/api";
import { Id } from "@/convex/_generated/dataModel";
import { fetchMutation } from "convex/nextjs";
import { revalidatePath } from "next/cache";
import "server-only";
import {z} from 'zod';

const CreateWinerySchema = z.object({
  name: z.string(),
  location: z.string(),
  description: z.string(),
  image: z.string(),
});


export async function createWineryAction(prevState:unknown, formData:FormData) {

  const validatedFields = CreateWinerySchema.safeParse({
    name: formData.get('name'),
    location: formData.get('location'),
    description: formData.get('description'),
    image: formData.get('image'),
  });

  if (!validatedFields.success) {
    return {
      status: 400,
      message: 'Invalid input',
      errors: validatedFields.error.flatten().fieldErrors,
    }
  }

  const {name, location, description, image} = validatedFields.data;

  const storageId = image as Id<"_storage">

  const data = await fetchMutation(api.wineries.createWinery, {
    name,
    location,
    description,
    image: storageId,
  })

    revalidatePath('/dashboard/brands')
    revalidatePath('/dashboard', 'layout')

  return {
    status: 200,
    message: 'Winery created successfully',
    data,
  }


}
