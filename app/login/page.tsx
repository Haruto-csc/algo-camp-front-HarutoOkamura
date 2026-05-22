import Link from "next/link";
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
          <Input id="id" type="text" required/>
          <CardDescription>
            Password
          </CardDescription>
          <Input id="password" type="password" required />
        </CardHeader>
        <CardFooter>
          <Button asChild className="w-full">
              <Link href="/">ログイン</Link>
            </Button>
        </CardFooter>
      </Card>
    </div>
  );
}
