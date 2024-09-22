import OrderModal from "@/components/modals/OrderModal"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardFooter, CardHeader } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Tooltip, TooltipContent, TooltipTrigger } from "@/components/ui/tooltip"
import { CheckCircleIcon, EditIcon, PlusIcon, XCircleIcon } from "lucide-react"
import { useState } from "react"

export default function Washlist() {
  const [orders, setOrders] = useState([
    {
      id: 1,
      name: "Cinta Laundry",
      completed: false,
      items: [
        {
          id: 1,
          name: "Kaos Putih"
        },
        {
          id: 2,
          name: "Celana Ijo"
        }
      ]
    },
    {
      id: 2,
      name: "Dry Cleaning Specialist",
      completed: false,
      items: [
        {
          id: 1,
          name: "Tuxedo"
        },
        {
          id: 2,
          name: "Jas Jus"
        }
      ]
    },
    {
      id: 3,
      name: "Rewash",
      completed: true,
      items: [
        {
          id: 1,
          name: "Sepatu Tinggi Putih Gum Ventela"
        },
        {
          id: 2,
          name: "Sepatu Kodachi Classic"
        },
        {
          id: 3,
          name: "Sepatu Running Ortuseight"
        }
      ]
    },
    {
      id: 4,
      name: "Rewash",
      completed: true,
      items: [
        {
          id: 1,
          name: "Sepatu Tinggi Putih Gum Ventela"
        },
        {
          id: 2,
          name: "Sepatu Kodachi Classic"
        },
        {
          id: 3,
          name: "Sepatu Running Ortuseight"
        }
      ]
    },
    {
      id: 5,
      name: "Rewash",
      completed: true,
      items: [
        {
          id: 1,
          name: "Sepatu Tinggi Putih Gum Ventela"
        },
        {
          id: 2,
          name: "Sepatu Kodachi Classic"
        },
        {
          id: 3,
          name: "Sepatu Running Ortuseight"
        }
      ]
    },
  ])

  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedItem, setSelectedItem] = useState(null)

  const openForm = (item: any = null) => {
    setSelectedItem(item)
    setIsModalOpen(true);
  }

  return (
    <>
      <div className="flex flex-col gap-6">
        <div id="title" className="flex gap-4 items-end">
          <h2 className="scroll-m-20 text-4xl font-bold tracking-tight">
            Washlist
          </h2>
          <span className="font-medium tracking-tight">
            Manage your laundry orders
          </span>
        </div>
        <div id="content">
          <div className="container mx-auto px-4 py-6">
            <div className="grid grid-cols-[repeat(auto-fill,minmax(300px,1fr))] gap-6">
              {orders.map((order) => (
                <Card key={order.id} className="border-0 rounded-lg shadow-lg">
                  <CardHeader className="flex flex-row items-center justify-between p-2">
                    <div className="flex flex-col justify-center">
                      <span className="text-xl font-bold">
                        {order.name}
                      </span>
                      <span className="text-md">
                        {order.completed ? "Completed" : "Incomplete"}
                      </span>
                    </div>
                    <Tooltip>
                      <TooltipTrigger asChild>
                        <Button
                          variant="outline"
                          className="p-2 mt-0"
                          onClick={() => openForm()}
                        >
                          <EditIcon className="w-4 h-4" />
                          <span className="sr-only">Edit Order</span>
                        </Button>
                      </TooltipTrigger>
                      <TooltipContent side="top">Edit</TooltipContent>
                    </Tooltip>
                  </CardHeader>
                  <CardContent className="p-0 px-2">
                    <div className="p-2 bg-muted rounded-lg">
                      <ul className="ml-5 list-disc text-sm">
                        {order.items.map(item => (
                          <li key={`${order.id}-${item.id}`}>{item.name}</li>
                        ))}
                      </ul>
                    </div>
                  </CardContent>
                  <CardFooter className="grid gap-2 p-2 pt-3 pb-4">
                    <div className="flex items-end justify-end w-full">
                      <Tooltip>
                        <TooltipTrigger asChild>
                          <Button variant="outline">
                            {order.completed ? <XCircleIcon className="w-4 h-4" /> : <CheckCircleIcon className="w-4 h-4" />}
                            <span className="sr-only">{order.completed ? "Mark as Incomplete" : "Mark as Completed"}</span>
                          </Button>
                        </TooltipTrigger>
                        <TooltipContent side="bottom">{order.completed ? "Mark as Incomplete" : "Mark as Completed"}</TooltipContent>
                      </Tooltip>
                    </div>
                  </CardFooter>
                </Card>
              ))}
            </div>

            <Tooltip>
              <TooltipTrigger
                className="fixed bottom-6 right-6 bg-primary text-white p-4 rounded-full shadow-lg hover:text-primary hover:bg-primary-foreground transition-colors"
                onClick={() => openForm()}
              >
                <PlusIcon />
              </TooltipTrigger>
              <TooltipContent side="right">Add New Clothing</TooltipContent>
            </Tooltip>
          </div>
        </div>
      </div>

      {isModalOpen && (
        <OrderModal
          item={selectedItem}
          setIsModalOpen={setIsModalOpen}
        />
      )}
    </>
  )
}