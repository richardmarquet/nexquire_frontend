"use client";
import { Task } from "@/components/types/DemoTypes";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
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
import { Check, ChevronLeft, ChevronsUpDown } from "lucide-react";
import { SubmitHandler, useForm } from "react-hook-form";
import { z } from "zod";
import { useDropzone } from "react-dropzone";
import { Textarea } from "@/components/ui/textarea";
import { useRouter } from "next/navigation";
import { createBrowserClient } from "@supabase/ssr";
import { useEffect, useState } from "react";
import { User as SupabaseUser } from "@supabase/supabase-js";
import { Badge } from "@/components/ui/badge";
import { CreateOffer } from "@/components/actions/offers/OfferActions";
import { toast } from "sonner";

const schema = z.object({
  offerTitle: z.string().min(1, "Title Required"),
  offerDescription: z.string().min(1, "Description Required"),
  offerTask: z.number().min(1, "Task Required"),
  email: z
    .string()
    .min(1, "Email is required")
    .email("Valid email is required"),
  phoneNumber: z
    .string()
    .regex(/^[0-9]{3}[-. ]?[0-9]{3}[-. ]?[0-9]{4}$/, "Invalid phone number"),
  files: z
    .array(z.any())
    .min(1, { message: "Please upload at least one file." }),
});

type FormData = z.infer<typeof schema>;

// TODO
// okay so you can't pass complex types to a server action (a file in this case)
// we need to upload the files here and then send the file locations (string[]) to the server action
interface Props {
  tasks: Task[] | null;
  defaultTask: Task | null;
  currentUser: SupabaseUser | null;
}

