import "./Footer.css";

const Footer = () => {
  return (
    <footer className="footer">
      {/* TOP ICON STRIP */}
      <div className="bg-white text-black">
        <div className="container-main footer-features">
          <div className="feature">
            <GiftIcon />
            <span>PAN INDIA SHIPPING</span>
          </div>
          <div className="feature">
            <GiftIcon />
            <span>HASSLE FREE RETURNS</span>
          </div>
          <div className="feature">
            <GiftIcon />
            <span>TOP-NOTCH SUPPORT</span>
          </div>
          <div className="feature">
            <GiftIcon />
            <span>SECURE PAYMENTS</span>
          </div>
        </div>
      </div>

      {/* MAIN FOOTER */}
      <div className="container-main footer-main">
        <div>
          <h4>MAIN MENU</h4>
          <ul>
            <li>Best Sellers</li>
            <li>New Arrivals</li>
            <li>Shop by Category</li>
            <li>Watch & Shop</li>
            <li>Clothing</li>
          </ul>
        </div>

        <div>
          <h4>INFO</h4>
          <ul>
            <li>About Us</li>
            <li>Offers</li>
            <li>New Arrivals</li>
            <li>Best Sellers</li>
            <li>Help</li>
          </ul>
        </div>

        <div>
          <h4>HELP</h4>
          <ul>
            <li>FAQs</li>
            <li>Policies</li>
            <li>Help Desk</li>
            <li>Returns / Exchange</li>
          </ul>
        </div>

        <div className="footer-address">
          <h4>MAISHA LIFESTYLE</h4>
          <p>
            12, River Colony, Opp. St. Xaviers College,<br />
            Navrangpura, Ahmedabad 380009.
          </p>
          <p>
            Studio open: Mon–Sat, 11 AM – 6:30 PM
          </p>
          <p>
            Studio Enquiries: <a href="tel:+917016416328">+91 7016416328</a>
          </p>
          <p>
            Website Orders: <a href="tel:+919879779883">+91 9879779883</a>
          </p>
          <p>
            WhatsApp: <a href="tel:+919023217530">+91 9023217530</a>
          </p>
        </div>

        <div>
          <h4>NEWSLETTER</h4>
          <p>Sign up to our newsletter to receive exclusive offers.</p>
          <input type="email" placeholder="E-mail" />
          <button>SUBSCRIBE</button>
        </div>
      </div>

      {/* BOTTOM BAR */}
      <div className="border-t border-neutral-800">
        <div className="container-main footer-bottom">
          <div className="socials">
            <FacebookIcon />
            <InstagramIcon />
            <PinterestIcon />
            <YoutubeIcon />
            <LinkedinIcon />
          </div>

          <p>© 2026 – MAISHA BY ESHA</p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;

/* ICONS */

const GiftIcon = () => (
  <svg viewBox="0 0 24 24">
    <path d="M20 12v8H4v-8M2 7h20v5H2zM12 7v13M7 7c-1.1 0-2-1-2-2s.9-2 2-2c1.5 0 3 2 3 4H7zm10 0h-3c0-2 1.5-4 3-4 1.1 0 2 .9 2 2s-.9 2-2 2z" />
  </svg>
);

const FacebookIcon = () => <SocialSvg d="M18 2h-3a5 5 0 0 0-5 5v3H7v4h3v8h4v-8h3l1-4h-4V7a1 1 0 0 1 1-1h3z" />;
const InstagramIcon = () => <SocialSvg d="M2 2h20v20H2z M12 7a5 5 0 1 0 0 10 5 5 0 0 0 0-10z M17.5 6.5h.01" />;
const PinterestIcon = () => <SocialSvg d="M8 22l2-8c-.4-.8-.6-1.7-.6-2.7 0-2.5 1.5-4.3 3.5-4.3 1.6 0 2.4 1.2 2.4 2.6 0 1.6-1 4-1.6 6.2-.5 1.9 1 3.4 2.9 3.4 3.5 0 6.1-3.6 6.1-8.8C22.7 5.6 18.4 1 12.6 1 6.6 1 2 5.5 2 11.2c0 2.3.9 4.8 2 6.1L3.3 22z" />;
const YoutubeIcon = () => <SocialSvg d="M23 7s-.2-1.6-.8-2.3c-.7-.8-1.5-.8-1.9-.9C17.6 3.5 12 3.5 12 3.5s-5.6 0-8.3.3c-.4.1-1.2.1-1.9.9C1.2 5.4 1 7 1 7s-.2 1.9-.2 3.7v1.7c0 1.9.2 3.7.2 3.7s.2 1.6.8 2.3c.7.8 1.7.8 2.1.9 1.6.2 7.1.3 7.1.3s5.6 0 8.3-.3c.4-.1 1.2-.1 1.9-.9.6-.7.8-2.3.8-2.3s.2-1.9.2-3.7v-1.7C23.2 8.9 23 7 23 7zM9.7 14.6V8.4l5.6 3.1-5.6 3.1z" />;
const LinkedinIcon = () => <SocialSvg d="M4.98 3.5a2.5 2.5 0 1 0 0 5 2.5 2.5 0 0 0 0-5zM3 8.98h4v12H3zM9 8.98h3.8v1.64h.05c.53-1 1.83-2.06 3.77-2.06 4.03 0 4.78 2.65 4.78 6.1v6.32h-4v-5.6c0-1.33-.03-3.04-1.85-3.04-1.85 0-2.14 1.45-2.14 2.94v5.7H9z" />;

const SocialSvg = ({ d }) => (
  <svg viewBox="0 0 24 24">
    <path d={d} />
  </svg>
);
