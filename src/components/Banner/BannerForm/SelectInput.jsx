import { useFormContext } from "react-hook-form";

export default function SelectInput({ name, label, options, validation = {} }) {
    const {
        register,
        formState: { errors },
    } = useFormContext();

    return (
        <div className="flex flex-col gap-1 w-full">
            <label className="font-medium">{label}</label>
            <select
                {...register(name, validation)}
                className="w-full border rounded-md px-3 py-2 focus:outline-none focus:ring focus:ring-blue-500"
            >
                <option value="">-- select option --</option>
                {options.map((opt) => (
                    <option key={opt.value} value={opt.value}>
                        {opt.label}
                    </option>
                ))}
            </select>
            {errors[name] && <span className="text-red-500 text-sm">{errors[name].message}</span>}
        </div>
    );
}