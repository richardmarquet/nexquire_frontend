import Link from "next/link";

interface Link {
  title: string;
  href: string;
}

const links: Link[] = [
  {
    title: "Contact Us",
    href: "contactus",
  },
  {
    title: "User Agreement",
    href: "useragreement",
  },
  {
    title: "Copyright Policy",
    href: "copyright",
  },
  {
    title: "Feedback",
    href: "feedback",
  },
];

const Footer = () => {
  return (
    <div className="w-screen h-full bg-slate-100 flex justify-center items-center">
      <div className="space-x-4 opacity-60 text-xs">
        {links.map((link) => (
          <Link href={link.href} key={link.href}>
            {link.title}
          </Link>
        ))}
      </div>
    </div>
  );
};

export default Footer;
