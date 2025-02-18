"use client";

import { Doc } from '@/convex/_generated/dataModel';
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { useMutation, useQuery } from "convex/react";
import { api } from "@/convex/_generated/api";
import { UpdateBannerSchema } from "@/lib/schemas";
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
import Image from "next/image";
import { useRouter } from "next/navigation";
import BannerUpload from './banner-upload';

const UpdatePromotionalBanner = ({
  banner,
}: {
  banner: Doc<'banner'> 
}) => {

  const bannerImage = useQuery(api.banner.getBannerImage, {
    id: banner.image,
  });
  const updateBanner = useMutation(api.banner.updateBanner);
  const generateUploadUrl = useMutation(api.banner.generateUploadUrl);
  const [isLoading, setIsLoading] = useState(false);
  const [previewImage, setPreviewImage] = useState<string>(banner.image);
  const router = useRouter();

  const form = useForm({
    resolver: zodResolver(UpdateBannerSchema),
    defaultValues: {
      id: banner._id,
      title: banner.title,
      subtitle: banner.subtitle,
      link: banner.link,
      image: banner.image,
    },
  });

  const onSubmit = async (data: any) => {
    setIsLoading(true);
    try {
      
      let imageId = banner.image;

      // Only upload new image if one was selected
      if (data.image instanceof File) {
        const uploadUrl = await generateUploadUrl();
        const result = await fetch(uploadUrl, {
          method: "POST",
          headers: { "Content-Type": "image/*" },
          body: data.image,
        });
        const { storageId } = await result.json();
        imageId = storageId;
      }

      await updateBanner({
        id: banner._id,
        title: data.title,
        subtitle: data.subtitle,
        link: data.link,
        image: imageId,
      });

      router.refresh();
    } catch (error) {
      console.error(error);
    } finally {
      setIsLoading(false);
    }
  };

  const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      const imageUrl = URL.createObjectURL(file);
      setPreviewImage(imageUrl);
      form.setValue('image', file as any);
    }
  };

  return (
    <div className="flex space-x-6">
    <div className="max-w-2xl flex-1 p-6">
      <h2 className="text-2xl font-bold mb-6">Update Promotional Banner</h2>
      
   

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
                <FormMessage />
              </FormItem>
            )}
          />

          <Button type="submit" disabled={isLoading}>
            {isLoading ? "Updating..." : "Update Banner"}
          </Button>
        </form>
      </Form>
    </div>
       <div className="mb-6 p-6">
            <h3 className="text-xl font-bold mb-2">Current Banner Image:</h3>
            <BannerUpload banner_id={banner._id} image_id={banner.image} />
          </div>
    </div>
  );
};

export default UpdatePromotionalBanner;
