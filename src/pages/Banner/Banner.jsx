import BannerForm from "../../components/Banner/BannerForm";

const Banner = () => {
  return (
    <div className="p-4">
      <div className="flex items-center justify-between">
        <div>
          <h3 className="font-semibold text-2xl">Banner Setup</h3>
          <p className="text-sm py-1">Manage your Banners</p>
        </div>
      </div>
      <div className="p-6 bg-white rounded-lg shadow-md">
        {/* Add Banner  */}
        <BannerForm />
      </div>
    </div>
  );
};

export default Banner;
