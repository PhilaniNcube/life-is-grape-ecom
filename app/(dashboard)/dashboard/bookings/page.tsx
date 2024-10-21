import { api } from "@/convex/_generated/api";
import { Doc } from "@/convex/_generated/dataModel";
import { fetchQuery } from "convex/nextjs";
import UpcomingBookings from "./_components/upcoming-bookings";

export type BookingWithExperience = Doc<'bookings'> & {
  experience_name: string | undefined
}

const DashboardBookingPage = async () => {

  const bookings: BookingWithExperience[] = await fetchQuery(
    api.bookings.getBookings
  )

  console.log(bookings)

  return <div>
    <UpcomingBookings bookings={bookings} />
  </div>;
};
export default DashboardBookingPage;
