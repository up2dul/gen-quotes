import { AlertCircle } from 'lucide-react';

import { Alert, AlertDescription, AlertTitle } from '~/components/ui/alert';
import { Button } from '~/components/ui/button';
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from '~/components/ui/card';
import { Input } from '~/components/ui/input';
import { Label } from '~/components/ui/label';
import { useAuth } from '~/hooks/useAuth';

export default function Login() {
  const auth = useAuth();

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const formData = new FormData(e.currentTarget);
    const username = (formData.get('username') as string) ?? '';
    const password = (formData.get('password') as string) ?? '';

    auth.login({ username, password });
  };

  return (
    <section className="mt-32 mx-auto max-w-sm">
      <Card>
        <CardHeader className="text-center">
          <CardTitle className="text-2xl">📪 LihatOngkir - Login</CardTitle>
          <CardDescription>
            Please enter your username and password to login.
          </CardDescription>
        </CardHeader>

        <form onSubmit={handleSubmit}>
          <CardContent className="grid gap-4">
            <div className="grid gap-2">
              <Label htmlFor="username">Username</Label>
              <Input
                id="username"
                name="username"
                type="text"
                placeholder="foobar"
                required
              />
            </div>
            <div className="grid gap-2">
              <Label htmlFor="password">Password</Label>
              <Input
                id="password"
                name="password"
                type="password"
                placeholder="********"
                required
              />
            </div>
          </CardContent>

          <CardFooter>
            <Button type="submit" className="w-full" disabled={auth.isLoading}>
              {auth.isLoading ? 'Loading...' : 'Login'}
            </Button>
          </CardFooter>
        </form>
      </Card>

      {Boolean(auth.error) && (
        <Alert variant="destructive" className="mt-4">
          <AlertCircle className="h-4 w-4" />
          <AlertTitle>Error</AlertTitle>
          <AlertDescription>{auth.error}</AlertDescription>
        </Alert>
      )}
    </section>
  );
}
