import React from "react";
import { useParams } from "react-router-dom";
import { fetchPhotos } from "../../api/photo";
import { useInfiniteQuery } from "@tanstack/react-query";
import { ImagesList } from "../../components/ImagesList/ImagesList";

const Album = () => {
  const { label } = useParams();

  const { fetchNextPage, hasNextPage, isLoading, data, isFetchingNextPage } =
    useInfiniteQuery({
      queryKey: ["photos", { limit: 5, label }],
      getNextPageParam: (lastPage) => lastPage.lastKey,
      queryFn: fetchPhotos,
    });

  return (
    <div className="container mx-auto px-4 py-8 max-w-7xl">
      <h1 className="text-3xl font-bold text-gray-900 mb-6 text-center">
        Album: {label}
      </h1>

      {isLoading ? (
        <p className="text-center text-gray-500">Loading...</p>
      ) : (
        <ImagesList
          fetchNextPage={fetchNextPage}
          hasNextPage={hasNextPage}
          isLoading={isLoading}
          data={data}
          isFetchingNextPage={isFetchingNextPage}
        />
      )}
    </div>
  );
};

export default Album;
