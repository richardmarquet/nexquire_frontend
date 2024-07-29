"use client"
import { Offer } from "@/components/types/DemoTypes";
import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuCheckboxItem,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuRadioGroup,
  DropdownMenuRadioItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import {
  ColumnDef,
  ColumnFiltersState,
  flexRender,
  getCoreRowModel,
  getFilteredRowModel,
  getPaginationRowModel,
  getSortedRowModel,
  SortingState,
  useReactTable,
  VisibilityState,
} from "@tanstack/react-table";
import { ChevronDown, MoreHorizontal } from "lucide-react";
import { Badge } from "@/components/ui/badge";
import React from "react";
import { useRouter } from "next/navigation";
import { Card, CardContent } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import moment from "moment-timezone";

export const columns: ColumnDef<Offer>[] = [
  {
    accessorKey: "title",
    header: "Title",
    cell: ({ row }) => {
      let title = row.original.title;
      return <span className="text-sm">{title}</span>;
    },
  },
  {
    accessorKey: "vendor_name",
    header: "Vendor",
    cell: ({ row }) => {
      let vendor = row.original.vendor_name;
      return <span className="text-sm">{vendor}</span>;
    },
  },
  {
    header: "Requests",
    cell: ({ row }) => {
      let request = row.original.task.requests;
      return <span className="text-sm">{request.length}</span>;
    },
  },
  {
    header: "Created",
    cell: ({ row }) => {
        let createdAt = row.original.created_at;
        return <span className="text-sm">{moment(createdAt).format("MMMM Do YYYY")}</span>
    }
  },
  {
    accessorKey: "active",
    header: "State",
    cell: ({ row }) => {
      const active = row.original.active;
      const text = active ? "Active" : "Inactive";
      const classname = active ? "bg-green-400" : "bg-red-400";
      return <Badge className={classname}>{text}</Badge>;
    },
  },
  {
    id: "actions",
    cell: ({ row }) => {
      const post = row.original;

      return (
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button variant="ghost" className="h-8 w-8 p-0">
              <span className="sr-only">Open menu</span>
              <MoreHorizontal className="h-4 w-4" />
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent align="end">
            <DropdownMenuLabel>Actions</DropdownMenuLabel>
            <DropdownMenuItem
              onClick={() => navigator.clipboard.writeText(post.id.toString())}
            >
              Copy post ID
            </DropdownMenuItem>
            <DropdownMenuSeparator />
            <DropdownMenuItem>View post details</DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      );
    },
  },
];

type FILTER_POST_ACTIVE = "active" | "inactive" | "both";

interface Props {
  data: Offer[];
  projectId: number;
}

