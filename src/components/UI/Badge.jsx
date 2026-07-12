import "./Badge.css";

const Badge = ({ children, variant = "discount" }) => {
  return (
    <span className={`badge badge-${variant}`}>
      {children}
    </span>
  );
};

export default Badge;
