import { Controller } from "react-hook-form";
import Editor from "./Editor";
import Highlights from "./Highlights";

const ProductDescription = ({ control, errors, setDescription, setShortDescription }) => {
    return (
        <div className="border border-gray-300 rounded bg-white mt-4">
            <p className="p-4 font-semibold text-gray-800 bg-gray-200">Product Description</p>

            <div className="p-4 space-y-4">
                {/* Long Description */}
                <div>
                    <label htmlFor="description" className="block text-sm font-medium text-gray-700 mb-2">
                        Description <span className="text-red-500">*</span>
                    </label>
                    <Controller
                        name="description"
                        control={control}
                        rules={{
                            required: "Description is required",
                        }}
                        render={({ field }) => (
                            <Editor
                                id="description"
                                description={field.value}
                                setDescription={field.onChange}
                            />
                        )}
                    />
                    {errors.description && (
                        <p className="text-red-500 text-sm mt-1">{errors.description.message}</p>
                    )}
                </div>


                <label htmlFor="shortDescription" className="block text-sm font-medium text-gray-700 mb-2">
                    Short Description <span className="text-red-500">*</span>
                </label>
                <Controller
                    name="shortDescription"
                    control={control}
                    rules={{
                        required: "Highlights is required",
                    }}
                    render={({ field }) => (
                        <Highlights
                            id="shortDescription"
                            shortDescription={field.value}
                            setShortDescription={field.onChange}
                        />
                    )}
                />
                {errors.shortDescription && (
                    <p className="text-red-500 text-sm -mt-2 ">{errors.shortDescription.message}</p>
                )}
            </div>

        </div>
    );
};

export default ProductDescription;