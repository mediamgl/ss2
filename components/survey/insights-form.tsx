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
} from "@/components/ui/form";
import { Textarea } from "@/components/ui/textarea";

const formSchema = z.object({
  problem: z.string().min(50, "Please provide at least 50 characters"),
  solution: z.string().min(50, "Please provide at least 50 characters"),
  challenges: z.string().min(50, "Please provide at least 50 characters"),
  lessons: z.string().min(50, "Please provide at least 50 characters"),
  advice: z.string().min(50, "Please provide at least 50 characters"),
});

export function InsightsForm({ onNext, onBack, data }: any) {
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      problem: data?.problem || "",
      solution: data?.solution || "",
      challenges: data?.challenges || "",
      lessons: data?.lessons || "",
      advice: data?.advice || "",
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
          name="problem"
          render={({ field }) => (
            <FormItem>
              <FormLabel>What problem does your company solve?</FormLabel>
              <FormControl>
                <Textarea
                  placeholder="Describe the problem you identified..."
                  className="min-h-[120px]"
                  {...field}
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        <FormField
          control={form.control}
          name="solution"
          render={({ field }) => (
            <FormItem>
              <FormLabel>How does your solution address this problem?</FormLabel>
              <FormControl>
                <Textarea
                  placeholder="Explain your unique approach..."
                  className="min-h-[120px]"
                  {...field}
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        <FormField
          control={form.control}
          name="challenges"
          render={({ field }) => (
            <FormItem>
              <FormLabel>
                What were the biggest challenges you faced?
              </FormLabel>
              <FormControl>
                <Textarea
                  placeholder="Share your main obstacles..."
                  className="min-h-[120px]"
                  {...field}
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        <FormField
          control={form.control}
          name="lessons"
          render={({ field }) => (
            <FormItem>
              <FormLabel>What are your key learnings so far?</FormLabel>
              <FormControl>
                <Textarea
                  placeholder="Share your most important lessons..."
                  className="min-h-[120px]"
                  {...field}
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        <FormField
          control={form.control}
          name="advice"
          render={({ field }) => (
            <FormItem>
              <FormLabel>
                What advice would you give to other founders?
              </FormLabel>
              <FormControl>
                <Textarea
                  placeholder="Share your wisdom..."
                  className="min-h-[120px]"
                  {...field}
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

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