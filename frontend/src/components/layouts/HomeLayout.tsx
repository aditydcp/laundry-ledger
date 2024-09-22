import { Tooltip, TooltipTrigger, TooltipContent } from "@/components/ui/tooltip"
import { ClipboardListIcon, ShirtIcon, WashingMachineIcon } from "lucide-react"
import { Link } from "react-router-dom"

export default function HomeLayout({ children }: { children: React.ReactNode }) {
  const navMenuItems = [
    {
      title: "My Wardrobe",
      icon: ShirtIcon,
      path: "wardrobe",
    },
    {
      title: "Washlist",
      icon: ClipboardListIcon,
      path: "washlist",
    },
    // {
    //   title: "Profile",
    //   icon: null,
    //   path: "profile",
    // },
  ]

  return (
    <div className="flex min-h-screen w-full">
      <div className="hidden w-20 flex-col border-r bg-background sm:flex">
        <nav className="flex flex-col items-center gap-6 px-4 sm:py-5">
          <Link to="/">
            <WashingMachineIcon className="h-10 w-10 text-primary" />
          </Link>
          {navMenuItems.map(menuItem => {
            return (
              <Tooltip key={menuItem.path}>
                <TooltipTrigger asChild>
                  <Link
                    to={`/${menuItem.path}`}
                    className="flex h-12 w-12 items-center justify-center rounded-lg text-accent-foreground transition-colors hover:bg-accent hover:text-foreground md:h-10 md:w-10"
                  >
                    <menuItem.icon className="h-8 w-8" />
                    <span className="sr-only">{menuItem.title}</span>
                  </Link>
                </TooltipTrigger>
                <TooltipContent side="right">{menuItem.title}</TooltipContent>
              </Tooltip>
            )
          })}
        </nav>
      </div>
      <div className="p-6">{children}</div>
    </div>
  )
}