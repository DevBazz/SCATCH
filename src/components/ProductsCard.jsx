


 const ProductCard = ({ product }) => {
  return (
    <div className="w-[250px] h-[400px] flex flex-col justify-between bg-zinc-900 rounded-xl p-4 shadow-md hover:shadow-lg transition-all duration-300">
      
      <div className="relative w-full h-[180px] flex items-center justify-center bg-zinc-800 rounded-lg">
        <img
          src={product.image}
          alt={product.title}
          className="max-h-full max-w-full object-contain"
        />
        {product.isNew && (
          <span className="absolute top-2 left-2 bg-pink-500 text-white text-xs px-2 py-1 rounded-full">
            NEW
          </span>
        )}
      </div>

      {/* Product Info */}
      <div className="mt-4 text-white space-y-1 flex-grow">
        <p className="text-sm text-zinc-400">
          {product.quantity || "1-10 pieces"} - Size: {product.size || "M"}
        </p>

        <h3 className="text-base font-semibold leading-tight line-clamp-2 h-[40px]">
          {product.title}
        </h3>

        <p className="text-lg font-bold">${product.price}</p>
      </div>

      <div className="mt-2 flex gap-2">
        {product.colors?.map((color, index) => (
          <span
            key={index}
            className="w-4 h-4 rounded-full border border-white"
            style={{ backgroundColor: color }}
          ></span>
        ))}
      </div>

    
      <div className="flex gap-1">
        <button className="mt-4 w-full py-2 bg-yellow-400 hover:bg-zinc-600 text-white text-sm rounded-md">
        Edit
      </button>
      <button className="mt-4 w-full py-2 bg-red-600 hover:bg-zinc-600 text-white text-sm rounded-md">
        Delete
      </button>
      </div>
    </div>
  );
};

export default ProductCard
