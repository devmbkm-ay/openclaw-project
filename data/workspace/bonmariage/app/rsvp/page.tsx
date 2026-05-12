"use client";

import { useState } from 'react';
import Link from 'next/link';

export default function RSVP() {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [attending, setAttending] = useState('');
  const [meal, setMeal] = useState('');
  const [message, setMessage] = useState('');
  
  const [status, setStatus] = useState('idle'); // idle, submitting, success, error
  const [errorMessage, setErrorMessage] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();
    setStatus('submitting');
    setErrorMessage('');

    try {
      const response = await fetch('/api/rsvp', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ name, email, attending, meal, message }),
      });

      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.error || `Error: ${response.status}`);
      }

      setStatus('success');
    } catch (error) {
      setStatus('error');
      setErrorMessage(error.message);
      console.error('Submission failed:', error);
    }
  };

  if (status === 'success') {
    return (
      <main className="flex min-h-screen flex-col items-center justify-center bg-gray-50 p-8 text-center">
        <div className="max-w-xl bg-white p-10 shadow-lg rounded-lg">
          <h1 className="text-3xl font-bold tracking-tight text-gray-800 sm:text-4xl">Merci !</h1>
          <p className="mt-4 text-lg text-gray-600">Votre réponse a bien été enregistrée.</p>
          <div className="mt-8">
            <Link href="/" className="text-indigo-600 hover:text-indigo-500">
              Retour à l'accueil
            </Link>
          </div>
        </div>
      </main>
    );
  }

  return (
    <main className="flex min-h-screen flex-col items-center justify-center bg-gray-50 p-4 sm:p-8">
      <div className="w-full max-w-xl bg-white p-8 sm:p-10 shadow-lg rounded-lg">
        <h1 className="text-3xl font-bold tracking-tight text-gray-800 sm:text-4xl text-center">Répondez s'il vous plaît</h1>
        <p className="mt-2 text-center text-gray-600">Avant le 1er Mai 2026</p>
        <form onSubmit={handleSubmit} className="mt-8 space-y-6">
          <div>
            <label htmlFor="name" className="block text-sm font-medium leading-6 text-gray-900">
              Nom complet
            </label>
            <div className="mt-2">
              <input
                id="name"
                name="name"
                type="text"
                required
                value={name}
                onChange={(e) => setName(e.target.value)}
                className="block w-full rounded-md border-0 py-2 px-3 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
              />
            </div>
          </div>

          <div>
            <label htmlFor="email" className="block text-sm font-medium leading-6 text-gray-900">
              Adresse e-mail
            </label>
            <div className="mt-2">
              <input
                id="email"
                name="email"
                type="email"
                required
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="block w-full rounded-md border-0 py-2 px-3 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
              />
            </div>
          </div>

          <fieldset>
            <legend className="text-sm font-medium leading-6 text-gray-900">Serez-vous des nôtres ?</legend>
            <div className="mt-2 space-y-2">
              <div className="flex items-center gap-x-3">
                <input
                  id="attending-yes"
                  name="attending"
                  type="radio"
                  value="yes"
                  required
                  checked={attending === 'yes'}
                  onChange={(e) => setAttending(e.target.value)}
                  className="h-4 w-4 border-gray-300 text-indigo-600 focus:ring-indigo-600"
                />
                <label htmlFor="attending-yes" className="block text-sm font-medium leading-6 text-gray-900">
                  J'y serai
                </label>
              </div>
              <div className="flex items-center gap-x-3">
                <input
                  id="attending-no"
                  name="attending"
                  type="radio"
                  value="no"
                  checked={attending === 'no'}
                  onChange={(e) => setAttending(e.target.value)}
                  className="h-4 w-4 border-gray-300 text-indigo-600 focus:ring-indigo-600"
                />
                <label htmlFor="attending-no" className="block text-sm font-medium leading-6 text-gray-900">
                  Je ne pourrai pas venir
                </label>
              </div>
            </div>
          </fieldset>

          {attending === 'yes' && (
            <div>
              <label htmlFor="meal" className="block text-sm font-medium leading-6 text-gray-900">
                Préférence de plat
              </label>
              <div className="mt-2">
                <select
                  id="meal"
                  name="meal"
                  value={meal}
                  onChange={(e) => setMeal(e.target.value)}
                  className="block w-full rounded-md border-0 py-2 px-3 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                >
                  <option value="">Choisissez une option</option>
                  <option value="Viande">Viande</option>
                  <option value="Poisson">Poisson</option>
                  <option value="Végétarien">Végétarien</option>
                </select>
              </div>
            </div>
          )}

          <div>
            <label htmlFor="message" className="block text-sm font-medium leading-6 text-gray-900">
              Un petit mot (optionnel)
            </label>
            <div className="mt-2">
              <textarea
                id="message"
                name="message"
                rows={4}
                value={message}
                onChange={(e) => setMessage(e.target.value)}
                className="block w-full rounded-md border-0 py-2 px-3 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
              />
            </div>
          </div>

          {status === 'error' && (
            <div className="rounded-md bg-red-50 p-4">
              <p className="text-sm font-medium text-red-800">Erreur : {errorMessage}</p>
            </div>
          )}

          <div>
            <button
              type="submit"
              disabled={status === 'submitting'}
              className="flex w-full justify-center rounded-md bg-indigo-600 px-3 py-2 text-sm font-semibold leading-6 text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600 disabled:opacity-50"
            >
              {status === 'submitting' ? 'Envoi en cours...' : 'Envoyer ma réponse'}
            </button>
          </div>
        </form>
      </div>
    </main>
  );
}
