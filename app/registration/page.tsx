import { RegistrationForm } from "./_components/RegistrationForm";

export default function RegistrationPage() {
    return (
        <div className="flex flex-col justify-center items-center text-sky-950">
            <p className="text-2xl my-10 font-bold text-center">
                Register new account
            </p>
            <RegistrationForm />
        </div>
    );
}
