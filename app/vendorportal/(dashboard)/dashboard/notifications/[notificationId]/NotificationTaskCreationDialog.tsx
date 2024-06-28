"use client";
import { Post, PriorityLevel, User } from "@/components/types/DemoTypes";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import MultipleSelector, { Option } from "@/components/ui/MultipleSelector";
import {
  ArrowBigDownDash,
  CalendarIcon,
  Check,
  ChevronsUpDown,
  ClipboardList,
} from "lucide-react";
import { useState, Ref } from "react";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { SubmitHandler, useForm } from "react-hook-form";
import { FormPopoverPrioritiesValues } from "@/components/popover_choice/FormPopoverData";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { cn } from "@/lib/utils";
import {
  Command,
  CommandEmpty,
  CommandGroup,
  CommandInput,
  CommandItem,
} from "@/components/ui/command";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Calendar } from "@/components/ui/calendar";
import { format } from "date-fns";
import { useRouter } from "next/navigation";
import { CreateTask } from "@/components/actions/tasks/TaskActions";
import { toast } from "sonner";

const optionSchema = z.object({
  label: z.string(),
  value: z.string(),
  disable: z.boolean().optional(),
});

const schema = z.object({
  title: z.string().min(1),
  description: z.string().min(1),
  priority: z.string().min(1),
  username: z.string().min(1),
  requestNames: z.array(optionSchema).min(1),
  dueDate: z.date(),
});

type FormData = z.infer<typeof schema>;

interface FormPopoverValues {
  value: string;
  label: string;
}

interface Props {
  post: Post;
  users: User[];
}

