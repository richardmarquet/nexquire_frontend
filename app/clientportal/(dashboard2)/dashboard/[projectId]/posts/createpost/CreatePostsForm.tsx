"use client";
import { Option } from "@/components/ui/MultipleSelector";
import { MultiSelect } from "react-multi-select-component";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
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
import { ScrollArea } from "@/components/ui/scroll-area";
import { Textarea } from "@/components/ui/textarea";
import { cn } from "@/lib/utils";
import { zodResolver } from "@hookform/resolvers/zod";
import {
  BadgePlus,
  Check,
  ChevronLeft,
  ChevronsUpDown,
  DollarSign,
  HelpingHand,
  Trash,
  Trash2,
} from "lucide-react";
import React, { useState } from "react";
import { SubmitHandler, useFieldArray, useForm } from "react-hook-form";
import { z } from "zod";
import { CreatePost } from "@/components/actions/posts/PostActions";
import { toast } from "sonner";
import { useRouter } from "next/navigation";
import { Project } from "@/components/types/DemoTypes";
import { Badge } from "@/components/ui/badge";

const optionSchema = z.object({
  label: z.string(),
  value: z.string(),
  disable: z.boolean().optional(),
});

const requestSchema = z.object({
  item: z.string().min(1, "Item name is required"),
  description: z.string().min(1, "Description is required"),
  city: z.string().min(1, "City is required"),
  state: z.string().min(1, "State is required"),
  budget: z
    .number()
    .min(0, "No negative numbers")
    .max(100000000000, "Let's be real..."),
  quantity: z
    .number()
    .min(0, "No negative numbers")
    .max(100000000000, "Let's be real..."),
  unit: z.string(),
  primaryTag: z.string().min(1, "You need a primary tag"),
  secondaryTags: z.array(optionSchema).min(1),
});

const schema = z.object({
  title: z.string().min(1, "Post needs title"),
  description: z.string().min(1, "Post needs description"),
  requests: z.array(requestSchema),
});

type FormData = z.infer<typeof schema>;

interface Props {
  primaryTags: string[];
  primaryToSecondaryTagMap: Map<string, Option[]> | null;
  project: Project;
}

