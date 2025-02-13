interface MenuItemProps {
  children: React.ReactNode | React.ReactNode[];
}

const MenuItem = ({ children }: MenuItemProps) => {
  return (
    <>
      <div className="flex rounded-md bg-neutral-800/90 flex-col gap-5 backdrop-blur-md w-full h-full p-2 text-center">
        {children}
      </div>
    </>
  );
};

export default MenuItem;
