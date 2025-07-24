// import { UserButton } from "@clerk/nextjs";
// import { currentUser } from "@clerk/nextjs/server";
// import Image from "next/image";

// const Navbar = async () => {
//   const user = await currentUser();
//   return (
//     <div className="flex items-center justify-between p-4">
//       {/* SEARCH BAR */}
//       <div className="hidden md:flex items-center gap-2 text-xs rounded-full ring-[1.5px] ring-gray-300 px-2">
//         <Image src="/search.png" alt="" width={14} height={14} />
//         <input
//           type="text"
//           placeholder="Search..."
//           className="w-[200px] p-2 bg-transparent outline-none"
//         />
//       </div>
//       {/* ICONS AND USER */}
//       <div className="flex items-center gap-6 justify-end w-full">
//         <div className="bg-white rounded-full w-7 h-7 flex items-center justify-center cursor-pointer">
//           <Image src="/message.png" alt="" width={20} height={20} />
//         </div>
//         <div className="bg-white rounded-full w-7 h-7 flex items-center justify-center cursor-pointer relative">
//           <Image src="/announcement.png" alt="" width={20} height={20} />
//           <div className="absolute -top-3 -right-3 w-5 h-5 flex items-center justify-center bg-purple-500 text-white rounded-full text-xs">
//             1
//           </div>
//         </div>
//         <div className="flex flex-col">
//           <span className="text-xs leading-3 font-medium">{user?.fullName as string}</span>
//           <span className="text-[10px] text-gray-500 text-right">
//             {user?.publicMetadata?.role as string}
//           </span>
//         </div>
//         {/* <Image src="/avatar.png" alt="" width={36} height={36} className="rounded-full"/> */}
//         <UserButton />
//       </div>
//     </div>
//   );
// };

// export default Navbar;

// src/components/Navbar.tsx
// src/components/Navbar.tsx
import { UserButton } from "@clerk/nextjs";
import { currentUser } from "@clerk/nextjs/server";
import GlobalSearch from "./GlobalSearch";
import MobileSearch from "./MobileSearch";

const Navbar = async () => {
  const user = await currentUser();
  const role = (user?.publicMetadata as any)?.role || "admin";

  return (
    <div className="flex items-center justify-between p-4">
      {/* SEARCH BAR - Desktop Only */}
      <div className="hidden md:flex items-center gap-2 text-xs rounded-full ring-[1.5px] ring-gray-300 px-2">
        <GlobalSearch />
      </div>
      
      {/* ICONS AND USER */}
      <div className="flex items-center gap-6 justify-end w-full">
        {/* Mobile Search */}
        <MobileSearch />
        
        <div className="bg-white rounded-full w-7 h-7 flex items-center justify-center cursor-pointer">
          <svg
            width="20"
            height="20"
            viewBox="0 0 24 24"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              d="M12 22C17.5228 22 22 17.5228 22 12C22 6.47715 17.5228 2 12 2C6.47715 2 2 6.47715 2 12C2 17.5228 6.47715 22 12 22Z"
              stroke="#000000"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
            />
            <path
              d="M16 8L8 16"
              stroke="#000000"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
            />
            <path
              d="M8 8L16 16"
              stroke="#000000"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
            />
          </svg>
        </div>
        <div className="bg-white rounded-full w-7 h-7 flex items-center justify-center cursor-pointer relative">
          <svg
            width="20"
            height="20"
            viewBox="0 0 24 24"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              d="M18 8A6 6 0 0 0 6 8C6 7.2 6 6.4 6 6.4C6 6.4 6 3.6 6 3.6C6 3.6 6 3.6 6 3.6C6 3.6 6 3.6 6 3.6C6 2.2 7.8 0.4 12 0.4C16.2 0.4 18 2.2 18 3.6C18 3.6 18 3.6 18 3.6C18 3.6 18 3.6 18 3.6C18 3.6 18 6.4 18 6.4C18 6.4 18 7.2 18 8Z"
              stroke="#000000"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
            />
            <path
              d="M13.73 21A2 2 0 0 1 10.27 21"
              stroke="#000000"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
            />
          </svg>
          <div className="absolute -top-3 -right-3 w-5 h-5 flex items-center justify-center bg-purple-500 text-white rounded-full text-xs">
            1
          </div>
        </div>
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
