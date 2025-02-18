"use client";

import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { useMutation } from "convex/react";
import { api } from "@/convex/_generated/api";
import { CreateBannerSchema } from "@/lib/schemas";
import { useState } from "react";
import { Button } from "@/components/ui/button";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import type { CreateBanner } from "@/lib/schemas";
import { useRouter } from "next/navigation";


const CreatePromotionalBanner = () => {
  const createBanner = useMutation(api.banner.createBanner);
  const [isLoading, setIsLoading] = useState(false);
  const generateUploadUrl = useMutation(api.banner.generateUploadUrl);

  const router = useRouter();

  const form = useForm<CreateBanner>({
    resolver: zodResolver(CreateBannerSchema),
    defaultValues: {
      title: "",
      subtitle: "",
      link: "",
      image: "",
    },
  });

  const onSubmit = async (data: CreateBanner) => {
    setIsLoading(true);
    try {
      
      // Handle image upload first
      if (!data.image) {
        throw new Error("Image is required");
      }

      const uploadUrl = await generateUploadUrl();

      const result = await fetch(uploadUrl, {
        method: "POST",
        headers: { "Content-Type": "image/*" },
        body: data.image,
      });
      const { storageId } = await result.json();

      // Create banner with the uploaded image
      await createBanner({
        title: data.title,
        subtitle: data.subtitle,
        link: data.link,
        image: storageId,
      });

   

      form.reset();
    } catch (error) {
      console.error(error);
    } finally {
      setIsLoading(false);
      router.refresh();
    }
  };

  return (
    <div className="max-w-2xl mx-auto p-6">
      <h2 className="text-2xl font-bold mb-6">Create Promotional Banner</h2>
      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
          <FormField
            control={form.control}
            name="title"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Title</FormLabel>
                <FormControl>
                  <Input placeholder="Enter banner title" {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          <FormField
            control={form.control}
            name="subtitle"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Subtitle</FormLabel>
                <FormControl>
                  <Input placeholder="Enter banner subtitle" {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          <FormField
            control={form.control}
            name="link"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Link</FormLabel>
                <FormControl>
                  <Input placeholder="Enter banner link" {...field} />
                </FormControl>
                <FormMessage>
                  <p className="text-sm text-gray-500">
                    This is the link that the banner will redirect to when
                    clicked.
                  </p>
                </FormMessage>
              </FormItem>
            )}
          />

          <FormField
            control={form.control}
            name="image"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Banner Image</FormLabel>
                <FormControl>
                  <Input type="file" {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          <Button type="submit" disabled={isLoading}>
            {isLoading ? "Creating..." : "Create Banner"}
          </Button>
        </form>
      </Form>
    </div>
  );
};

export default CreatePromotionalBanner;