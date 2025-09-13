import React, { useCallback } from "react";
import { useForm } from "react-hook-form";
import { Button, Input, RTE, Select } from "..";
import appwriteService from "../../appwriteSdk/config";
import { useNavigate } from "react-router-dom";
import { useSelector } from "react-redux";

export default function PostForm({ post }) {
  const { register, handleSubmit, watch, setValue, control, getValues } = useForm({
    defaultValues: {
      title: post?.title || "",
      slug: post?.$id || "",
      content: post?.content || "",
      status: post?.status || "active",
    },
  });

  const navigate = useNavigate();
  const userData = useSelector((state) => state.auth.userData);

  const submit = async (data) => {
    if (post) {
      const file = data.image[0] ? await appwriteService.uploadFile(data.image[0]) : null;
      if (file) {
        appwriteService.deleteFile(post.featuredImages);
      }
      const dbPost = await appwriteService.updatePost(post.$id, {
        ...data,
        featuredImages: file ? file.$id : undefined,
      });
      if (dbPost) {
        navigate(`/post/${dbPost.$id}`);
      }
    } else {
      const file = await appwriteService.uploadFile(data.image[0]);
      if (file) {
        const fileId = file.$id;
        data.featuredImages = fileId;
        const dbPost = await appwriteService.createPost({ ...data, userId: userData.$id });
        if (dbPost) {
          navigate(`/post/${dbPost.$id}`);
        }
      }
    }
  };

  const slugTransform = useCallback((value) => {
    if (value && typeof value === "string")
      return value
        .trim()
        .toLowerCase()
        .replace(/[^a-zA-Z\d\s]+/g, "-")
        .replace(/\s/g, "-");
    return "";
  }, []);

  React.useEffect(() => {
    const subscription = watch((value, { name }) => {
      if (name === "title") {
        setValue("slug", slugTransform(value.title), { shouldValidate: true });
      }
    });
    return () => subscription.unsubscribe();
  }, [watch, slugTransform, setValue]);

  return (
    <div className="w-full min-h-screen bg-gray-50 px-4 py-6">
      <div className="w-full max-w-7xl mx-auto">
        <form onSubmit={handleSubmit(submit)} className="bg-white rounded-xl shadow-lg p-6">
          {/* Top Section - Title and Featured Image */}
          <div className="grid grid-cols-1 xl:grid-cols-2 gap-8 mb-8">
            
            {/* Left Column - Title and Slug */}
            <div className="space-y-6">
              <div>
                <label className="block text-lg font-semibold text-gray-700 mb-3">
                  Title :
                </label>
                <Input
                  placeholder="Enter your blog title..."
                  className="w-full px-4 py-4 text-lg border-2 border-gray-200 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-all duration-200"
                  {...register("title", { required: true })}
                />
              </div>

              <div>
                <label className="block text-lg font-semibold text-gray-700 mb-3">
                  Slug :
                </label>
                <Input
                  placeholder="url-friendly-slug"
                  className="w-full px-4 py-4 text-lg border-2 border-gray-200 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-all duration-200 bg-gray-50"
                  {...register("slug", { required: true })}
                  onInput={(e) => {
                    setValue("slug", slugTransform(e.currentTarget.value), { shouldValidate: true });
                  }}
                />
              </div>
            </div>

            {/* Right Column - Featured Image and Controls */}
            <div className="space-y-6">
              <div>
                <label className="block text-lg font-semibold text-gray-700 mb-3">
                  Featured Image :
                </label>
                <Input
                  type="file"
                  className="w-full px-4 py-4 text-lg border-2 border-gray-200 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-all duration-200 file:mr-4 file:py-2 file:px-4 file:rounded-lg file:border-0 file:text-sm file:font-medium file:bg-blue-50 file:text-blue-700 hover:file:bg-blue-100"
                  accept="image/png, image/jpg, image/jpeg, image/gif"
                  {...register("image", { required: !post })}
                />
                
                {post && (
                  <div className="mt-4">
                    <img
                      src={appwriteService.getFileView(post.featuredImages)}
                      alt={post.title}
                      className="w-full h-48 object-cover rounded-xl border-2 border-gray-200"
                    />
                  </div>
                )}
              </div>

              {/* Status and Submit Controls */}
              <div className="flex flex-col sm:flex-row gap-4 items-end justify-end">
                <div className="flex items-center gap-3">
                  <label className="text-lg font-semibold text-gray-700 whitespace-nowrap">
                    Status:
                  </label>
                  <Select
                    options={["active", "inactive"]}
                    className="px-4 py-3 text-lg border-2 border-gray-200 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-blue-500 bg-white min-w-[120px]"
                    {...register("status", { required: true })}
                  />
                </div>
                <Button
                  type="submit"
                  className="px-8 py-3 bg-blue-600 text-white text-lg font-semibold rounded-xl hover:bg-blue-700 focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 transition-all duration-200 shadow-lg hover:shadow-xl"
                >
                  Submit
                </Button>
              </div>
            </div>
          </div>

          {/* Content Section - Full Width */}
          <div className="w-full">
            <label className="block text-lg font-semibold text-gray-700 mb-4">
              Content :
            </label>
            <div className="w-full border-2 border-gray-200 rounded-xl overflow-hidden bg-white">
              <RTE
                label=""
                name="content"
                control={control}
                defaultValue={getValues("content")}
              />
            </div>
          </div>
        </form>
      </div>
    </div>
  );
}
