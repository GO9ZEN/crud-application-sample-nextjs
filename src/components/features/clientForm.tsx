"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { z } from "zod";

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
import { useEffect, useState } from "react";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { Calendar as CalendarIcon } from "lucide-react";
import { Calendar } from "@/components/ui/calendar";
import { format } from "date-fns";
import { cn } from "@/lib/utils";
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectLabel,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { PasswordInput } from "@/components/password-input";
import {
  deleteClientId,
  getClient,
  insertClient,
  updateClient,
} from "./clientActions";
import { useRouter } from "next/navigation";

const clientFormSchema = z
  .object({
    id: z.coerce.number().optional(),
    firstName: z.string().min(2, {
      message: "Username must be at least 2 characters.",
    }),
    lastName: z.string().min(2, {
      message: "Username must be at least 2 characters.",
    }),
    email: z.string(),
    contactNumber: z.string().optional().array(),
    birthDate: z.date().optional(),
    nationality: z.string(),
    jobRole: z.string(),
    linkedInLink: z.string().optional().nullish(),
    gitHubLink: z.string().optional().nullish(),
    // youtubeLink: z.string(),
    password: z.string().min(5),
    confirmPassword: z.string().min(5),
  })
  .refine((values) => values.password === values.confirmPassword, {
    message: "Passwords do not match",
    path: ["confirmPassword"],
  });

type Clientprops = {
  clientid?: number;
};

export function ProfileForm({ clientid = 0 }: Clientprops) {
  const [id, setid] = useState<number>(0);
  const router = useRouter();

  // 1. Define your form.
  const form = useForm<z.infer<typeof clientFormSchema>>({
    resolver: zodResolver(clientFormSchema),
  });

  const { setValue } = form;

  useEffect(() => {
    setid(clientid);
    if (clientid != 0) {
      const fetchSt = async () => {
        const res = await getClient(clientid);
        console.log(res);
        if (res.data) {
          form.reset(res.data);
        }
      };

      fetchSt();
    }
  }, []);

  // 2. Define a submit handler.
  function onSubmit(values: z.infer<typeof clientFormSchema>) {
    if (id == 0) {
      insertClient(values)
        .then((res) => {
          console.log(res);
          setid(res.lastInsertRowid);
          setValue("id", res.lastInsertRowid);
        })
        .catch((e) => {
          console.log(e);
        });
    } else {
      updateClient(values)
        .then((res) => {
          console.log(res);
        })
        .catch((e) => {
          console.log(e);
        });
    }
  }

  async function handleDelete() {
    deleteClientId(id)
      .then((res) => {
        console.log(res);
      })
      .catch((e) => {
        console.log(e);
      });
  }

  async function handlePortfolioId() {
    console.log("id is", id);

    router.push("/portfolio/" + id);
  }

  return (
    <Form {...form}>
      <form
        onSubmit={form.handleSubmit(onSubmit)}
        className="space-y-8 md:ml-[50px] ml-[30px] md:mr-[50px] mr-[30px] mt-6 mb-6"
      >
        <div className="md:flex flex-row gap-20">
          <div className="space-y-8">
            <FormField
              control={form.control}
              name="id"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Id</FormLabel>
                  <FormControl>
                    <Input placeholder="Id" type="number" disabled {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="lastName"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Last Name</FormLabel>
                  <FormControl>
                    <Input placeholder="Last Name" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="nationality"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Nationality</FormLabel>
                  <FormControl>
                    <Input placeholder="Nationality" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="jobRole"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Job Role</FormLabel>
                  <FormControl>
                    <Select onValueChange={field.onChange} {...field}>
                      <SelectTrigger>
                        <SelectValue placeholder="Select Job Role" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectGroup>
                          <SelectLabel>Select Job Role</SelectLabel>
                          <SelectItem value="React UI/UX Developer">
                            React UI/UX Developer
                          </SelectItem>
                          <SelectItem value="Next js Developer">
                            Next js Developer
                          </SelectItem>
                          <SelectItem value="MERN Stack Developer">
                            MERN Stack Developer
                          </SelectItem>
                          <SelectItem value="DevOps Engineer">
                            DevOps Engineer
                          </SelectItem>
                          <SelectItem value="Penetration Tester">
                            Penetration Tester
                          </SelectItem>
                          <SelectItem value="AI Developer">
                            AI Developer
                          </SelectItem>
                        </SelectGroup>
                      </SelectContent>
                    </Select>
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="contactNumber.1"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Personal Number</FormLabel>
                  <FormControl>
                    <Input placeholder="Personal number" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="gitHubLink"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>GitHub Link</FormLabel>
                  <FormControl>
                    <Input placeholder="GitHub Link" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="confirmPassword"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Confirm Password</FormLabel>
                  <FormControl>
                    <PasswordInput {...field} placeholder="Confirm passwrod" />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
          </div>

          <div className="space-y-8">
            {/*  */}
            <FormField
              control={form.control}
              name="firstName"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>First Name</FormLabel>
                  <FormControl>
                    <Input placeholder="First Name" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="email"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Email</FormLabel>
                  <FormControl>
                    <Input type="email" placeholder="Email" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="birthDate"
              render={({ field }) => (
                <FormItem className="flex flex-col">
                  <FormLabel>Date of Birth</FormLabel>
                  <Popover>
                    <PopoverTrigger asChild>
                      <FormControl>
                        <Button
                          variant={"outline"}
                          className={cn(
                            "w-[240px] pl-3 text-left font-normal",
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
                    <PopoverContent className="w-auto p-0" align="start">
                      <Calendar
                        mode="single"
                        selected={field.value}
                        onSelect={field.onChange}
                        disabled={(date: any) =>
                          date > new Date() || date < new Date("1900-01-01")
                        }
                        initialFocus
                      />
                    </PopoverContent>
                  </Popover>
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="contactNumber.0"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Home Number</FormLabel>
                  <FormControl>
                    <Input placeholder="Home number" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="linkedInLink"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>LinkdIn Link</FormLabel>
                  <FormControl>
                    <Input placeholder="LinkdIn Link" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="password"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Password</FormLabel>
                  <FormControl>
                    <PasswordInput {...field} placeholder="Password" />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            {/*  */}
          </div>
        </div>

        <div className="flex gap-8">
          <Button type="submit">{id == 0 ? "Add" : "Update"}</Button>

          {id == 0 ? null : (
            <Button type="button" className="bg-red-700" onClick={handleDelete}>
              Delete
            </Button>
          )}

          {id == 0 ? null : (
            <Button
              type="button"
              className="bg-green-700"
              onClick={handlePortfolioId}
            >
              View Portfolio
            </Button>
          )}
        </div>
      </form>
    </Form>
  );
}
