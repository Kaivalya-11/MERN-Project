import navLinks from "../../data/navLinks";
import { X } from "lucide-react";

const MobileMenu = ({ open, setOpen }) => {
  return (
    <div
      className={`fixed inset-0 bg-black/40 z-50 transition ${
        open ? "opacity-100 visible" : "opacity-0 invisible"
      }`}
      onClick={() => setOpen(false)}
    >
      <div
        className={`absolute left-0 top-0 h-full w-72 bg-white p-6 transform transition ${
          open ? "translate-x-0" : "-translate-x-full"
        }`}
        onClick={(e) => e.stopPropagation()}
      >
        <button className="mb-6" onClick={() => setOpen(false)}>
          <X />
        </button>

        <div className="flex flex-col gap-4 text-sm">
          {navLinks.map((link, index) => (
            <div key={index} className="font-medium">
              {link.title}
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default MobileMenu;
