"use client";
import { usePathname, useRouter, useSearchParams } from "next/navigation";
import { CloseIcon } from "./icons/CloseIcon";

interface Item {
    type: string;
    value: string;
    text: string;
}

interface SortFilterProps {
    itemsList: Item[];
    elementType: string;
}

export const SortFilterBar = ({ itemsList, elementType }: SortFilterProps) => {
    const searchParams = useSearchParams();
    const params = new URLSearchParams(searchParams);

    const { replace } = useRouter();
    const pathname = usePathname();

    let filter = params.get("filter");
    let sort = params.get("sort");

    const elementStyle = "py-2 px-2 rounded-md cursor-pointer hover:bg-sky-300";
    const elementSelectedStyle = " bg-sky-300 flex justify-between";

    const handleSelection = (term: string) => {
        // if (term) {
        params.set(elementType, term);
        // } else {
        // params.delete(elementType);
        // }
        replace(`${pathname}?${params.toString()}`);
    };

    const handleRemoveSelection = () => {
        params.delete(elementType);
        replace(`${pathname}?${params.toString()}`);
    };

    return (
        <div className="flex flex-col rounded-md shadow-md bg-sky-100 overflow-hidden">
            <p className="bg-sky-700 text-sky-50 text-center text-xl font-bold py-2 mb-2">
                {elementType === "sort" ? "Sort by:" : "Filter by:"}
            </p>
            <ul className="flex flex-col justify-between font-bold px-5 py-2 items-center md:items-stretch">
                {itemsList.map((item) => (
                    <li
                        className={
                            filter === item.value || sort === item.value
                                ? elementStyle + elementSelectedStyle
                                : elementStyle
                        }
                        key={item.value}
                        onClick={() => {
                            if (filter !== item.value && sort !== item.value) {
                                handleSelection(item.value);
                            }
                        }}
                    >
                        {item.text}
                        {(filter === item.value || sort === item.value) && (
                            <CloseIcon
                                className="w-5 h-5 cursor-pointer"
                                handleClick={handleRemoveSelection}
                            />
                        )}
                    </li>
                ))}
            </ul>
        </div>
    );
};
