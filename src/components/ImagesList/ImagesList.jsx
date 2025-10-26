import { useInfiniteQuery } from "@tanstack/react-query";
import { fetchPhotos } from "../../api/photo";
import { XCircleIcon } from "@heroicons/react/24/solid";
import { Button } from "../Button/Button";

export const ImagesList = () => {
  const {
    fetchNextPage,
    hasNextPage,
    isLoading,
    isFetchingNextPage,
    data,
  } = useInfiniteQuery({
    queryKey: ["photos", { limit: 5 }],
    getNextPageParam: (lastPage) => lastPage.lastKey,
    queryFn: fetchPhotos,
  });

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
          page.items.map((image) => (
            <div
              key={image.primary_key}
              className="rounded overflow-hidden shadow-lg bg-white mb-4 relative"
            >
              <div className="absolute top-1 right-1">
                <XCircleIcon className="h-10 w-10 text-gray-500 opacity-50" />
              </div>
              <img src={image.url} alt={image.labels[0]} className="w-full" />
              <div className="px-6 py-4">
                <h4 className="text-gray-900 text-xl font-medium mb-2 pb-2">
                  {image.name}
                </h4>
                {image.labels.map((label) => (
                  <span
                    key={label}
                    className="inline-flex items baseline bg-gray-200 rounded-full mr-2 mb-2 px-2 py-1 text-sm font-semibold text-gray-700"
                  >
                    <span className="p-1">#{label}</span>
                    <XCircleIcon className="h-6 w-6 text-red-500" />
                  </span>
                ))}
              </div>
            </div>
          ))
        )}
      </div>

      {/* Show More button and loader */}
      <div className="my-4 text-center">
        {isFetchingNextPage ? (
          <span>Loading more...</span> // Loader text (can replace with spinner)
        ) : hasNextPage ? (
          <Button onClick={() => fetchNextPage()}>More</Button>
        ) : null}
      </div>
    </div>
  );
};
