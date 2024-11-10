"use client";

import { FormEvent, useRef } from "react";
import { useSearchParams, useRouter, usePathname } from "next/navigation";
import { Button } from "@/app/_components/Button";
import { CloseIcon } from "./icons/CloseIcon";

export const SearchBar = () => {
    const inputRef = useRef<HTMLInputElement>(null);

    const searchParams = useSearchParams();
    const params = new URLSearchParams(searchParams);

    const { replace } = useRouter();
    const pathname = usePathname();

    let query = params.get("query");

    const handleSearch = (event: FormEvent<HTMLFormElement>) => {
        event.preventDefault();
        const term = inputRef.current?.value;
        if (term) {
            params.set("query", term);
            inputRef.current.value = "";
        } else {
            params.delete("query");
        }
        replace(`${pathname}?${params.toString()}`);
    };

    const handleSearchDelete = () => {
        params.delete("query");
        replace(`${pathname}?${params.toString()}`);
    };

    return (
        <div className="flex flex-col justify-between bg-sky-100 rounded-md shadow-md overflow-hidden">
            <p className="text-center text-xl font-semibold bg-sky-700 text-sky-50 py-2">
                Search
            </p>
            <form
                noValidate
                onSubmit={handleSearch}
                className="flex flex-col justify-center gap-3 py-3 px-5"
            >
                <input
                    className="w-full border border-gray-700 rounded-md px-3 py-2 focus:border-amber-900"
                    placeholder="enter movie title"
                    type="text"
                    ref={inputRef}
                    defaultValue={searchParams.get("query")?.toString()}
                />
                <div className="flex justify-center md:justify-start gap-2 w-full">
                    <Button text="Search" style="amber" />
                    {query && (
                        <div className="flex items-center gap-2 bg-amber-300 rounded-md text-amber-950 font-bold p-2 overflow-hidden">
                            <span className="truncate">{query}</span>
                            <CloseIcon
                                className="w-5 h-5 cursor-pointer flex-none"
                                handleClick={handleSearchDelete}
                            />
                        </div>
                    )}
                </div>
            </form>
        </div>
    );
};
