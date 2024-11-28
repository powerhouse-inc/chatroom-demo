export interface HeaderProps {
  title: string;
  description?: string;
}

export const Header: React.FC<HeaderProps> = ({ title, description }) => (
  <div
    style={{
      display: "flex",
      flexDirection: "column",
    }}
  >
    <h1
      style={{
        fontSize: "18px",
        fontWeight: "bold",
        margin: 0,
      }}
    >
      {title}
    </h1>
    {description ? (
      <p
        style={{
          fontSize: "14px",
          color: "#666",
          margin: 0,
        }}
      >
        {description}
      </p>
    ) : null}
  </div>
);
