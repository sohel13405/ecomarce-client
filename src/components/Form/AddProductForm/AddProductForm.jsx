

const AddProductForm = ({handleFormSubmit, isUploading}) => {




    // TODO: send data to backend using axios / fetch
  

  return (
    <div className="max-w-xl mx-auto bg-white p-6 rounded-xl shadow-lg">
      <h2 className="text-2xl font-semibold mb-5 text-center">
        Add New Product
      </h2>

      <form onSubmit={handleFormSubmit} className="space-y-4">
        {/* Product Name */}
        <div>
          <label className="block mb-1 font-medium">Product Name</label>
          <input
            type="text"
            name="name"
            placeholder="Enter product name"
            className="w-full input input-bordered"
            // value={formData.name}
            // onChange={handleChange}
            required
          />
        </div>

        {/* Price */}
        <div>
          <label className="block mb-1 font-medium">Price</label>
          <input
            type="number"
            name="price"
            placeholder="Enter price"
            className="w-full input input-bordered"
            // value={formData.price}
            // onChange={handleChange}
            required
          />
        </div>

        {/* Quantity */}
        <div>
          <label className="block mb-1 font-medium">Quantity</label>
          <input
            type="number"
            name="quantity"
            placeholder="Enter quantity"
            className="w-full input input-bordered"
            // value={formData.quantity}
            // onChange={handleChange}
            required
          />
        </div>

        {/* Category */}
        <div>
          <label className="block mb-1 font-medium">Category</label>
          <select
            name="category"
            className="w-full select select-bordered"
            // value={formData.category}
            // onChange={handleChange}
            required
          >
            <option value="">Select Category</option>
            <option value="mobile">Mobile</option>
            <option value="earphone">Earphone</option>
            <option value="laptop">Laptop</option>
            <option value="speaker">Speaker</option>
            <option value="tv">Tv</option>
            <option value="router">Modem & Router</option>
            <option value="pc">Pc</option>
            <option value="mouse">Mouse</option>
            <option value="keyboard">Keyboard</option>
            <option value="gadget">Mobile Accessories</option>
          </select>
        </div>

        {/* Description */}
        <div>
          <label className="block mb-1 font-medium">Description</label>
          <textarea
            name="description"
            placeholder="Write product description"
            className="w-full textarea textarea-bordered"
            rows="4"
            // value={formData.description}
            // onChange={handleChange}
          />
        </div>

        {/* Image */}
        <div>
          <label className="block mb-1 font-medium">Product Image</label>
          <input
            type="file"
            name="image"
            className="w-full file-input file-input-bordered"
            // onChange={handleChange}
            required
          />
        </div>

        {/* Button */}
        <button
          type="submit"
          className="btn btn-primary w-full text-lg"
        >
          {
            isUploading? 'saving....' : 'save'
          }
        </button>
      </form>
    </div>
  );
};

export default AddProductForm;
