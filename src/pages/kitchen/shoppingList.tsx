import { RecipeService } from "@/services/recipe-services";
import { useUserStore } from "@/store/userStore";
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { Button } from "@/components/ui/button";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { useForm } from "react-hook-form";
import { toast } from "sonner";
import Loading from "@/assets/svgs/loading.svg"

type ShoppingListFormValues = {
  item: string;
  aisle: string;
  parse: boolean;
};

export default function ShoppingList() {
  const { user, accessHash } = useUserStore();
  console.log("Username:", user?.username, "Hash:", accessHash);

  const { data } = useQuery({
    queryKey: ["shopping-list", user?.username, accessHash],
    queryFn: () => RecipeService.getShoppingList(user?.username || "", accessHash || ""),
    enabled: Boolean(user?.username && accessHash),
    refetchOnWindowFocus: false,
  });
  console.log("Shopping list data:", data);

  const queryClient = useQueryClient();

  // Mutation: update this so that it accepts the payload from the form
  const addMutation = useMutation({
    mutationFn: (values: ShoppingListFormValues) => 
      RecipeService.addItem(user?.username || "", accessHash || "", values),
    onSuccess: () => {
      toast.success("Added to List");
      queryClient.invalidateQueries({
        queryKey: ["shopping-list", user?.username, accessHash],
      });
    },
    onError: (err) => {
      console.error(err);
      toast.error("Error adding item");
    },
  });

  const deleteMutation = useMutation({
    mutationFn: (id: number) => 
      RecipeService.deleteShoppingListItem(
        user!.username, 
        accessHash!, 
        id
      ),
    onSuccess: () => {
      toast.success("Item removed");
      queryClient.invalidateQueries({
        queryKey: ["shopping-list", user?.username, accessHash],
      });
    },
    onError: () => {
      toast.error("Error removing item");
    },
  });


  const form = useForm<ShoppingListFormValues>({
    defaultValues: {
      item: "",
      aisle: "",
      parse: true,
    },
  });

  const onSubmit = (values: ShoppingListFormValues) => {
    addMutation.mutate(values);
  };

  return (
    <div className="p-4">
      {/* Render list or empty message */}
      {!data ? (
        <div className="flex justify-center items-center">
          <img src={Loading} alt="loading.svg" className="animate-spin " />
        </div>
      ) : data.length > 0 ? (
        <div className="mb-4 space-y-4">
          {data.map((group: any) => (
            <div key={group.aisle}>
              <h3 className="text-lg font-semibold">{group.aisle}</h3>
              {group.items.map((item: any) => (
                <div key={item.id} className="p-2 border-b flex justify-between items-center">
                  <div className="flex gap-4">
                    <p>{item.name.toUpperCase()}</p>
                    <p>Cost: ${item.cost}</p>
                  </div>
                  <Button onClick={() => deleteMutation.mutate(item.id)} className="bg-red-500 hover:text-white w-[6em]">Delete Item</Button>
                </div>
              ))}
            </div>
          ))}
        </div>
      ) : (
        <p>Nothing in your list yet.</p>
      )}


      <p className="mt-4 font-bold">Add to List</p>
      <Form {...form}> 
        <form onSubmit={form.handleSubmit(onSubmit)} className="w-full max-w-[400px] bg-white rounded-2xl shadow-md p-2 ">
            <div className="flex mb-4 gap-2">
                <FormField
                    control={form.control}
                    name="item"
                    rules={{ required: "Item is required" }}
                    render={({ field }) => (
                    <FormItem>
                        <FormLabel>Item</FormLabel>
                        <FormControl>
                        <Input type="text" placeholder="Enter item" {...field} />
                        </FormControl>
                        <FormMessage />
                    </FormItem>
                    )}
                />
                <FormField
                    control={form.control}
                    name="parse"
                    rules={{}}
                    render={({ field }) => (
                    <FormItem>
                        <FormLabel>Food Item</FormLabel>
                        <FormControl>
                        <Input
                            type="checkbox"
                            checked={field.value} // use checked to control the checkbox
                            onChange={(e) => field.onChange(e.target.checked)} 
                            onBlur={field.onBlur}
                            name={field.name}
                            ref={field.ref}
                            className="rounded-full"
                        />
                        </FormControl>
                        <FormMessage />
                    </FormItem>
                    )}
                />

            </div>
          
          <Button
            type="submit"
            className="mr-auto  bg-green-500 text-white p-2 mb-4"
            disabled={addMutation.isPending}
          >
            {addMutation.isPending ? "Adding..." : "Add to Shopping List"}
          </Button>
        </form>
      </Form>
    </div>
  );
}
