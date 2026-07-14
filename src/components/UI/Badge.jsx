const Badge = ({ children, variant = "discount" }) => {
  return (
    <span
      className={`w-fit px-[10px] py-1 text-xs font-semibold leading-[1.2] ${
        variant === "popular"
          ? "bg-violet-100 text-violet-700"
          : "bg-violet-700 text-white rounded-[10px]"
      }`}
    >
      {children}
    </span>
  );
};

export default Badge;
