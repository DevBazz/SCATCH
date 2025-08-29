import UserSidebar from "../../components/UserSideBar";

const Wishlist = () => {
  const wishlist = [
    {
      id: 1,
      name: "Classic Easy Zipper Tote",
      price: "$298",
      img: "/images/tote.jpg",
    },
    {
      id: 2,
      name: "Concertina Phone Bag",
      price: "$248",
      img: "/images/phone-bag.jpg",
    },
  ];

  return (
    <div className="container mx-auto px-6 py-12 grid grid-cols-1 md:grid-cols-4 gap-10">
      <UserSidebar />
      <main className="md:col-span-3">
        <h1 className="text-2xl font-bold mb-6">My Wishlist</h1>
        {wishlist.length === 0 ? (
          <p className="text-gray-600">Your wishlist is empty.</p>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
            {wishlist.map((item) => (
              <div key={item.id} className="group">
                <img
                  src={item.img}
                  alt={item.name}
                  className="w-full h-64 object-cover rounded-md mb-3"
                />
                <h3 className="font-medium">{item.name}</h3>
                <p className="text-gray-600">{item.price}</p>
                <button className="mt-2 text-sm underline text-red-600 hover:text-black">
                  Remove
                </button>
              </div>
            ))}
          </div>
        )}
      </main>
    </div>
  );
};

export default Wishlist;
