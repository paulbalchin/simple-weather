import { useRef, useState } from "react";
import { useSortable } from "@dnd-kit/react/sortable";
import { Draggable } from "@carbon/icons-react";

/**
 * See
 * Reference page: https://dnd-kit.com/react/hooks/use-sortable/
 * Codesandbox.io: https://codesandbox.io/p/sandbox/r858s9?file=%2Fsrc%2FApp.tsx%3A20%2C41
 */

export function Sortable({
  id,
  index,
  cityName,
  onClickDelete,
}: {
  id: number;
  index: number;
  cityName: string;
  onClickDelete: (index: number) => void;
}) {
  const [element, setElement] = useState<Element | null>(null);
  const handleRef = useRef<HTMLDivElement | null>(null);
  const { isDragging } = useSortable({ id, index, element, handle: handleRef });
  const classNames = isDragging ? "item city-item item-dragging" : "item city-item";

  return (
    <li ref={setElement} className={classNames} data-shadow={isDragging || undefined}>
      <div ref={handleRef} className="handle">
        <Draggable size={24} className="draggable-icon" />
        {/* Do not use <Unmask> here. Re-rendering after sorting causes it to lose track of the string label. */}
        <span className="city-name">{cityName}</span>
      </div>
      <button
        type="button"
        className="delete-button delete-button--small"
        onClick={() => onClickDelete(index)}
      >
        ›‹
      </button>
    </li>
  );
}
