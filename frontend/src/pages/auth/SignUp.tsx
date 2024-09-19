import { Card, CardContent, CardFooter } from "@/components/ui/card"
import { Label } from "@/components/ui/label"
import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"
import { Link } from "react-router-dom";
import { WashingMachineIcon } from "@/components/utils/logo"

export default function SignUp() {
  return (
    <div className="flex min-h-[100dvh] items-center justify-center bg-background px-4 py-12 sm:px-6 lg:px-8">
      <Card className="w-full max-w-md py-4 px-8">
        <div className="flex flex-col items-center justify-center py-6 gap-3">
          <WashingMachineIcon className="h-12 w-12 text-primary" />
          <h1 className="text-2xl font-bold">Laundry Ledger</h1>
          <p className="text-muted-foreground">Sign Up</p>
        </div>
        <CardContent className="space-y-4">
          <div className="space-y-2">
            <Label htmlFor="email">Email</Label>
            <Input id="email" type="email" placeholder="m@example.com" required />
          </div>
          <div className="space-y-2">
            <Label htmlFor="name">Username</Label>
            <Input id="name" type="text" required />
          </div>
          <div className="space-y-2">
            <Label htmlFor="password">Password</Label>
            <Input id="password" type="password" required />
          </div>
          <div className="space-y-2">
            <Label htmlFor="password2">Confirm Password</Label>
            <Input id="password2" type="password" required />
          </div>
          <Button type="submit" className="w-full">
            Sign Up
          </Button>
        </CardContent>
        <CardFooter className="text-center text-sm">
          Already have an account?{" "}
          <Link to="/login" className="font-medium underline underline-offset-4 pl-1">
            Login
          </Link>
        </CardFooter>
      </Card>
    </div>
  )
}