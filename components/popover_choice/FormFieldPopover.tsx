"use client";
import { Button } from "@/components/ui/button";
import { FormField, FormItem, FormControl } from "@/components/ui/form";
import { cn } from "@/lib/utils";
import {
  Popover,
  PopoverTrigger,
  PopoverContent,
} from "@/components/ui/popover";
import {
  Command,
  CommandEmpty,
  CommandGroup,
  CommandInput,
  CommandItem,
} from "@/components/ui/command";
import { ChevronsUpDown, Check } from "lucide-react";
import { FieldValues, Path, PathValue, UseFormReturn } from "react-hook-form";
import { FormPopoverValues } from "@/components/popover_choice/FormPopoverTypes";

interface Props<TForm extends FieldValues> {
  form: UseFormReturn<TForm>;
  name: string;
  items: FormPopoverValues[];
}

const FormFieldPopover = <TForm extends FieldValues>({
  form,
  name,
  items,
}: Props<TForm>) => {
  const { control } = form;

  return (
    <FormField
      control={control}
      name={name as Path<TForm>}
      render={({ field }) => (
        <FormItem className="mt-3 mb-5">
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
                    ? items.find((choice) => choice.value === field.value)
                        ?.label
                    : `Select ${name}`}
                  <ChevronsUpDown className="ml-2 h-4 w-4 shrink-0 opacity-50" />
                </Button>
              </FormControl>
            </PopoverTrigger>
            <PopoverContent className="w-[200px] p-0">
              <Command>
                <CommandInput placeholder={`Select ${name}`} />
                <CommandEmpty>{name} not found</CommandEmpty>
                <CommandGroup>
                  {items.map((choice) => (
                    <CommandItem
                      value={choice.label}
                      key={choice.value}
                      onSelect={() => {
                        form.setValue(
                          name as Path<TForm>,
                          choice.value as PathValue<TForm, Path<TForm>>
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
                      <span className="font-bold">{choice.label}</span>
                    </CommandItem>
                  ))}
                </CommandGroup>
              </Command>
            </PopoverContent>
          </Popover>
        </FormItem>
      )}
    />
  );
};


export default FormFieldPopover;
