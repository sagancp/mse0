"use client"

import * as React from "react"
import Link from "next/link"

import { cn } from "@/lib/utils"
// import { Icons } from "@/components/icons"
import {
  NavigationMenu,
  NavigationMenuContent,
  NavigationMenuItem,
  NavigationMenuLink,
  NavigationMenuList,
  NavigationMenuTrigger,
  navigationMenuTriggerStyle,
} from "@/components/ui/navigation-menu"

const components: { title: string; href: string; description: string }[] = [
  {
    title: "Үнэ ашгийн харьцаа (PE)",
    href: "/pe",
    description:
      "Тухайн компанийн зах зээлийн нэгж хувьцааны үнийг, нэгж хувьцаанд ногдох жилийн ашигтай (Earnings Per Share) нь харьцуулахад ашиглагддаг",
  },
  {
    title: "Үнэ өөрийн хөрөнгийн харьцаа (PB)",
    href: "/pb",
    description:
      "Тухайн компанийг өөрийнх нь санхүүгийн тайлан дээрх зардлын үнэлгээнээс зах зээл дээр хэдий хэмжээгээр илүү эсвэл дутуу үнэ хүргэснийг тодорхойлоход ашиглагддаг",
  },
  {
    title: "Өөрийн хөрөнгийн өгөөж (ROE)",
    href: "/roe",
    description:
      "Энэ харьцаа нь хувьцаа эзэмшигчдийн хөрөнгийн хэдэн хувьтай тэнцэх ашгийг бий болгож байгаа харуулна.",
  },
  {
    title: "Нийт хөрөнгийн өгөөж (ROA)",
    href: "/roa",
    description: "Энэ харьцаа нь компанийн нийт хөрөнгийн хэдэн хувьтай тэнцэх ашгийг бий болгож байгаа харуулна.",
  },
  
]

export function Navbar() {
  return (
    <nav className="flex justify-center">
      
    <NavigationMenu>
      <NavigationMenuList>
        <NavigationMenuItem>
          <Link href="/" legacyBehavior passHref>
            <NavigationMenuLink className={navigationMenuTriggerStyle()}>
              Home
            </NavigationMenuLink>
          </Link>
        </NavigationMenuItem>
        <NavigationMenuItem>
          <NavigationMenuTrigger>Харьцаа үзүүлэлтүүд</NavigationMenuTrigger>
          <NavigationMenuContent>
            <ul className="grid w-[400px] gap-3 p-4 md:w-[500px] md:grid-cols-2 lg:w-[600px] ">
              {components.map((component) => (
                <ListItem
                  key={component.title}
                  title={component.title}
                  href={component.href}
                >
                  {component.description}
                </ListItem>
              ))}
            </ul>
          </NavigationMenuContent>
        </NavigationMenuItem>
        <NavigationMenuItem>
          <Link href="/" legacyBehavior passHref>
            <NavigationMenuLink className={navigationMenuTriggerStyle()}>
              Түүхэн статистик
            </NavigationMenuLink>
          </Link>
        </NavigationMenuItem>
      </NavigationMenuList>
    </NavigationMenu>
    
    </nav>
  )
}

const ListItem = React.forwardRef<
  React.ElementRef<"a">,
  React.ComponentPropsWithoutRef<"a">
>(({ className, title, children, ...props }, ref) => {
  return (
    <li>
      <NavigationMenuLink asChild>
        <a
          ref={ref}
          className={cn(
            "block select-none space-y-1 rounded-md p-3 leading-none no-underline outline-none transition-colors hover:bg-accent hover:text-accent-foreground focus:bg-accent focus:text-accent-foreground",
            className
          )}
          {...props}
        >
          <div className="text-sm font-medium leading-none">{title}</div>
          <p className="line-clamp-4 text-xs leading-snug text-muted-foreground">
            {children}
          </p>
        </a>
      </NavigationMenuLink>
    </li>
  )
})
ListItem.displayName = "ListItem"
