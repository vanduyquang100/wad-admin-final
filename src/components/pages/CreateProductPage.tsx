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
  Textarea,
} from "@/components/ui";
import { useNavigate } from "react-router-dom";
import { NAVIGATION_ROUTES } from "@/constants/apis";
import { useCallback } from "react";
import { useCreateProduct } from "@/hooks/useCreateProduct";

const formSchema = z.object({
  name: z.string(),
  description: z.string(),
  detailDescription: z.string(),
  category: z.string(),
  stock: z.string().refine((val) => !Number.isNaN(parseInt(val, 10)), {
    message: "Expected number, received a string",
  }),
  price: z.string().refine((val) => !Number.isNaN(parseInt(val, 10)), {
    message: "Expected number, received a string",
  }),
  promotePrice: z.string().refine((val) => !Number.isNaN(parseInt(val, 10)), {
    message: "Expected number, received a string",
  }),
  imageUrl: z.string().url("Invalid Image URL"),
  productImages: z.string().array().optional(),
});

export const CreateProductPage = () => {
  const navigate = useNavigate();
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      name: "",
      description: "",
    },
  });

  const { mutate } = useCreateProduct({
    successCallBackFn: () => {
      navigate(NAVIGATION_ROUTES.PRODUCTS);
    },
    errorCallbackFn: (message) => {
      form.setError("root", {
        message: message,
      });
    },
  });

  const handleCancel = useCallback(() => {
    navigate(NAVIGATION_ROUTES.PRODUCTS);
  }, [navigate]);

  // 2. Define a submit handler.
  function onSubmit(values: z.infer<typeof formSchema>) {
    mutate({
      ...values,
      stock: parseInt(values.stock),
      price: parseInt(values.price),
    });
  }

  return (
    <BasicLayout className="p-8 w-full">
      <div className="justify-between items-center mb-8">
        <h1 className="text-left">Create New Product</h1>
        <div>
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
                        placeholder="Enter the product name"
                        {...field}
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="description"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Description</FormLabel>
                    <FormControl>
                      <Textarea
                        className="text-sm"
                        placeholder="Enter the description"
                        {...field}
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="detailDescription"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Detail Description</FormLabel>
                    <FormControl>
                      <Textarea
                        className="text-sm"
                        placeholder="Enter the detail description"
                        {...field}
                      />
                    </FormControl>
                  </FormItem>
                )}
              />
              <div className="flex space-x-4 ">
                <FormField
                  control={form.control}
                  name="category"
                  render={({ field }) => (
                    <FormItem className="w-full">
                      <FormLabel>Category</FormLabel>
                      <FormControl>
                        <Input
                          className="text-sm"
                          placeholder="Enter the product's category"
                          {...field}
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                <FormField
                  control={form.control}
                  name="stock"
                  render={({ field }) => (
                    <FormItem className="w-full">
                      <FormLabel>Default Stock</FormLabel>
                      <FormControl>
                        <Input
                          type="number"
                          min={0}
                          step={1}
                          className="text-sm"
                          placeholder="Enter the product's current stock"
                          {...field}
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
              </div>
              <div className="flex space-x-4 ">
                <FormField
                  control={form.control}
                  name="price"
                  render={({ field }) => (
                    <FormItem className="w-full">
                      <FormLabel>Price</FormLabel>
                      <FormControl>
                        <Input
                          type="number"
                          min={0}
                          step={1}
                          className="text-sm"
                          placeholder="Enter the product's price"
                          {...field}
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                <FormField
                  control={form.control}
                  name="promotePrice"
                  render={({ field }) => (
                    <FormItem className="w-full">
                      <FormLabel>Promote Price</FormLabel>
                      <FormControl>
                        <Input
                          type="number"
                          min={0}
                          step={1}
                          className="text-sm"
                          placeholder="Enter the product's promote price"
                          {...field}
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
              </div>
              <FormField
                control={form.control}
                name="imageUrl"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Image URL</FormLabel>
                    <FormControl>
                      <Input
                        className="text-sm"
                        placeholder="Enter the image URL"
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
              <div className="flex justify-left pt-4 space-x-4">
                <Button variant="outline" onClick={handleCancel}>
                  Cancel
                </Button>
                <Button type="submit">Create</Button>
              </div>
            </form>
          </Form>
        </div>
      </div>
    </BasicLayout>
  );
};

export default CreateProductPage;
