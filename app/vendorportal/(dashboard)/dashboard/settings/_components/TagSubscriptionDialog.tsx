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
  PlusCircle,
} from "lucide-react";
import { useState, Ref } from "react";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { SubmitHandler, useForm } from "react-hook-form";
import { useRouter } from "next/navigation";
import { toast } from "sonner";
import { AddSecondaryTagNotifications } from "@/components/actions/notifications/NotificationActions";

const optionSchema = z.object({
  label: z.string(),
  value: z.string(),
  disable: z.boolean().optional(),
});

const schema = z.object({
  tagNames: z.array(optionSchema).min(1),
});

type FormData = z.infer<typeof schema>;

interface Props {
  currentTags: string[];
  tagMap: Map<string, string>; // secondary to primary
}

const TagSubscriptionDialog = ({ currentTags, tagMap }: Props) => {
  const router = useRouter();

  const form = useForm<FormData>({
    resolver: zodResolver(schema),
  });

  const {
    control,
    handleSubmit,
    formState: { errors },
  } = form;

  const onSubmit: SubmitHandler<FormData> = async (data: FormData) => {
    setDialogOpen(false);

    const res = await AddSecondaryTagNotifications({ secondaryTagNames: data.tagNames.map((tag): string => tag.value)});

    if (!res) {
      toast("Error...", {
        description: `Unable to subscribe to tag(s)...`,
        duration: 2000,
      });
      return;
    }

    toast("Successfully Subscribed to Tag(s)!", {
      description: `You will now recieve notifications on ${data.tagNames.length} new tags`,
      duration: 2000,
    });

    setTimeout(() => {
      router.refresh();
    }, 500);
  };

  let tagsFormated: Option[] = [];
  tagMap.forEach((primTag, secTag) => {
    let disabled = false;
    if (currentTags.includes(secTag)) {
      disabled = true;
    }
    tagsFormated.push({
      label: `${primTag} -> ${secTag}`,
      value: secTag,
      disable: disabled
    }); 
  });

  console.log(tagsFormated);

  const [dialogOpen, setDialogOpen] = useState(false);

  const onOpenChangeForDialog = () => {
    setDialogOpen(false);
  };

  return (
    <>
      <Button onClick={() => setDialogOpen(true)} variant={"default"}>
        <PlusCircle className="w-5 h-5 mr-1" />
        Add Tag
      </Button>
      <Dialog onOpenChange={() => onOpenChangeForDialog()} open={dialogOpen}>
        <DialogContent>
          <DialogTitle>Tag Subcription</DialogTitle>
          <div className="w-full">
            <Form {...form}>
              <form onSubmit={handleSubmit(onSubmit)}>
                <FormField
                  control={control}
                  name="tagNames"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel className="text-md">
                        Requests<span className="text-red-500">*</span>
                      </FormLabel>
                      <FormControl>
                        <MultipleSelector
                          value={field.value}
                          onChange={field.onChange}
                          defaultOptions={tagsFormated}
                          placeholder="Select all tags you want to be notified on"
                          emptyIndicator={
                            <p className="text-center text-lg leading-10 text-gray-600 dark:text-gray-400">
                              no results found.
                            </p>
                          }
                        />
                      </FormControl>
                      {errors.tagNames && (
                        <p>{errors.tagNames.message}</p>
                      )}
                    </FormItem>
                  )}
                />
                <Button
                  type="submit"
                  variant={"outline"}
                  className="mt-5 w-full"
                >
                  Add Tag(s)
                </Button>
              </form>
            </Form>
          </div>
        </DialogContent>
      </Dialog>
    </>
  );
};

export default TagSubscriptionDialog;
