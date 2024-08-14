import { Skeleton } from "@/components/ui/skeleton";
import { TableBody, TableCell, TableRow } from "../ui/table"

export function ListSkeleton() {
    return (
        <TableBody>
            {[...Array(1)].map((_, index) => (
                <TableRow key={index} className="table-row">
                    <TableCell className="flex md:table-cell items-center gap-2">
                        <div className="flex items-center">
                            <Skeleton className="h-10 w-[250px]" />
                        </div>
                    </TableCell>
                    <TableCell className="flex md:table-cell items-center gap-2">
                        <div className="flex items-center">
                            <Skeleton className="h-10 w-[250px]" />
                        </div>
                    </TableCell>
                    <TableCell className="flex md:table-cell items-center gap-2">
                        <div className="flex items-center">
                            <Skeleton className="h-10 w-[250px]" />
                        </div>
                    </TableCell>
                    <TableCell className="flex md:table-cell items-center gap-2">
                        <div className="flex items-center">
                            <Skeleton className="h-10 w-[250px]" />
                        </div>
                    </TableCell>
                </TableRow>
            ))}
        </TableBody>
    )
}


