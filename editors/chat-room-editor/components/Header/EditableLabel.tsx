import { useState, useEffect } from "react";

interface EditIconProps {
  className?: string;
}

const EditIcon: React.FC<EditIconProps> = ({ className }) => (
  <svg
    className={className}
    fill="none"
    height="16"
    stroke="currentColor"
    strokeLinecap="round"
    strokeLinejoin="round"
    strokeWidth="2"
    viewBox="0 0 24 24"
    width="16"
    xmlns="http://www.w3.org/2000/svg"
  >
    <path d="M11 4H4a2 2 0 0 0-2 2v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2v-7" />
    <path d="M18.5 2.5a2.121 2.121 0 0 1 3 3L12 15l-4 1 1-4 9.5-9.5z" />
  </svg>
);

const CloseIcon: React.FC<EditIconProps> = ({ className }) => (
  <svg
    className={className}
    fill="none"
    height="16"
    stroke="currentColor"
    strokeLinecap="round"
    strokeLinejoin="round"
    strokeWidth="2"
    viewBox="0 0 24 24"
    width="16"
    xmlns="http://www.w3.org/2000/svg"
  >
    <line x1="18" x2="6" y1="6" y2="18" />
    <line x1="6" x2="18" y1="6" y2="18" />
  </svg>
);

export interface EditableLabelProps {
  label: string;
  style?: React.CSSProperties;
  onSubmit?: (label: string) => void;
}

export const EditableLabel: React.FC<EditableLabelProps> = ({
  label: initialLabel,
  onSubmit,
  style,
}) => {
  const [hover, setHover] = useState(false);
  const [isEditing, setIsEditing] = useState(false);
  const [label, setLabel] = useState(initialLabel);

  useEffect(() => {
    setLabel(initialLabel);
  }, [initialLabel]);

  const editIcon = (
    <div onClick={() => setIsEditing(true)} style={{ cursor: "pointer" }}>
      <EditIcon />
    </div>
  );

  const cancelIcon = (
    <div
      onClick={() => {
        setIsEditing(false);
        setLabel(initialLabel);
      }}
      style={{ cursor: "pointer" }}
    >
      <CloseIcon />
    </div>
  );

  const readContent = <h1 style={style}>{label}</h1>;

  const writeContent = (
    <input
      onChange={(e) => setLabel(e.target.value)}
      onKeyDown={(e) => {
        if (e.key === "Escape") {
          setIsEditing(false);
          setLabel(initialLabel);
        }

        if (e.key === "Enter") {
          e.preventDefault();
          e.stopPropagation();

          setIsEditing(false);
          onSubmit?.(label);
        }
      }}
      style={style}
      type="text"
      value={label}
    />
  );

  const iconContent = isEditing ? cancelIcon : editIcon;
  const labelContent = isEditing ? writeContent : readContent;

  return (
    <div
      onMouseEnter={() => setHover(true)}
      onMouseLeave={() => setHover(false)}
      style={{
        display: "flex",
        alignItems: "center",
        gap: "8px",
      }}
    >
      {labelContent}
      {hover || isEditing ? iconContent : null}
    </div>
  );
};
