import React, { useCallback } from "react";
import { useForm } from "react-hook-form";
import RTE from "../RTE";
import Select from "../Select";
import Input from "../Input";
import Service from "../../Appwrite/Config";
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
            const file = data.image[0] ? await Service.uploadFile(data.image[0]) : null;

            if (file) {
                Service.deleteFile(post.featuredImage);
            }

            const dbPost = await Service.updatePost(post.$id, {
                ...data,
                featuredImage: file ? file.$id : undefined,
            });

            if (dbPost) {
                navigate(`/post/${dbPost.$id}`);
            }
        } else {
            const file = await Service.uploadFile(data.image[0]);

            if (file) {
                const fileId = file.$id;
                data.featuredImage = fileId;
                const dbPost = await Service.createPost({ ...data, userId: userData.$id });

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
        <form onSubmit={handleSubmit(submit)} className="flex flex-wrap gap-8 group animate-fade-in">
            <div className="w-full lg:w-2/3 glass-card p-8 md:p-10">
                <Input
                    label="Title"
                    placeholder="Enter post title"
                    className="mb-6 font-semibold"
                    {...register("title", { required: true })}
                />
                <Input
                    label="Slug"
                    placeholder="post-slug"
                    className="mb-6 font-mono text-xs opacity-60"
                    {...register("slug", { required: true })}
                    onInput={(e) => {
                        setValue("slug", slugTransform(e.currentTarget.value), { shouldValidate: true });
                    }}
                />
                <RTE label="Content" name="content" control={control} defaultValue={getValues("content")} />
            </div>
            <div className="w-full lg:w-[calc(33.33%-2rem)]">
                <div className="glass-card p-8 sticky top-24">
                    <Input
                        label="Featured Image"
                        type="file"
                        className="mb-6"
                        accept="image/png, image/jpg, image/jpeg, image/gif"
                        {...register("image", { required: !post })}
                    />
                    {post && (
                        <div className="w-full mb-6 relative group/img overflow-hidden rounded-xl border border-white/10">
                            <img
                                src={Service.getFilePreview(post.featuredImage)}
                                alt={post.title}
                                className="w-full h-auto object-cover opacity-80"
                            />
                            <div className="absolute inset-0 bg-slate-900/40 flex items-center justify-center opacity-0 group-hover/img:opacity-100 transition-opacity">
                                <span className="text-[10px] font-bold uppercase tracking-[0.2em]">Current Image</span>
                            </div>
                        </div>
                    )}
                    <Select
                        options={["active", "inactive"]}
                        label="Publish Status"
                        className="mb-8"
                        {...register("status", { required: true })}
                    />
                    <button type="submit" className="btn-primary w-full py-3.5 text-sm uppercase tracking-widest font-black">
                        {post ? "Update" : "Publish"}
                    </button>
                    
                    <p className="mt-6 text-[9px] text-center text-slate-500 uppercase tracking-widest font-black">
                        Powered by Appwrite Storage
                    </p>
                </div>
            </div>
        </form>
    );
}