const NotificationTaskCreationDialog = ({ post, users }: Props) => {
  const router = useRouter();

  const form = useForm<FormData>({
    resolver: zodResolver(schema),
  });

  const {
    control,
    register,
    handleSubmit,
    formState: { errors },
  } = form;

  const onSubmit: SubmitHandler<FormData> = async (data: FormData) => {
    // TODO send data here
    console.log(data);

    // This is super stupid and wasteful but I'm too lazy to change it for the demo lol
    // I have to do it this way since the popovers / select UI items work in a way that you
    // can only search by value not label so I need to do it this hacky way
    const requestIds: number[] = data.requestNames.map(
      (request): number =>
        post.requests.find((req) => req.item_name === request.value)?.id!
    );

    // same as above, dumb...
    const userId: string = users.find((user) => user.username === data.username)
      ?.id!;

    setDialogOpen(false);

    const res = await CreateTask(
      data.title,
      requestIds,
      data.priority,
      userId,
      data.dueDate,
      data.description
    );

    if (!res) {
      toast("Error...", {
        description: `Unable to create task...`,
        duration: 2000,
      });
      return;
    }

    toast("Task Created!", {
      description: `Task has been created...`,
      duration: 2000,
    });

    setTimeout(() => {
      router.push(`/vendorportal/dashboard/notifications`);
      router.refresh();
    }, 500);
  };

  const formatedUsers: Option[] = users.map(
    (user): Option => ({
      label: user.username,
      value: user.username,
    })
  );

  const requestsFormated: Option[] = post.requests.map(
    (request): Option => ({
      label: request.item_name,
      value: request.item_name, // it filters based on the value
    })
  );

  const [dialogOpen, setDialogOpen] = useState(false);

  const onOpenChangeForDialog = () => {
    setDialogOpen(false);
  };

  return (
    <>
      <Button onClick={() => setDialogOpen(true)} variant={"default"}>
        <ClipboardList className="w-5 h-5 mr-1" />
        Create Task
      </Button>
      <Dialog onOpenChange={() => onOpenChangeForDialog()} open={dialogOpen}>
        <DialogContent>
          <DialogTitle>Task Creation</DialogTitle>
          <div className="w-full">
            <Form {...form}>
              <form onSubmit={handleSubmit(onSubmit)}>
                <FormField
                  control={control}
                  name="title"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel className="text-md">
                        Title<span className="text-red-500">*</span>
                      </FormLabel>
                      <Input type="text" {...register("title")} />
                    </FormItem>
                  )}
                />
                <FormField
                  control={control}
                  name={"description"}
                  render={({ field }) => (
                    <FormItem className="mt-2">
                      <FormLabel className="text-md">
                        Description<span className="text-red-500">*</span>
                      </FormLabel>
                      <Textarea {...register("description")} />
                    </FormItem>
                  )}
                />
                <div className="flex justify-between">
                  <FormField
                    control={control}
                    name="priority"
                    render={({ field }) => (
                      <FormItem className="mt-3 mb-5">
                        <FormLabel className="text-md">
                          Priority<span className="text-red-500">*</span>
                        </FormLabel>
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
                                  ? FormPopoverPrioritiesValues.find(
                                      (choice) => choice.value === field.value
                                    )?.label
                                  : "Select Priority"}
                                <ChevronsUpDown className="ml-2 h-4 w-4 shrink-0 opacity-50" />
                              </Button>
                            </FormControl>
                          </PopoverTrigger>
                          <PopoverContent className="w-[200px] p-0">
                            <Command>
                              <CommandInput placeholder="Select User Type..." />
                              <CommandEmpty>No priority found...</CommandEmpty>
                              <CommandGroup>
                                {FormPopoverPrioritiesValues.map((choice) => (
                                  <CommandItem
                                    value={choice.label}
                                    key={choice.value}
                                    onSelect={() => {
                                      form.setValue(
                                        "priority",
                                        choice.value as PriorityLevel
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
                  <FormField
                    control={control}
                    name="username"
                    render={({ field }) => (
                      <FormItem className="mt-3 mb-5">
                        <FormLabel className="text-md">
                          User<span className="text-red-500">*</span>
                        </FormLabel>
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
                                  ? formatedUsers.find(
                                      (choice) => choice.value === field.value
                                    )?.label
                                  : "Select User"}
                                <ChevronsUpDown className="ml-2 h-4 w-4 shrink-0 opacity-50" />
                              </Button>
                            </FormControl>
                          </PopoverTrigger>
                          <PopoverContent className="w-[200px] p-0">
                            <Command>
                              <CommandInput placeholder="Select User Type..." />
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
                      </FormItem>
                    )}
                  />
                </div>
                <FormField
                  control={control}
                  name="requestNames"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel className="text-md">
                        Requests<span className="text-red-500">*</span>
                      </FormLabel>
                      <FormControl>
                        <MultipleSelector
                          value={field.value}
                          onChange={field.onChange}
                          defaultOptions={requestsFormated}
                          placeholder="Select all requests you want to associate with task..."
                          emptyIndicator={
                            <p className="text-center text-lg leading-10 text-gray-600 dark:text-gray-400">
                              no results found.
                            </p>
                          }
                        />
                      </FormControl>
                      {errors.requestNames && (
                        <p>{errors.requestNames.message}</p>
                      )}
                    </FormItem>
                  )}
                />
                <FormField
                  control={form.control}
                  name="dueDate"
                  render={({ field }) => (
                    <FormItem className="mt-2">
                      <FormLabel className="text-md">
                        Due Date<span className="text-red-500">*</span>
                      </FormLabel>
                      <Popover>
                        <PopoverTrigger asChild>
                          <FormControl>
                            <Button
                              variant={"outline"}
                              className={cn(
                                "w-full pl-3 text-left font-normal",
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
                            disabled={(date) => date < new Date()}
                            initialFocus
                          />
                        </PopoverContent>
                      </Popover>
                    </FormItem>
                  )}
                />
                <Button
                  type="submit"
                  variant={"outline"}
                  className="mt-5 w-full"
                >
                  Create Task
                </Button>
              </form>
            </Form>
          </div>
        </DialogContent>
      </Dialog>
    </>
  );
};

export default NotificationTaskCreationDialog;
