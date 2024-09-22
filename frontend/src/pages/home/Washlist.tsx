import OrderModal from "@/components/modals/OrderModal"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardFooter, CardHeader } from "@/components/ui/card"
import { Tooltip, TooltipContent, TooltipTrigger } from "@/components/ui/tooltip"
import { OrderItem } from "@/types/OrderItem"
import { CheckCircleIcon, EditIcon, PlusIcon, XCircleIcon } from "lucide-react"
import { useEffect, useState } from "react"

export default function Washlist() {
  const defaultOrders: OrderItem[] = []
  const [orders, setOrders] = useState(defaultOrders)

  useEffect(() => {
    const fetchOrders = async () => {
      try {
        const baseUrl = import.meta.env.VITE_BASE_URL
        const token = localStorage.getItem("token")
        const response = await fetch(`${baseUrl}/api/orders`, {
          headers: {
            'Authorization': `Bearer ${token}`
          },
        });
        if (!response.ok) {
          throw new Error(response.statusText);
        }
        const data = await response.json();

        const joinResponse = await fetch(`${baseUrl}/api/orderdetails`, {
          headers: {
            'Authorization': `Bearer ${token}`
          },
        })
        if (!joinResponse.ok) {
          throw new Error(joinResponse.statusText);
        }
        const joinData = await joinResponse.json();

        const orderData = data.map((orderItem: any) => {
          let itemsData = joinData.filter((item: any) => item.order_id === orderItem.ID)
          return ({
            ...orderItem,
            completed: orderItem.is_complete,
            items: itemsData.map((item: any) => item.Clothing)
          })
        })
        console.log(orderData)

        setOrders(orderData);
      } catch (error) {
        console.error('Error fetching orders:', error)
      }
    }
    fetchOrders()
  }, [])

  const editItem = async (item: OrderItem) => {
    let { completed, ...itemBody } = item
    const body = { ...itemBody, is_complete: completed }
    const response = await fetch(`${import.meta.env.VITE_BASE_URL}/api/orders/${item.id}`, {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${localStorage.getItem("token")}`
      },
      body: JSON.stringify(body)
    })
    const updatedOrder = await response.json();

    if (!updatedOrder) {
      console.error("Error updating order");
      return;
    }

    // Fetch existing order details
    const orderDetailsResponse = await fetch(`${import.meta.env.VITE_BASE_URL}/api/orders/${item.id}/details`, {
      headers: {
        'Authorization': `Bearer ${localStorage.getItem("token")}`
      },
    });
    const existingDetails = await orderDetailsResponse.json();

    // Process the updated order details
    const existingClothingIds = existingDetails.map((detail: any) => detail.clothing_id);
    const newClothingIds = body.items.map((clothing: any) => clothing.ID);

    // Update or create new order details
    body.items.forEach(async (clothing: any) => {
      const orderDetail = { order_id: updatedOrder.ID, clothing_id: clothing.ID };

      if (existingClothingIds.includes(clothing.ID)) {
        // Update existing OrderDetail if necessary
        const updateResponse = await fetch(`${import.meta.env.VITE_BASE_URL}/api/orderdetails/${clothing.ID}`, {
          method: 'PUT',
          headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${localStorage.getItem("token")}`,
          },
          body: JSON.stringify(orderDetail),
        });
        await updateResponse.json();
      } else {
        // Create new OrderDetail
        const createResponse = await fetch(`${import.meta.env.VITE_BASE_URL}/api/orderdetails`, {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${localStorage.getItem("token")}`,
          },
          body: JSON.stringify(orderDetail),
        });
        await createResponse.json();
      }
    });

    existingDetails.forEach(async (detail: any) => {
      if (!newClothingIds.includes(detail.clothing_id)) {
        await fetch(`${import.meta.env.VITE_BASE_URL}/api/orderdetails/${detail.id}`, {
          method: 'DELETE',
          headers: {
            'Authorization': `Bearer ${localStorage.getItem("token")}`,
          },
        });
      }
    });

    // update records on Order Details

    setOrders((prevState: any) => {
      const itemIndex = prevState.findIndex((i: any) => i.ID === item.id);

      if (itemIndex !== -1) {
        console.log("previous", prevState[itemIndex])

        const updatedOrders = [...prevState]; // Create a copy of the wardrobe
        updatedOrders[itemIndex] = { ...updatedOrders[itemIndex], ...item }; // Replace the item at the found index with the new item

        console.log(updatedOrders[itemIndex])

        return updatedOrders;
      }

      return prevState;
    });
  }

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
            {orders.length > 0 ?
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
                            onClick={() => openForm(order)}
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
                            <Button
                              variant="outline"
                              onClick={() => {
                                let { ID, name, completed, items } = order // ignore type error, this still works
                                const updatedOrder = { id: ID, name, completed: !completed, items }
                                console.log("updatedOrder", updatedOrder)
                                editItem(updatedOrder)
                              }}
                            >
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
              </div> : "No orders yet"}

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
          setOrders={setOrders}
          setIsModalOpen={setIsModalOpen}
          editItem={editItem}
        />
      )}
    </>
  )
}