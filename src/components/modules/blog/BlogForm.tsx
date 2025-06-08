"use client";
import { useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";
import { cn } from "@/lib/utils";
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

import { firestore, storage } from "@/lib/firebase";
import { addDoc, collection, updateDoc, doc } from "firebase/firestore";
import { ref, uploadString, getDownloadURL } from "firebase/storage";

import slugify from "slugify";
import { getCurrentDate } from "@/lib/date";
import { toast } from "sonner";

const formSchema = z.object({
  title: z.string().min(1, "Title is required"),
  content: z.string().min(1, "Content is required"),
});

type FormValues = z.infer<typeof formSchema>;

export default function BlogForm() {
  const [coverPhoto, setCoverPhoto] = useState<string>("");
  const [uploading, setUploading] = useState(false);

  const form = useForm<FormValues>({
    resolver: zodResolver(formSchema),
    defaultValues: { title: "", content: "" },
  });

  // Чтение файла для coverPhoto
  const handleFileReader = (e: React.ChangeEvent<HTMLInputElement>) => {
    const reader = new FileReader();
    const file = e.target.files?.[0];
    if (file) {
      reader.readAsDataURL(file);
      reader.onload = () => {
        if (reader.result) setCoverPhoto(reader.result as string);
      };
    }
  };

  const handleCreatePost = form.handleSubmit(async (values) => {
    setUploading(true);
    try {
      // Создать документ
      const docRef = await addDoc(collection(firestore, "posts"), {
        title: values.title,
        content: values.content,
        pub_date: getCurrentDate(),
        slug: slugify(values.title, { lower: true }),
        comments: [],
      });

      if (coverPhoto) {
        const imageRef = ref(storage, `posts/${docRef.id}/cover`);
        await uploadString(imageRef, coverPhoto, "data_url");
        const url = await getDownloadURL(imageRef);
        await updateDoc(doc(firestore, "posts", docRef.id), { image_url: url });
      }

      toast("Post created successfully!");
    } catch (error) {
      console.error(error);
      toast("Failed to create post. Please try again.");
    } finally {
      setUploading(false);
    }
  });

  return (
    <Form {...form}>
      <form
        onSubmit={handleCreatePost}
        className="space-y-8 max-w-3xl mx-auto py-10"
      >
        {/* Title Field */}
        <FormField
          control={form.control}
          name="title"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Title</FormLabel>
              <FormControl>
                <Input
                  placeholder="Enter title"
                  {...field}
                  disabled={uploading}
                />
              </FormControl>
              <FormDescription>This is your post title.</FormDescription>
              <FormMessage />
            </FormItem>
          )}
        />

        {/* Content Field (Rich Text/Markdown) */}
        <FormField
          control={form.control}
          name="content"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Content</FormLabel>
              <FormControl>
                <Textarea
                  placeholder="Write your post content here..."
                  rows={10}
                  {...field}
                  disabled={uploading}
                />
              </FormControl>
              <FormDescription>This is the body of your post.</FormDescription>
              <FormMessage />
            </FormItem>
          )}
        />

        {/* Cover Photo Upload */}
        <FormItem>
          <FormLabel>Cover Photo</FormLabel>
          <FormControl>
            <Input
              type="file"
              accept="image/*"
              onChange={handleFileReader}
              disabled={uploading}
            />
          </FormControl>
          <FormDescription>Select an image for your post.</FormDescription>
        </FormItem>

        <Button
          type="submit"
          disabled={uploading}
          className={cn(uploading ? "opacity-50" : "")}
        >
          {uploading ? "Uploading..." : "Create Post"}
        </Button>
      </form>
    </Form>
  );
}
