'use client';

import { useState, useEffect } from 'react';
import { useSession } from 'next-auth/react';
import axios, { isAxiosError } from 'axios';
import { toast } from 'sonner';
import { LoaderCircleIcon, Calendar, Clock } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { DateTimePicker } from '@/components/ui/date-picker';
import { Input } from '@/components/ui/input';

const AdminWorkLogsPage = () => {
  const { data: session } = useSession();
  const [loading, setLoading] = useState<boolean>(false);
  const [workLogs, setWorkLogs] = useState<any[]>([]);
  const [selectedDates, setSelectedDates] = useState<{ start: Date | undefined, end: Date | undefined }>({ start: undefined, end: undefined });
  const [searchTerm, setSearchTerm] = useState<string>('');
  const [filteredWorkLogs, setFilteredWorkLogs] = useState<any[]>([]);

  useEffect(() => {
    if (!session) return;

    const fetchWorkLogs = async () => {
      try {
        setLoading(true);
        const res = await axios.get(`/api/users/${session?.user?.id}/workLogs`);
        setWorkLogs(res?.data?.data);
        setFilteredWorkLogs(res?.data?.data);
      } catch (error: any) {
        if (isAxiosError(error)) {
          toast.error(error?.response?.data?.message ?? 'Something went wrong');
        } else {
          console.error(error);
        }
      } finally {
        setLoading(false);
      }
    };

    fetchWorkLogs();
  }, [session]);

  useEffect(() => {
    const filtered = workLogs?.filter((log: any) => {
      const matchesSearchTerm = log?.project?.toLowerCase().includes(searchTerm.toLowerCase());
      const matchesDateRange = selectedDates?.start && selectedDates?.end
        ? new Date(log?.date) >= selectedDates?.start && new Date(log?.date) <= selectedDates?.end
        : true;
      return matchesSearchTerm && matchesDateRange;
    });
    setFilteredWorkLogs(filtered);
  }, [searchTerm, selectedDates, workLogs]);

  if (!session) {
    return <div>Loading...</div>;
  }

  return (
    <div className="flex-1 p-8">
      <h2 className="text-2xl font-bold mb-6">Admin Dashboard - Work Logs</h2>
      <Card>
        <CardHeader>
          <CardTitle>Filter Work Logs</CardTitle>
        </CardHeader>
        <CardContent className="space-y-6">
          <div className="space-y-2">
            <label htmlFor="search">Search by Project</label>
            <Input
              id="search"
              placeholder="Enter project name"
              value={searchTerm}
              onChange={(e: any) => setSearchTerm(e?.target?.value)}
            />
          </div>
          <div className="space-y-2">
            <label>Date Range</label>
            <div className="flex space-x-4">
              <DateTimePicker
                date={selectedDates?.start}
                setDate={(date: any) => setSelectedDates({ ...selectedDates, start: date })}
              />
              <DateTimePicker
                date={selectedDates?.end}
                setDate={(date: any) => setSelectedDates({ ...selectedDates, end: date })}
              />
            </div>
          </div>
        </CardContent>
      </Card>
      <div className="mt-8">
        <h3 className="text-xl font-bold mb-4">Work Logs</h3>
        {loading ? (
          <LoaderCircleIcon className="animate-spin mx-auto" />
        ) : (
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Date</TableHead>
                <TableHead>Project</TableHead>
                <TableHead>Description</TableHead>
                <TableHead>Start Time</TableHead>
                <TableHead>End Time</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {filteredWorkLogs?.map((log: any) => (
                <TableRow key={log?.id}>
                  <TableCell>
                    <div className="flex items-center gap-2">
                      <Calendar className="h-4 w-4" />
                      {new Date(log?.date).toLocaleDateString()}
                    </div>
                  </TableCell>
                  <TableCell>{log?.project}</TableCell>
                  <TableCell>{log?.description}</TableCell>
                  <TableCell>
                    <div className="flex items-center gap-2">
                      <Clock className="h-4 w-4" />
                      {new Date(log?.startTime).toLocaleTimeString()}
                    </div>
                  </TableCell>
                  <TableCell>
                    <div className="flex items-center gap-2">
                      <Clock className="h-4 w-4" />
                      {new Date(log?.endTime).toLocaleTimeString()}
                    </div>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        )}
      </div>
    </div>
  );
};

export default AdminWorkLogsPage;