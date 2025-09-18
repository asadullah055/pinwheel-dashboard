import { useEffect, useRef, useState } from "react";
import toast from "react-hot-toast";
import { FaRegTrashAlt } from "react-icons/fa";
import { GoPlus } from "react-icons/go";

const ProductImageUploader = ({ images = [], setImages }) => {
  const fileInputRef = useRef(null);
  const [imageUrls, setImageUrls] = useState([]);

  // Create URLs separately and manage them
  useEffect(() => {
    const urls = [];

    images.forEach((img, index) => {
      if (img instanceof File) {
        // Create URL if it doesn't exist
        if (!img.preview) {
          const url = URL.createObjectURL(img);
          urls[index] = url;
        } else {
          urls[index] = img.preview;
        }
      } else if (typeof img === 'string') {
        // It's already a URL string
        urls[index] = img;
      }
    });

    setImageUrls(urls);

    // Cleanup function
    return () => {
      urls.forEach(url => {
        if (url && url.startsWith('blob:')) {
          URL.revokeObjectURL(url);
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

    // Don't modify the original files
    const newFiles = files.map(file => {
      return file;
    });

    setImages([...images, ...newFiles]);
  };

  const handleAddClick = () => {
    fileInputRef.current?.click();
  };

  const handleDragStart = (e, index) => {
    e.dataTransfer.effectAllowed = 'move';
    e.dataTransfer.setData("text/plain", String(index));
  };

  const handleDrop = (e, dropIndex) => {
    e.preventDefault();
    const dragIndex = parseInt(e.dataTransfer.getData("text/plain"));

    if (isNaN(dragIndex) || dragIndex === dropIndex) return;

    const newImages = [...images];
    const [draggedImage] = newImages.splice(dragIndex, 1);
    newImages.splice(dropIndex, 0, draggedImage);

    setImages(newImages);
  };

  const handleDragOver = (e) => {
    e.preventDefault();
    e.dataTransfer.dropEffect = 'move';
  };

  const removeImage = (e, index) => {
    e.preventDefault();
    e.stopPropagation();

    const newImages = images.filter((_, i) => i !== index);
    setImages(newImages);
  };

  return (
    <div>
      <div className="flex flex-wrap gap-3 bg-gray-50 rounded-lg p-3">
        {images.map((img, index) => {
          const imageUrl = imageUrls[index];

          return (
            <div
              key={index}
              draggable
              onDragStart={(e) => handleDragStart(e, index)}
              onDrop={(e) => handleDrop(e, index)}
              onDragOver={handleDragOver}
              className="relative w-28 h-28 rounded border border-gray-300 overflow-hidden cursor-move"
            >
              {imageUrl ? (
                <img
                  src={imageUrl}
                  alt={`Product ${index + 1}`}
                  className="w-full h-full object-cover"
                  onError={(e) => {
                    e.target.style.display = 'none';
                  }}
                />
              ) : (
                <div className="w-full h-full flex items-center justify-center bg-gray-200">
                  <span className="text-gray-500">Loading...</span>
                </div>
              )}
              <div className="absolute inset-0 flex justify-center items-center gap-2 bg-black bg-opacity-60 opacity-0 hover:opacity-60 transition z-10 cursor-move">
                <button
                  type="button"
                  className="text-white absolute top-2 right-2 z-50 cursor-pointer"
                  onClick={(e) => removeImage(e, index)}
                >
                  <FaRegTrashAlt size={20} />
                </button>
              </div>
            </div>
          );
        })}

        {images.length < 5 && (
          <div
            onClick={handleAddClick}
            className="w-28 h-28 flex items-center justify-center border-2 border-dashed border-gray-300 text-gray-600 cursor-pointer rounded hover:border-gray-400"
          >
            <GoPlus size={30} />
          </div>
        )}

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