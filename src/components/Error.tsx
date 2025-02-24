import { FaTimes } from "react-icons/fa";

interface ErrorProps {
  size: "sm" | "md" | "lg";
  icon?: boolean;
  message?: string;
}

const Error = ({ size, icon, message }: ErrorProps) => {
  return (
    <div className="flex-1 flex flex-col gap-2 items-center justify-center">
      {icon && (
        <FaTimes
          className={`${
            size === "sm"
              ? "w-16 h-16"
              : size === "md"
              ? "w-24 h-24"
              : "w-32 h-32"
          } text-red-500`}
        />
      )}
      <p
        className={
          size === "sm" ? "text-md" : size === "md" ? "text-lg" : "text-xl"
        }
      >
        Something went wrong
      </p>
      <p
        className={
          size === "sm" ? "text-sm" : size === "md" ? "text-md" : "text-lg"
        }
      >
        Please try again
      </p>
      {message && (
        <p
          className={
            size === "sm" ? "text-sm" : size === "md" ? "text-md" : "text-lg"
          }
        >
          {message}
        </p>
      )}
    </div>
  );
};

export default Error;
