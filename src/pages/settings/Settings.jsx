import { useEffect, useMemo, useState } from "react";
import toast from "react-hot-toast";
import {
  FiCalendar,
  FiCreditCard,
  FiHash,
  FiLink,
  FiLock,
  FiMail,
  FiMapPin,
  FiPhone,
  FiSave,
  FiUpload,
  FiUser,
} from "react-icons/fi";
import { useDispatch, useSelector } from "react-redux";
import {
  useGetUserQuery,
  useUpdateSellerProfileMutation,
} from "../../features/auth/authApi";
import { setCredentials } from "../../features/auth/authSlice";
import Loading from "../../components/Loading";

const initialForm = {
  name: "",
  shopName: "",
  mobileNumber: "",
  shopLocation: "",
  holidayMode: false,
  holidayStartDate: "",
  holidayEndDate: "",
  nationalIdentityCardNo: "",
  bankAccountName: "",
  bankAccountNumber: "",
  bankNameOrMfs: "",
  bankRoutingNumber: "",
  bankBranchName: "",
};

const getShopLogo = (profile) =>
  profile?.shopLogo && profile.shopLogo !== profile.profileImageUrl
    ? profile.shopLogo
    : "";

const formatDateInput = (value) => {
  if (!value) return "";

  const date = new Date(value);
  if (Number.isNaN(date.getTime())) return "";

  return date.toISOString().slice(0, 10);
};

const createShopSlug = (value) =>
  value
    .toLowerCase()
    .trim()
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/^-+|-+$/g, "");

const isImageSource = (value) =>
  Boolean(value) &&
  (value.startsWith("data:image/") ||
    /\.(png|jpe?g|webp|gif|avif)(\?.*)?$/i.test(value));

const validateFile = (file, { imageOnly = false, label }) => {
  if (imageOnly && !file.type.startsWith("image/")) {
    toast.error(`${label} must be an image file`);
    return false;
  }

  if (!imageOnly && !file.type.startsWith("image/") && file.type !== "application/pdf") {
    toast.error(`${label} must be an image or PDF file`);
    return false;
  }

  if (file.size > 5 * 1024 * 1024) {
    toast.error(`${label} must be 5 MB or smaller`);
    return false;
  }

  return true;
};

const FieldLabel = ({ htmlFor, children, required = false }) => (
  <label htmlFor={htmlFor} className="mb-2 block text-sm font-medium text-gray-700">
    {children} {required && <span className="text-red-500">*</span>}
  </label>
);

