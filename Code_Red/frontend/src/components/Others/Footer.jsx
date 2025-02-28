const Footer = () => {
    return (
      <footer className="bg-base-200 py-6 mt-8 shadow-lg">
        <div className="max-w-5xl mx-auto text-center space-y-4">
          {/* Company Name */}
          <h2 className="text-xl text-primary font-semibold">HandyGo</h2>
  
          {/* Info Section */}
          <div className="text-sm text-gray-400">
            <p>Reliable home services at your doorstep.</p>
            <p>We specialize in plumbing, electrical work, carpentry, and more.</p>
          </div>
  
          {/* Contact Info */}
          <p className="text-sm text-gray-400">
            Need help? Reach us at <span className="text-primary">support@handygo.com</span>
          </p>
  
          {/* Copyright */}
          <p className="text-xs text-gray-500">© {new Date().getFullYear()} HandyGo. All rights reserved.</p>
        </div>
      </footer>
    );
  };
  
  export default Footer;
  