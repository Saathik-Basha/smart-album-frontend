import { useMutation, useQueryClient } from "@tanstack/react-query";
import { uploadPhoto } from "../../api/photo";
import { ArrowUpTrayIcon } from "@heroicons/react/24/solid";
import { useCookies } from "react-cookie";

export const Uploader = () => {
  const [cookies] = useCookies(["userId"]);
  const queryClient = useQueryClient();

  const mutation = useMutation({
    mutationFn: uploadPhoto,
    onSuccess: () => {
      console.log("Upload successful!");
      queryClient.invalidateQueries({ queryKey: ["photos"] });
    },
    onError: (error) => {
      console.error("Upload failed:", error);
    },
  });

  const uploadFile = (event) => {
    const files = event.target.files;
    if (!files || files.length === 0) return;

    console.log(files);

    const formData = new FormData();

    // ✅ JSX-compatible version (no "as ArrayLike<File>")
    Array.from(files).forEach((file) => {
      formData.append("file", file);
      formData.append("userId", cookies.userId);
    });

    mutation.mutate(formData);
  };

  return (
    <form>
      <label className="flex justify-center flex-col items-center border-dashed border-4 border-slate-400 rounded-lg py-8 bg-white cursor-pointer">
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
