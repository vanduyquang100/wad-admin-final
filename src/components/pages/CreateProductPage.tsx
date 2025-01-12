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
import { useCallback, useRef } from "react";
import { useCreateProduct } from "@/hooks/useCreateProduct";
import { useUploadImageAsync } from "@/hooks";
import { LoaderCircle } from "lucide-react";

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
  otherImages: z.string().array().optional().default([]),
});

export const CreateProductPage = () => {
  const navigate = useNavigate();
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      name: "",
      description: "",
      otherImages: [],
    },
  });

  const fileInputRef = useRef<HTMLInputElement | null>(null);
  const { uploadImageAsync: uploadMainImage, isLoading: isMainUploading } =
    useUploadImageAsync({});
  const { uploadImageAsync: uploadOtherImage, isLoading: isOtherUploading } =
    useUploadImageAsync({});

  const handleOtherImagesUpload = async (files: FileList) => {
    try {
      const uploadPromises = Array.from(files).map(async (file) => {
        const formData = new FormData();
        formData.append("file", file);
        const data = await uploadOtherImage(formData);
        return data.link;
      });

      const imageLinks = await Promise.all(uploadPromises);

      const validLinks = imageLinks.filter((link) => link !== undefined);
      const existingImages = form.getValues().otherImages ?? [];

      form.setValue("otherImages", [...existingImages, ...validLinks], {
        shouldDirty: true,
      });
    } catch (error) {
      console.error("An error occurred during the upload:", error);
    }
  };

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
                    <FormLabel>Image</FormLabel>
                    <div className="flex space-x-2 items-center h-fit">
                      <img
                        src={field.value}
                        alt="Uploaded"
                        className="max-w-20 h-auto"
                      />
                      <input
                        type="file"
                        accept="image/*"
                        className="hidden"
                        ref={fileInputRef}
                        onChange={async (e) => {
                          const file = e.target.files?.[0];
                          if (file) {
                            const formData = new FormData();
                            formData.append("file", file);
                            const { link } = await uploadMainImage(formData);
                            if (link) {
                              form.setValue("imageUrl", link, {
                                shouldDirty: true,
                              });
                            }
                          }
                        }}
                      />
                      <div
                        className="border border-dashed p-4 cursor-pointer min-h-full rounded-lg"
                        onDrop={async (e) => {
                          e.preventDefault();
                          const file = e.dataTransfer.files[0];
                          if (file) {
                            const formData = new FormData();
                            formData.append("file", file);
                            const { link } = await uploadMainImage(formData);
                            if (link) {
                              form.setValue("imageUrl", link, {
                                shouldDirty: true,
                              });
                            }
                          }
                        }}
                        onClick={() => fileInputRef.current?.click()}
                        onDragOver={(e) => e.preventDefault()}
                      >
                        {isMainUploading ? (
                          <div className="flex space-x-2 items-center">
                            <LoaderCircle className="animate-spin" />
                            <p>Uploading...</p>
                          </div>
                        ) : (
                          <p>Drag & drop an image here or click to upload.</p>
                        )}
                      </div>
                    </div>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="otherImages"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Additional Images</FormLabel>
                    <div className="flex flex-wrap gap-4">
                      {field.value.map((url, index) => (
                        <div key={index} className="relative group">
                          <img
                            src={url}
                            alt={`Other image ${index + 1}`}
                            className="w-20 h-20 object-cover rounded-md"
                          />
                          <button
                            type="button"
                            className="absolute top-0 right-0 bg-red-500 text-white text-xs px-2 py-1 rounded-full opacity-0 group-hover:opacity-100"
                            onClick={() => {
                              const updated = [...(field.value ?? [])];
                              updated.splice(index, 1);
                              form.setValue("otherImages", updated, {
                                shouldDirty: true,
                              });
                            }}
                          >
                            &times;
                          </button>
                        </div>
                      ))}
                    </div>
                    {isOtherUploading ? (
                      <LoaderCircle className="animate-spin" />
                    ) : (
                      <input
                        type="file"
                        accept="image/*"
                        multiple
                        onChange={(e) =>
                          handleOtherImagesUpload(e.target.files!)
                        }
                        className="mt-2"
                      />
                    )}
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
