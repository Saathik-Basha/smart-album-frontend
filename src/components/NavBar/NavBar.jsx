import { useCookies } from "react-cookie";
import { Link, useLocation, useNavigate } from "react-router-dom";

export const NavBar = () => {
  const [cookies, , removeCookie] = useCookies([
    "AccessToken",
    "RefreshToken",
    "userId",
  ]);
  const navigate = useNavigate();
  const location = useLocation();

  // ✅ Helper: remove all auth cookies
  const clearCookies = () => {
    removeCookie("AccessToken");
    removeCookie("RefreshToken");
    removeCookie("userId");
  };

  // ✅ Logout handler
  const handleLogout = () => {
    clearCookies();
    navigate("/login");
  };

  // ✅ Register handler (clears cookies first)
  const handleRegister = () => {
    clearCookies();
    navigate("/register");
  };

  // ✅ Login handler (clears cookies first)
  const handleLogin = () => {
    clearCookies();
    navigate("/login");
  };

  // Current route info
  const path = location.pathname;
  const isLoginPage = path === "/login";
  const isRegisterPage = path === "/register";

  return (
    <nav className="bg-gray-900 shadow-md">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between h-16 items-center">
          {/* Left Section - Brand */}
          <div className="flex items-center space-x-6">
            <Link
              to="/"
              className="text-white font-semibold text-xl hover:text-blue-400 transition cursor-pointer"
            >
              Smart Photo Album
            </Link>

            {!isLoginPage && !isRegisterPage && (
              <Link
                to="/"
                className="text-gray-300 hover:text-white text-sm font-medium transition cursor-pointer"
              >
                Home
              </Link>
            )}
          </div>

          {/* Right Section - Actions */}
          <div className="flex items-center space-x-4">
            {/* ✅ Show "Login" button on Register page */}
            {isRegisterPage && (
              <button
                onClick={handleLogin}
                className="bg-green-600 text-white px-4 py-2 rounded-md text-sm font-medium hover:bg-green-700 transition cursor-pointer"
              >
                Login
              </button>
            )}

            {/* ✅ Show "Register" button on Login page */}
            {isLoginPage && (
              <button
                onClick={handleRegister}
                className="bg-blue-600 text-white px-4 py-2 rounded-md text-sm font-medium hover:bg-blue-700 transition cursor-pointer"
              >
                Register
              </button>
            )}

            {/* ✅ Show Logout when logged in and not on login/register pages */}
            {cookies.AccessToken && !isLoginPage && !isRegisterPage && (
              <button
                onClick={handleLogout}
                className="bg-red-600 text-white px-4 py-2 rounded-md text-sm font-medium hover:bg-red-700 transition cursor-pointer"
              >
                Log out
              </button>
            )}

            {/* ✅ Show Register (if not logged in and not on login/register) */}
            {!cookies.AccessToken &&
              !isLoginPage &&
              !isRegisterPage && (
                <button
                  onClick={handleRegister}
                  className="bg-blue-600 text-white px-4 py-2 rounded-md text-sm font-medium hover:bg-blue-700 transition cursor-pointer"
                >
                  Register
                </button>
              )}
          </div>
        </div>
      </div>
    </nav>
  );
};
