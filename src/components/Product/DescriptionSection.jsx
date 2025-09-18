const DescriptionSection = ({ description, setDescription, shortDescription, setShortDescription }) => {
    return (
        <div className="border border-gray-300 rounded bg-white mt-4">
            <p className="p-4 font-semibold text-gray-800 bg-gray-200">Description</p>
            <div className="p-4">
                <div className="mb-4">
                    <label className="font-medium mb-2 block">
                        Description <span className="text-red-500">*</span>
                    </label>
                    <textarea
                        className="w-full border border-gray-300 rounded-md p-2 focus:outline-none"
                        rows={5}
                        value={description}
                        onChange={(e) => setDescription(e.target.value)}
                        placeholder="Enter product description"
                    />
                </div>

                <div className="mb-4">
                    <label className="font-medium mb-2 block">
                        Short Description <span className="text-red-500">*</span>
                    </label>
                    <textarea
                        className="w-full border border-gray-300 rounded-md p-2 focus:outline-none"
                        rows={3}
                        value={shortDescription}
                        onChange={(e) => setShortDescription(e.target.value)}
                        placeholder="Enter short description"
                    />
                </div>
            </div>
        </div>
    );
};

export default DescriptionSection;