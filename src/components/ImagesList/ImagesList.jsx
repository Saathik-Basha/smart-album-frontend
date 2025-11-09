import { XCircleIcon } from "@heroicons/react/24/solid";
import { Link } from "react-router-dom";
import { Button } from "../Button/Button";
import { Image } from "../Image/Image";

export const ImagesList = ({
  fetchNextPage,
  hasNextPage,
  isLoading,
  data,
  isFetchingNextPage,
}) => {
  if (isLoading)
    return (
      <div className="flex justify-center items-center h-64">
        <div className="animate-spin rounded-full h-12 w-12 border-t-4 border-b-4 border-blue-500"></div>
      </div>
    );

  return (
    <div>
      <div className="columns-3 gap-4 my-8">
        {data?.pages.map((page) =>
          page.items.map((image, index) => <Image key={index} image={image} />)
        )}
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
