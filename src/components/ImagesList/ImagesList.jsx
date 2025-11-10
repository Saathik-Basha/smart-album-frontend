import { XCircleIcon } from "@heroicons/react/24/solid";
import { Button } from "../Button/Button";
import { Image } from "../Image/Image";

export const ImagesList = ({
  fetchNextPage,
  hasNextPage,
  isLoading,
  data,
  isFetchingNextPage,
}) => {
  // Loading spinner
  if (isLoading) {
    return (
      <div className="flex justify-center items-center h-64">
        <div className="animate-spin rounded-full h-12 w-12 border-t-4 border-b-4 border-blue-500"></div>
      </div>
    );
  }

  // Flatten all image items safely
  const allImages =
    data?.pages?.flatMap((page) => page.items || []) ?? [];

  // No images case
  if (allImages.length === 0) {
    return (
      <div className="flex flex-col items-center justify-center h-64 text-gray-500">
        <XCircleIcon className="h-12 w-12 text-gray-400 mb-2" />
        <p className="text-lg font-medium">No images found</p>
      </div>
    );
  }

  // Normal render
  return (
    <div>
      <div className="columns-3 gap-4 my-8">
        {allImages.map((image, index) => (
          <Image key={index} image={image} />
        ))}
      </div>

      {hasNextPage && (
        <div className="text-center mt-4">
          <Button onClick={() => fetchNextPage()}>
            {isFetchingNextPage ? "Loading more..." : "More"}
          </Button>
        </div>
      )}
    </div>
  );
};
