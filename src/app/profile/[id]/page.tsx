'use client';

import Image from 'next/image';
import { useRouter, useParams } from 'next/navigation';
import { useMembersContext } from '../../../context/MembersContext';
import { BackButton } from '../../../components/BackButton';
import { formatBirthDate } from '../../../utils/formatDate';

export default function ProfilePage() {
  const { back } = useRouter();
  const { id: userId } = useParams() as { id: string };
  const { members } = useMembersContext();

  const user = members.find((u) => u.login.uuid === userId);

  if (!user) {
    return <p className="text-center py-20 text-gray-500">Loading…</p>;
  }

  return (
    <div>
      <BackButton onClick={back} />

      <div className="bg-white rounded-xl shadow-lg max-w-md mx-auto p-8 space-y-6">
        <div className="flex justify-center">
          <Image
            src={user.picture.large}
            alt={`${user.name.first} ${user.name.last}`}
            width={128}
            height={128}
            className="rounded-full border-4 border-indigo-100 object-cover"
          />
        </div>
        <div className="text-center space-y-1">
          <h1 className="text-3xl font-bold text-gray-800">
            {user.name.first} {user.name.last}
          </h1>
          <p className="text-sm text-indigo-600">
            {formatBirthDate(user.dob.date)} · {user.dob.age} yrs
          </p>
        </div>
        <div className="space-y-4 text-gray-700">
          <p>
            <span className="font-medium">Address:</span>{' '}
            {user.location.street.number} {user.location.street.name}, {user.location.city}, {user.location.state}, {user.location.country}{' '}
            {user.location.postcode}
          </p>
          <p>
            <span className="font-medium">Email:</span> {user.email}
          </p>
          <p>
            <span className="font-medium">Phone:</span> {user.phone}
          </p>
          <p>
            <span className="font-medium">Cell:</span> {user.cell}
          </p>
        </div>
      </div>
    </div>
  );
}
