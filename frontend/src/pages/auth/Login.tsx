import { Card, CardContent, CardFooter } from "@/components/ui/card"
import { Label } from "@/components/ui/label"
import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"
import { Link } from "react-router-dom";
import { WashingMachineIcon } from "lucide-react";
import React, { useState } from "react";
import { useAuth } from "@/contexts/AuthContext";

export default function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const { login } = useAuth();
  // const navigate = useNavigate();

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      const response = await fetch("http://localhost:8080/login", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ email, password }),
      });

      const data = await response.json();
      if (response.ok) {
        login(data.token)
        // localStorage.setItem("token", data.token);
        // navigate("/");
      } else {
        console.error("Login failed:", data.error);
        setError(data.error);
      }
    } catch (error) {
      if (error instanceof Error) {
        console.error("Error during login:", error.message);
        setError(error.message || "An error occurred during login.");
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
          <p className="text-muted-foreground">Login</p>
        </div>
        <CardContent>
          <form className="space-y-4" onSubmit={handleLogin}>
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
              <Label htmlFor="password">Password</Label>
              <Input
                id="password"
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
              />
            </div>
            {error && <p className="text-red-600">{error}</p>}
            <Button type="submit" className="w-full">
              Login
            </Button>
          </form>
        </CardContent>
        <CardFooter className="text-center text-sm">
          Don&apos;t have an account?{" "}
          <Link to="/signup" className="font-medium underline underline-offset-4 pl-1">
            Sign up
          </Link>
        </CardFooter>
      </Card>
    </div>
  )
}