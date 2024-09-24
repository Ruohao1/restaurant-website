"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { z } from "zod";

import { toast } from "@/hooks/use-toast";
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
import { Toaster } from "@/components/ui/toaster";
import { CalendarIcon } from "lucide-react";
import Header from "@/components/Header";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { cn } from "@/lib/utils";
import { format } from "date-fns";
import { Calendar } from "@/components/ui/calendar";
import config from "@/constants/config";
import { Textarea } from "@/components/ui/textarea";

const FormSchema = z
  .object({
    name: z.string().min(2, {
      message: "Username must be at least 2 characters.",
    }),
    date: z.date({
      required_error: "Date required",
    }),
    time: z.string().regex(/^(0[0-9]|1[0-9]|2[0-3]):[0-5][0-9]$/, {
      message: "Time must be in the format HH:MM",
    }),
    guests: z.string(),
    email: z.string().email().optional(),
    phone: z
      .string()
      .regex(/^[0-9]+$/, "Phone number is not valid")
      .optional(),
    message: z.string().optional(),
  })
  .refine((data) => data.email || data.phone, {
    message: "Either email or phone is required",
    path: ["email", "phone"], // This can be used to show the error on both fields
  });

interface ReservationProps {
  params: {
    lng: string;
  };
}

const Reservation: React.FC<ReservationProps> = ({ params: { lng } }) => {
  const form = useForm<z.infer<typeof FormSchema>>({
    resolver: zodResolver(FormSchema),
    defaultValues: {
      name: "",
      date: new Date(),
      // current time
      time: new Date().toLocaleTimeString(lng, {
        hour: "2-digit",
        minute: "2-digit",
      }),
      guests: "1",
    },
  });

  function onSubmit(data: z.infer<typeof FormSchema>) {
    toast({
      className: "bg-gray-500 bottom-0 right-0 rounded",
      title: "You submitted the following values:",
      description: (
        <pre className="mt-2 w-[340px] rounded-md bg-slate-950 p-4">
          <code className="text-white">{JSON.stringify(data, null, 2)}</code>
        </pre>
      ),
    });
  }

  return (
    <div className="h-screen w-screen">
      <div className="h-full w-full flex justify-center items-center">
        <div className="mx-5">
          <Form {...form}>
            <form
              onSubmit={form.handleSubmit(onSubmit)}
              className="w-full space-y-6"
            >
              <FormField
                control={form.control}
                name="name"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Name</FormLabel>
                    <FormControl>
                      <Input
                        placeholder={config.name}
                        className="rounded placeholder-red-900 placeholder-opacity-50"
                        {...field}
                      />
                    </FormControl>
                    <FormMessage className="text-red-500" />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="email"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Email (facultatif) </FormLabel>
                    <FormControl>
                      <Input
                        placeholder={config.email}
                        className="rounded"
                        {...field}
                      />
                    </FormControl>
                    <FormDescription></FormDescription>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="phone"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Phone</FormLabel>
                    <FormControl>
                      <Input
                        placeholder="(+33) 0 00 00 00 00"
                        className="rounded"
                        {...field}
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <div className="flex items-top">
                <div>
                  <FormField
                    control={form.control}
                    name="date"
                    render={({ field }) => (
                      <FormItem className="flex flex-col">
                        <FormLabel>Date</FormLabel>
                        <Popover>
                          <PopoverTrigger asChild>
                            <FormControl>
                              <Button
                                variant={"outline"}
                                className={cn(
                                  "w-64 pl-3 text-left font-normal rounded",
                                  !field.value && "text-muted-foreground"
                                )}
                              >
                                {field.value ? (
                                  format(field.value, "PPP")
                                ) : (
                                  <span>Pick a date</span>
                                )}
                                <CalendarIcon className="ml-auto h-4 w-4 opacity-50" />
                              </Button>
                            </FormControl>
                          </PopoverTrigger>
                          <PopoverContent
                            className="w-auto p-0 rounded"
                            align="start"
                          >
                            <Calendar
                              className="bg-red-100 rounded"
                              mode="single"
                              selected={field.value}
                              onSelect={field.onChange}
                              disabled={(date) => date < new Date()}
                              initialFocus
                            />
                          </PopoverContent>
                        </Popover>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                </div>
                <div className="pl-2">
                  <FormField
                    control={form.control}
                    name="time"
                    render={({ field }) => (
                      <FormItem className="flex flex-col">
                        <FormLabel>Time</FormLabel>
                        <FormControl>
                          <Input
                            type="time"
                            placeholder="HH:MM"
                            className="rounded"
                            {...field}
                          />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                </div>
                <div className="pl-2">
                  <FormField
                    control={form.control}
                    name="guests"
                    render={({ field }) => (
                      <FormItem className="flex flex-col">
                        <FormLabel>Guests</FormLabel>
                        <FormControl>
                          <Input
                            type="number"
                            min={"1"}
                            placeholder="Number of guests"
                            className="rounded"
                            {...field}
                          />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                </div>
              </div>
              <div>
                <FormField
                  control={form.control}
                  name="message"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Message</FormLabel>
                      <FormControl>
                        <Textarea
                          placeholder="Tell us more about your reservation"
                          className="resize-none"
                          {...field}
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
              </div>
              {/* make the buttom at bottom right of the form not the screen*/}
              <div className="flex justify-end w-full">
                <Button type="submit">Submit</Button>
              </div>
            </form>
          </Form>
        </div>
      </div>
      <Header lng={lng} />
      <Toaster />
    </div>
  );
};

export default Reservation;
