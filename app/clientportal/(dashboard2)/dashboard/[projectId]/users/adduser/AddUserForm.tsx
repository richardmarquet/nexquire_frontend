"use client";

import { FormPopoverUserTypeValues } from "@/components/popover_choice/FormPopoverData";
import {
  UserTypes
} from "@/components/popover_choice/FormPopoverTypes";
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle
} from "@/components/ui/alert-dialog";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import {
  Command,
  CommandEmpty,
  CommandGroup,
  CommandInput,
  CommandItem,
} from "@/components/ui/command";
import { Form, FormControl, FormField, FormItem } from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { Separator } from "@/components/ui/separator";
import { cn } from "@/lib/utils";
import { zodResolver } from "@hookform/resolvers/zod";
import { Check, ChevronsUpDown } from "lucide-react";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { SubmitHandler, useForm } from "react-hook-form";
import { toast } from "sonner";
import { z } from "zod";

const schema = z.object({
  username: z.string().min(1, "Username is required"),
  firstname: z.string().min(1, "First name is required"),
  lastname: z.string().min(1, "Last name is required"),
  email: z
    .string()
    .min(1, "Email is required")
    .email("Valid email is required"),
  phoneNumber: z
    .string()
    .regex(/^[0-9]{3}[-. ]?[0-9]{3}[-. ]?[0-9]{4}$/, "Invalid phone number"),
  userType: z
    .union([z.literal("admin"), z.literal("super admin"), z.literal("user")])
    .refine((value) => ["admin", "super admin", "user"].includes(value), {
      message: "Invalid role: must be 'admin', 'super admin', or 'user'", // Custom error message
    }),
});

type FormData = z.infer<typeof schema>;

