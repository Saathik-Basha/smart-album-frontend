import { useState } from "react";
import { Button } from "../Button/Button";

export const EditableText = ({ value, onSave }) => {
  const [isEditing, setIsEditing] = useState(false);
  const [newValue, setNewValue] = useState(value);

  const saveText = () => {
    setIsEditing(false);
    onSave(newValue);
  };

  if (isEditing) {
    return (
      <div className="flex items-center gap-2">
        <input
          value={newValue}
          onChange={(e) => setNewValue(e.target.value)}
          className="px-2 py-1 text-base font-normal text-gray-700 bg-white border border-gray-300 rounded focus:border-blue-600 focus:outline-none"
        />
        <Button onClick={saveText}>Save</Button>
      </div>
    );
  }

  return (
    <div className="flex items-center gap-2">
      <span>{value}</span>
      <Button onClick={() => setIsEditing(true)}>Edit</Button>
    </div>
  );
};
