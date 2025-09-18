import { Controller } from "react-hook-form";

const Input = ({ title, name, star, control, error, rules, htmlFor = {} }) => {
    const id = htmlFor || getChildId(children)
    return (
        <div className="mb-2 w-full">
            <label htmlFor={id} className="font-medium mb-2 block">
                {title} {star && <span className="text-red-500">*</span>}
            </label>
            <Controller
                name={name}
                control={control}
                rules={{
                    required: star ? `${title} is required` : false,
                    ...rules,
                }}
                render={({ field }) => (
                    <input
                        {...field}
                        type="text"
                        value={field.value ?? ""}
                        id={id}
                        placeholder={`Enter ${title}`}
                        className={`w-full border ${error ? "border-red-500" : "border-gray-300"
                            } rounded-md p-2 focus:outline-none focus:ring-1 focus:ring-blue-200`}
                    />
                )}
            />
            {error && <p className="text-red-500 text-xs mt-1">{error.message}</p>}
        </div>
    );
};

export default Input;
const getChildId = (children) => {
    const child = React.Children.only(children);
    if ("id" in child.props) {
        return child.props.id;
    }
};