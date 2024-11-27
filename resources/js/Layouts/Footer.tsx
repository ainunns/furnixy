import ApplicationLogo from "@/Components/ApplicationLogo";
import Typography from "@/Components/Typography";
import { Link } from "@inertiajs/react";
import { Instagram } from "lucide-react";
import { Twitter } from "lucide-react";
import { Facebook } from "lucide-react";

export default function Footer() {
  return (
    <footer className="bg-secondary-500 py-8 px-12 lg:px-24">
      <div className="flex flex-col lg:flex-row gap-4">
        <div className="flex items-center w-1/2 gap-2">
          <ApplicationLogo width="50px" height="50px" />
          <Typography variant="h3" className="text-primary-500">
            Furnixy
          </Typography>
        </div>
        {/* Quick Links */}
        <div className="flex w-1/2 flex-col gap-2">
          <Typography
            className="text-primary-500 underline decoration-2"
            variant="h3"
          >
            Quick Links
          </Typography>
          <div className="flex items-center gap-2">
            <Link href="/">
              <Typography className="text-primary-500 font-semibold">
                Home
              </Typography>
            </Link>
          </div>
          <div className="flex items-center gap-2">
            <Link href="/product">
              <Typography className="text-primary-500 font-semibold">
                Product
              </Typography>
            </Link>
          </div>
          <div className="flex items-center gap-2">
            <Link href="/login">
              <Typography className="text-primary-500 font-semibold">
                Login
              </Typography>
            </Link>
          </div>
          <div className="flex items-center gap-2">
            <Link href="/register">
              <Typography className="text-primary-500 font-semibold">
                Register
              </Typography>
            </Link>
          </div>
        </div>
        {/* Our Contact */}
        <div className="flex w-1/2 flex-col gap-2">
          <Typography
            className="text-primary-500 underline decoration-2"
            variant="h3"
          >
            Our Contact
          </Typography>
          <div className="flex items-center gap-2">
            <Instagram className="text-primary-500" />
            <Typography className="text-primary-500 font-semibold">
              Instagram
            </Typography>
          </div>
          <div className="flex items-center gap-2">
            <Twitter className="text-primary-500" />
            <Typography className="text-primary-500 font-semibold">
              Twitter
            </Typography>
          </div>
          <div className="flex items-center gap-2">
            <Facebook className="text-primary-500" />
            <Typography className="text-primary-500 font-semibold">
              Facebook
            </Typography>
          </div>
        </div>
      </div>
      <div className="mt-4 h-[2px] bg-primary-500"></div>
      <Typography className="mt-4">
        © Copyright Furnixy! 2024. All Rights Reserved
      </Typography>
    </footer>
  );
}
