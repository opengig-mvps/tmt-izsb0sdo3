"use client";

import React, { useState, useEffect } from "react";
import axios from "axios";
import { toast } from "sonner";
import { isAxiosError } from "axios";
import { useSession } from "next-auth/react";
import { useSearchParams } from "next/navigation";
import { LoaderCircleIcon } from "lucide-react";
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Button } from "@/components/ui/button";
import { DateTimePicker } from "@/components/ui/date-picker";
import { Select, SelectTrigger, SelectValue, SelectContent, SelectItem } from "@/components/ui/select";
import { Label } from "@/components/ui/label";

const WorkLogsPage: React.FC = () => {
  const { data: session } = useSession();
  const searchParams = useSearchParams();
  const [loading, setLoading] = useState<boolean>(false);
  const [workLogs, setWorkLogs] = useState<any[]>([]);
  const [selectedDates, setSelectedDates] = useState<{ start: Date | undefined, end: Date | undefined }>({ start: undefined, end: undefined });
  const [selectedProject, setSelectedProject] = useState<string>("");

  const fetchWorkLogs = async () => {
    try {
      setLoading(true);
      const res = await axios.get(`/api/users/${session?.user?.id}/workLogs`, {
        params: {
          startDate: selectedDates?.start?.toISOString(),
          endDate: selectedDates?.end?.toISOString(),
          project: selectedProject,
        },
      });
      setWorkLogs(res?.data?.data);
    } catch (error: any) {
      if (isAxiosError(error)) {
        toast.error(error?.response?.data?.message ?? "Something went wrong");
      } else {
        console.error(error);
      }
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    if (session) {
      fetchWorkLogs();
    }
  }, [session, selectedDates, selectedProject]);

  return (
    <div className="flex-1 p-8">
      <h2 className="text-2xl font-bold mb-6">Work Logs</h2>
      <Card>
        <CardHeader>
          <CardTitle>Filter Work Logs</CardTitle>
        </CardHeader>
        <CardContent className="space-y-6">
          <div className="space-y-2">
            <Label htmlFor="startDate">Start Date</Label>
            <DateTimePicker
              date={selectedDates?.start}
              setDate={(date: any) => setSelectedDates({ ...selectedDates, start: date })}
            />
          </div>
          <div className="space-y-2">
            <Label htmlFor="endDate">End Date</Label>
            <DateTimePicker
              date={selectedDates?.end}
              setDate={(date: any) => setSelectedDates({ ...selectedDates, end: date })}
            />
          </div>
          <div className="space-y-2">
            <Label htmlFor="project">Project</Label>
            <Select value={selectedProject} onValueChange={(e: any) => setSelectedProject(e)}>
              <SelectTrigger>
                <SelectValue placeholder={"Select project"} />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value={'project1'}>Project 1</SelectItem>
                <SelectItem value={'project2'}>Project 2</SelectItem>
                <SelectItem value={'project3'}>Project 3</SelectItem>
              </SelectContent>
            </Select>
          </div>
          <Button onClick={fetchWorkLogs} disabled={loading}>
            {loading ? <LoaderCircleIcon className="animate-spin" /> : "Filter"}
          </Button>
        </CardContent>
      </Card>

      <Card className="mt-6">
        <CardHeader>
          <CardTitle>Logged Work Details</CardTitle>
        </CardHeader>
        <CardContent className="space-y-6">
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Date</TableHead>
                <TableHead>Project</TableHead>
                <TableHead>Hours Worked</TableHead>
                <TableHead>Description</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {workLogs?.length > 0 ? (
                workLogs?.map((log: any) => (
                  <TableRow key={log?.id}>
                    <TableCell>{new Date(log?.date).toLocaleDateString()}</TableCell>
                    <TableCell>{log?.project}</TableCell>
                    <TableCell>{log?.hoursWorked}</TableCell>
                    <TableCell>{log?.description}</TableCell>
                  </TableRow>
                ))
              ) : (
                <TableRow>
                  <TableCell colSpan={4} className="text-center">
                    No work logs found
                  </TableCell>
                </TableRow>
              )}
            </TableBody>
          </Table>
        </CardContent>
      </Card>
    </div>
  );
};

export default WorkLogsPage;