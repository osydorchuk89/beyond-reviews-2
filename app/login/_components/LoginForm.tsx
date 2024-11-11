"use client";
import Link from "next/link";

import { Button } from "@/app/_components/Button";
import { SocialLoginButton } from "./SocialLoginButton";
import { useActionState, useState } from "react";
import { loginWithCredentials } from "@/lib/actions";
import { useAppDispatch } from "@/store/hooks";
import { infoBarActions } from "@/store";

export const LoginForm = () => {
    const [focusedFields, setFocusedFields] = useState({
        email: false,
        password: false,
    });
    const [formState, formAction, pending] = useActionState(
        loginWithCredentials,
        null
    );

    const dispatch = useAppDispatch();

    return (
        <div className="flex flex-col justify-center items-center">
            <form
                noValidate
                className="flex flex-col justify-start md:w-[26rem] bg-sky-100 shadow-lg px-10 pt-8 pb-10 rounded-md gap-5"
                action={(formData: FormData) => {
                    setFocusedFields({
                        email: false,
                        password: false,
                    });
                    formAction(formData);
                    // setTimeout(
                    //     () => dispatch(infoBarActions.showLoggedInBar()),
                    //     1000
                    // );
                }}
            >
                <p className="text-2xl font-bold text-center">
                    Login to your account
                </p>
                <div className="flex flex-col gap-2">
                    <label htmlFor="email">Email:</label>
                    <input
                        className="border border-gray-700 rounded-md px-3 py-2 focus:border-amber-900"
                        type="email"
                        name="email"
                        placeholder="your@email.com"
                        onFocus={() =>
                            setFocusedFields((prevState) => ({
                                ...prevState,
                                email: true,
                            }))
                        }
                        defaultValue={
                            (formState?.payload.email as string) || ""
                        }
                    />
                </div>
                <div className="flex flex-col gap-2">
                    <label htmlFor="password">Password:</label>
                    <input
                        className="border border-gray-700 rounded-md px-3 py-2 focus:border-amber-900"
                        type="password"
                        name="password"
                        placeholder="password"
                        onFocus={() =>
                            setFocusedFields((prevState) => ({
                                ...prevState,
                                password: true,
                            }))
                        }
                        defaultValue={
                            (formState?.payload.password as string) || ""
                        }
                    />
                </div>
                <p className="text-red-700 font-medium">
                    {!focusedFields.email &&
                        !focusedFields.password &&
                        formState?.error}
                </p>
                <div className="flex justify-center">
                    <Button type="submit" style="amber" text="LOGIN" />
                </div>
                <p className="w-full text-center border-b-2 border-amber-950 leading-[0.1rem] my-5">
                    <span className="bg-sky-100 px-2">or</span>
                </p>
                <SocialLoginButton />
                <p className="text-center">
                    Don't have an account?{" "}
                    <Link
                        className="font-semibold hover:underline"
                        href="/registration"
                    >
                        Register here
                    </Link>
                </p>
            </form>
        </div>
    );
};
