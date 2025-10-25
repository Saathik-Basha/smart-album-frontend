import React from "react";
import { useMutation,useQueryClient } from "@tanstack/react-query";
import { uploadPhoto } from "../../api/photo";
import { ArrowUpTrayIcon } from "@heroicons/react/24/solid";

export const Uploader = () => {
    const queryClient=useQueryClient()
    const mutation = useMutation({
        mutationFn: uploadPhoto,
        onSuccess: async (response) => {
            queryClient.invalidateQueries({queryKey:["photos"]})
            const data = await response.json();
            console.log(data);
        },
    });

    const uploadFile = (e) => {
        const files = e.target.files;
        if (!files) return;

        const formData = new FormData();
        Array.from(files).forEach((file) => formData.append("file", file));

        mutation.mutate(formData);
    };

    return (
        <form>
            <label className="flex justify-center flex-col items-center border-dashed border-4 border-slate-400 rounded-lg py-8 bg-white">
                <p>Upload files:</p>
                <ArrowUpTrayIcon className="h-12 w-12 text-blue-500" />
                <input
                    type="file"
                    multiple
                    onChange={uploadFile}
                    className="hidden"
                />
            </label>
        </form>
    );
};
