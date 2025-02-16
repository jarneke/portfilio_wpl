interface ContainerProps {
  children?: React.ReactNode | React.ReactNode[];
  className?: string;
  bgColor?: string;
  nopadding?: boolean;
}

const Container = ({
  children,
  className,
  bgColor,
  nopadding,
}: ContainerProps) => {
  return (
    <div className={bgColor}>
      <div
        className={`container mx-auto ${
          nopadding ? "" : "py-20"
        } px-4 ${className}`}
      >
        {children}
      </div>
    </div>
  );
};

export default Container;
