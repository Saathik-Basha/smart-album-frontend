import { useInfiniteQuery } from "@tanstack/react-query";
import { fetchPhotos } from "../../api/photo";
import { ImagesList } from "../../components/ImagesList/ImagesList";
import { Uploader } from "../../components/Uploader/Uploader";

export const Home = () => {
  const { fetchNextPage, hasNextPage, isLoading, data, isFetchingNextPage } = useInfiniteQuery({
    queryKey: ["photos", { limit: 5 }],
    getNextPageParam: (lastPage) => lastPage.lastKey,
    queryFn: fetchPhotos,
  });

  return (
    <div>
      <Uploader />
      <ImagesList
        fetchNextPage={fetchNextPage}
        hasNextPage={hasNextPage}
        isLoading={isLoading}
        data={data}
        isFetchingNextPage={isFetchingNextPage}
      />
    </div>
  );
};