const AddUserForm = () => {
  const router = useRouter();
  const [dialogOpen, setDialogOpen] = useState(false);

  const form = useForm<FormData>({
    resolver: zodResolver(schema),
  });

  const {
    control,
    register,
    handleSubmit,
    formState: { errors },
  } = form;

  const onSubmit: SubmitHandler<FormData> = (data) => {
    console.log(data);
    setDialogOpen(true);
  };

  const confirmButton = () => {
    toast("User Created", {
      description: `User ${form.getValues("username")} has been created...`,
      action: {
        label: "Undo",
        onClick: () => console.log("Undo"),
      },
    });
    router.replace("/dashboard/users");
    setDialogOpen(false);
  };

  return (
    <div className="mt-5 mb-5">
      <Card>
        <CardContent>
          <div className="mt-5">
            <h1 className="font-bold text-2xl">User Creation</h1>
            <Separator />
            <h1 className="font-bold text-lg mt-2">General Information</h1>
            <Form {...form}>
              <form onSubmit={handleSubmit(onSubmit)}>
                <FormField
                  control={control}
                  name="username"
                  render={({ field }) => (
                    <FormItem className="mt-3 mb-5">
                      <h1>
                        Username<span className="text-red-500">*</span>
                      </h1>
                      <Input {...register("username")} />
                      {errors.username && (
                        <p className="text-red-400 text-sm mt-1">
                          {errors.username.message}
                        </p>
                      )}
                    </FormItem>
                  )}
                />
                <FormField
                  control={control}
                  name="firstname"
                  render={({ field }) => (
                    <FormItem className="mt-3 mb-5">
                      <h1>
                        First Name<span className="text-red-500">*</span>
                      </h1>
                      <Input {...register("firstname")} />
                      {errors.firstname && (
                        <p className="text-red-400 text-sm mt-1">
                          {errors.firstname.message}
                        </p>
                      )}
                    </FormItem>
                  )}
                />
                <FormField
                  control={control}
                  name="lastname"
                  render={({ field }) => (
                    <FormItem className="mt-3 mb-5">
                      <h1>
                        Last Name<span className="text-red-500">*</span>
                      </h1>
                      <Input {...register("lastname")} />
                      {errors.lastname && (
                        <p className="text-red-400 text-sm mt-1">
                          {errors.lastname.message}
                        </p>
                      )}
                    </FormItem>
                  )}
                />
                <FormField
                  control={control}
                  name="email"
                  render={({ field }) => (
                    <FormItem className="mt-3 mb-5">
                      <h1>
                        Email<span className="text-red-500">*</span>
                      </h1>
                      <Input {...register("email")} />
                      {errors.email && (
                        <p className="text-red-400 text-sm mt-1">
                          {errors.email.message}
                        </p>
                      )}
                    </FormItem>
                  )}
                />
                <FormField
                  control={control}
                  name="phoneNumber"
                  render={({ field }) => (
                    <FormItem className="mt-3 mb-5">
                      <h1>
                        Phone Number<span className="text-red-500">*</span>
                      </h1>
                      <Input {...register("phoneNumber")} />
                      {errors.phoneNumber && (
                        <p className="text-red-400 text-sm mt-1">
                          {errors.phoneNumber.message}
                        </p>
                      )}
                    </FormItem>
                  )}
                />
                <h1 className="font-bold text-lg mt-2">Account Information</h1>
                <FormField
                  control={control}
                  name="userType"
                  render={({ field }) => (
                    <FormItem className="mt-3 mb-5">
                      <h1>
                        User Type<span className="text-red-500">*</span>
                      </h1>
                      <Popover>
                        <PopoverTrigger asChild>
                          <FormControl>
                            <Button
                              variant="outline"
                              role="combobox"
                              className={cn(
                                "w-[200px] justify-between",
                                !field.value && "text-muted-foreground"
                              )}
                            >
                              {field.value
                                ? FormPopoverUserTypeValues.find(
                                    (choice) => choice.value === field.value
                                  )?.label
                                : "Select User Type"}
                              <ChevronsUpDown className="ml-2 h-4 w-4 shrink-0 opacity-50" />
                            </Button>
                          </FormControl>
                        </PopoverTrigger>
                        <PopoverContent className="w-[200px] p-0">
                          <Command>
                            <CommandInput placeholder="Select User Type..." />
                            <CommandEmpty>No user type found.</CommandEmpty>
                            <CommandGroup>
                              {FormPopoverUserTypeValues.map((choice) => (
                                <CommandItem
                                  value={choice.label}
                                  key={choice.value}
                                  onSelect={() => {
                                    form.setValue(
                                      "userType",
                                      choice.value as UserTypes
                                    );
                                  }}
                                >
                                  <Check
                                    className={cn(
                                      "mr-2 h-4 w-4",
                                      choice.value === field.value
                                        ? "opacity-100"
                                        : "opacity-0"
                                    )}
                                  />
                                  {choice.label}
                                </CommandItem>
                              ))}
                            </CommandGroup>
                          </Command>
                        </PopoverContent>
                      </Popover>
                    </FormItem>
                  )}
                />
                {errors.userType && (
                  <p className="text-red-400 text-sm mt-1">
                    {errors.userType.message}
                  </p>
                )}
                {dialogOpen && (
                  <AlertDialog open={dialogOpen}>
                    <AlertDialogContent>
                      <AlertDialogHeader>
                        <AlertDialogTitle>
                          Are you sure you want to create this user?
                        </AlertDialogTitle>
                        <AlertDialogDescription>
                          Creating this user will allow them to access your
                          information and create requests on your behalf
                        </AlertDialogDescription>
                      </AlertDialogHeader>
                      <AlertDialogFooter>
                        <AlertDialogCancel
                          type="submit"
                          onClick={() => setDialogOpen(false)}
                        >
                          Cancel
                        </AlertDialogCancel>
                        <AlertDialogAction onClick={() => confirmButton()}>
                          Continue
                        </AlertDialogAction>
                      </AlertDialogFooter>
                    </AlertDialogContent>
                  </AlertDialog>
                )}
                <Button type="submit" variant={"outline"} className="mt-5">
                  Create User
                </Button>
              </form>
            </Form>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default AddUserForm;