const OffersTable = ({ data, projectId }: Props) => {
  const [sorting, setSorting] = React.useState<SortingState>([]);
  const [columnFilters, setColumnFilters] = React.useState<ColumnFiltersState>(
    []
  );
  const [columnVisibility, setColumnVisibility] =
    React.useState<VisibilityState>({});

  const table = useReactTable<Offer>({
    data,
    columns,
    getCoreRowModel: getCoreRowModel(),
    getPaginationRowModel: getPaginationRowModel(),
    onSortingChange: setSorting,
    getSortedRowModel: getSortedRowModel(),
    onColumnFiltersChange: setColumnFilters,
    getFilteredRowModel: getFilteredRowModel(),
    onColumnVisibilityChange: setColumnVisibility,
    state: {
      sorting,
      columnFilters,
      columnVisibility,
    },
  });
  const [activeDropDown, setActiveDropDown] =
    React.useState<FILTER_POST_ACTIVE>("both");

  const router = useRouter();

  const SetActiveFilter = (val: FILTER_POST_ACTIVE) => {
    if (val === "active") {
      table.getColumn("active")?.setFilterValue(true);
      setActiveDropDown("active");
    } else if (val === "inactive") {
      table.getColumn("active")?.setFilterValue(false);
      setActiveDropDown("inactive");
    } else {
      table.getColumn("active")?.setFilterValue(undefined);
      setActiveDropDown("both");
    }
  };

  const handleMouseUp = (rowId: number) => {
    const selection = window.getSelection();
    if (!selection || selection.toString().length === 0) {
      router.push(`/clientportal/dashboard/${projectId}/offers/${rowId}`);
    }
  };

  return (
    <div>
      <Card className="mb-2 overflow-hidden">
        <CardContent className="flex justify-between items-center gap-1 bg-white p-1.5">
          <Input
            placeholder="Filter titles..."
            value={(table.getColumn("title")?.getFilterValue() as string) ?? ""}
            onChange={(event) =>
              table.getColumn("title")?.setFilterValue(event.target.value)
            }
            className="border-none"
          />
          <Input
            placeholder="Filter vendor..."
            value={(table.getColumn("vendor_name")?.getFilterValue() as string) ?? ""}
            onChange={(event) =>
              table.getColumn("vendor_name")?.setFilterValue(event.target.value)
            }
            className="border-none"
          />
          <div className="flex gap-1">
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button variant="outline" className="flex items-center">
                  State
                  <ChevronDown className="h-4 w-4" />
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent className="">
                <DropdownMenuRadioGroup
                  value={activeDropDown}
                  onValueChange={(event) =>
                    SetActiveFilter(event as FILTER_POST_ACTIVE)
                  }
                >
                  <DropdownMenuRadioItem value="active">
                    Active
                  </DropdownMenuRadioItem>
                  <DropdownMenuRadioItem value="inactive">
                    Inactive
                  </DropdownMenuRadioItem>
                  <DropdownMenuRadioItem value="both">
                    Both
                  </DropdownMenuRadioItem>
                </DropdownMenuRadioGroup>
              </DropdownMenuContent>
            </DropdownMenu>
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button variant="outline" className="">
                  View
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent align="end">
                {table
                  .getAllColumns()
                  .filter((column) => column.getCanHide())
                  .map((column) => {
                    return (
                      <DropdownMenuCheckboxItem
                        key={column.id}
                        className="capitalize"
                        checked={column.getIsVisible()}
                        onCheckedChange={(value) =>
                          column.toggleVisibility(!!value)
                        }
                      >
                        {column.id}
                      </DropdownMenuCheckboxItem>
                    );
                  })}
              </DropdownMenuContent>
            </DropdownMenu>
          </div>
        </CardContent>
      </Card>
      <div className="rounded-md border bg-white">
        <Table>
          <TableHeader>
            {table.getHeaderGroups().map((headerGroup) => (
              <TableRow key={headerGroup.id}>
                {headerGroup.headers.map((header) => {
                  return (
                    <TableHead key={header.id}>
                      {header.isPlaceholder
                        ? null
                        : flexRender(
                            header.column.columnDef.header,
                            header.getContext()
                          )}
                    </TableHead>
                  );
                })}
              </TableRow>
            ))}
          </TableHeader>
          <TableBody>
            {table.getRowModel().rows?.length ? (
              table.getRowModel().rows.map((row) => (
                <TableRow
                  key={row.id}
                  data-state={row.getIsSelected() && "selected"}
                  onMouseUp={() => handleMouseUp(row.original.id)} // we do this so you can copy text
                  className="hover:cursor-pointer"
                >
                  {row.getVisibleCells().map((cell) => (
                    <TableCell key={cell.id}>
                      {flexRender(
                        cell.column.columnDef.cell,
                        cell.getContext()
                      )}
                    </TableCell>
                  ))}
                </TableRow>
              ))
            ) : (
              <TableRow>
                <TableCell
                  colSpan={columns.length}
                  className="h-24 text-center"
                >
                  No results.
                </TableCell>
              </TableRow>
            )}
          </TableBody>
        </Table>
      </div>
      <div className="flex items-center justify-end space-x-2 py-4">
        <Button
          variant="outline"
          size="sm"
          onClick={() => table.previousPage()}
          disabled={!table.getCanPreviousPage()}
        >
          Previous
        </Button>
        <Button
          variant="outline"
          size="sm"
          onClick={() => table.nextPage()}
          disabled={!table.getCanNextPage()}
        >
          Next
        </Button>
      </div>
    </div>
  );
};

export default OffersTable;
