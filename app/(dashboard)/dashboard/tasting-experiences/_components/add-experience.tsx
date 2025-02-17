"use client";

import { Button } from "@/components/ui/button";
import { Dialog, DialogContent, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form"
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { CreateExperience, CreateExperienceSchema } from "@/lib/schemas";
import { Textarea } from "@/components/ui/textarea";
import { createTastingExperienceAction } from "@/actions/tasting-experiences";
import { CircleDashed } from "lucide-react";
import { useActionState } from "react";



const AddExperience = () => {

  const form = useForm<CreateExperience>({
    resolver: zodResolver(CreateExperienceSchema),
   
  });

  const [state, formAction, isPending] = useActionState(
    createTastingExperienceAction,
    null
  );

  return <Dialog>
    <DialogTrigger asChild>
      <Button>Add Experience</Button>
    </DialogTrigger>
    <DialogContent>
      <DialogTitle>Add Experience</DialogTitle>
      <Form {...form}>
        <form action={formAction} className="max-w-4xl space-y-4 px-4">
          <FormField
            control={form.control}
            name="name"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Name</FormLabel>
                <FormControl>
                  <Input
                    placeholder="Name of the experience"
                    className="bg-white"
                    {...field}
                  />
                </FormControl>
                <FormDescription>
                  This is the name of the tasting experience.
                </FormDescription>
                <FormMessage />
              </FormItem>
            )}
          />

          <div className="grid grid-cols-2 gap-4">
  <FormField
            control={form.control}
            name="type"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Type</FormLabel>
                <FormControl>
                  <Input
                    placeholder="Type of the experience"
                    className="bg-white"
                    {...field}
                  />
                </FormControl>
         
                <FormMessage />
              </FormItem>
            )}
          />          <FormField
          control={form.control}
          name="duration"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Duration</FormLabel>
              <FormControl>
                <Input
                  placeholder="Duration of the experience"
                  {...field}
                  className="bg-white"
                />
              </FormControl>
           
              <FormMessage />
            </FormItem>
          )}
        />
          </div>
        
          <FormField
            control={form.control}
            name="description"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Description</FormLabel>
                <FormControl>
                  <Textarea
                    placeholder="Description of the experience"
                    {...field}
                    className="bg-white"
                  />
                </FormControl>
        
                <FormMessage />
              </FormItem>
            )}
          />
          <div className="grid grid-cols-2 gap-6">
            <FormField
              control={form.control}
              name="servings"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Servings</FormLabel>
                  <FormControl>
                    <Input
                      placeholder="3 brandy glasses"
                      {...field}
                      className="bg-white"
                    />
                  </FormControl>
         
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="price"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Price</FormLabel>
                  <FormControl>
                    <Input
                      type="number"
                      placeholder="Price of the experience"
                      {...field}
                      className="bg-white"
                    />
                  </FormControl>
    
                  <FormMessage />
                </FormItem>
              )}
            />
          </div>


          <Button disabled={isPending} type="submit" className="relative">
            Add Tasting Experience
            {isPending && (
              <div className="absolute inset-0 flex items-center justify-center">
                <CircleDashed className="h-6 w-6 animate-spin" />
              </div>
            )}
          </Button>
        </form>
      </Form>
    </DialogContent>
  </Dialog>;
};
export default AddExperience;
