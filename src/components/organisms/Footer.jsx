import React from 'react';
import FooterColumn from '../molecules/FooterColumn';
import Text from '../atoms/Text';
import { FaInstagram, FaFacebook, FaTwitter, FaLinkedin } from 'react-icons/fa';
import logo from '../../assets/logo2.png';

const footerData = {
  description: "A new way to make the payments easy, reliable and secure.",
  columns: [
    {
      title: "Useful Links",
      links: [
        { href: "#", label: "Content" },
        { href: "#", label: "How it Works" },
        { href: "#", label: "Create" },
        { href: "#", label: "Explore" },
        { href: "#", label: "Terms & Services" },
      ],
    },
    {
      title: "Community",
      links: [
        { href: "#", label: "Help Center" },
        { href: "#", label: "Partners" },
        { href: "#", label: "Suggestions" },
        { href: "#", label: "Blog" },
        { href: "#", label: "Newsletters" },
      ],
    },
    {
      title: "Partner",
      links: [
        { href: "#", label: "Our Partner" },
        { href: "#", label: "Become a Partner" },
      ],
    },
  ],
  socialLinks: [
    { href: "#", icon: <FaInstagram /> },
    { href: "#", icon: <FaFacebook /> },
    { href: "#", icon: <FaTwitter /> },
    { href: "#", icon: <FaLinkedin /> },
  ],
};

const Footer = () => (
  <footer className="bg-navy text-gray-800 py-10 w-full">
    <div className="container mx-auto px-4">
      <div className="flex flex-wrap justify-between">
        <div className="w-full md:w-1/4 mb-8 md:mb-0">
     <img src={logo} alt="" className='w-16 rounded-full'/>
          <Text>{footerData.description}</Text>
        </div>
        {footerData.columns.map((column, index) => (
          <div key={index} className="w-full md:w-1/4 mb-8 md:mb-0">
            <FooterColumn title={column.title} links={column.links} />
          </div>
        ))}
      </div>
      <div className="flex flex-col md:flex-row justify-between items-center mt-8 pt-8 border-t">
        <Text className="mb-4 md:mb-0">&copy; 2022 AdopMe. All Rights Reserved.</Text>
        <div className="flex space-x-4">
          {footerData.socialLinks.map((social, index) => (
            <a key={index} href={social.href} className="text-white hover:text-blue-500">
              {social.icon}
            </a>
          ))}
        </div>
      </div>
    </div>
  </footer>
);

export default Footer;
