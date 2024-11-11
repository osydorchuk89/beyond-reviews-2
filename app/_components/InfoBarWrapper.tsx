"use client";

import { AnimatePresence } from "framer-motion";
import { InfoBar } from "./InfoBar";
import { useAppSelector } from "@/store/hooks";

export const InfoBarWrapper = () => {
    const { justLoggedIn } = useAppSelector((state) => state.infoBar);
    return (
        <AnimatePresence>
            {justLoggedIn && <InfoBar action="justLoggedIn" />}
        </AnimatePresence>
    );
};
