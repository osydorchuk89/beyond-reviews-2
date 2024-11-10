// import axios from "axios";
// import { useState } from "react";
// import { useRouter, getRouteApi } from "@tanstack/react-router";
// import { useMutation } from "@tanstack/react-query";
// import { useForm } from "react-hook-form";
// import { zodResolver } from "@hookform/resolvers/zod";
// import { LoginSchema } from "../../lib/schemas";
// import { DarkLink } from "../DarkLink";
// import { Button } from "../Button";
// import { SocialLoginButton } from "./SocialLoginButton";
// import { BASE_CLIENT_URL, BASE_URL } from "../../lib/urls";
// import { queryClient } from "../../lib/requests";
// import { useAppDispatch, useAppSelector } from "../../store/hooks";
// import { dropDownMenuActions, infoBarActions } from "../../store";

import { LoginForm } from "./_components/LoginForm";

// const routeApi = getRouteApi("/login/");

export default function LoginPage() {
    // const { redirect } = routeApi.useSearch();

    // const [invalidCredentials, setInvalidCredentials] = useState(false);
    // const {
    //     register,
    //     handleSubmit,
    //     formState: { errors },
    // } = useForm<LoginInputs>({
    //     resolver: zodResolver(LoginSchema),
    // });
    // const { history } = useRouter();

    // const dispatch = useAppDispatch();
    // const { justLoggedOut, justRegistered } = useAppSelector(
    //     (state) => state.infoBar
    // );

    // const sendLoginFormData = async (data: LoginInputs) => {
    //     try {
    //         const response = await axios({
    //             method: "post",
    //             url: BASE_URL + "auth/login",
    //             withCredentials: true,
    //             data,
    //         });
    //         if (response) {
    //             setInvalidCredentials(false);
    //             await queryClient.invalidateQueries({
    //                 queryKey: ["authState"],
    //             });
    //             if (redirect) {
    //                 history.push(redirect.replace(BASE_CLIENT_URL, ""));
    //             } else {
    //                 history.back();
    //             }
    //             justLoggedOut && dispatch(infoBarActions.hideLoggedOutBar());
    //             justRegistered && dispatch(infoBarActions.hideRegisteredBar());
    //             dispatch(infoBarActions.showLoggedInBar());
    //             dispatch(dropDownMenuActions.closeDropDownMenu());
    //         }
    //     } catch (error: any) {
    //         if (error.response.status === 500) {
    //             setInvalidCredentials(true);
    //         } else {
    //             console.log(error);
    //         }
    //     }
    // };

    // const { mutate } = useMutation({
    //     mutationFn: sendLoginFormData,
    // });

    return (
        <div className="flex flex-col justify-center items-center h-[720px] text-sky-950">
            <LoginForm/>
        </div>
    );
}
