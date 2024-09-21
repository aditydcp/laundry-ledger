/**
 * v0 by Vercel.
 * @see https://v0.dev/t/zQbUpWnqBPd
 * Documentation: https://v0.dev/docs#integrating-generated-code-into-your-nextjs-app
 */
"use client"

import { useState } from "react"
import { TooltipProvider, Tooltip, TooltipTrigger, TooltipContent } from "@/components/ui/tooltip"
import { Link } from "react-router-dom"
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Avatar, AvatarImage, AvatarFallback } from "@/components/ui/avatar"
import { DropdownMenu, DropdownMenuTrigger, DropdownMenuContent, DropdownMenuItem, DropdownMenuSeparator } from "@/components/ui/dropdown-menu"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"

export default function Home() {
  const [items, setItems] = useState([
    { id: 1, name: "Wash Clothes", completed: false },
    { id: 2, name: "Dry Cleaning", completed: false },
    { id: 3, name: "Fold Laundry", completed: false },
  ])
  const [newItem, setNewItem] = useState("")
  const [wardrobe, setWardrobe] = useState([
    {
      id: 1,
      name: "Casual T-Shirt",
      image: "/placeholder.svg",
      price: "$19.99",
      category: "Tops",
    },
    {
      id: 2,
      name: "Skinny Jeans",
      image: "/placeholder.svg",
      price: "$49.99",
      category: "Bottoms",
    },
    {
      id: 3,
      name: "Leather Jacket",
      image: "/placeholder.svg",
      price: "$99.99",
      category: "Outerwear",
    },
    {
      id: 4,
      name: "Floral Dress",
      image: "/placeholder.svg",
      price: "$39.99",
      category: "Dresses",
    },
  ])
  const [profileForm, setProfileForm] = useState({
    name: "John Doe",
    email: "john@example.com",
    bio: "I love fashion and laundry!",
  })
  const handleAddItem = () => {
    if (newItem.trim() !== "") {
      setItems([...items, { id: items.length + 1, name: newItem, completed: false }])
      setNewItem("")
    }
  }
  const handleToggleComplete = (id: any) => {
    setItems(items.map((item) => (item.id === id ? { ...item, completed: !item.completed } : item)))
  }
  const handleProfileChange = (field: any, value: any) => {
    setProfileForm({ ...profileForm, [field]: value })
  }
  return (
    <div className="flex min-h-screen w-full">
      <div className="hidden w-14 flex-col border-r bg-background sm:flex">
        <nav className="flex flex-col items-center gap-4 px-2 sm:py-5">
          <TooltipProvider>
            <Link
              to="#"
              className="group flex h-9 w-9 shrink-0 items-center justify-center gap-2 rounded-full bg-primary text-lg font-semibold text-primary-foreground md:h-8 md:w-8 md:text-base"
              
            >
              <div className="h-4 w-4 transition-all group-hover:scale-110" />
              <span className="sr-only">My Wardrobe</span>
            </Link>
            <Tooltip>
              <TooltipTrigger asChild>
                <Link
                  to="#"
                  className="flex h-9 w-9 items-center justify-center rounded-lg bg-accent text-accent-foreground transition-colors hover:text-foreground md:h-8 md:w-8"
                  
                >
                  <div className="h-5 w-5" />
                  <span className="sr-only">Washlist</span>
                </Link>
              </TooltipTrigger>
              <TooltipContent side="right">Washlist</TooltipContent>
            </Tooltip>
            <Tooltip>
              <TooltipTrigger asChild>
                <Link
                  to="#"
                  className="flex h-9 w-9 items-center justify-center rounded-lg text-muted-foreground transition-colors hover:text-foreground md:h-8 md:w-8"
                  
                >
                  <div className="h-5 w-5" />
                  <span className="sr-only">Profile</span>
                </Link>
              </TooltipTrigger>
              <TooltipContent side="right">Profile</TooltipContent>
            </Tooltip>
          </TooltipProvider>
        </nav>
      </div>
      <div className="flex flex-1 flex-col">
        <div className="container mx-auto px-4 py-6">
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
            {wardrobe.map((item) => (
              <Card key={item.id} className="border-0 rounded-lg shadow-lg">
                <CardContent className="p-0">
                  <img
                    src="/placeholder.svg"
                    alt={item.name}
                    width={400}
                    height={400}
                    className="object-cover aspect-square"
                  />
                </CardContent>
                <CardFooter className="p-4">
                  <div className="flex justify-between items-center">
                    <div>
                      <h3 className="text-lg font-semibold">{item.name}</h3>
                      <p className="text-sm text-muted-foreground">{item.category}</p>
                    </div>
                    <div className="text-lg font-bold">{item.price}</div>
                  </div>
                </CardFooter>
              </Card>
            ))}
          </div>
        </div>
      </div>
      <div className="flex flex-1 flex-col">
        <div className="container mx-auto px-4 py-6">
          <div className="grid gap-6">
            {items.map((item) => (
              <Card key={item.id} className="border-0 rounded-none shadow-none">
                <CardHeader className="flex flex-row items-center p-4">
                  <Link to="#" className="flex items-center gap-2 text-sm font-semibold" >
                    <Avatar className="w-8 h-8 border">
                      <AvatarImage src="/placeholder-user.jpg" alt="@shadcn" />
                      <AvatarFallback>AC</AvatarFallback>
                    </Avatar>
                    Laundry List
                  </Link>
                  <DropdownMenu>
                    <DropdownMenuTrigger asChild>
                      <Button variant="ghost" size="icon" className="w-8 h-8 ml-auto rounded-full">
                        <MoveHorizontalIcon className="w-4 h-4" />
                      </Button>
                    </DropdownMenuTrigger>
                    <DropdownMenuContent align="end">
                      <DropdownMenuItem>
                        <BookmarkIcon className="w-4 h-4 mr-2" />
                        Save
                      </DropdownMenuItem>
                      <DropdownMenuItem>
                        <StarIcon className="w-4 h-4 mr-2" />
                        Add to favorites
                      </DropdownMenuItem>
                      <DropdownMenuSeparator />
                      <DropdownMenuItem>
                        <FileWarningIcon className="w-4 h-4 mr-2" />
                        Report
                      </DropdownMenuItem>
                    </DropdownMenuContent>
                  </DropdownMenu>
                </CardHeader>
                <CardContent className="p-0">
                  <div className="flex items-center justify-center h-40 bg-muted">
                    <span className={`text-2xl font-bold ${item.completed ? "line-through text-gray-500" : ""}`}>
                      {item.name}
                    </span>
                  </div>
                </CardContent>
                <CardFooter className="grid gap-2 p-2 pb-4">
                  <div className="flex items-center w-full">
                    <Button variant="ghost" size="icon" onClick={() => handleToggleComplete(item.id)}>
                      <CheckIcon className="w-4 h-4" />
                      <span className="sr-only">Toggle Completion</span>
                    </Button>
                  </div>
                </CardFooter>
              </Card>
            ))}
          </div>
          <div className="mt-4 flex">
            <Input
              type="text"
              value={newItem}
              onChange={(e) => setNewItem(e.target.value)}
              placeholder="Add new item"
              className="flex-1 mr-2"
            />
            <Button onClick={handleAddItem}>Add</Button>
          </div>
        </div>
      </div>
      <div className="flex flex-1 flex-col">
        <div className="container mx-auto px-4 py-6">
          <Card>
            <CardHeader>
              <CardTitle>Edit Profile</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="space-y-2">
                <Label htmlFor="name">Name</Label>
                <Input
                  id="name"
                  value={profileForm.name}
                  onChange={(e) => handleProfileChange("name", e.target.value)}
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="email">Email</Label>
                <Input
                  id="email"
                  type="email"
                  value={profileForm.email}
                  onChange={(e) => handleProfileChange("email", e.target.value)}
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="bio">Bio</Label>
                <Textarea
                  id="bio"
                  value={profileForm.bio}
                  onChange={(e) => handleProfileChange("bio", e.target.value)}
                />
              </div>
            </CardContent>
            <CardFooter>
              <Button>Save Changes</Button>
            </CardFooter>
          </Card>
        </div>
      </div>
    </div>
  )
}

