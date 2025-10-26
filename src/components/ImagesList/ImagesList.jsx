import { XCircleIcon } from "@heroicons/react/24/solid";
import { Link } from "react-router-dom";
import { Button } from "../Button/Button";

export const ImagesList = ({ fetchNextPage, hasNextPage, isLoading, data ,isFetchingNextPage}) => {
  if (isLoading) return <>Loading...</>;

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
                    className="inline-flex items-baseline bg-gray-200 rounded-full mr-2 mb-2 px-2 py-1 text-sm font-semibold text-gray-700"
                  >
                    <Link to={`/album/${label}`} className="p-1">
                      #{label}
                    </Link>
                    <XCircleIcon className="h-6 w-6 text-red-500" />
                  </span>
                ))}
              </div>
            </div>
          ))
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
