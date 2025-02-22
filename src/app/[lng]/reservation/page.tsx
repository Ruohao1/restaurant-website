"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { z } from "zod";

import { toast } from "@/hooks/use-toast";
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
import { Toaster } from "@/components/ui/toaster";
import { CalendarIcon } from "lucide-react";
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
import { HEADER_HEIGHT } from "@/constants/components/header";
import { useTranslation } from "react-i18next";

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
    path: ["email", "phone"],
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
      time: new Date().toLocaleTimeString(lng, {
        hour: "2-digit",
        minute: "2-digit",
      }),
      guests: "1",
    },
  });

  async function onSubmit(data: z.infer<typeof FormSchema>) {
    toast({
      className: "bg-gray-500 bottom-0 right-0 rounded",
      title: "You submitted the following values:",
      description: (
        <pre className="mt-2 w-[340px] rounded-md bg-slate-950 p-4">
          <code className="text-white">{JSON.stringify(data, null, 2)}</code>
        </pre>
      ),
    });

    console.log("Submitting data to the server...");
    console.log(data);

    const response = await fetch("/api/reserve", {
      method: "POST",
      body: JSON.stringify({ data }),
      headers: {
        "Content-Type": "application/json",
      },
    });

    console.log(response);
  }

  const inset = { top: HEADER_HEIGHT };

  const { t } = useTranslation(lng);

  return (
    <div className={`-mt-${inset.top} min-h-screen flex flex-col`}>
      {/* Form Container */}
      <div className="flex flex-grow justify-center items-center bg-gray-100 py-10 px-6">
        <div className="w-full max-w-lg bg-white shadow-lg rounded-lg p-8">
          <h1 className="text-2xl font-bold mb-6 text-gray-800 text-center">
            {t("reservation.title")}
          </h1>

          {/* Form */}
          <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
              {/* Name Field */}
              <FormField
                control={form.control}
                name="name"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>{t("reservation.name")} *</FormLabel>
                    <FormControl>
                      <Input
                        placeholder={config.name}
                        className="rounded"
                        {...field}
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              {/* Email Field */}
              <FormField
                control={form.control}
                name="email"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>{t("reservation.email")}**</FormLabel>
                    <FormControl>
                      <Input
                        placeholder={config.email || "Email"}
                        className="rounded"
                        {...field}
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              {/* Phone Field */}
              <FormField
                control={form.control}
                name="phone"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>{t("reservation.phone")}**</FormLabel>
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

              {/* Date and Time Fields */}
              <div className="flex space-x-4">
                {/* Date Field */}
                <FormField
                  control={form.control}
                  name="date"
                  render={({ field }) => (
                    <FormItem className="flex-1">
                      <FormLabel>Date</FormLabel>
                      <Popover>
                        <PopoverTrigger asChild>
                          <FormControl>
                            <Button
                              variant="outline"
                              className={cn(
                                "w-full text-left font-normal rounded",
                                !field.value && "text-muted-foreground"
                              )}
                            >
                              {field.value ? (
                                format(field.value, "PPP")
                              ) : (
                                <span>{t("reservation.pick-a-date")}</span>
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
                            className="rounded"
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

                {/* Time Field */}
                <FormField
                  control={form.control}
                  name="time"
                  render={({ field }) => (
                    <FormItem className="flex-1">
                      <FormLabel>{t("reservation.time")}</FormLabel>
                      <FormControl>
                        <Input type="time" className="rounded" {...field} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
              </div>

              {/* Guests Field */}
              <FormField
                control={form.control}
                name="guests"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>{t("reservation.guests")}</FormLabel>
                    <FormControl>
                      <Input
                        type="number"
                        min="1"
                        placeholder="Number of guests"
                        className="rounded"
                        {...field}
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              {/* Message Field */}
              <FormField
                control={form.control}
                name="message"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>{t("reservation.message")}</FormLabel>
                    <FormControl>
                      <Textarea
                        placeholder={t("reservation.message-placeholder")}
                        className="resize-none rounded"
                        {...field}
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              {/* Submit Button */}
              <div className="flex justify-between">
                <div>
                  <p className="text-xs text-gray-500">
                    <span>* </span>
                    {t("reservation.required-fields")}
                  </p>
                  <p className="text-xs text-gray-500">
                    <span>** </span>
                    {t("reservation.required-either-fields")}
                  </p>
                </div>
                <Button
                  type="submit"
                  className="bg-blue-600 text-white rounded px-4 py-2 hover:bg-blue-700"
                >
                  {t("reservation.submit")}
                </Button>
              </div>
            </form>
          </Form>
        </div>
      </div>

      {/* Toaster for Notifications */}
      <Toaster />
    </div>
  );
};

export default Reservation;
