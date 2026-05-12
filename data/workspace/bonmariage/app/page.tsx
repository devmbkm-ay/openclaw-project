
import Link from 'next/link';

export default function Home() {
  return (
    <main className="flex min-h-screen flex-col items-center justify-center bg-gray-50 p-8 text-center">
      <div className="max-w-2xl">
        <h1 className="text-5xl font-bold tracking-tight text-gray-800 sm:text-7xl" style={{ fontFamily: 'serif' }}>
          Clara & Léo
        </h1>
        <p className="mt-6 text-2xl leading-8 text-gray-600">
          Nous avons la joie de vous inviter à notre mariage
        </p>
        <p className="mt-4 text-xl text-gray-500">
          Samedi 24 Juin 2026
        </p>
        <p className="text-lg text-gray-500">
          Château de Vallery, Vallery, France
        </p>
        <div className="mt-10 flex items-center justify-center gap-x-6">
          <Link
            href="/rsvp"
            className="rounded-md bg-indigo-600 px-6 py-3 text-lg font-semibold text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
          >
            Répondre
          </Link>
        </div>
      </div>
    </main>
  );
}
