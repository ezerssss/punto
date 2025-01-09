'use client';

import React from 'react';
import 'react-date-range/dist/styles.css';
import 'react-date-range/dist/theme/default.css';
import { DateRangePicker, Range } from 'react-date-range';
import {
    Popover,
    PopoverContent,
    PopoverTrigger,
} from '@/components/ui/popover';
import { Button } from '../ui/button';
import { categorizeDates } from '@/lib/utils';
import { ChevronDownIcon } from 'lucide-react';

interface PropsInterface {
    dateRange: Range[];
    setDateRange: React.Dispatch<React.SetStateAction<Range[]>>;
}

function DateSelector(props: PropsInterface) {
    const { dateRange, setDateRange } = props;

    return (
        <Popover>
            <PopoverTrigger asChild>
                <Button variant="outline" className="text-[#64748B]">
                    Time frame:{' '}
                    <span className="font-bold">
                        {categorizeDates(
                            dateRange[0].startDate,
                            dateRange[0].endDate
                        )}
                    </span>
                    <ChevronDownIcon />
                </Button>
            </PopoverTrigger>
            <PopoverContent className="ml-12 w-fit p-0">
                <DateRangePicker
                    onChange={(item) => setDateRange([item.selection])}
                    moveRangeOnFirstSelection={false}
                    preventSnapRefocus={true}
                    months={2}
                    weekStartsOn={0}
                    ranges={dateRange}
                    direction="horizontal"
                    calendarFocus="backwards"
                />
            </PopoverContent>
        </Popover>
    );
}

export default DateSelector;
