import { Card, CardContent, CardFooter } from "@/components/ui/card"
import { Label } from "@/components/ui/label"
import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"
import { Link, useNavigate } from "react-router-dom";
import { WashingMachineIcon } from "@/components/utils/logo"
import { useState } from "react";

export default function SignUp() {
  const [email, setEmail] = useState("");
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [error, setError] = useState("");
  const navigate = useNavigate();

  const handleSignUp = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      if (password !== confirmPassword) {
        setError("Passwords do not match");
        return;
      }

      const response = await fetch("http://localhost:8080/signup", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ name: username, email, password }),
      });

      const data = await response.json();
      if (response.ok) {
        navigate("/login");
      } else {
        console.error("Signup failed:", data.error);
        setError(data.error);
      }
    } catch (error) {
      if (error instanceof Error) {
        console.error("Error during signup:", error.message);
        setError(error.message || "An error occurred during signup.");
      } else {
        console.error("Unknown error");
        setError("An unknown error occurred.");
      }
    }
  }

  return (
    <div className="flex min-h-[100dvh] items-center justify-center bg-background px-4 py-12 sm:px-6 lg:px-8">
      <Card className="w-full max-w-md py-4 px-8">
        <div className="flex flex-col items-center justify-center py-6 gap-3">
          <WashingMachineIcon className="h-12 w-12 text-primary" />
          <h1 className="text-2xl font-bold">Laundry Ledger</h1>
          <p className="text-muted-foreground">Sign Up</p>
        </div>
        <CardContent>
          <form className="space-y-4" onSubmit={handleSignUp}>
            <div className="space-y-2">
              <Label htmlFor="email">Email</Label>
              <Input
                id="email"
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="m@example.com"
                required
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="name">Username</Label>
              <Input
                id="name"
                type="text"
                value={username}
                onChange={(e) => setUsername(e.target.value)}
                placeholder="Username"
                required
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="password">Password</Label>
              <Input
                id="password"
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="password2">Confirm Password</Label>
              <Input
                id="password2"
                type="password"
                value={confirmPassword}
                onChange={(e) => {
                  setConfirmPassword(e.target.value)
                  if (e.target.value !== password) {
                    setError("Passwords do not match");
                  } else {
                    setError("");
                  }
                }}
                required
              />
              {error && <p className="text-red-600">{error}</p>}
            </div>
            <Button type="submit" className="w-full">
              Sign Up
            </Button>
          </form>
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