"use client";

import React, { useState, useEffect } from "react";
import { useForm, SubmitHandler } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { useSession } from "next-auth/react";
import { toast } from "sonner";
import { isAxiosError } from "axios";
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
  CardFooter,
} from "@/components/ui/card";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import api from "@/lib/api";
import { LoaderCircleIcon } from "lucide-react";

// Zod schema for user management
const userSchema = z.object({
  name: z.string().min(1, "Name is required"),
  email: z.string().email("Please enter a valid email"),
  role: z.enum(["admin", "tutor", "student"]),
});

type UserFormData = z.infer<typeof userSchema>;

const UserManagementPage: React.FC = () => {
  const { data: session } = useSession();
  const [users, setUsers] = useState<any[]>([]);
  const [loading, setLoading] = useState<boolean>(false);
  const [isSubmitting, setIsSubmitting] = useState<boolean>(false);
  const [selectedUser, setSelectedUser] = useState<any>(null);

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm<UserFormData>({
    resolver: zodResolver(userSchema),
  });

  const fetchUsers = async () => {
    try {
      setLoading(true);
      const res = await api.get(`/api/users`);
      setUsers(res?.data?.data);
    } catch (error) {
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
    fetchUsers();
  }, []);

  const onSubmit: SubmitHandler<UserFormData> = async (data) => {
    try {
      setIsSubmitting(true);
      const res = await api.post(`/api/users`, data);
      if (res?.data?.success) {
        toast.success("User added successfully!");
        fetchUsers();
        reset();
      }
    } catch (error) {
      if (isAxiosError(error)) {
        toast.error(error?.response?.data?.message ?? "Something went wrong");
      } else {
        console.error(error);
        toast.error("An unexpected error occurred");
      }
    } finally {
      setIsSubmitting(false);
    }
  };

  const onDeleteUser = async (userId: string) => {
    try {
      setLoading(true);
      const res = await api.delete(`/api/users/${userId}`);
      if (res?.data?.success) {
        toast.success("User deleted successfully!");
        fetchUsers();
      }
    } catch (error) {
      if (isAxiosError(error)) {
        toast.error(error?.response?.data?.message ?? "Something went wrong");
      } else {
        console.error(error);
        toast.error("An unexpected error occurred");
      }
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="container mx-auto p-4">
      <h1 className="text-2xl font-bold mb-6">User Management</h1>
      <Card>
        <form onSubmit={handleSubmit(onSubmit)}>
          <CardHeader>
            <CardTitle>Add New User</CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="space-y-2">
              <Label htmlFor="name">Name</Label>
              <Input {...register("name")} placeholder="Enter user name" />
              {errors?.name && (
                <p className="text-red-500 text-sm">{errors?.name?.message}</p>
              )}
            </div>

            <div className="space-y-2">
              <Label htmlFor="email">Email</Label>
              <Input {...register("email")} placeholder="Enter user email" />
              {errors?.email && (
                <p className="text-red-500 text-sm">{errors?.email?.message}</p>
              )}
            </div>

            <div className="space-y-2">
              <Label htmlFor="role">Role</Label>
              <select
                {...register("role")}
                className="w-full p-2 border rounded-md"
              >
                <option value="">Select role</option>
                <option value="admin">Admin</option>
                <option value="tutor">Tutor</option>
                <option value="student">Student</option>
              </select>
              {errors?.role && (
                <p className="text-red-500 text-sm">{errors?.role?.message}</p>
              )}
            </div>
          </CardContent>
          <CardFooter>
            <Button className="w-full" type="submit" disabled={isSubmitting}>
              {isSubmitting ? (
                <>
                  <LoaderCircleIcon className="w-4 h-4 mr-2 animate-spin" />
                  Adding User...
                </>
              ) : (
                "Add User"
              )}
            </Button>
          </CardFooter>
        </form>
      </Card>

      <div className="mt-8">
        <h2 className="text-xl font-bold mb-4">Existing Users</h2>
        {loading ? (
          <div>Loading...</div>
        ) : (
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Name</TableHead>
                <TableHead>Email</TableHead>
                <TableHead>Role</TableHead>
                <TableHead>Actions</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {users?.map((user: any) => (
                <TableRow key={user?.id}>
                  <TableCell>{user?.name}</TableCell>
                  <TableCell>{user?.email}</TableCell>
                  <TableCell>{user?.role}</TableCell>
                  <TableCell>
                    <div className="flex space-x-2">
                      <Dialog>
                        <DialogTrigger asChild>
                          <Button variant="outline" size="sm">
                            Edit
                          </Button>
                        </DialogTrigger>
                        <DialogContent>
                          <DialogHeader>
                            <DialogTitle>Edit User</DialogTitle>
                          </DialogHeader>
                          <form
                            onSubmit={handleSubmit(async (data) => {
                              try {
                                setIsSubmitting(true);
                                const res = await api.put(
                                  `/api/users/${user?.id}`,
                                  data
                                );
                                if (res?.data?.success) {
                                  toast.success("User updated successfully!");
                                  fetchUsers();
                                  reset();
                                }
                              } catch (error) {
                                if (isAxiosError(error)) {
                                  toast.error(
                                    error?.response?.data?.message ??
                                      "Something went wrong"
                                  );
                                } else {
                                  console.error(error);
                                  toast.error("An unexpected error occurred");
                                }
                              } finally {
                                setIsSubmitting(false);
                              }
                            })}
                          >
                            <div className="space-y-4">
                              <div className="space-y-2">
                                <Label htmlFor="name">Name</Label>
                                <Input
                                  {...register("name")}
                                  defaultValue={user?.name}
                                />
                                {errors?.name && (
                                  <p className="text-red-500 text-sm">
                                    {errors?.name?.message}
                                  </p>
                                )}
                              </div>
                              <div className="space-y-2">
                                <Label htmlFor="email">Email</Label>
                                <Input
                                  {...register("email")}
                                  defaultValue={user?.email}
                                />
                                {errors?.email && (
                                  <p className="text-red-500 text-sm">
                                    {errors?.email?.message}
                                  </p>
                                )}
                              </div>
                              <div className="space-y-2">
                                <Label htmlFor="role">Role</Label>
                                <select
                                  {...register("role")}
                                  defaultValue={user?.role}
                                  className="w-full p-2 border rounded-md"
                                >
                                  <option value="">Select role</option>
                                  <option value="admin">Admin</option>
                                  <option value="tutor">Tutor</option>
                                  <option value="student">Student</option>
                                </select>
                                {errors?.role && (
                                  <p className="text-red-500 text-sm">
                                    {errors?.role?.message}
                                  </p>
                                )}
                              </div>
                            </div>
                            <Button
                              className="w-full mt-4"
                              type="submit"
                              disabled={isSubmitting}
                            >
                              {isSubmitting ? (
                                <>
                                  <LoaderCircleIcon className="w-4 h-4 mr-2 animate-spin" />
                                  Updating User...
                                </>
                              ) : (
                                "Update User"
                              )}
                            </Button>
                          </form>
                        </DialogContent>
                      </Dialog>
                      <Button
                        variant="destructive"
                        size="sm"
                        onClick={() => onDeleteUser(user?.id)}
                      >
                        Delete
                      </Button>
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

export default UserManagementPage;