function BookmarkIcon(props: any) {
  return (
    <svg
      {...props}
      xmlns="http://www.w3.org/2000/svg"
      width="24"
      height="24"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <path d="m19 21-7-4-7 4V5a2 2 0 0 1 2-2h10a2 2 0 0 1 2 2v16z" />
    </svg>
  )
}


function CheckIcon(props: any) {
  return (
    <svg
      {...props}
      xmlns="http://www.w3.org/2000/svg"
      width="24"
      height="24"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <path d="M20 6 9 17l-5-5" />
    </svg>
  )
}


function FileWarningIcon(props: any) {
  return (
    <svg
      {...props}
      xmlns="http://www.w3.org/2000/svg"
      width="24"
      height="24"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <path d="M15 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V7Z" />
      <path d="M12 9v4" />
      <path d="M12 17h.01" />
    </svg>
  )
}


function MoveHorizontalIcon(props: any) {
  return (
    <svg
      {...props}
      xmlns="http://www.w3.org/2000/svg"
      width="24"
      height="24"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <polyline points="18 8 22 12 18 16" />
      <polyline points="6 8 2 12 6 16" />
      <line x1="2" x2="22" y1="12" y2="12" />
    </svg>
  )
}


function StarIcon(props: any) {
  return (
    <svg
      {...props}
      xmlns="http://www.w3.org/2000/svg"
      width="24"
      height="24"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2" />
    </svg>
  )
}