"use client";
import { FormPopoverRoleValues } from "@/components/popover_choice/FormPopoverData";
import { User } from "@/components/types/DemoTypes";
import { Button } from "@/components/ui/button";
import {
  Command,
  CommandEmpty,
  CommandGroup,
  CommandInput,
  CommandItem,
} from "@/components/ui/command";
import { Dialog, DialogContent, DialogTitle } from "@/components/ui/dialog";
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
} from "@/components/ui/form";
import { Option } from "@/components/ui/MultipleSelector";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectLabel,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { toast } from "sonner";
import { cn } from "@/lib/utils";
import { zodResolver } from "@hookform/resolvers/zod";
import { ArrowBigDownDash, Check, ChevronsUpDown } from "lucide-react";
import React from "react";
import { SubmitHandler, useForm } from "react-hook-form";
import { z } from "zod";
import { useRouter } from "next/navigation";

const schema = z.object({
  username: z.string().min(1, "Username is required"),
  role: z
    .union([z.literal("user"), z.literal("admin"), z.literal("owner")])
    .refine((value) => ["user", "admin", "owner"].includes(value), {
      message: "Invalid role",
    }),
});

type FormData = z.infer<typeof schema>;

interface Props {
  users: User[];
}

const AddUserDialog = ({ users }: Props) => {
  const [dialogOpen, setDialogOpen] = React.useState(false);
  const router = useRouter();

  const form = useForm<FormData>({
    resolver: zodResolver(schema),
  });

  const {
    control,
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = form;

  const onSubmit: SubmitHandler<FormData> = (data) => {
    console.log(data);
    // AddUserToProject();

    toast("User Added", {
      description: `User ${form.getValues(
        "username"
      )} has been added to project...`,
    });

    router.refresh();
    
    setDialogOpen(false);
    reset();
  };

  const onOpenChangeForDialog = () => {
    reset();
    setDialogOpen(false);
  };

  const formatedUsers: Option[] = users.map(
    (user): Option => ({
      label: user.username,
      value: user.username,
    })
  );

  return (
    <>
      <Button onClick={() => setDialogOpen(true)}>
        <ArrowBigDownDash className="text-lg" />
      </Button>
      <Dialog onOpenChange={onOpenChangeForDialog} open={dialogOpen}>
        <DialogContent>
          <DialogTitle>Add User To Project</DialogTitle>
          <div className="w-full">
            <Form {...form}>
              <form onSubmit={handleSubmit(onSubmit)}>
                <div className="flex justify-between gap-4">
                  <div className="w-full">
                    <FormField
                      control={control}
                      name="username"
                      render={({ field }) => (
                        <FormItem className="mt-3 mb-5">
                          <FormLabel className="text-md block">
                            User<span className="text-red-500">*</span>
                          </FormLabel>
                          <Popover>
                            <PopoverTrigger asChild>
                              <FormControl>
                                <Button
                                  variant="outline"
                                  role="combobox"
                                  className={cn(
                                    "w-full flex justify-between",
                                    !field.value && "text-muted-foreground"
                                  )}
                                >
                                  {field.value
                                    ? formatedUsers.find(
                                        (choice) => choice.value === field.value
                                      )?.label
                                    : "Select User"}
                                  <ChevronsUpDown className="ml-2 h-4 w-4 shrink-0 opacity-50" />
                                </Button>
                              </FormControl>
                            </PopoverTrigger>
                            <PopoverContent className="w-full p-0">
                              <Command>
                                <CommandInput placeholder="Username..." />
                                <CommandEmpty>No user found...</CommandEmpty>
                                <CommandGroup>
                                  {formatedUsers.map((choice) => (
                                    <CommandItem
                                      value={choice.label}
                                      key={choice.value}
                                      onSelect={() => {
                                        form.setValue("username", choice.value);
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
                          <FormDescription>
                            Select user from your company
                          </FormDescription>
                        </FormItem>
                      )}
                    />
                  </div>
                  <div className="w-full">
                    <FormField
                      control={control}
                      name="role"
                      render={({ field }) => (
                        <FormItem className="mt-3 mb-5">
                          <FormLabel className="text-md block">
                            Role<span className="text-red-500">*</span>
                          </FormLabel>
                          <Select
                            onValueChange={field.onChange}
                            defaultValue={field.value}
                          >
                            <SelectTrigger>
                              <SelectValue placeholder="Select Role" />
                            </SelectTrigger>
                            <SelectContent>
                              <SelectGroup>
                                <SelectLabel>Roles</SelectLabel>
                                {FormPopoverRoleValues.map((role) => (
                                  <SelectItem value={role.value}>
                                    {role.label}
                                  </SelectItem>
                                ))}
                              </SelectGroup>
                            </SelectContent>
                          </Select>
                          <FormDescription>
                            This determines what the user can do in the project
                          </FormDescription>
                        </FormItem>
                      )}
                    />
                  </div>
                </div>
                <Button
                  type="submit"
                  variant={"outline"}
                  className="mt-5 w-full"
                >
                  Add User
                </Button>
              </form>
            </Form>
          </div>
        </DialogContent>
      </Dialog>
    </>
  );
};

export default AddUserDialog;
