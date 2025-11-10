import { useMutation, useQueryClient } from "@tanstack/react-query";
import { useEffect, useState } from "react";
import { useCookies } from "react-cookie";
import { useNavigate } from "react-router-dom";
import { loginUser } from "../../api/user";
import { UserForm } from "../../components/UserForm/UserForm";

export const Login = () => {
  const queryClient = useQueryClient();
  const [error, setError] = useState(null);
  const [cookies, setCookie] = useCookies([
    "AccessToken",
    "RefreshToken",
    "userId",
  ]);
  const navigate = useNavigate();

  const login = useMutation({
    mutationFn: loginUser, // ✅ v5 syntax
    onSuccess: async (res) => {
      console.log("Login successful:", res);

      try {
        if (res.status === 200) {
          const data = await res.json();

          const { AccessToken, ExpiresIn, RefreshToken, sub } = data;

          // ✅ v5 syntax for invalidating queries
          queryClient.invalidateQueries({ queryKey: ["photos"] });

          // ✅ Set cookies
          setCookie("AccessToken", AccessToken, { maxAge: ExpiresIn });
          setCookie("RefreshToken", RefreshToken, { maxAge: ExpiresIn });
          setCookie("userId", sub, { maxAge: ExpiresIn });

          // ✅ Redirect after successful login
          navigate("/");
        } else {
          setError("Email or password is incorrect");
          throw new Error("Unsuccessful login");
        }
      } catch (error) {
        console.error("Failed to parse login response:", error);
        setError("Unexpected error occurred");
      }
    },
    onError: (error) => {
      console.error("Login failed:", error);
      setError("Login failed. Please try again.");
    },
  });

  useEffect(() => {
    if (cookies.AccessToken) {
      navigate("/");
    }
  }, [cookies, navigate]);

  const onSubmit = (data) => {
    setError(null);
    login.mutate(data);
  };

  return (
    <div>
      <h1 className="text-4xl leading-tight mb-4 pb-4">Log in</h1>
      <UserForm onSubmit={onSubmit} error={error} setError={setError} />
    </div>
  );
};
