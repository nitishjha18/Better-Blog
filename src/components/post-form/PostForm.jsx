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
    try {
        // Check if user is logged in for creating posts
        if (!post && (!userData || !userData.$id)) {
            alert("You must be logged in to create a post.");
            return;
        }

        if (post) {
            // Editing an existing post
            let fileId = post.featuredImages;
            
            // If a new image is selected, upload it and delete the old one
            if (data.image && data.image[0]) {
                const file = await appwriteService.uploadFile(data.image[0]);
                if (file) {
                    fileId = file.$id;
                    // Delete old image if it exists
                    if (post.featuredImages) {
                        await appwriteService.deleteFile(post.featuredImages);
                    }
                }
            }
            
            const dbPost = await appwriteService.updatePost(post.$id, {
                ...data,
                featuredImages: fileId || "",
            });
            
            if (!dbPost || !dbPost.$id) {
                console.error("Update failed - no document returned");
                alert("Failed to update post. Please try again.");
                return;
            }
            
            navigate(`/post/${dbPost.$id}`);
            
        } else {
            // Creating a new post
            let fileId = null;
            
            // Handle image upload for new posts
            if (data.image && data.image[0]) {
                const file = await appwriteService.uploadFile(data.image[0]);
                if (file) {
                    fileId = file.$id;
                }
            }
            
            // Create post with all required fields
            const dbPost = await appwriteService.createPost({ 
                title: data.title,
                slug: data.slug,
                content: data.content,
                status: data.status,
                featuredImages: fileId || "",
                userId: userData.$id 
            });

            if (!dbPost || !dbPost.$id) {
                console.error("Create failed - no document returned");
                alert("Failed to create post. Please try again.");
                return;
            }

            navigate(`/post/${dbPost.$id}`);
        }
    } catch (error) {
        console.error("Submit error:", error);
        alert("Something went wrong. Please try again.");
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
        <form onSubmit={handleSubmit(submit)} className="flex flex-wrap">
            <div className="w-2/3 px-2">
                <Input
                    label="Title :"
                    placeholder="Title"
                    className="mb-4"
                    {...register("title", { required: true })}
                />
                <Input
                    label="Slug :"
                    placeholder="Slug"
                    className="mb-4"
                    {...register("slug", { required: true })}
                    onInput={(e) => {
                        setValue("slug", slugTransform(e.currentTarget.value), { shouldValidate: true });
                    }}
                />
                <RTE label="Content :" name="content" control={control} defaultValue={getValues("content")} />
            </div>
            <div className="w-1/3 px-2">
                <Input
                    label="Featured Image :"
                    type="file"
                    className="mb-4"
                    accept="image/png, image/jpg, image/jpeg, image/gif"
                    {...register("image", { required: !post })}
                />
                {post && (
                    <div className="w-full mb-4">
                        <img
                            src={appwriteService.getFileView(post.featuredImages)}
                            alt={post.title}
                            className="rounded-lg"
                        />
                    </div>
                )}
                <Select
                    options={["active", "inactive"]}
                    label="Status"
                    className="mb-4"
                    {...register("status", { required: true })}
                />
                <Button type="submit" bgColor={post ? "bg-green-500" : undefined} className="w-full">
                    {post ? "Update" : "Submit"}
                </Button>
            </div>
        </form>
    );
}
