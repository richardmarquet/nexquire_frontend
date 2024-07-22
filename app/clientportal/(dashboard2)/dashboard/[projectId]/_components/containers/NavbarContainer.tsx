import { navbar_type } from "@/components/types/nexquire_types";

interface ContainerProps {
  children: React.ReactNode;
  navbarType: navbar_type; // this will mainly determine the left offset of the navbar
}

const NavbarContainer: React.FC<ContainerProps> = ({ children, navbarType }) => {
  // Some pages have different left offsets. Set them here
  let extraCss = "";
  if (navbarType === navbar_type.NAVBAR_ONLY) {
    extraCss = "md:left-[3.5rem]";
  } else if (navbarType === navbar_type.NAVBAR_SIDEBAR) {
    extraCss = "md:left-[17.5rem]";
  }

  return (
    <div className="flex-1">
      <nav
        className={
          `fixed top-0 right-0 ` +
          extraCss +
          ` px-5 lg:px-6 border-b bg-neutral-50 z-40`
        }
      >
        <header
          className={`mx-auto flex justify-between h-14 lg:h-[59px] items-center`}
        >
            { children }
        </header>
      </nav>
    </div>
  );
};

export default NavbarContainer;
