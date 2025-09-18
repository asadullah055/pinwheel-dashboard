import SingleProductRow from "./SingleProductRow";
import VariantRow from "./VariantRow";

const VariantTable = ({ attributes, rows, variantData, handleChange, validatePrice, setVariantData, toggleAvailability }) => {
    return (
        <div className="px-4"><div className="rounded-lg overflow-hidden border border-gray-300 ">
            <table className="w-full text-sm">
                <thead className="bg-gray-100">
                    <tr>
                        {attributes.map((attr, i) => (
                            <th
                                key={i}
                                className={`border-b border-r border-gray-300 p-2 text-left capitalize
                                    ${i === 0 ? 'rounded-tl-lg' : ''}
                                `}
                            >
                                {attr.name || `Attribute ${i + 1}`}
                            </th>
                        ))}
                        <th className="border-b border-r border-gray-300 p-2">Price</th>
                        <th className="border-b border-r border-gray-300 p-2">Discount Price</th>
                        <th className="border-b border-r border-gray-300 p-2">Stock</th>
                        <th className="border-b border-r border-gray-300 p-2">Shop SKU</th>
                        <th className="border-b border-gray-300 p-2 rounded-tr-lg">Availability</th>
                    </tr>
                </thead>
                <tbody>
                    {rows.length === 0 ? (
                        <SingleProductRow
                            attributes={attributes}
                            variantData={variantData}
                            handleChange={handleChange}
                            validatePrice={validatePrice}
                            toggleAvailability={toggleAvailability}
                        />
                    ) : (
                        rows.map((row, idx) => (
                            <VariantRow
                                key={row.join("|")}
                                row={row}
                                rowIdx={idx}
                                rows={rows}
                                attributes={attributes}
                                variantData={variantData}
                                setVariantData={setVariantData}
                                handleChange={handleChange}
                                validatePrice={validatePrice}
                                toggleAvailability={toggleAvailability}
                                isLastRow={idx === rows.length - 1}
                            />
                        ))
                    )}
                </tbody>
            </table>
        </div></div>
    );
};

export default VariantTable;