const CreatePostsForm = ({
  primaryTags,
  primaryToSecondaryTagMap,
  project,
}: Props) => {
  const router = useRouter();

  const primaryTagsFormated: Option[] = primaryTags.map(
    (tag): Option => ({
      label: tag,
      value: tag,
    })
  );

  const form = useForm<FormData>({
    resolver: zodResolver(schema),
    defaultValues: {
      requests: [
        {
          item: "",
          description: "",
          city: "",
          state: "",
          budget: 0,
          quantity: 0,
          unit: "",
          primaryTag: "",
          secondaryTags: [],
        },
      ],
    },
  });

  const {
    control,
    register,
    handleSubmit,
    setValue,
    getValues,
    formState: { errors },
  } = form;

  const { fields, append, remove } = useFieldArray({
    control,
    name: "requests",
  });

  const [secondaryTagOptions, setSecondaryTagOptions] = useState<
    Record<number, Option[]>
  >({});

  // TODO make this something better
  if (!primaryTags || !primaryToSecondaryTagMap || !project)
    return <h1>Something went wrong...</h1>;

  const onChangePrimaryTag = (index: number) => {
    // query value from map
    const options = primaryToSecondaryTagMap.get(
      getValues("requests")[index].primaryTag
    );

    // set options for popover
    setSecondaryTagOptions((prev) => ({ ...prev, [index]: options! }));

    // reset the value to avoid incorrect tags
    setValue(`requests.${index}.secondaryTags`, []);
  };

  const addNewRequest = () => {
    append({
      item: "",
      description: "",
      city: "",
      state: "",
      budget: 0,
      quantity: 0,
      unit: "",
      primaryTag: "",
      secondaryTags: [],
    });
  };

  const onSubmit: SubmitHandler<FormData> = async (data: FormData) => {
    console.log(data);

    // I need to format the secondary tags because of the Option[] logic in the selects...
    // I think it's dumb lol
    const reqs = data.requests.map((request) => ({
      item: request.item,
      description: request.description,
      city: request.city,
      state: request.state,
      budget: request.budget,
      quantity: request.quantity,
      unit: request.unit,
      primaryTag: request.primaryTag,
      secondaryTags: request.secondaryTags.map((tag): string => tag.value),
    }));

    const res: boolean | null = await CreatePost(
      data.title,
      data.description,
      project.id,
      reqs
    );

    if (res == null || !res) {
      toast("Error...", {
        description: `Post failed to be created...`,
        duration: 2000,
      });
    }

    toast("Success...", {
      description: `Post has been created!`,
      duration: 2000,
    });

    router.replace(`/clientportal/dashboard/${project.id}/posts`);
    router.refresh();
  };

  return (
    <main className="grid flex-1 items-start gap-4 sm:py-0">
      <div className="flex items-center gap-4">
        <Button variant="outline" size="icon" className="h-7 w-7">
          <ChevronLeft className="h-4 w-4" />
          <span className="sr-only">Back</span>
        </Button>
        <h1 className="flex-1 shrink-0 whitespace-nowrap text-xl font-semibold tracking-tight sm:grow-0">
          Post Creation
        </h1>
        <Badge className="ml-auto sm:ml-0 text-white">{project.title}</Badge>
        <div className="hidden items-center gap-2 md:ml-auto md:flex">
          <Button variant={"outline"}>Restart</Button>
        </div>
      </div>
      <div className="grid gap-4 md:grid-cols-[1fr_250px] lg:grid-cols-3 lg:gap-8">
        <div className="grid auto-rows-max items-start gap-4 lg:col-span-2 lg:gap-8">
          <Form {...form}>
            <form onSubmit={handleSubmit(onSubmit)}>
              <Card>
                <CardHeader>
                  <CardTitle>General Post Information</CardTitle>
                  <CardDescription>
                    Basic information about the post
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <FormField
                    name={"title"}
                    control={control}
                    render={({ field }) => (
                      <FormItem className="mb-5">
                        <h1 className="text-lg font-bold mb-1">Title</h1>
                        <Input {...field} placeholder="Title" />
                        {errors.title && <p>{errors.title.message}</p>}
                      </FormItem>
                    )}
                  />
                  <FormField
                    name={"description"}
                    control={control}
                    render={({ field }) => (
                      <FormItem className="mt-5 mb-5">
                        <h1 className="text-lg font-bold mb-1">Description</h1>
                        <Textarea {...field} placeholder="Description" />
                        {errors.description && (
                          <p>{errors.description.message}</p>
                        )}
                      </FormItem>
                    )}
                  />
                </CardContent>
              </Card>
              {/* Create request map */}
              <div className="flex items-center gap-4 mt-5 mb-5">
                <Button variant="outline" size="icon" className="h-7 w-7">
                  <ChevronLeft className="h-4 w-4" />
                  <span className="sr-only">Back</span>
                </Button>
                <h1 className="flex-1 shrink-0 whitespace-nowrap text-xl font-semibold tracking-tight sm:grow-0">
                  Requests
                </h1>
                <Badge className="ml-auto sm:ml-0 text-white">
                  {fields.length} request<span>{fields.length >= 2 ? "s" : ""}</span>
                </Badge>
              </div>
              {fields.map((field, index) => (
                <div key={field.id}>
                  <Card className="mb-5">
                    <CardContent>
                      <div className="flex justify-between mt-2">
                        <h1 className="text-lg font-bold">
                          Request {index + 1}
                        </h1>
                        {fields.length > 1 && (
                          <Trash2
                            className="text-red-500"
                            onClick={() => remove(index)}
                          />
                        )}
                      </div>
                      <FormField
                        name={`requests.${index}.item`}
                        control={control}
                        render={({ field }) => (
                          <FormItem className="mt-5 mb-5">
                            <h1 className="text-lg font-bold mb-1">Item</h1>
                            <Input {...field} placeholder="item" />
                            {errors.requests &&
                              errors.requests[index]?.item && (
                                <p>
                                  {errors.requests?.[index]?.item?.message ??
                                    "item Error..."}
                                </p>
                              )}
                          </FormItem>
                        )}
                      />
                      <FormField
                        name={`requests.${index}.description`}
                        control={control}
                        render={({ field }) => (
                          <FormItem className="mt-5 mb-5">
                            <h1 className="text-lg font-bold mb-1">
                              Description
                            </h1>
                            <Textarea {...field} placeholder="Description" />
                            {errors.requests &&
                              errors.requests[index]?.description && (
                                <p>
                                  {errors.requests?.[index]?.description
                                    ?.message ?? "Description Error..."}
                                </p>
                              )}
                          </FormItem>
                        )}
                      />
                      <div className="flex justify-between w-full h-full space-x-20">
                        <FormField
                          name={`requests.${index}.city`}
                          control={control}
                          render={({ field }) => (
                            <FormItem className="w-full mt-5 mb-5">
                              <h1 className="text-lg font-bold mb-1">City</h1>
                              <Input {...field} placeholder="City" />
                              {errors.requests &&
                                errors.requests[index]?.city && (
                                  <p>
                                    {errors.requests?.[index]?.city?.message ??
                                      "City Error..."}
                                  </p>
                                )}
                            </FormItem>
                          )}
                        />
                        <FormField
                          name={`requests.${index}.state`}
                          control={control}
                          render={({ field }) => (
                            <FormItem className="w-full mt-5 mb-5">
                              <h1 className="text-lg font-bold mb-1">State</h1>
                              <Input {...field} placeholder="State" />
                              {errors.requests &&
                                errors.requests[index]?.state && (
                                  <p>
                                    {errors.requests?.[index]?.state?.message ??
                                      "State Error..."}
                                  </p>
                                )}
                            </FormItem>
                          )}
                        />
                      </div>
                      <div className="flex justify-between w-full h-full space-x-10">
                        <FormField
                          name={`requests.${index}.budget`}
                          control={control}
                          render={({ field }) => (
                            <FormItem className="w-full mt-5 mb-5">
                              <h1 className="text-lg font-bold mb-1">
                                Budget (
                                <span className="font-bold text-green-600">
                                  $
                                </span>
                                )
                              </h1>
                              <Input
                                type="number"
                                {...field}
                                onChange={(e) =>
                                  field.onChange(Number(e.target.value))
                                }
                              />
                              {errors.requests &&
                                errors.requests[index]?.budget && (
                                  <p>
                                    {errors.requests?.[index]?.budget
                                      ?.message ?? "Budget Error..."}
                                  </p>
                                )}
                            </FormItem>
                          )}
                        />
                        <FormField
                          name={`requests.${index}.quantity`}
                          control={control}
                          render={({ field }) => (
                            <FormItem className="w-full mt-5 mb-5">
                              <h1 className="text-lg font-bold mb-1">
                                Quantity
                              </h1>
                              <Input
                                type="number"
                                {...field}
                                onChange={(e) =>
                                  field.onChange(Number(e.target.value))
                                }
                              />
                              {errors.requests &&
                                errors.requests[index]?.quantity && (
                                  <p>
                                    {errors.requests?.[index]?.quantity
                                      ?.message ?? "Quantity Error..."}
                                  </p>
                                )}
                            </FormItem>
                          )}
                        />
                        <FormField
                          name={`requests.${index}.unit`}
                          control={control}
                          render={({ field }) => (
                            <FormItem className="w-full mt-5 mb-5">
                              <h1 className="text-lg font-bold mb-1">Unit</h1>
                              <Input
                                type="text"
                                {...field}
                                placeholder="unit"
                              />
                              {errors.requests &&
                                errors.requests[index]?.unit && (
                                  <p>
                                    {errors.requests?.[index]?.unit?.message ??
                                      "unit Error..."}
                                  </p>
                                )}
                            </FormItem>
                          )}
                        />
                      </div>
                      <div className="w-full h-full flex justify-center space-x-20">
                        <FormField
                          name={`requests.${index}.primaryTag`}
                          control={control}
                          render={({ field }) => (
                            <FormItem className="w-full mt-5 mb-5">
                              <h1 className="text-lg font-bold mb-1">
                                Primary Tag
                              </h1>
                              <Popover>
                                <PopoverTrigger asChild>
                                  <FormControl className="w-full">
                                    <Button
                                      variant="outline"
                                      role="combobox"
                                      className={cn(
                                        "w-full justify-between",
                                        !field.value &&
                                          "w-full text-muted-foreground"
                                      )}
                                    >
                                      {field.value
                                        ? primaryTagsFormated.find(
                                            (tag) => tag.value === field.value
                                          )?.label
                                        : "Select Primary Tag"}
                                      <ChevronsUpDown className="ml-2 h-4 w-4 shrink-0 opacity-50" />
                                    </Button>
                                  </FormControl>
                                </PopoverTrigger>
                                <PopoverContent className="w-[35vw] p-0">
                                  <Command className="w-full">
                                    <CommandInput placeholder="Select primary tag" />
                                    <CommandEmpty>
                                      No tags found...
                                    </CommandEmpty>
                                    <ScrollArea className="h-32 w-full overflow-auto">
                                      <CommandGroup className="w-full">
                                        {primaryTagsFormated.map((choice) => (
                                          <CommandItem
                                            value={choice.label}
                                            key={choice.value}
                                            onSelect={() => {
                                              form.setValue(
                                                `requests.${index}.primaryTag`,
                                                choice.value as string
                                              );
                                              onChangePrimaryTag(index);
                                            }}
                                            className="w-full"
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
                                    </ScrollArea>
                                  </Command>
                                </PopoverContent>
                              </Popover>
                            </FormItem>
                          )}
                        />
                        <FormField
                          control={control}
                          name={`requests.${index}.secondaryTags`}
                          disabled={false}
                          render={({ field }) => (
                            <FormItem className="w-full mt-5 mb-5">
                              <h1 className="text-lg font-bold mb-1">
                                Secondary Tags
                              </h1>
                              <MultiSelect
                                options={secondaryTagOptions[index] ?? []}
                                onChange={field.onChange}
                                value={field.value}
                                labelledBy="Secondary Tags"
                                hasSelectAll={false}
                              />
                            </FormItem>
                          )}
                        />
                      </div>
                    </CardContent>
                  </Card>
                </div>
              ))}
              <div className="flex justify-between mt-5">
                <Button
                  type="button"
                  variant={"outline"}
                  className=""
                  onClick={addNewRequest}
                >
                  Add Request
                </Button>
                <Button type="submit" className="" variant={"default"}>
                  Create Post
                </Button>
              </div>
            </form>
          </Form>
        </div>
        <div className="grid auto-rows-max items-start gap-4 lg:gap-8">
          <Card>
            <CardHeader className="pb-2">
              <div className="text-sm text-muted-foreground flex justify-between items-center">
                Project Budget
                <Badge
                  variant={"outline"}
                  className="hover:cursor-pointer hover:bg-slate-100"
                >
                  <HelpingHand className="" />
                </Badge>
              </div>
              <CardTitle className="text-2xl">${project.budget}</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="text-xs text-muted-foreground">
                The total global project budget
              </div>
            </CardContent>
          </Card>
          <Card>
            <CardHeader className="pb-2">
              <div className="text-sm text-muted-foreground flex justify-between items-center">
                Project Budget Spent
              </div>
              <CardTitle className="text-2xl">
                ${project.amount_spent}
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="text-xs text-muted-foreground">
                The total project budget spent so far
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </main>
  );
};

export default CreatePostsForm;