const Settings = () => {
  const dispatch = useDispatch();
  const storedUser = useSelector((state) => state.auth.user);
  const {
    data,
    isLoading: isProfileLoading,
    isError: isProfileError,
    error: profileError,
  } = useGetUserQuery();
  const [updateSellerProfile, { isLoading: isUpdating }] =
    useUpdateSellerProfileMutation();
  const [formData, setFormData] = useState(initialForm);
  const [logoFile, setLogoFile] = useState(null);
  const [logoPreview, setLogoPreview] = useState("");
  const [idCopyFrontFile, setIdCopyFrontFile] = useState(null);
  const [idCopyBackFile, setIdCopyBackFile] = useState(null);
  const [idCopyFrontPreview, setIdCopyFrontPreview] = useState("");
  const [idCopyBackPreview, setIdCopyBackPreview] = useState("");

  const profile = data?.user || storedUser;
  const shopUrlPreview = useMemo(
    () => createShopSlug(formData.shopName) || profile?.shopUrl || "",
    [formData.shopName, profile?.shopUrl]
  );

  useEffect(() => {
    if (!profile) return;

    setFormData({
      name: profile.name || "",
      shopName: profile.shopName || "",
      mobileNumber: profile.mobileNumber || "",
      shopLocation: profile.shopLocation || "",
      holidayMode: Boolean(profile.holidayMode),
      holidayStartDate: formatDateInput(profile.holidayStartDate),
      holidayEndDate: formatDateInput(profile.holidayEndDate),
      nationalIdentityCardNo: profile.nationalIdentityCardNo || "",
      bankAccountName: profile.bankAccountName || "",
      bankAccountNumber: profile.bankAccountNumber || "",
      bankNameOrMfs: profile.bankNameOrMfs || "",
      bankRoutingNumber: profile.bankRoutingNumber || "",
      bankBranchName: profile.bankBranchName || "",
    });
    setLogoPreview(getShopLogo(profile));
    setIdCopyFrontPreview(profile.idCopyFrontUrl || "");
    setIdCopyBackPreview(profile.idCopyBackUrl || "");

    if (data?.user) {
      dispatch(setCredentials({ user: data.user }));
    }
  }, [data?.user, dispatch, profile]);

  const handleChange = (event) => {
    const { checked, name, type, value } = event.target;
    setFormData((current) => ({
      ...current,
      [name]: type === "checkbox" ? checked : value,
    }));
  };

  const setImagePreview = (file, setter) => {
    if (!file.type.startsWith("image/")) {
      setter("");
      return;
    }

    const reader = new FileReader();
    reader.onload = () => setter(reader.result);
    reader.readAsDataURL(file);
  };

  const handleLogoChange = (event) => {
    const file = event.target.files?.[0];
    if (!file) return;

    if (!validateFile(file, { imageOnly: true, label: "Shop logo" })) {
      event.target.value = "";
      return;
    }

    setLogoFile(file);
    setImagePreview(file, setLogoPreview);
  };

  const handleIdCopyChange = (event, side) => {
    const file = event.target.files?.[0];
    if (!file) return;

    const label = side === "front" ? "Front side ID copy" : "Back side ID copy";
    if (!validateFile(file, { label })) {
      event.target.value = "";
      return;
    }

    if (side === "front") {
      setIdCopyFrontFile(file);
      setImagePreview(file, setIdCopyFrontPreview);
      return;
    }

    setIdCopyBackFile(file);
    setImagePreview(file, setIdCopyBackPreview);
  };

  const handleSubmit = async (event) => {
    event.preventDefault();

    const trimmedData = {
      ...formData,
      name: formData.name.trim(),
      shopName: formData.shopName.trim(),
      mobileNumber: formData.mobileNumber.trim(),
      shopLocation: formData.shopLocation.trim(),
      nationalIdentityCardNo: formData.nationalIdentityCardNo.trim(),
      bankAccountName: formData.bankAccountName.trim(),
      bankAccountNumber: formData.bankAccountNumber.trim(),
      bankNameOrMfs: formData.bankNameOrMfs.trim(),
      bankRoutingNumber: formData.bankRoutingNumber.trim(),
      bankBranchName: formData.bankBranchName.trim(),
    };

    if (
      !trimmedData.name ||
      !trimmedData.shopName ||
      !trimmedData.mobileNumber ||
      !trimmedData.shopLocation
    ) {
      toast.error("Please fill in seller name, shop name, phone number and address");
      return;
    }

    if (!/^[+0-9][0-9\s-]{6,19}$/.test(trimmedData.mobileNumber)) {
      toast.error("Please enter a valid phone number");
      return;
    }

    if (
      trimmedData.holidayMode &&
      (!trimmedData.holidayStartDate || !trimmedData.holidayEndDate)
    ) {
      toast.error("Please select the holiday mode period");
      return;
    }

    if (
      trimmedData.holidayMode &&
      trimmedData.holidayStartDate > trimmedData.holidayEndDate
    ) {
      toast.error("Holiday end date cannot be before start date");
      return;
    }

    const payload = new FormData();
    Object.entries(trimmedData).forEach(([key, value]) => {
      payload.append(key, key === "holidayMode" ? String(value) : value || "");
    });
    if (logoFile) payload.append("shopLogo", logoFile);
    if (idCopyFrontFile) payload.append("idCopyFront", idCopyFrontFile);
    if (idCopyBackFile) payload.append("idCopyBack", idCopyBackFile);

    try {
      const response = await updateSellerProfile(payload).unwrap();
      dispatch(setCredentials({ user: response.user }));
      setLogoFile(null);
      setIdCopyFrontFile(null);
      setIdCopyBackFile(null);
      setLogoPreview(getShopLogo(response.user));
      setIdCopyFrontPreview(response.user.idCopyFrontUrl || "");
      setIdCopyBackPreview(response.user.idCopyBackUrl || "");
      toast.success(response.message || "Profile updated successfully");
    } catch (error) {
      toast.error(error?.data?.message || "Unable to update profile");
    }
  };

  if (isProfileLoading && !profile) {
    return (
      <div className="flex min-h-80 items-center justify-center">
        <Loading text="Loading profile..." />
      </div>
    );
  }

  return (
    <div className="mx-auto w-full max-w-5xl p-4 md:p-6">
      <div className="mb-6">
        <h1 className="text-2xl font-semibold text-gray-900 md:text-3xl">
          Seller Settings
        </h1>
        <p className="mt-1 text-sm text-gray-500">
          Manage the shop information customers see.
        </p>
      </div>

      {isProfileError && (
        <div className="mb-4 rounded-md border border-red-200 bg-red-50 px-4 py-3 text-sm text-red-700">
          {profileError?.data?.message ||
            "Unable to refresh profile information. Please sign in again."}
        </div>
      )}

      <form
        onSubmit={handleSubmit}
        className="overflow-hidden rounded-xl border border-gray-200 bg-white shadow-sm"
      >
        <section className="border-b border-gray-200 p-5 md:p-7">
          <h2 className="text-lg font-semibold text-gray-900">Shop Logo</h2>
          <div className="mt-4 flex flex-col gap-4 sm:flex-row sm:items-center">
            <div className="flex h-24 w-24 shrink-0 items-center justify-center overflow-hidden rounded-xl border border-dashed border-gray-300 bg-gray-50">
              {logoPreview ? (
                <img
                  src={logoPreview}
                  alt="Shop logo preview"
                  className="h-full w-full object-cover"
                />
              ) : null}
            </div>
            <div>
              <label
                htmlFor="shopLogo"
                className="inline-flex cursor-pointer items-center gap-2 rounded-md border border-gray-300 bg-white px-4 py-2 text-sm font-medium text-gray-700 hover:bg-gray-50"
              >
                <FiUpload /> Choose Logo
              </label>
              <input
                id="shopLogo"
                type="file"
                accept="image/*"
                onChange={handleLogoChange}
                className="sr-only"
              />
              <p className="mt-2 text-xs text-gray-500">
                PNG, JPG or WebP. Maximum size 5 MB.
              </p>
            </div>
          </div>
        </section>

        <section className="border-b border-gray-200 p-5 md:p-7">
          <h2 className="text-lg font-semibold text-gray-900">Seller Profile</h2>
          <div className="mt-5 grid gap-5 md:grid-cols-2">
            <div>
              <FieldLabel htmlFor="sellerId">ID Seller</FieldLabel>
              <div className="relative">
                <FiLock className="absolute left-3 top-3 text-gray-400" />
                <input
                  id="sellerId"
                  value={profile?.sellerId ?? "N/A"}
                  readOnly
                  className="w-full cursor-not-allowed rounded-md border border-gray-200 bg-gray-100 py-2.5 pl-10 pr-3 text-gray-600 outline-none"
                />
              </div>
            </div>

            <div>
              <FieldLabel htmlFor="shopUrl">Shop URL</FieldLabel>
              <div className="relative">
                <FiLink className="absolute left-3 top-3 text-gray-400" />
                <input
                  id="shopUrl"
                  value={shopUrlPreview}
                  readOnly
                  className="w-full cursor-not-allowed rounded-md border border-gray-200 bg-gray-100 py-2.5 pl-10 pr-3 text-gray-600 outline-none"
                />
              </div>
            </div>

            <div>
              <FieldLabel htmlFor="name" required>
                Seller Name
              </FieldLabel>
              <div className="relative">
                <FiUser className="absolute left-3 top-3 text-gray-400" />
                <input
                  id="name"
                  name="name"
                  value={formData.name}
                  onChange={handleChange}
                  placeholder="Enter seller name"
                  className="w-full rounded-md border border-gray-300 py-2.5 pl-10 pr-3 outline-none focus:border-blue-500 focus:ring-2 focus:ring-blue-100"
                />
              </div>
            </div>

            <div>
              <FieldLabel htmlFor="email">Contact Email</FieldLabel>
              <div className="relative">
                <FiMail className="absolute left-3 top-3 text-gray-400" />
                <input
                  id="email"
                  type="email"
                  value={profile?.email || ""}
                  readOnly
                  className="w-full cursor-not-allowed rounded-md border border-gray-200 bg-gray-100 py-2.5 pl-10 pr-3 text-gray-600 outline-none"
                />
              </div>
            </div>

            <div>
              <FieldLabel htmlFor="mobileNumber" required>
                Phone Number
              </FieldLabel>
              <div className="relative">
                <FiPhone className="absolute left-3 top-3 text-gray-400" />
                <input
                  id="mobileNumber"
                  name="mobileNumber"
                  type="tel"
                  value={formData.mobileNumber}
                  onChange={handleChange}
                  placeholder="e.g. +880 1XXXXXXXXX"
                  className="w-full rounded-md border border-gray-300 py-2.5 pl-10 pr-3 outline-none focus:border-blue-500 focus:ring-2 focus:ring-blue-100"
                />
              </div>
            </div>

            <div>
              <FieldLabel htmlFor="shopName" required>
                Shop Name
              </FieldLabel>
              <input
                id="shopName"
                name="shopName"
                value={formData.shopName}
                onChange={handleChange}
                placeholder="Enter shop name"
                className="w-full rounded-md border border-gray-300 px-3 py-2.5 outline-none focus:border-blue-500 focus:ring-2 focus:ring-blue-100"
              />
            </div>

            <div className="flex items-center gap-3 rounded-md border border-gray-200 px-3 py-2.5">
              <input
                id="holidayMode"
                name="holidayMode"
                type="checkbox"
                checked={formData.holidayMode}
                onChange={handleChange}
                className="h-4 w-4 rounded border-gray-300 text-blue-600 focus:ring-blue-500"
              />
              <label htmlFor="holidayMode" className="text-sm font-medium text-gray-700">
                Holiday Mode
              </label>
            </div>

            <div className="grid gap-3 sm:grid-cols-2">
              <div>
                <FieldLabel htmlFor="holidayStartDate">Holiday Start</FieldLabel>
                <div className="relative">
                  <FiCalendar className="absolute left-3 top-3 text-gray-400" />
                  <input
                    id="holidayStartDate"
                    name="holidayStartDate"
                    type="date"
                    value={formData.holidayStartDate}
                    onChange={handleChange}
                    disabled={!formData.holidayMode}
                    className="w-full rounded-md border border-gray-300 py-2.5 pl-10 pr-3 outline-none focus:border-blue-500 focus:ring-2 focus:ring-blue-100 disabled:cursor-not-allowed disabled:bg-gray-100"
                  />
                </div>
              </div>
              <div>
                <FieldLabel htmlFor="holidayEndDate">Holiday End</FieldLabel>
                <input
                  id="holidayEndDate"
                  name="holidayEndDate"
                  type="date"
                  value={formData.holidayEndDate}
                  onChange={handleChange}
                  disabled={!formData.holidayMode}
                  className="w-full rounded-md border border-gray-300 px-3 py-2.5 outline-none focus:border-blue-500 focus:ring-2 focus:ring-blue-100 disabled:cursor-not-allowed disabled:bg-gray-100"
                />
              </div>
            </div>

            <div className="md:col-span-2">
              <FieldLabel htmlFor="shopLocation" required>
                Address
              </FieldLabel>
              <div className="relative">
                <FiMapPin className="absolute left-3 top-3 text-gray-400" />
                <textarea
                  id="shopLocation"
                  name="shopLocation"
                  rows="3"
                  value={formData.shopLocation}
                  onChange={handleChange}
                  placeholder="Enter the full shop address"
                  className="w-full resize-y rounded-md border border-gray-300 py-2.5 pl-10 pr-3 outline-none focus:border-blue-500 focus:ring-2 focus:ring-blue-100"
                />
              </div>
            </div>
          </div>
        </section>

        <section className="border-b border-gray-200 p-5 md:p-7">
          <h2 className="text-lg font-semibold text-gray-900">Identity Details</h2>
          <div className="mt-5 grid gap-5 md:grid-cols-2">
            <div className="md:col-span-2">
              <FieldLabel htmlFor="nationalIdentityCardNo">
                National Identity Card No.
              </FieldLabel>
              <div className="relative">
                <FiHash className="absolute left-3 top-3 text-gray-400" />
                <input
                  id="nationalIdentityCardNo"
                  name="nationalIdentityCardNo"
                  value={formData.nationalIdentityCardNo}
                  onChange={handleChange}
                  placeholder="Enter NID number"
                  className="w-full rounded-md border border-gray-300 py-2.5 pl-10 pr-3 outline-none focus:border-blue-500 focus:ring-2 focus:ring-blue-100"
                />
              </div>
            </div>

            {[
              {
                id: "idCopyFront",
                label: "Upload ID Copy - Front Side",
                preview: idCopyFrontPreview,
                onChange: (event) => handleIdCopyChange(event, "front"),
              },
              {
                id: "idCopyBack",
                label: "Upload ID Copy - Back Side",
                preview: idCopyBackPreview,
                onChange: (event) => handleIdCopyChange(event, "back"),
              },
            ].map((item) => (
              <div key={item.id}>
                <FieldLabel htmlFor={item.id}>{item.label}</FieldLabel>
                <div className="flex flex-col gap-3 sm:flex-row sm:items-center">
                  <div className="flex h-24 w-32 shrink-0 items-center justify-center overflow-hidden rounded-md border border-dashed border-gray-300 bg-gray-50 text-xs text-gray-500">
                    {isImageSource(item.preview) ? (
                      <img
                        src={item.preview}
                        alt={item.label}
                        className="h-full w-full object-cover"
                      />
                    ) : item.preview ? (
                      <a
                        href={item.preview}
                        target="_blank"
                        rel="noreferrer"
                        className="px-2 text-center text-blue-600 hover:underline"
                      >
                        Uploaded file
                      </a>
                    ) : null}
                  </div>
                  <label
                    htmlFor={item.id}
                    className="inline-flex w-fit cursor-pointer items-center gap-2 rounded-md border border-gray-300 bg-white px-4 py-2 text-sm font-medium text-gray-700 hover:bg-gray-50"
                  >
                    <FiUpload /> Choose File
                  </label>
                  <input
                    id={item.id}
                    type="file"
                    accept="image/*,application/pdf"
                    onChange={item.onChange}
                    className="sr-only"
                  />
                </div>
              </div>
            ))}
          </div>
        </section>

        <section className="p-5 md:p-7">
          <h2 className="text-lg font-semibold text-gray-900">Bank Details</h2>
          <div className="mt-5 grid gap-5 md:grid-cols-2">
            <div>
              <FieldLabel htmlFor="bankAccountName">Account Name</FieldLabel>
              <div className="relative">
                <FiUser className="absolute left-3 top-3 text-gray-400" />
                <input
                  id="bankAccountName"
                  name="bankAccountName"
                  value={formData.bankAccountName}
                  onChange={handleChange}
                  placeholder="Enter account name"
                  className="w-full rounded-md border border-gray-300 py-2.5 pl-10 pr-3 outline-none focus:border-blue-500 focus:ring-2 focus:ring-blue-100"
                />
              </div>
            </div>

            <div>
              <FieldLabel htmlFor="bankAccountNumber">Account Number</FieldLabel>
              <div className="relative">
                <FiCreditCard className="absolute left-3 top-3 text-gray-400" />
                <input
                  id="bankAccountNumber"
                  name="bankAccountNumber"
                  value={formData.bankAccountNumber}
                  onChange={handleChange}
                  placeholder="Enter account number"
                  className="w-full rounded-md border border-gray-300 py-2.5 pl-10 pr-3 outline-none focus:border-blue-500 focus:ring-2 focus:ring-blue-100"
                />
              </div>
            </div>

            <div>
              <FieldLabel htmlFor="bankNameOrMfs">Bank Name or MFS</FieldLabel>
              <input
                id="bankNameOrMfs"
                name="bankNameOrMfs"
                value={formData.bankNameOrMfs}
                onChange={handleChange}
                placeholder="Enter bank or MFS name"
                className="w-full rounded-md border border-gray-300 px-3 py-2.5 outline-none focus:border-blue-500 focus:ring-2 focus:ring-blue-100"
              />
            </div>

            <div>
              <FieldLabel htmlFor="bankRoutingNumber">Routing Number</FieldLabel>
              <input
                id="bankRoutingNumber"
                name="bankRoutingNumber"
                value={formData.bankRoutingNumber}
                onChange={handleChange}
                placeholder="Enter routing number"
                className="w-full rounded-md border border-gray-300 px-3 py-2.5 outline-none focus:border-blue-500 focus:ring-2 focus:ring-blue-100"
              />
            </div>

            <div className="md:col-span-2">
              <FieldLabel htmlFor="bankBranchName">Branch Name</FieldLabel>
              <input
                id="bankBranchName"
                name="bankBranchName"
                value={formData.bankBranchName}
                onChange={handleChange}
                placeholder="Enter branch name"
                className="w-full rounded-md border border-gray-300 px-3 py-2.5 outline-none focus:border-blue-500 focus:ring-2 focus:ring-blue-100"
              />
            </div>
          </div>
        </section>

        <div className="flex justify-end border-t border-gray-200 bg-gray-50 px-5 py-4 md:px-7">
          <button
            type="submit"
            disabled={isUpdating}
            className="inline-flex min-w-36 items-center justify-center gap-2 rounded-md bg-blue-600 px-5 py-2.5 font-medium text-white hover:bg-blue-700 disabled:cursor-not-allowed disabled:opacity-60"
          >
            {isUpdating ? (
              <Loading text="Saving..." />
            ) : (
              <>
                <FiSave /> Save Changes
              </>
            )}
          </button>
        </div>
      </form>
    </div>
  );
};

export default Settings;
