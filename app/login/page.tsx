import { Button } from '@/components/ui/button';
import {
  Card,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle
} from '@/components/ui/card';
import { signIn } from '@/lib/auth';
import { Input } from "@/components/ui/input"

export default function LoginPage() {
  return (
    <div className="min-h-screen flex justify-center items-start md:items-center p-8">
      <Card className="w-full max-w-sm">
        <CardHeader>
          <CardTitle className="text-2xl">Login</CardTitle>
          <CardDescription>
            ID
          </CardDescription>
          <Input id="id" type="id" required/>
          <CardDescription>
            Password
          </CardDescription>
          <Input id="password" type="password" required />
        </CardHeader>
        <CardFooter>
          <form
            action={async () => {
              'use server';
              await signIn('github', {
                redirectTo: '/'
              });
            }}
            className="w-full"
          >
            <Button className="w-full">ログイン</Button>
          </form>
        </CardFooter>
      </Card>
    </div>
  );
}
