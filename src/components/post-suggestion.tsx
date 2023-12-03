"use client";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import * as z from "zod";

import axios from "axios";

import { Button } from "@/components/ui/button";
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import qs from "query-string";

const formSchema = z.object({
  title: z.string().min(2, {
    message: "Title must be at least 2 characters.",
  }),
  suggestion: z.string().min(2, {
    message: "Suggestion must be at least 2 characters.",
  }),
});

export function PostSuggestion() {
  // 1. Define your form.
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      title: "",
      suggestion: "",
    },
  });

  // 2. Define a submit handler.
  async function onSubmit(values: z.infer<typeof formSchema>) {
    // Do something with the form values.
    // ✅ This will be type-safe and validated.
    try {
      const url = qs.stringifyUrl({
        url: "/api/suggestions",
      });
      await axios.post(url, null, {
        params: {
          title: values.title,
          suggestion: values.suggestion,
        },
      });
      form.reset();
    } catch (error) {
      console.error("Error submitting form:", error);
    }
  }

  return (
    <Form {...form}>
      <form
        onSubmit={form.handleSubmit(onSubmit)}
        className="space-y-8 border p-2 bg-slate-100"
      >
        <FormField
          control={form.control}
          name="title"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Title</FormLabel>
              <FormControl>
                <Input placeholder="Fantastic suggestion" {...field} />
              </FormControl>
              <FormDescription>
                This is the title of your suggestion.
              </FormDescription>
              <FormMessage />
            </FormItem>
          )}
        />

        <FormField
          control={form.control}
          name="suggestion"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Suggestion</FormLabel>
              <FormControl>
                <Textarea placeholder="Fantastic suggestion" {...field} />
              </FormControl>
              <FormDescription>This is your suggestion.</FormDescription>
              <FormMessage />
            </FormItem>
          )}
        />

        <Button variant="secondary" type="submit">
          Submit
        </Button>
      </form>
    </Form>
  );
}
