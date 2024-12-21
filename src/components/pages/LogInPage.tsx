import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import {
  BasicLayout,
  Button,
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
  Input,
} from "@/components/ui";
import { useLogin } from "@/hooks";
import { useNavigate } from "react-router-dom";
import { NAVIGATION_ROUTES } from "@/constants/apis";

const formSchema = z.object({
  email: z.string().email(),
  password: z.string().min(4),
});

export const LogInPage = () => {
  const navigate = useNavigate();
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      email: "",
      password: "",
    },
  });

  const { mutate } = useLogin({
    successCallBackFn: () => {
      navigate(NAVIGATION_ROUTES.DASHBOARD);
    },
    errorCallbackFn: (message) => {
      form.setError("root", {
        message: message,
      });
    },
  });

  // 2. Define a submit handler.
  function onSubmit(values: z.infer<typeof formSchema>) {
    mutate(values);
  }

  return (
    <BasicLayout>
      <div className="mx-auto p-8 w-fit h-full flex flex-col justify-center">
        <h1 className="text-center">Walenciaga Admin</h1>
        <div className="p-8 m-4 rounded-lg shadow-lg min-w-96">
          <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-2">
              <FormField
                control={form.control}
                name="email"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Email</FormLabel>
                    <FormControl>
                      <Input
                        className="text-sm"
                        placeholder="Enter your admin email"
                        {...field}
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="password"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Password</FormLabel>
                    <FormControl>
                      <Input
                        type="password"
                        className="text-sm"
                        placeholder="Enter your password"
                        {...field}
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              {!!form.formState.errors.root && (
                <p className="text-red-500 text-sm text-center">
                  {form.formState.errors.root.message}
                </p>
              )}
              <div className="flex justify-center pt-4">
                <Button type="submit">Sign In</Button>
              </div>
            </form>
          </Form>
        </div>
      </div>
    </BasicLayout>
  );
};

export default LogInPage;
