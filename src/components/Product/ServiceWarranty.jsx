import FieldSet from "../Form/FieldSet";
import Input from "../Form/Input";
import Select from "../Form/Select";
import { warrantyData } from './../../../utils/warrantyData';

const ServiceWarranty = ({ errors, control }) => {
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
                <div className="w-1/2">
                    <FieldSet>
                        <Select
                            title="Warranty Time"
                            name="warrantyTime"
                            control={control}
                            options={warrantyData}
                            error={errors.warrantyTime}
                            htmlFor="warrantyTimeSelect"
                        />
                    </FieldSet>
                </div>
                <div className="w-1/2">
                    <FieldSet>
                        <Input
                            title="Warranty Policy"
                            name="warrantyPolicy"
                            control={control}
                            error={errors.warrantyPolicy}
                            htmlFor="warrantyPolicyInput"
                        />
                    </FieldSet>
                </div>
            </div>
            <div className="px-4">
                <p>Package Info</p>
                <div className="mt-2">
                    <FieldSet>
                        <div className="grid grid-cols-2 gap-4">
                            <Input
                                title="Weight"
                                name="weight"
                                star={true}
                                control={control}
                                error={errors.weight}
                                htmlFor="weightInput"
                            />
                            <Input
                                title="Length "
                                name="length"
                                control={control}
                                star={true}
                                error={errors.length}
                                htmlFor="lengthInput"
                            />
                            <Input
                                title="Width"
                                name="width"
                                star={true}
                                control={control}
                                error={errors.width}
                                htmlFor="widthInput"
                            />
                            <Input
                                title="Height"
                                name="height"
                                control={control}
                                star={true}
                                error={errors.height}
                                htmlFor="heightInput"
                            />
                        </div>
                    </FieldSet>
                </div>

            </div>
        </div>
    );
};

export default ServiceWarranty;