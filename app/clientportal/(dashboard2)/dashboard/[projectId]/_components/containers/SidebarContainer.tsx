interface ContainerProps {
  children: React.ReactNode;
}

const SidebarContainer: React.FC<ContainerProps> = ({ children }) => {
  return (
    <nav className="hidden border-r md:border-none bg-muted/40 md:block">
      <div className="md:fixed md:overflow-hidden md:top-0 md:left-14 md:w-[14rem] md:bg-neutral-50 md:border-r flex h-full max-h-screen flex-col gap-2">
        {children}
      </div>
    </nav>
  );
};

export default SidebarContainer;
