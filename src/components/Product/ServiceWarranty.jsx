import { useWatch } from "react-hook-form";
import FieldSet from "../Form/FieldSet";
import Input from "../Form/Input";
import Select from "../Form/Select";
import { warrantyData } from './../../../utils/warrantyData';

const ServiceWarranty = ({ errors, control }) => {
    const warrantyType = useWatch({
        control,
        name: "warrantyType",
        defaultValue: "no warranty",
    });

    const isNoWarranty = warrantyType === "no warranty";
    return (
        <div className="border border-gray-300 rounded bg-white mt-4 pb-3">
            <p className="p-4 font-semibold text-gray-800 bg-gray-200">Service & Warranty
            </p>
            <div className="px-4">
                <p>Warranty Info</p>
                <div className="w-1/2 mt-2">
                    <FieldSet>
                        <Select
                            title="Warranty Type"
                            name="warrantyType"
                            star={true}
                            control={control}
                            rules={{ required: "Warranty Type is required" }}
                            options={[
                                { _id: "no warranty", name: "No Warranty" },
                                { _id: "brand warranty", name: "Brand Warranty" },
                                { _id: "seller warranty", name: "Seller Warranty" },
                            ]}
                            error={errors.warrantyType}
                            htmlFor="warrantyTypeSelect"
                        />
                    </FieldSet>
                </div>
                {/* Warranty Time */}
                {!isNoWarranty && (
                    <div className="w-1/2">
                        <FieldSet>
                            <Select
                                title="Warranty Time"
                                name="warrantyTime"
                                control={control}
                                rules={{ required: "Warranty Time is required" }}
                                options={warrantyData}
                                error={errors.warrantyTime}
                            />
                        </FieldSet>
                    </div>
                )}

                {/* Warranty Policy */}
                {!isNoWarranty && (
                    <div className="w-1/2">
                        <FieldSet>
                            <Input
                                title="Warranty Policy"
                                name="warrantyPolicy"
                                control={control}
                                rules={{ required: "Warranty Policy is required" }}
                                error={errors.warrantyPolicy}
                            />
                        </FieldSet>
                    </div>
                )}
            </div>
            <div className="px-4">
                <p>Shipping Charge</p>
                <div className="mt-2">
                    <FieldSet>
                        <div className="grid grid-cols-2 gap-4">
                            <Input
                                title="Inside Dhaka"
                                name="shippingInsideDhaka"
                                star={true}
                                control={control}
                                rules={{
                                    min: { value: 0, message: "Inside Dhaka shipping charge cannot be negative" },
                                }}
                                error={errors.shippingInsideDhaka}
                                htmlFor="shippingInsideDhakaInput"
                            />
                            <Input
                                title="Outside Dhaka"
                                name="shippingOutsideDhaka"
                                control={control}
                                star={true}
                                rules={{
                                    min: { value: 0, message: "Outside Dhaka shipping charge cannot be negative" },
                                }}
                                error={errors.shippingOutsideDhaka}
                                htmlFor="shippingOutsideDhakaInput"
                            />
                        </div>
                    </FieldSet>
                </div>

            </div>
        </div>
    );
};

export default ServiceWarranty;
