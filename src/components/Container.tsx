interface ContainerProps {
  children?: React.ReactNode | React.ReactNode[];
  className?: string;
  bgColor?: string;
}

const Container = ({ children, className, bgColor }: ContainerProps) => {
  return (
    <div className={bgColor}>
      <div className={`container mx-auto py-20 px-4 ${className}`}>
        {children}
      </div>
    </div>
  );
};

export default Container;
