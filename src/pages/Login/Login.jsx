import { useMutation, useQueryClient } from "@tanstack/react-query";
import { useEffect } from "react";
import { useCookies } from "react-cookie";
import { useNavigate } from "react-router-dom";
import { loginUser } from "../../api/user";
import { UserForm } from "../../components/UserForm/UserForm";

export const Login = () => {
    const queryClient = useQueryClient();
    const [cookies, setCookie] = useCookies(["AccessToken", "RefreshToken"]);
    const navigate = useNavigate();

    const login = useMutation({
        mutationFn: loginUser,
        onSuccess: async (res) => {
            console.log("login is successful");
            try {
                const data = await res.json();
                const { AccessToken, ExpiresIn, RefreshToken } = data;

                // Invalidate photo queries after successful login
                queryClient.invalidateQueries({ queryKey: ["photos"] });

                // Set cookies
                setCookie("AccessToken", AccessToken, { maxAge: ExpiresIn });
                setCookie("RefreshToken", RefreshToken, { maxAge: ExpiresIn });

                // Navigate after successful login
                navigate("/");
            } catch (error) {
                console.error("Failed to parse login response:", error);
            }
        },
        onError: (error) => {
            console.error("Login failed:", error);
        },
    });

    useEffect(() => {
        if (cookies.AccessToken) {
            navigate("/");
        }
    }, [cookies, navigate]);

    const onSubmit = (data) => {
        login.mutate(data);
    };

    return (
        <div>
            <h1 className="text-4xl leading-tight mb-4 pb-4">Log in</h1>
            <UserForm onSubmit={onSubmit} />
        </div>
    );
};
