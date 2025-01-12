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
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectLabel,
  SelectTrigger,
  SelectValue,
  Textarea,
} from "@/components/ui";
import { useNavigate, useParams } from "react-router-dom";
import { NAVIGATION_ROUTES } from "@/constants/apis";
import { useCallback, useEffect, useRef } from "react";
import {
  useUpdateProduct,
  useProductDetail,
  useUploadImageAsync,
} from "@/hooks";
import { useUploadImage } from "@/hooks/useUploadImage";
import { ProductStatus } from "@/constants/enums/product";
import { LoaderCircle } from "lucide-react";

const statusRender: Record<ProductStatus, string> = {
  [ProductStatus.ON_STOCK]: "On stock",
  [ProductStatus.OUT_OF_STOCK]: "Out of stock",
  [ProductStatus.SUSPENDED]: "Suspended",
  [ProductStatus.UPCOMING]: "Upcoming",
};

const formSchema = z.object({
  name: z.string().optional(),
  description: z.string().optional(),
  detailDescription: z.string().optional(),
  category: z.string().optional(),
  status: z.string().optional(),
  stock: z
    .string()
    .refine((val) => !Number.isNaN(parseInt(val, 10)), {
      message: "Expected number, received a string",
    })
    .optional(),
  price: z
    .string()
    .refine((val) => !Number.isNaN(parseInt(val, 10)), {
      message: "Expected number, received a string",
    })
    .optional(),
  promotePrice: z
    .string()
    .refine((val) => !Number.isNaN(parseInt(val, 10)), {
      message: "Expected number, received a string",
    })
    .optional(),
  imageUrl: z.string().url("Invalid Image URL").optional(),
  otherImages: z.string().array().optional().default([]),
});

export const UpdateProductPage = () => {
  const navigate = useNavigate();
  const { id = "" } = useParams();
  const { data } = useProductDetail({ id });
  const fileInputRef = useRef<HTMLInputElement | null>(null);
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      name: "",
      description: "",
      otherImages: [],
    },
  });

  const { reset, formState } = form;

  useEffect(() => {
    if (data) {
      reset({
        name: data.name,
        description: data.description,
        detailDescription: data.detailDescription,
        category: data.category,
        stock: data.stock.toString(),
        price: data.price.toString(),
        status: data.status,
        promotePrice: data.promotePrice?.toString(),
        imageUrl: data.imageUrl,
        otherImages: data.otherImages,
      });
    }
  }, [data, reset]);

  const { mutate } = useUpdateProduct({
    successCallBackFn: () => {
      navigate(NAVIGATION_ROUTES.PRODUCTS);
    },
    errorCallbackFn: (message) => {
      form.setError("root", {
        message: message,
      });
    },
  });

  const { mutate: uploadImage, isLoading: isUploading } = useUploadImage({
    successCallBackFn: (data) => {
      form.setValue("imageUrl", data.link, { shouldDirty: true });
    },
    errorCallbackFn: (message) => {
      console.error("Upload failed:", message);
    },
  });

  const { uploadImageAsync: uploadOtherImage, isLoading: isOtherUploading } =
    useUploadImageAsync({});

  const handleCancel = useCallback(() => {
    navigate(NAVIGATION_ROUTES.PRODUCTS);
  }, [navigate]);

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

  // Submit handler
  function onSubmit(values: z.infer<typeof formSchema>) {
    mutate({
      id,
      ...values,
      stock: values.stock ? parseInt(values.stock) : undefined,
      price: values.price ? parseInt(values.price) : undefined,
    });
  }

  return (
    <BasicLayout className="p-8 w-full">
      <div className="justify-between items-center mb-8">
        <h1 className="text-left">Update Product</h1>
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
                name="status"
                render={({ field }) => (
                  <FormItem className="w-full">
                    <FormLabel>Status</FormLabel>
                    <FormControl>
                      <Select
                        value={field.value}
                        onValueChange={field.onChange}
                      >
                        <SelectTrigger className="w-[180px]">
                          <SelectValue placeholder="Select a status" />
                        </SelectTrigger>
                        <SelectContent ref={field.ref}>
                          <SelectGroup>
                            <SelectLabel>Status</SelectLabel>
                            {Object.entries(statusRender).map(
                              ([key, value]) => (
                                <SelectItem key={key} value={key}>
                                  {value}
                                </SelectItem>
                              )
                            )}
                          </SelectGroup>
                        </SelectContent>
                      </Select>
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
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
                        onChange={(e) => {
                          const file = e.target.files?.[0];
                          if (file) {
                            const formData = new FormData();
                            formData.append("file", file);
                            uploadImage(formData);
                          }
                        }}
                      />
                      <div
                        className="border border-dashed p-4 cursor-pointer min-h-full rounded-lg"
                        onDrop={(e) => {
                          e.preventDefault();
                          const file = e.dataTransfer.files[0];
                          if (file) {
                            const formData = new FormData();
                            formData.append("file", file);
                            uploadImage(formData);
                          }
                        }}
                        onClick={() => fileInputRef.current?.click()}
                        onDragOver={(e) => e.preventDefault()}
                      >
                        {isUploading ? (
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
                        content="Add additional images"
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
              <div className="flex justify-left pt-4 space-x-4">
                <Button variant="outline" onClick={handleCancel}>
                  Cancel
                </Button>
                <Button type="submit" disabled={!formState.isDirty}>
                  Update
                </Button>
              </div>
            </form>
          </Form>
        </div>
      </div>
    </BasicLayout>
  );
};

export default UpdateProductPage;
