"use client";
import { useState } from "react";
import { FormPopoverValues } from "./FormPopoverTypes";
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover";
import { Command, CommandInput, CommandEmpty, CommandGroup, CommandItem } from "@/components/ui/command";
import { Check, ChevronsUpDown } from "lucide-react";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";

interface FormPopoverProps {
  choices: FormPopoverValues[];
}

const FormPopover = ({ choices }: FormPopoverProps) => {
  const [open, setOpen] = useState(false);
  const [value, setValue] = useState("");

  return (
    <Popover open={open} onOpenChange={setOpen}>
      <PopoverTrigger asChild>
        <Button
          variant="outline"
          role="combobox"
          aria-expanded={open}
          className="w-[200px] justify-between"
        >
          {value
            ? choices.find((choice) => choice.value === value)?.label
            : "Select User Type..."}
          <ChevronsUpDown className="ml-2 h-4 w-4 shrink-0 opacity-50" />
        </Button>
      </PopoverTrigger>
      <PopoverContent className="w-[200px] p-0">
        <Command>
          <CommandInput placeholder="Select User Type..." />
          <CommandEmpty>No User Types Found</CommandEmpty>
          <CommandGroup>
            {choices.map((choice) => (
              <CommandItem
                key={choice.value}
                value={choice.value}
                onSelect={(currentValue) => {
                  setValue(currentValue === value ? "" : currentValue);
                  setOpen(false);
                }}
              >
                <Check
                  className={cn(
                    "mr-2 h-4 w-4",
                    value === choice.value ? "opacity-100" : "opacity-0"
                  )}
                />
                {choice.label}
              </CommandItem>
            ))}
          </CommandGroup>
        </Command>
      </PopoverContent>
    </Popover>
  );
};

export default FormPopover;
