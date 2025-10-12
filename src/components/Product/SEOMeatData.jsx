import { Controller } from "react-hook-form";
import Input from "../Form/Input";

const SEOMeatData = ({ errors, control }) => {
    return (
        <div className="border border-gray-300 rounded bg-white mt-4 pb-3">
            <p className="p-4  font-semibold text-gray-800 bg-gray-200">SEO Meta Data
            </p>

            <div className="px-4 mt-1">
                <Input
                    title="Seo Title"
                    name="seoTitle"
                    control={control}
                    star={true}
                    error={errors.seoTitle}
                    htmlFor="seoTitleInput"
                />
                <label htmlFor="seoContent" className="font-medium mb-2 block">
                    Seo Content <span className="text-red-500">*</span>
                </label>
                <Controller
                    name="seoContent"
                    control={control}
                    rules={{ required: "SEO Content is required" }}
                    render={({ field }) => (
                        <textarea
                            {...field}
                            rows={5}
                            id="seoContent"
                            className="border border-gray-300 rounded w-full p-2 focus:outline-none focus:ring-1 focus:ring-blue-200"
                            placeholder="Enter SEO content..."
                        />
                    )}
                />
                {errors.seoContent && (
                    <p className="text-red-500 text-sm mt-1">{errors.seoContent.message}</p>
                )}
            </div>
        </div>
    );
};

export default SEOMeatData;