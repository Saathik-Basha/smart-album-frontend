import { XCircleIcon } from "@heroicons/react/24/solid";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import React from "react";
import { Link } from "react-router-dom";
import { deletePhoto, updatePhoto } from "../../api/photo";
import { Button } from "../Button/Button";
import { EditableText } from "../EditableText/EditableText";

export const Image = ({ image }) => {
  console.log({ image });
  const queryClient = useQueryClient();

  const updatePhotoMutation = useMutation({
    mutationFn: updatePhoto,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["photos"] });
    },
  });

  const deletePhotoMutation = useMutation({
    mutationFn: deletePhoto,
    onSuccess: () => {
      // Re-fetch the updated photo list
      queryClient.invalidateQueries({ queryKey: ["photos"] });
    },
  });

  const deleteLabel = (label) => {
    updatePhotoMutation.mutate({
      id: image.primary_key,
      labels: image.labels.filter((l) => l !== label),
    });
  };

  const renameImage = (newName) => {
    console.log({ newName });
    updatePhotoMutation.mutate({
      id: image.primary_key,
      name: image.name,
      newName,
    });
  };

  return (
    <div
      key={image.primary_key}
      className="rounded overflow-hidden shadow-lg bg-white mb-4 relative"
    >
      <div className="absolute top-1 right-1">
        <Button
          light
          onClick={() => {
            deletePhotoMutation.mutate({
              primary_key: image.primary_key,
              name: image.name,
            });
          }}
        >
          <XCircleIcon className="h-10 w-10 text-gray-500 opacity-50" />
        </Button>
      </div>

      <img src={image.url} alt={image.labels[0]} className="w-full" />

      <div className="px-6 py-4">
        <h4 className="text-gray-900 text-xl font-medium mb-2 pb-2">
          <EditableText value={image.name} onSave={renameImage} />
        </h4>

        {image.labels.map((label) => (
          <span
            key={label}
            className="inline-flex items-baseline bg-gray-200 rounded-full mr-2 mb-2 px-2 py-1 text-sm font-semibold text-gray-700"
          >
            <Link to={`/album/${label}`} className="p-1">
              #{label}
            </Link>
            <Button
              light
              onClick={(e) => {
                e.preventDefault();
                deleteLabel(label);
              }}
            >
              <XCircleIcon className="h-6 w-6 text-red-500" />
            </Button>
          </span>
        ))}
      </div>
    </div>
  );
};
