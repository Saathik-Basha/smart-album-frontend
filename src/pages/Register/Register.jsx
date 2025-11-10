import { useMutation } from "@tanstack/react-query";
import { registerUser } from "../../api/user";
import { UserForm } from "../../components/UserForm/UserForm";

export const Register = () => {
    const register = useMutation({
        mutationFn: registerUser,
        // eslint-disable-next-line no-unused-vars
        onSuccess: (res) => {
            console.log("register is successful");
        },
        onError: (error) => {
            console.error("Registration failed:", error);
        },
    });

    const onSubmit = (data) => {
        register.mutate(data);
    };

    return (
        <div>
            <h1 className="text-4xl leading-tight mb-4 pb-4">Register</h1>
            <UserForm onSubmit={onSubmit} />
        </div>
    );
};
