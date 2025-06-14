import { useEffect, useRef } from "react";
import toast from "react-hot-toast";
import { FaRegTrashAlt } from "react-icons/fa";
import { GoPlus } from "react-icons/go";

const ProductImageUploader = ({ images, setImages }) => {
  const fileInputRef = useRef(null);

  // Clean up object URLs
  useEffect(() => {
    return () => {
      images.forEach((img) => {
        if (img instanceof File) {
          URL.revokeObjectURL(img.preview);
        }
      });
    };
  }, [images]);

  const handleImageUpload = (e) => {
    const files = Array.from(e.target.files);
    if (files.length + images.length > 5) {
      toast.error("You can only upload a maximum of 5 images.");
      return;
    }
    // Add preview property for each file
    const filesWithPreview = files.map((file) => {
      file.preview = URL.createObjectURL(file);
      return file;
    });
    setImages((prev) => [...prev, ...filesWithPreview]);
  };

  const handleAddClick = () => {
    fileInputRef.current.click();
  };

  const handleDragStart = (e, index) => {
    e.dataTransfer.setData("imageIndex", index);
  };

  const handleDrop = (e, dropIndex) => {
    const dragIndex = e.dataTransfer.getData("imageIndex");
    const newImages = [...images];
    const [draggedImage] = newImages.splice(dragIndex, 1);
    newImages.splice(dropIndex, 0, draggedImage);
    setImages(newImages);
  };

  const handleDragOver = (e) => {
    e.preventDefault();
  };

  const removeImage = (e, index) => {
    e.preventDefault();
    // Revoke object URL before removing
    const img = images[index];
    if (img instanceof File && img.preview) {
      URL.revokeObjectURL(img.preview);
    }
    setImages(images.filter((_, i) => i !== index));
  };

  return (
    <div>
      <div className="flex space-x-3 bg-gray-50 rounded-lg">
        {images.map((img, index) => (
          <div
            key={index}
            draggable
            onDragStart={(e) => handleDragStart(e, index)}
            onDrop={(e) => handleDrop(e, index)}
            onDragOver={handleDragOver}
            className="relative w-28 h-28 rounded border border-gray-300 overflow-hidden"
          >
            <img
              src={img instanceof File ? img.preview : img}
              alt="Product"
              className="w-full h-full object-cover"
            />
            <div className="absolute inset-0 flex justify-center items-center gap-2 bg-black bg-opacity-60 opacity-0 hover:opacity-60 transition z-10 cursor-move">
              <button
                className="text-white absolute top-2 right-2 z-50 cursor-pointer"
                onClick={(e) => removeImage(e, index)}
              >
                <FaRegTrashAlt />
              </button>
            </div>
          </div>
        ))}

        {/* Add Image Button */}
        {images.length < 5 && (
          <div
            onClick={handleAddClick}
            className="w-28 h-28 flex items-center justify-center border-2 border-dashed border-[#d0d2d6] text-[#111] cursor-pointer rounded hover:border-gray-400"
          >
            <GoPlus size={30} className="font-bold" />
          </div>
        )}
        {/* Hidden File Input */}
        <input
          type="file"
          accept="image/*"
          multiple
          ref={fileInputRef}
          onChange={handleImageUpload}
          className="hidden"
        />
      </div>
    </div>
  );
};

export default ProductImageUploader;
