import { Star } from 'lucide-react';
import { useEffect } from 'react';

import { Alert, AlertDescription, AlertTitle } from '~/components/ui/alert';
import { Button } from '~/components/ui/button';
import { getUserData } from '~/lib/utils';
import { useAuthStore, useQuoteStore } from '~/store';

export default function Home() {
  const { author, quote, isLoading, randomizeQuote } = useQuoteStore();
  const { logout } = useAuthStore();
  const userData = getUserData();

  // biome-ignore lint/correctness/useExhaustiveDependencies: <explanation>
  useEffect(() => {
    randomizeQuote();
  }, []);

  return (
    <section className="flex flex-col items-center justify-center h-screen">
      <div className="w-[90%] sm:w-[70%] md:w-[450px]">
        <h1 className="text-2xl">
          Hello{' '}
          <span className="font-semibold">
            {userData.firstName} {userData.lastName}
          </span>
          !
        </h1>
        <h2 className="text-lg text-muted-foreground">
          Here is a random quote for you:
        </h2>

        <Alert className="mt-4">
          <Star className="h-4 w-4 mt-2" />
          <AlertTitle className="leading-snug mb-2">{quote}</AlertTitle>
          <AlertDescription>by {author}</AlertDescription>
        </Alert>

        <div className="mt-4  flex flex-col gap-2">
          <Button
            className="mt-4"
            onClick={randomizeQuote}
            disabled={isLoading}
          >
            {isLoading ? 'Loading...' : 'Get another quote!'}
          </Button>
          <Button variant="outline" onClick={logout}>
            Logout
          </Button>
        </div>
      </div>
    </section>
  );
}
