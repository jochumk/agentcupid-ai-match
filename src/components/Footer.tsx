
import { Link } from "react-router-dom";

const Footer = () => {
  return (
    <footer className="bg-gray-50 border-t border-gray-200">
      <div className="container mx-auto px-4 py-12">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          <div>
            <Link to="/" className="flex items-center space-x-2">
              <div className="bg-gradient-to-r from-primary to-secondary rounded-full w-8 h-8 flex items-center justify-center">
                <span className="text-white font-bold text-lg">AC</span>
              </div>
              <span className="text-xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-primary to-secondary">
                AgentCupid
              </span>
            </Link>
            <p className="mt-4 text-sm text-gray-600">
              Connecting businesses with the perfect AI agents for their needs.
            </p>
          </div>

          <div>
            <h3 className="font-medium text-sm mb-4">For Customers</h3>
            <ul className="space-y-3">
              <li>
                <Link to="/discover" className="text-sm text-gray-600 hover:text-primary">
                  Find AI Agents
                </Link>
              </li>
              <li>
                <Link to="/how-it-works" className="text-sm text-gray-600 hover:text-primary">
                  How It Works
                </Link>
              </li>
              <li>
                <Link to="/success-stories" className="text-sm text-gray-600 hover:text-primary">
                  Success Stories
                </Link>
              </li>
              <li>
                <Link to="/customer-support" className="text-sm text-gray-600 hover:text-primary">
                  Customer Support
                </Link>
              </li>
            </ul>
          </div>

          <div>
            <h3 className="font-medium text-sm mb-4">For Developers</h3>
            <ul className="space-y-3">
              <li>
                <Link to="/sell-your-agent" className="text-sm text-gray-600 hover:text-primary">
                  Sell Your Agent
                </Link>
              </li>
              <li>
                <Link to="/developer-resources" className="text-sm text-gray-600 hover:text-primary">
                  Developer Resources
                </Link>
              </li>
              <li>
                <Link to="/dev-success-stories" className="text-sm text-gray-600 hover:text-primary">
                  Success Stories
                </Link>
              </li>
              <li>
                <Link to="/developer-support" className="text-sm text-gray-600 hover:text-primary">
                  Developer Support
                </Link>
              </li>
            </ul>
          </div>

          <div>
            <h3 className="font-medium text-sm mb-4">Company</h3>
            <ul className="space-y-3">
              <li>
                <Link to="/about" className="text-sm text-gray-600 hover:text-primary">
                  About Us
                </Link>
              </li>
              <li>
                <Link to="/careers" className="text-sm text-gray-600 hover:text-primary">
                  Careers
                </Link>
              </li>
              <li>
                <Link to="/blog" className="text-sm text-gray-600 hover:text-primary">
                  Blog
                </Link>
              </li>
              <li>
                <Link to="/contact" className="text-sm text-gray-600 hover:text-primary">
                  Contact
                </Link>
              </li>
            </ul>
          </div>
        </div>

        <div className="mt-12 pt-8 border-t border-gray-200">
          <div className="flex flex-col md:flex-row md:justify-between items-center">
            <p className="text-sm text-gray-500">
              &copy; {new Date().getFullYear()} AgentCupid, Inc. All rights reserved.
            </p>
            <div className="mt-4 md:mt-0 flex space-x-6">
              <Link to="/privacy" className="text-sm text-gray-500 hover:text-gray-700">
                Privacy Policy
              </Link>
              <Link to="/terms" className="text-sm text-gray-500 hover:text-gray-700">
                Terms of Service
              </Link>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
