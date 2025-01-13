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
import { useUpdateUser, useUserInfoContext } from "@/hooks";
import LoadingPage from "./LoadingPage";
import { Link } from "react-router-dom";
import { ArrowLeftFromLineIcon } from "lucide-react";
import { NAVIGATION_ROUTES } from "@/constants/apis";
import { z } from "zod";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { useEffect } from "react";

const formSchema = z.object({
  name: z.string().optional(),
  email: z.string().email("Not valid email format.").optional(),
  profilePic: z.string().optional(),
});

export const MyInfoPage = () => {
  const { user } = useUserInfoContext();
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      name: "",
      email: "",
      profilePic: "",
    },
  });
  const { mutate } = useUpdateUser();

  const { reset } = form;

  useEffect(() => {
    reset({
      email: user?.email ?? "",
      name: user?.name ?? "",
      profilePic: user?.profilePic ?? "",
    });
  }, [user, reset]);

  function onSubmit(values: z.infer<typeof formSchema>) {
    mutate({
      ...(!!values.name ? { name: values.name } : {}),
      ...(!!values.profilePic ? { profilePic: values.profilePic } : {}),
    });
  }

  function handleReset() {
    reset({
      email: user?.email ?? "",
      name: user?.name ?? "",
      profilePic: user?.profilePic ?? "",
    });
  }

  if (!user) {
    return <LoadingPage />;
  }

  return (
    <BasicLayout className="p-8 w-full">
      <Link to={NAVIGATION_ROUTES.DASHBOARD}>
        <Button variant="secondary">
          <ArrowLeftFromLineIcon />
          <p>Dashboard</p>
        </Button>
      </Link>
      <h1 className="text-center my-4">My Personal Info</h1>
      <div className="flex space-x-4 flex-col justify-center items-center">
        {user.profilePic && (
          <img
            className="w-24 h-24 rounded-full my-2"
            src={user.profilePic}
            alt="profile"
          />
        )}
        <div>
          <p className="text-lg font-bold text-center">{user.name}</p>
          <p className="text-sm text-gray-500 text-center">{user.email}</p>
        </div>
      </div>
      <hr className="my-4" />
      <h4 className="font-semibold my-2">Personal Information</h4>
      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-2">
          <FormField
            control={form.control}
            name="name"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Name</FormLabel>
                <FormControl>
                  <Input
                    className="text-sm"
                    placeholder="Enter your name"
                    {...field}
                  />
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
                  <Input className="text-sm" disabled {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="profilePic"
            render={({ field }) => (
              <FormItem>
                <Input className="text-sm" type="hidden" {...field} />
              </FormItem>
            )}
          />

          <div className="flex justify-center pt-4 space-x-4">
            <Button variant="outline" onClick={handleReset}>
              Cancel
            </Button>
            <Button type="submit" disabled={!form.formState.isDirty}>
              Update
            </Button>
          </div>
        </form>
      </Form>
    </BasicLayout>
  );
};

export default MyInfoPage;
