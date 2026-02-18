'use client';

import Link from 'next/link';
import { useRouter } from 'next/navigation';

const NavLink = ({ address, text, icon }) => {
  const router = useRouter();

  return (
    <Link href={address}>
      <div
        className={`w-full p-2 flex items-center gap-2 rounded-md transition hover:bg-white/30 ${
          router.pathname === address ? 'text-black' : ''
        }`}
      >
        {icon}
        <p className="text-md">{text}</p>
      </div>
    </Link>
  );
};

export default NavLink;
