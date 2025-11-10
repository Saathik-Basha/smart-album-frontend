import { useCookies } from "react-cookie";
import { Navigate, Outlet } from "react-router-dom";

export const Private = () => {
    const [cookies] = useCookies(["AccessToken"]);
    const { AccessToken } = cookies;

    return AccessToken ? <Outlet /> : <Navigate to="/login" />;
};
