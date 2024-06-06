import { createLazyFileRoute } from '@tanstack/react-router';

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

export const Route = createLazyFileRoute('/login')({
  component: Login,
});

function Login() {
  return (
    <Card className="w-full max-w-sm mt-32 mx-auto">
      <CardHeader className="text-center">
        <CardTitle className="text-2xl">📪 LihatOngkir - Login</CardTitle>
        <CardDescription>
          Please enter your username and password to login.
        </CardDescription>
      </CardHeader>

      <form>
        <CardContent className="grid gap-4">
          <div className="grid gap-2">
            <Label htmlFor="username">Username</Label>
            <Input id="username" type="text" placeholder="foobar" required />
          </div>
          <div className="grid gap-2">
            <Label htmlFor="password">Password</Label>
            <Input
              id="password"
              type="password"
              placeholder="********"
              required
            />
          </div>
        </CardContent>

        <CardFooter>
          <Button type="submit" className="w-full">
            Login
          </Button>
        </CardFooter>
      </form>
    </Card>
  );
}
