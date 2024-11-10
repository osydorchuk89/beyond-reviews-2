"use client";

// import axios from "axios";
// import { useNavigate } from "@tanstack/react-router";
// import { useForm } from "react-hook-form";
// import { useMutation } from "@tanstack/react-query";
// import { zodResolver } from "@hookform/resolvers/zod";
// import { UserSchema } from "../../lib/schemas";
// import { Button } from "../Button";
// import { BASE_API_URL } from "../../lib/urls";
// import { useAppDispatch, useAppSelector } from "../../store/hooks";
// import { infoBarActions } from "../../store";

import { Button } from "@/app/_components/Button";
import { sendRegistrationData } from "@/lib/requests";
import { FormEvent, useActionState, useRef, useState } from "react";
import { useFormState } from "react-dom";

type RegistrationInputs = {
    firstName: string;
    lastName: string;
    email: string;
    password: string;
    photo: File[];
};

export const RegistrationForm = () => {
    // const registrationFormRef = useRef<HTMLFormElement>(null);
    // const {
    //     register,
    //     handleSubmit,
    //     formState: { errors },
    //     setError,
    // } = useForm<RegistrationInputs>({
    //     resolver: zodResolver(UserSchema),
    // });

    // const { justLoggedIn, justLoggedOut } = useAppSelector(
    //     (state) => state.infoBar
    // );
    // const dispatch = useAppDispatch();

    // const sendRegistrationFormData = async (data: RegistrationInputs) => {
    //     const newData = new FormData();
    //     newData.append("firstName", data.firstName);
    //     newData.append("lastName", data.lastName);
    //     newData.append("email", data.email);
    //     newData.append("password", data.password);
    //     newData.append("photo", data.photo[0]);
    //     try {
    //         await axios({
    //             method: "post",
    //             url: BASE_API_URL + "users/",
    //             headers: {
    //                 "Content-Type": "multi-part/formdata",
    //             },
    //             data: newData,
    //         });
    //         navigate({ to: "/" });
    //         justLoggedIn && dispatch(infoBarActions.hideLoggedInBar());
    //         justLoggedOut && dispatch(infoBarActions.hideLoggedOutBar());
    //         dispatch(infoBarActions.showRegisteredBar());
    //     } catch (error: any) {
    //         if (error.response.status === 409) {
    //             setError("email", {
    //                 type: "custom",
    //                 message: "User with this email already exists",
    //             });
    //         } else {
    //             console.log(error);
    //         }
    //     }
    // };

    // const { mutate } = useMutation({
    //     mutationFn: sendRegistrationFormData,
    // });

    // const navigate = useNavigate();

    // const handleRegistration = (event: FormEvent<HTMLFormElement>) => {
    //     event.preventDefault();
    //     const registrationData = {
    //         firstName: registrationFormRef.current!["firstName"].value.trim(),
    //         lastName: registrationFormRef.current!["lastName"].value.trim(),
    //         email: registrationFormRef.current!["email"].value.trim(),
    //         password: registrationFormRef.current!["password"].value.trim(),
    //         photo: registrationFormRef.current!["photo"],
    //     };
    //     sendRegistrationData(registrationData);
    // };

    const [focusedFields, setFocusedFields] = useState({
        firstName: false,
        lastName: false,
        email: false,
        password: false,
        photo: false,
    });

    const [formState, formAction] = useActionState(sendRegistrationData, null);

    return (
        <form
            noValidate
            className="flex flex-col justify-start w-[36rem] px-5 pt-5 pb-10 gap-5"
            action={(formData: FormData) => {
                setFocusedFields({
                    firstName: false,
                    lastName: false,
                    email: false,
                    password: false,
                    photo: false,
                });
                formAction(formData);
            }}
        >
            <div className="flex flex-col gap-2">
                <label htmlFor="firstName" className="font-semibold">
                    First Name:
                </label>
                <input
                    className="border border-gray-700 rounded-md px-3 py-2 focus:border-sky-900"
                    type="text"
                    name="firstName"
                    placeholder="Jane"
                    onFocus={() =>
                        setFocusedFields((prevState) => ({
                            ...prevState,
                            firstName: true,
                        }))
                    }
                    defaultValue={
                        (formState?.payload.firstName as string) || ""
                    }
                />
                <p className="text-red-700 font-medium">
                    {!focusedFields.firstName &&
                        formState?.errors.firstName &&
                        formState?.errors.firstName[0]}
                </p>
            </div>
            <div className="flex flex-col gap-2">
                <label htmlFor="lastName" className="font-semibold">
                    Last Name:
                </label>
                <input
                    className="border border-gray-700 rounded-md px-3 py-2 focus:border-sky-900"
                    type="text"
                    name="lastName"
                    placeholder="Doe"
                    onFocus={() =>
                        setFocusedFields((prevState) => ({
                            ...prevState,
                            lastName: true,
                        }))
                    }
                    defaultValue={(formState?.payload.lastName as string) || ""}
                />
                <p className="text-red-700 font-medium">
                    {!focusedFields.lastName &&
                        formState?.errors.lastName &&
                        formState?.errors.lastName[0]}
                </p>
            </div>
            <div className="flex flex-col gap-2">
                <label htmlFor="email" className="font-semibold">
                    Email:
                </label>
                <input
                    className="border border-gray-700 rounded-md px-3 py-2 focus:border-sky-900"
                    type="email"
                    name="email"
                    placeholder="jane.doe@email.com"
                    onFocus={() =>
                        setFocusedFields((prevState) => ({
                            ...prevState,
                            email: true,
                        }))
                    }
                    defaultValue={(formState?.payload.email as string) || ""}
                />
                <p className="text-red-700 font-medium">
                    {!focusedFields.email &&
                        formState?.errors.email &&
                        formState?.errors.email[0]}
                </p>
            </div>
            <div className="flex flex-col gap-2">
                <label htmlFor="password" className="font-semibold">
                    Password:
                </label>
                <input
                    className="border border-gray-700 rounded-md px-3 py-2 focus:border-sky-900"
                    type="password"
                    name="password"
                    placeholder="password"
                    onFocus={() =>
                        setFocusedFields((prevState) => ({
                            ...prevState,
                            password: true,
                        }))
                    }
                    defaultValue={(formState?.payload.password as string) || ""}
                />
                <p className="text-red-700 font-medium">
                    {!focusedFields.password &&
                        formState?.errors.password &&
                        formState?.errors.password[0]}
                </p>
            </div>
            <div className="flex flex-col gap-2 mb-5">
                <label htmlFor="photo" className="font-semibold">
                    Photo (optional):
                </label>
                <input
                    className="w-min file:border-none file:px-4 file:py-2 file:rounded-md file:text-white file:bg-sky-500 file:active:bg-sky-600 file:hover:cursor-pointer"
                    type="file"
                    name="photo"
                    id="photo"
                    onFocus={() =>
                        setFocusedFields((prevState) => ({
                            ...prevState,
                            photo: true,
                        }))
                    }
                />
                <p className="text-red-700 font-medium">
                    {!focusedFields.photo &&
                        formState?.errors.photo &&
                        formState?.errors.photo[0]}
                </p>
            </div>
            <div className="flex justify-center">
                <Button type="submit" style="amber" text="REGISTER" />
            </div>
        </form>
    );
};
