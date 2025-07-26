import { UserButton } from "@clerk/nextjs";
import { currentUser } from "@clerk/nextjs/server";
import GlobalSearch from "./GlobalSearch";
import MobileSearch from "./MobileSearch";

const Navbar = async () => {
  const user = await currentUser();
  const role = (user?.publicMetadata as any)?.role || "admin";

  return (
    <div className="flex items-center justify-between p-4">
      {/* LEFT SIDE - Search bars */}
      <div className="flex items-center">
        {/* Desktop Search */}
        <div className="hidden md:flex items-center gap-2 text-xs rounded-full ring-[1.5px] ring-gray-300 px-2 py-1 bg-white max-w-md">
          <GlobalSearch />
        </div>

        {/* Mobile Search - shows on left on mobile */}
        <div className="md:hidden">
          <MobileSearch />
        </div>
      </div>

      {/* RIGHT SIDE - User info */}
      <div className="flex items-center gap-6">
        <div className="flex flex-col">
          <span className="text-xs leading-3 font-medium">
            {user?.firstName && user?.lastName
              ? `${user.firstName} ${user.lastName}`
              : user?.username || "User"}
          </span>
          <span className="text-[10px] text-gray-500 text-right capitalize">
            {role}
          </span>
        </div>
        <UserButton />
      </div>
    </div>
  );
};

export default Navbar;
