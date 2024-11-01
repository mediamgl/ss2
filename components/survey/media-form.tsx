"use client";

import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";
import { Button } from "@/components/ui/button";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
  FormDescription,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";

const formSchema = z.object({
  coverImage: z.string().url("Please enter a valid image URL"),
  founderImage: z.string().url("Please enter a valid image URL"),
  videoUrl: z.string().url("Please enter a valid video URL").optional(),
  socialMedia: z.object({
    twitter: z.string().url("Please enter a valid Twitter URL").optional(),
    linkedin: z.string().url("Please enter a valid LinkedIn URL").optional(),
    instagram: z.string().url("Please enter a valid Instagram URL").optional(),
  }),
});

export function MediaForm({ onNext, onBack, data }: any) {
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      coverImage: data?.coverImage || "",
      founderImage: data?.founderImage || "",
      videoUrl: data?.videoUrl || "",
      socialMedia: {
        twitter: data?.socialMedia?.twitter || "",
        linkedin: data?.socialMedia?.linkedin || "",
        instagram: data?.socialMedia?.instagram || "",
      },
    },
  });

  function onSubmit(values: z.infer<typeof formSchema>) {
    onNext(values);
  }

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
        <FormField
          control={form.control}
          name="coverImage"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Cover Image URL</FormLabel>
              <FormControl>
                <Input
                  placeholder="https://example.com/image.jpg"
                  {...field}
                />
              </FormControl>
              <FormDescription>
                A high-quality image representing your company or product
              </FormDescription>
              <FormMessage />
            </FormItem>
          )}
        />

        <FormField
          control={form.control}
          name="founderImage"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Founder Image URL</FormLabel>
              <FormControl>
                <Input
                  placeholder="https://example.com/founder.jpg"
                  {...field}
                />
              </FormControl>
              <FormDescription>
                A professional headshot or photo of yourself
              </FormDescription>
              <FormMessage />
            </FormItem>
          )}
        />

        <FormField
          control={form.control}
          name="videoUrl"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Video URL (Optional)</FormLabel>
              <FormControl>
                <Input
                  placeholder="https://youtube.com/watch?v=..."
                  {...field}
                />
              </FormControl>
              <FormDescription>
                A video introducing yourself or demonstrating your product
              </FormDescription>
              <FormMessage />
            </FormItem>
          )}
        />

        <div className="space-y-4">
          <h3 className="text-lg font-medium">Social Media Links</h3>
          <FormField
            control={form.control}
            name="socialMedia.twitter"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Twitter Profile</FormLabel>
                <FormControl>
                  <Input
                    placeholder="https://twitter.com/yourusername"
                    {...field}
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          <FormField
            control={form.control}
            name="socialMedia.linkedin"
            render={({ field }) => (
              <FormItem>
                <FormLabel>LinkedIn Profile</FormLabel>
                <FormControl>
                  <Input
                    placeholder="https://linkedin.com/in/yourusername"
                    {...field}
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          <FormField
            control={form.control}
            name="socialMedia.instagram"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Instagram Profile</FormLabel>
                <FormControl>
                  <Input
                    placeholder="https://instagram.com/yourusername"
                    {...field}
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
        </div>

        <div className="flex justify-between">
          <Button type="button" variant="outline" onClick={onBack}>
            Previous Step
          </Button>
          <Button type="submit">Next Step</Button>
        </div>
      </form>
    </Form>
  );
}