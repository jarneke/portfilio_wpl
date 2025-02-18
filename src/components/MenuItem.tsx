interface MenuItemProps {
  children: React.ReactNode | React.ReactNode[];
}

const MenuItem = ({ children }: MenuItemProps) => {
  return (
    <>
      <div className="flex justify-center items-center rounded-md bg-neutral-900/70 gap-5 backdrop-blur-md w-full h-full p-2 text-center">
        {children}
      </div>
    </>
  );
};

export default MenuItem;
