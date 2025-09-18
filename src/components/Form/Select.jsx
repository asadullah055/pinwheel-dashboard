import { Controller } from "react-hook-form";

const Select = ({ title, star, name, control, options, error, htmlFor }) => {
    const id = htmlFor || getChildId(children);
    return <div className="mb-4 w-full">
        <label htmlFor={id} className="font-medium mb-2 block">
            {title} {star && <span className="text-red-500">*</span>}
        </label>
        <Controller
            name={name}
            control={control}
            rules={{ required: `${title} is required` }}
            render={({ field }) => (
                <select
                    {...field}
                    className={`w-full border ${error ? "border-red-500" : "border-gray-300"
                        } p-2 rounded focus:outline-none focus:ring-1 focus:ring-blue-200`}
                    id={id}
                >
                    <option value="">Select {title}</option>
                    {options.map((item) => (
                        <option key={item._id} value={item._id}>
                            {item.name}
                        </option>
                    ))}
                </select>
            )}
        />
        {error && <p className="text-red-500 text-xs mt-1">{error.message}</p>}
    </div>

}
export default Select;
const getChildId = (children) => {
    const child = React.Children.only(children);
    if ("id" in child.props) {
        return child.props.id;
    }
};