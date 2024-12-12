"use client";
import React, { useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { toast } from "sonner";
import { isAxiosError } from "axios";
import { useSession } from "next-auth/react";
import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Button } from "@/components/ui/button";
import { DateTimePicker } from "@/components/ui/date-picker";
import api from "@/lib/api";
import { LoaderCircleIcon } from "lucide-react";

const workLogSchema = z.object({
  projectName: z.string().min(1, "Project name is required"),
  projectPart: z.string().min(1, "Project part is required"),
  hours: z
    .number()
    .min(1, "Number of hours must be at least 1")
    .max(24, "Number of hours cannot exceed 24"),
  description: z.string().min(1, "Short description is required"),
  date: z.date({
    required_error: "Date is required",
  }),
});

type WorkLogFormData = z.infer<typeof workLogSchema>;

const LogWork: React.FC = () => {
  const { data: session } = useSession();
  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
    reset,
    setValue,
  } = useForm<WorkLogFormData>({
    resolver: zodResolver(workLogSchema),
  });

  const [selectedDate, setSelectedDate] = useState<Date | undefined>(undefined);

  const onSubmit = async (data: WorkLogFormData) => {
    try {
      const payload = {
        projectName: data?.projectName,
        projectPart: data?.projectPart,
        hours: data?.hours,
        description: data?.description,
        date: data?.date.toISOString(),
      };

      const response = await api.post(
        `/api/users/${session?.user?.id}/work-logs`,
        payload
      );

      if (response?.data?.success) {
        toast.success("Work log created successfully!");
        reset();
      } else {
        toast.error("Failed to create work log. Please try again.");
      }
    } catch (error: any) {
      if (isAxiosError(error)) {
        toast.error(error?.response?.data?.message ?? "Something went wrong");
      } else {
        console.error(error);
        toast.error("An unexpected error occurred");
      }
    }
  };

  return (
    <div className="flex-1 p-8">
      <h2 className="text-2xl font-bold mb-6">Log Work</h2>
      <Card>
        <form onSubmit={handleSubmit(onSubmit)}>
          <CardHeader>
            <CardTitle>Work Log Details</CardTitle>
          </CardHeader>
          <CardContent className="space-y-6">
            <div className="space-y-2">
              <Label htmlFor="projectName">Project Name</Label>
              <Input
                {...register("projectName")}
                placeholder="Enter project name"
              />
              {errors?.projectName && (
                <p className="text-red-500 text-sm">
                  {errors?.projectName?.message}
                </p>
              )}
            </div>

            <div className="space-y-2">
              <Label htmlFor="projectPart">Project Part</Label>
              <Input
                {...register("projectPart")}
                placeholder="Enter project part"
              />
              {errors?.projectPart && (
                <p className="text-red-500 text-sm">
                  {errors?.projectPart?.message}
                </p>
              )}
            </div>

            <div className="space-y-2">
              <Label htmlFor="hours">Number of Hours</Label>
              <Input
                type="number"
                {...register("hours", { valueAsNumber: true })}
                placeholder="Enter number of hours"
              />
              {errors?.hours && (
                <p className="text-red-500 text-sm">{errors?.hours?.message}</p>
              )}
            </div>

            <div className="space-y-2">
              <Label htmlFor="description">Short Description</Label>
              <Textarea
                {...register("description")}
                placeholder="Enter a short description"
              />
              {errors?.description && (
                <p className="text-red-500 text-sm">
                  {errors?.description?.message}
                </p>
              )}
            </div>

            <div className="space-y-2">
              <Label htmlFor="date">Date</Label>
              <DateTimePicker
                date={selectedDate}
                setDate={(date: Date | undefined) => {
                  setSelectedDate(date);
                  if (date) {
                    setValue("date", date);
                  }
                }}
              />
              {errors?.date && (
                <p className="text-red-500 text-sm">{errors?.date?.message}</p>
              )}
            </div>
          </CardContent>
          <CardFooter>
            <Button className="w-full" type="submit" disabled={isSubmitting}>
              {isSubmitting ? (
                <>
                  <LoaderCircleIcon className="w-4 h-4 mr-2 animate-spin" />
                  Logging Work...
                </>
              ) : (
                "Log Work"
              )}
            </Button>
          </CardFooter>
        </form>
      </Card>
    </div>
  );
};

export default LogWork;