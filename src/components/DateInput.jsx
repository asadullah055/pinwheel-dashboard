import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";

const DateInput = ({
    label = "Select Date",
    required = false,
    value,
    onChange,
    placeholder = "mm/dd/yyyy --:-- --",
    withTime = true,
    id = "dateInput"
}) => {
    return (
        <div className="w-full">
            <label
                htmlFor={id}
                className="block text-sm font-medium mb-1"
            >
                {label} {required && <span className="text-red-500">*</span>}
            </label>

            <DatePicker
                id={id}
                selected={value}
                onChange={onChange}
                showTimeSelect={withTime}
                timeIntervals={5}
                dateFormat={withTime ? "MM/dd/yyyy h:mm aa" : "MM/dd/yyyy"}
                placeholderText={placeholder}
                minDate={new Date()}
                className="w-full border rounded-md px-3 py-2 focus:outline-none focus:ring focus:ring-blue-500"
            />
        </div>
    );
};

export default DateInput;
