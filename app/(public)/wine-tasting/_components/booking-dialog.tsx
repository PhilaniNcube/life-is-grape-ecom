"use client";

import { Button } from "@/components/ui/button";
import { Dialog, DialogContent, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import BookingForm from "../../tasting-experiences/_components/booking-form";
import { Id } from "@/convex/_generated/dataModel";

const BookingDialog = ({id}:{id:Id<"tasting_experiences">}) => {
  return <Dialog>
    <DialogTrigger asChild>
      <Button className="rounded-none" size="lg">Book Now</Button>
    </DialogTrigger>
    <DialogContent>
      <DialogTitle>Create a booking</DialogTitle>
      <BookingForm id={id} />
    </DialogContent>
  </Dialog>;
};
export default BookingDialog
