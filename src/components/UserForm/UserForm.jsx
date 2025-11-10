import { useForm } from "react-hook-form";
import { Button } from "../Button/Button";

export const UserForm = ({ onSubmit }) => {
    const {
        register,
        handleSubmit,
        formState: { errors },
    } = useForm();

    return (
        <div className="block p-6 rounded-lg shadow-lg bg-white max-w-sm mx-auto">
            <form onSubmit={handleSubmit(onSubmit)}>
                {/* Email Field */}
                <div className="form-group mb-6">
                    <label className="form-label inline-block mb-2 text-gray-700">
                        Email
                    </label>
                    <input
                        {...register("email", { required: true })}
                        className="form-control
                            block
                            w-full
                            px-3
                            py-1.5
                            text-base
                            font-normal
                            text-gray-700
                            bg-white bg-clip-padding
                            border border-solid border-gray-300
                            rounded
                            transition
                            ease-in-out
                            m-0
                            focus:text-gray-700 focus:bg-white focus:border-blue-600 focus:outline-none"
                    />
                    {errors.email && <span className="text-red-600">This field is required</span>}
                </div>

                {/* Password Field */}
                <div className="form-group mb-6">
                    <label className="form-label inline-block mb-2 text-gray-700">
                        Password
                    </label>
                    <input
                        type="password"
                        {...register("password", { required: true })}
                        className="form-control
                            block
                            w-full
                            px-3
                            py-1.5
                            text-base
                            font-normal
                            text-gray-700
                            bg-white bg-clip-padding
                            border border-solid border-gray-300
                            rounded
                            transition
                            ease-in-out
                            m-0
                            focus:text-gray-700 focus:bg-white focus:border-blue-600 focus:outline-none"
                    />
                    {errors.password && <span className="text-red-600">This field is required</span>}
                </div>

                <Button type="submit">Submit</Button>
            </form>
        </div>
    );
};