const CreateOfferForm = ({
  tasks,
  defaultTask,
  currentUser,
}: Props) => {
  const disablePopoverForm = defaultTask != null ? true : false;

  const form = useForm<FormData>({
    resolver: zodResolver(schema),
  });

  const [user, setUser] = useState();

  const router = useRouter();

  const {
    control,
    register,
    handleSubmit,
    formState: { errors },
  } = form;

  if (!tasks) return <h1>Create a task first...</h1>;
  if (!currentUser) return <h1>ERROR SOMETHING BAD OCCURED</h1>;

  const onSubmit: SubmitHandler<FormData> = async (formData) => {
    // TODO send data here
    console.log(formData);

    const supabase = createBrowserClient(
      process.env.NEXT_PUBLIC_SUPABASE_URL!,
      process.env.NEXT_PUBLIC_SUPABASE_SERVICE_KEY!
    );

    const uploadFiles = async (): Promise<(string | undefined)[]> => {
      const checkIfFileExists = async (fileName: string) => {
        const { data, error } = await supabase.rpc(
          "check_if_contract_file_exists",
          {
            path: fileName,
          }
        );
        if (error) {
          console.error("Error checking existence of file:", error);
          return false;
        } else {
          return data;
        }
      };

      const uploadPromises = formData.files.map(async (file) => {
        var fileName =
          currentUser.id + "/" + file.name.slice(0, file.name.length - 4);
        console.log("fileName:", fileName);

        if (await checkIfFileExists(fileName)) {
          fileName += " (1)";
          console.log("fileName:", fileName);
          var i = 1;
          while (await checkIfFileExists(fileName)) {
            i++;
            fileName = fileName.slice(0, fileName.length - 2) + i + ")";
            console.log("fileName:", fileName);
          }
        }

        const { data, error } = await supabase.storage
          .from("contracts")
          .upload(fileName, file);
        if (error) {
          console.error("Error uploading file to supabase:", error);
        } else {
          console.log("File uploaded successfully:", data);
          return data.path;
        }
      });
      return Promise.all(uploadPromises);
    };

    const paths = await uploadFiles();
    if (
      !(Array.isArray(paths) && paths.every((path) => typeof path === "string"))
    ) {
      console.log("File Upload failed...won't create task");
      return;
    }

    CreateOffer(
      paths as string[],
      formData.offerTitle,
      formData.offerTask,
      formData.offerDescription,
      formData.phoneNumber,
      formData.email
    );

    toast("Success...", {
      description: `Offer has been created!`,
      duration: 2000,
    });

    router.push("/vendorportal/dashboard/offers");
  };

  // This is used in the form popover for selecting the task
  // We do this have the format be created in one place so it's easier to change
  const GetTaskPopoverFormatted = (task: Task | undefined) => {
    if (task) {
      const str = task.id.toString() + " - " + task.title;
      return str.length < 100 ? str : str.substring(0, 100) + "...";
    } else {
      return "unexpected error, please refresh...";
    }
  };

  const DropZoneController = (field: any) => {
    const onDrop = (acceptedFiles: File[]) => {
      form.setValue("files", acceptedFiles);
      //field.onChange(acceptedFiles);
      console.log(field);
      console.log(form);
    };

    const { acceptedFiles, getRootProps, getInputProps } = useDropzone({
      onDrop,
    });

    return (
      <>
        <div
          {...getRootProps({
            className:
              "w-full h-40 flex justify-center items-center border border-dashed border-2 shadow-sm mb-4 hover:cursor-pointer hover:bg-slate-50",
          })}
        >
          <input {...getInputProps()} />
          <p className="font-bold text-lg block">
            Drag n drop some files here, or click to select files
            <span className="text-red-500">*</span>
          </p>
          {errors.files && <p>{errors.files.message}</p>}
        </div>
        {form.getValues("files") && (
          <div className="">
            <h1 className="font-bold text-lg">
              Files:{" "}
              {form
                .getValues("files")
                .map((file) => file.path)
                .join(",")}
            </h1>
          </div>
        )}
      </>
    );
  };

  return (
    <main className="grid flex-1 items-start gap-4 sm:py-0">
      <div className="flex items-center gap-4">
        <Button variant="outline" size="icon" className="h-7 w-7">
          <ChevronLeft className="h-4 w-4" />
          <span className="sr-only">Back</span>
        </Button>
        <h1 className="flex-1 shrink-0 whitespace-nowrap text-xl font-semibold tracking-tight sm:grow-0">
          Offer Creation
        </h1>
        <Badge className="ml-auto sm:ml-0 text-white">{currentUser.user_metadata?.username}</Badge>
        <div className="hidden items-center gap-2 md:ml-auto md:flex">
          <Button variant={"outline"}>Restart</Button>
        </div>
      </div>
      <Card>
        <CardHeader>
          <CardTitle>General Information</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="">
            <Form {...form}>
              <form onSubmit={handleSubmit(onSubmit)}>
                <FormField
                  control={control}
                  name="offerTitle"
                  render={({ field }) => (
                    <FormItem className="mb-5">
                      <h1>
                        Title<span className="text-red-500">*</span>
                      </h1>
                      <Input
                        {...register("offerTitle")}
                        placeholder="Offer title..."
                      />
                      {errors.offerTitle && (
                        <p className="text-red-400 text-sm mt-1">
                          {errors.offerTitle.message}
                        </p>
                      )}
                    </FormItem>
                  )}
                />
                <FormField
                  control={control}
                  name="offerDescription"
                  render={({ field }) => (
                    <FormItem className="mt-3 mb-5">
                      <h1>
                        Description<span className="text-red-500">*</span>
                      </h1>
                      <Textarea
                        {...register("offerDescription")}
                        placeholder="Offer description..."
                      />
                      {errors.offerTitle && (
                        <p className="text-red-400 text-sm mt-1">
                          {errors.offerTitle.message}
                        </p>
                      )}
                    </FormItem>
                  )}
                />
                <FormField
                  control={control}
                  name="offerTask"
                  defaultValue={disablePopoverForm ? defaultTask!.id : NaN}
                  render={({ field }) => (
                    <FormItem className="w-full mt-3 mb-5">
                      <h1>
                        Select Associated Task
                        <span className="text-red-500">*</span>
                      </h1>
                      <Popover>
                        <PopoverTrigger asChild>
                          <FormControl className="w-full">
                            <Button
                              variant="outline"
                              role="combobox"
                              className={cn(
                                "w-full justify-between",
                                !field.value && "w-full text-muted-foreground"
                              )}
                            >
                              {field.value
                                ? GetTaskPopoverFormatted(
                                    tasks.find(
                                      (task) => task.id === field.value
                                    )
                                  )
                                : "Select Task"}
                              <ChevronsUpDown className="ml-2 h-4 w-4 shrink-0 opacity-50" />
                            </Button>
                          </FormControl>
                        </PopoverTrigger>
                        <PopoverContent className="w-[84vw] p-0">
                          <Command className="w-full">
                            <CommandInput placeholder="Select Task..." />
                            <CommandEmpty>No Task Found...</CommandEmpty>
                            <CommandGroup className="w-full">
                              {tasks.map((task) => (
                                <CommandItem
                                  value={task.id.toString()}
                                  key={task.id}
                                  onSelect={() => {
                                    form.setValue("offerTask", task.id);
                                  }}
                                  className="w-full"
                                  disabled={disablePopoverForm}
                                >
                                  <Check
                                    className={cn(
                                      "mr-2 h-4 w-4",
                                      task.id === field.value
                                        ? "opacity-100"
                                        : "opacity-0"
                                    )}
                                  />
                                  {GetTaskPopoverFormatted(task)}
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
                  name="files"
                  render={({ field }) => (
                    <FormItem>
                      <DropZoneController field={field} />
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
                      <Input
                        {...register("email")}
                        placeholder="example@email.com"
                      />
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
                      <Input
                        {...register("phoneNumber")}
                        placeholder="123-456-7890"
                      />
                      {errors.phoneNumber && (
                        <p className="text-red-400 text-sm mt-1">
                          {errors.phoneNumber.message}
                        </p>
                      )}
                    </FormItem>
                  )}
                />
                <Button type="submit">Submit</Button>
              </form>
            </Form>
          </div>
        </CardContent>
      </Card>
    </main>
  );
};

export default CreateOfferForm;
