const FieldSet = ({ children }) => {
    return (
        <fieldset className="border-none p-0">
            <div className="flex flex-col justify-between self-start">
                {children}
            </div>
        </fieldset>
    );
};

export default FieldSet;