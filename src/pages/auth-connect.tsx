import {Button} from "@/components/ui/button";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { useNavigate } from "react-router-dom";
import { useUserStore } from "@/store/userStore";
import { useMutation } from "@tanstack/react-query";
import { toast } from "sonner";
import { RecipeService } from "@/services/recipe-services";
import { User } from "@/types";

const signUpSchema = z.object({
  email: z.string().email("Invalid email address"),
  username: z.string().min(6, "Username must be at least 6 characters"),
  firstName: z.string(),
  lastName: z.string(),
});

export default function Connect() {
  const navigate = useNavigate();
  const { setUser, setHash } = useUserStore();

  const registerMutation = useMutation({
    mutationFn: RecipeService.connect,
    onSuccess: (resp) => {
      console.log("Response from connect:", resp);
      console.log("username:", resp.username)
      const user: User = {
        username: resp.username,  
        spoonacularPassword: resp.spoonacularPassword, 
      };
    
      // Update the user store
      setUser({ user });
    
      // Store the hash value directly from the API response
      setHash(resp.hash, "");
      toast.success("Woo hoo signed up");
      navigate("/kitchen/favourite");
    },
    onError: (err) => {
      console.log(err);
      const errorMessage = "Sign Up Error";
      toast.error(errorMessage);
    },
  });

  const form = useForm({
    resolver: zodResolver(signUpSchema),
    defaultValues: {
      email: "",
      username: "",
      firstName: "",
      lastName: "",
    },
  });

  const onSubmit = async (values: {
    email: string;
    username: string;
    firstName: string;
    lastName: string;
  }) => {
    registerMutation.mutate(values);
  };

  return (
    <div className="w-full max-w-[400px] bg-white mx-auto mt-6 rounded-2xl shadow-md p-6">
      <h1 className="text-[32px] font-semibold text-gray-700 text-center mb-6">
        Connect to access your Kitchen
      </h1>

      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
          <FormField
            control={form.control}
            name="username"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Username</FormLabel>
                <FormControl>
                  <Input type="text" placeholder="Enter your name" {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          <FormField
            control={form.control}
            name="email"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Email</FormLabel>
                <FormControl>
                  <Input
                    type="email"
                    placeholder="Enter your email"
                    {...field}
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          <FormField
            control={form.control}
            name="firstName"
            render={({ field }) => (
              <FormItem>
                <FormLabel>First Name</FormLabel>
                <FormControl>
                  <Input
                    type="text"
                    placeholder="Enter your First Name..."
                    {...field}
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          <FormField
            control={form.control}
            name="lastName"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Last Name</FormLabel>
                <FormControl>
                  <Input
                    type="text"
                    placeholder="Enter your Last Name."
                    {...field}
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          <Button
            type="submit"
            className="w-full bg-green-400 text-white py-2"
            disabled={registerMutation.isPending}
          >
            {registerMutation.isPending ? "Connecting..." : "Connect"}
          </Button>
        </form>
      </Form>
    </div>
  );
}
