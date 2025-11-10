import { useForm } from "react-hook-form";
import { Button } from "../Button/Button";

export const UserForm = ({ onSubmit, setError, error, isLoading, formType }) => {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();

  return (
    <div className="max-w-md mx-auto bg-white rounded-2xl shadow-lg p-8 border border-gray-100">
      {/* Dynamic Heading */}
      <h2 className="text-2xl font-semibold text-center text-gray-800 mb-6">
        {isLoading
          ? "Please wait..."
          : formType === "register"
          ? "Welcome"
          : "Welcome Back"}
      </h2>

      <form onSubmit={handleSubmit(onSubmit)} className="space-y-5">
        {/* Email Field */}
        <div className="flex flex-col">
          <label className="text-gray-700 font-medium mb-2">Email</label>
          <input
            {...register("email", {
              required: true,
              onChange: () => setError?.(null),
            })}
            type="email"
            placeholder="you@example.com"
            className={`border rounded-lg px-4 py-2 text-gray-800 focus:outline-none focus:ring-2 focus:ring-blue-500 transition ${
              errors.email ? "border-red-500" : "border-gray-300"
            }`}
          />
          {errors.email && (
            <span className="text-red-500 text-sm mt-1">
              Email is required
            </span>
          )}
        </div>

        {/* Password Field */}
        <div className="flex flex-col">
          <label className="text-gray-700 font-medium mb-2">Password</label>
          <input
            type="password"
            {...register("password", {
              required: true,
              onChange: () => setError?.(null),
            })}
            placeholder="••••••••"
            className={`border rounded-lg px-4 py-2 text-gray-800 focus:outline-none focus:ring-2 focus:ring-blue-500 transition ${
              errors.password ? "border-red-500" : "border-gray-300"
            }`}
          />
          {errors.password && (
            <span className="text-red-500 text-sm mt-1">
              Password is required
            </span>
          )}
          {error && (
            <span className="text-red-600 text-sm mt-1 font-medium">
              {error}
            </span>
          )}
        </div>

        {/* Submit Button */}
        <div className="pt-2">
          <Button
            type="submit"
            disabled={isLoading}
            className="w-full py-2.5 flex justify-center items-center text-lg font-medium rounded-lg bg-blue-600 text-white hover:bg-blue-700 transition disabled:opacity-70 disabled:cursor-not-allowed"
          >
            {isLoading ? (
              <>
                <div className="animate-spin h-5 w-5 border-2 border-white border-t-transparent rounded-full mr-2"></div>
                {formType === "register" ? "Registering..." : "Logging in..."}
              </>
            ) : formType === "register" ? (
              "Register"
            ) : (
              "Login"
            )}
          </Button>
        </div>
      </form>
    </div>
  );
};
