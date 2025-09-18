import ProductVariant from "./ProductVariant";


const PriceStockVariants = ({ attributes, setAttributes, variantData, setVariantData, applyAll, setApplyAll, availability, setAvailability }) => {
    return (
        <div className="border border-gray-300 rounded bg-white mt-4 pb-3">
            <p className="p-4 font-semibold text-gray-800 bg-gray-200">Price, Stock & Variants</p>
            <ProductVariant
                attributes={attributes}
                setAttributes={setAttributes}
                variantData={variantData}
                setVariantData={setVariantData}
                applyAll={applyAll}
                setApplyAll={setApplyAll}
                availability={availability}
                setAvailability={setAvailability}
            />
        </div>
    );
};

export default PriceStockVariants;