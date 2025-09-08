import { useState } from "react";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import { Controller, useForm } from "react-hook-form";
import toast from "react-hot-toast";
import { FaTrashAlt } from "react-icons/fa";
import { useCreateBannerMutation } from "../../features/banner/bannerApi";
import Field from "../Form/Field";
import FieldSet from "../Form/FieldSet";
import Loading from "../Loading";

export default function BannerForm() {
  const {
    register,
    handleSubmit,
    reset,
    setValue,
    control,
    formState: { errors },
  } = useForm();

  const [preview, setPreview] = useState(null);
  const [createBanner, { isLoading }] = useCreateBannerMutation();

  // Submit handler
  const onSubmit = async (data) => {
    const formData = new FormData();

    // সব fields আগে append করুন
    formData.append("bannerType", data.bannerType);
    formData.append("targetUrl", data.targetUrl);
    formData.append("startDate", data.startDate?.toISOString() || "");
    formData.append("endDate", data.endDate?.toISOString() || "");
    formData.append("priority", data.priority || "0");
    formData.append("isActive", data.isActive || "false");

    // File append করুন
    if (data.bannerImage && data.bannerImage.length > 0) {
      formData.append("bannerImage", data.bannerImage[0]);
    }

    // Debug: সঠিকভাবে FormData contents দেখার জন্য

    for (let [key, value] of formData.entries()) {
      if (value instanceof File) {
        console.log(key, "File:", value.name, value.type, value.size);
      } else {
        console.log(key, value);
      }
    }

    try {
      const result = await createBanner(formData).unwrap();
      toast.success(result?.message || "Banner created successfully");
      reset();
      setPreview(null);
    } catch (err) {
      toast.error(err?.data?.message || "Something went wrong");
    }
  };

  return (
    <form
      onSubmit={handleSubmit(onSubmit)}
      className="grid grid-cols-1 md:grid-cols-2 gap-6"
    >
      {/* Left Section */}
      <div className="flex flex-col gap-4">
        <FieldSet>
          <label className="block font-medium mb-1">
            Banner type <span className="text-red-500">*</span>
          </label>
          <select
            {...register("bannerType", { required: "Banner type is required" })}
            className="w-full border rounded-md px-3 py-2"
          >
            <option value="">--select option--</option>
            <option value="main">Main Banner</option>
            <option value="side">Side Banner</option>
          </select>
          {errors.bannerType && (
            <p className="text-red-500 text-sm">{errors.bannerType.message}</p>
          )}

          <Field label="Target URL" htmlFor="TargetURL" error={errors.targetUrl} required>
            <input
              type="url"
              {...register("targetUrl", {
                required: "Target URL is required",
                validate: (value) => {
                  try {
                    new URL(value);
                    return true;
                  } catch {
                    return "Enter a valid URL";
                  }
                },
              })}
              placeholder="Enter url"
              className="w-full border rounded-md px-3 py-2"
            />
          </Field>

          <Field label="Start Date" htmlFor="startDate" error={errors.startDate} required>
            <Controller
              name="startDate"
              control={control}
              rules={{ required: "Please select a start date" }}
              render={({ field }) => {
                const now = new Date();
                return (
                  <DatePicker
                    {...field}
                    selected={field.value}
                    showTimeSelect
                    placeholderText="Select start date"
                    onChange={(date) => field.onChange(date)}
                    className="w-full border rounded-md px-3 py-2"
                    dateFormat="dd, MMM, yyyy h:mm aa"
                    minDate={now} 
                  />
                );
              }}
            />
          </Field>

          <Field label="End Date" htmlFor="endDate" error={errors.endDate}>
            <Controller
              name="endDate"
              control={control}
              render={({ field }) => (
                <DatePicker
                  {...field}
                  selected={field.value}
                  showTimeSelect
                  placeholderText="Select end date"
                  onChange={(date) => field.onChange(date)}
                  className="w-full border rounded-md px-3 py-2"
                  dateFormat="dd, MMM, yyyy h:mm aa"
                />
              )}
            />
          </Field>

          <div className="flex gap-4">
            <Field label="Priority" htmlFor="priority" error={errors.priority} required>
              <input
                type="number"
                {...register("priority", {
                  required: "Priority is required",
                  min: { value: 1, message: "Priority must be at least 1" },
                })}
                className="w-full border rounded-md px-3 py-2"
                onWheel={(e) => e.currentTarget.blur()}
              />
            </Field>
            <Field label="Is Active" htmlFor="isActive" error={errors.isActive} required>
              <select
                {...register("isActive", { required: "Is Active is required" })}
                className="w-full border rounded-md px-3 py-2"
              >
                <option value="">--select option--</option>
                <option value="true">Yes</option>
                <option value="false">No</option>
              </select>
            </Field>
          </div>
        </FieldSet>
      </div>

      {/* Right Section → File Upload */}
      <div className="flex flex-col gap-4 bg-gray-100/50 p-3 rounded-md">
        <div className="text-center">
          <label className="block font-semibold mb-1">
            Banner image <span className="text-red-500">*</span>
          </label>
          <p className="font-bold text-sm text-blue-800">(Ratio 2:1)</p>
        </div>

        {!preview ? (
          <label
            htmlFor="bannerImage"
            className="border-2 border-dashed cursor-pointer p-6 rounded-md flex flex-col items-center"
          >
            <input
              id="bannerImage"
              type="file"
              accept="image/*"
              className="hidden"
              {...register("bannerImage", {
                required: "Image is required",
                onChange: (e) => {
                  const file = e.target.files?.[0];
                  if (file) {
                    setPreview(URL.createObjectURL(file));
                  }
                },
                validate: {
                  fileType: (fileList) => {
                    const file = fileList?.[0];
                    if (!file) return "Image is required";
                    const allowed = ["image/jpeg", "image/jpg", "image/png", "image/webp"];
                    return allowed.includes(file.type) || "Only jpg, jpeg, png, webp allowed";
                  },
                  fileSize: (fileList) => {
                    const file = fileList?.[0];
                    return (file && file.size <= 1024 * 1024) || "File size must be < 1MB";
                  },
                },
              })}
            />
            <span className="text-gray-500">
              Click to upload or drag & drop
            </span>
          </label>
        ) : (
          <div className="relative">
            <img src={preview} alt="Preview" className="max-h-52 rounded-md w-full" />
            <button
              type="button"
              onClick={() => {
                setPreview(null);
                setValue("bannerImage", null);
                // File input clear করুন
                const fileInput = document.getElementById("bannerImage");
                if (fileInput) fileInput.value = "";
              }}
              className="absolute top-2 right-2 bg-white p-2 rounded-full shadow"
            >
              <FaTrashAlt className="text-red-500" />
            </button>
          </div>
        )}

        {errors.bannerImage && (
          <p className="text-red-500 text-sm text-center">
            {errors.bannerImage.message}
          </p>
        )}

        <p className="text-sm text-gray-500 text-center">
          Only webp, jpg, jpeg, png allowed, max size 1 MB, ratio 2:1
        </p>
      </div>

      {/* Buttons */}
      <div className="flex justify-end gap-3 col-span-2 mt-4">
        <button
          type="button"
          onClick={() => {
            reset();
            setPreview(null);
            const fileInput = document.getElementById("bannerImage");
            if (fileInput) fileInput.value = "";
          }}
          className="px-5 py-2 border rounded-md text-gray-700 hover:bg-gray-100"
        >
          Reset
        </button>
        <button
          type="submit"
          disabled={isLoading}
          className="px-5 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700"
        >
          {isLoading ? <Loading text={"Uploading"} /> : "Upload"}
        </button>
      </div>
    </form>
  );
}