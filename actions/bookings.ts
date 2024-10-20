"use server";
import { api } from '@/convex/_generated/api';
import { Id } from '@/convex/_generated/dataModel';
import { CreateBookingSchema } from '@/lib/schemas';
import { fetchMutation } from 'convex/nextjs';
import { format } from 'date-fns';


// an action to create a booking for a wine experience
export async function createBookingAction(prevState:unknown, formData:FormData) {



  const validatedFields = CreateBookingSchema.safeParse({
    experience_id: formData.get('experience_id'),
    name: formData.get('name'),
    email: formData.get('email'),
    date: formData.get('date'),
    time: formData.get('time'),
    guests: Number(formData.get('guests')),
    paid: false,
  });



  if (!validatedFields.success) {

    return {status: 400, errors: validatedFields.error.flatten().fieldErrors };
  }

  const experienceId = validatedFields.data.experience_id as Id<"tasting_experiences">;
  // convert date formData to string
  const date = format(new Date(validatedFields.data.date), 'yyyy-MM-dd');


  const data = fetchMutation(api.bookings.createBooking, {
    experience_id: experienceId,
    name: validatedFields.data.name,
    email: validatedFields.data.email,
    date: date,
    time: validatedFields.data.time,
    guests: Number(validatedFields.data.guests),
    paid: validatedFields.data.paid,
  })

  return {status: 200, data: data};


}
