
import React, { useState } from 'react';
import { format, parse } from "date-fns";
import { Calendar as CalendarIcon } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Calendar } from "@/components/ui/calendar";
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover";
import { Input } from "@/components/ui/input";
import { cn } from "@/lib/utils";

interface DateInputPickerProps {
  date: Date | undefined;
  onDateChange: (date: Date | undefined) => void;
  disabled?: (date: Date) => boolean;
}

export function DateInputPicker({ date, onDateChange, disabled }: DateInputPickerProps): JSX.Element {
  const [inputValue, setInputValue] = useState(date ? format(date, 'MM/dd/yyyy') : '');

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>): void => {
    const value = e.target.value;
    setInputValue(value);

    try {
      // Parse the input value in MM/dd/yyyy format
      const parsedDate = parse(value, 'MM/dd/yyyy', new Date());
      // Check if it's a valid date and the format matches exactly
      if (value.length === 10 && !isNaN(parsedDate.getTime())) {
        onDateChange(parsedDate);
      }
    } catch (error) {
      // Invalid date format, just update the input
    }
  };

  return (
    <div className="flex gap-2">
      <Input
        type="text"
        placeholder="MM/DD/YYYY"
        value={inputValue}
        onChange={handleInputChange}
        className="w-[150px]"
      />
      <Popover>
        <PopoverTrigger asChild>
          <Button variant="outline" size="icon">
            <CalendarIcon className="h-4 w-4" />
          </Button>
        </PopoverTrigger>
        <PopoverContent className="w-auto p-0" align="end">
          <Calendar
            mode="single"
            selected={date}
            onSelect={(newDate): void => {
              onDateChange(newDate);
              if (newDate) {
                setInputValue(format(newDate, 'MM/dd/yyyy'));
              }
            }}
            disabled={disabled}
            initialFocus
            className={cn("p-3 pointer-events-auto")}
          />
        </PopoverContent>
      </Popover>
    </div>
  );
}
