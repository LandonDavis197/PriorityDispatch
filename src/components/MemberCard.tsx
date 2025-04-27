import Link from 'next/link';
import Image from 'next/image';
import type { APIUser } from '../types/member';

export function MemberCard({ user }: { user: APIUser }) {
  return (
    <Link
      href={`/profile/${user.login.uuid}`}
      className="block bg-white rounded-lg shadow hover:shadow-lg transition overflow-hidden"
    >
      <div className="flex items-center p-4 space-x-4">
        <div className="relative h-16 w-16 rounded-full border-2 border-indigo-100 overflow-hidden">
          <Image
            src={user.picture.thumbnail}
            alt={`${user.name.first} ${user.name.last}`}
            fill
            sizes="64px"
            className="object-cover"
          />
        </div>
        <div>
          <h2 className="text-lg font-semibold text-gray-800">
            {user.name.first} {user.name.last}
          </h2>
          <p className="text-sm text-gray-500">Age: {user.dob.age}</p>
        </div>
      </div>
    </Link>
  );
}
