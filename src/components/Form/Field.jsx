import React from "react";

const Field = ({ label, children, htmlFor, error, required }) => {
    const id = htmlFor || getChildId(children)
    return (
        <div className="flex flex-col items-start justify-center mt-2 p-0 w-full mr-2">
            {label && <label htmlFor={id} className="font-medium mb-2 block">{label}{required && <span className="text-red-500">*</span>}</label>}
            {children}
            {!!error && <div className="text-red-500 text-sm">{error.message}</div>}
        </div>
    );
};
const getChildId = (children) => {
    const child = React.Children.only(children);
    if ("id" in child.props) {
        return child.props.id;
    }
};

export default Field;