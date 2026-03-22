const IconButton = ({ children }) => {
  return (
    <button className="p-2 hover:opacity-70 transition">
      {children}
    </button>
  );
};

export default IconButton;
