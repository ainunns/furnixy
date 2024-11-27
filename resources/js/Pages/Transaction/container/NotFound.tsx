import ButtonLink from "@/Components/ButtonLink";
import Typography from "@/Components/Typography";

export default function NotFound() {
  return (
    <section className="w-full min-h-screen flex flex-col items-center justify-center gap-6">
      <svg
        width="214"
        height="211"
        viewBox="0 0 214 211"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
      >
        <path
          d="M53.6359 34.2879C53.6359 34.2879 85.795 58.6915 134.685 13.0606C178.104 -27.4639 213.557 36.4747 213.805 67.0935C214.127 106.758 170.385 138.493 191.613 164.546C212.84 190.598 149.516 233.617 115.388 196.386C72.9334 150.072 61.4317 187.702 37.2331 187.702C19.8654 187.702 -15.7923 144.548 8.28697 112.443C28.5493 85.4261 17.499 76.4598 12.1464 67.0935C4.42745 53.5853 22.76 16.9202 53.6359 34.2879Z"
          fill="#FAEAD5"
        />
        <path
          d="M105.668 89.7767V180.337L35.3556 149.967L35.691 59.7341L105.668 89.7767Z"
          fill="#AC8552"
        />
        <path
          d="M105.669 89.8308V180.391L175.639 151.07V60.0233L105.669 89.8308Z"
          fill="#DEBF97"
        />
        <path
          d="M105.668 89.7767L175.981 60.3264L106.22 29.4036L35.3556 59.5902L105.668 89.7767Z"
          fill="#C5A275"
        />
        <path
          d="M61.8607 48.2996L131.905 78.7873L132.541 101.005L152.139 92.9182L151.546 70.5606L79.4297 40.8157L61.8607 48.2996Z"
          fill="#936830"
        />
        <path
          d="M127.916 122.322C129.027 122.322 129.926 120.68 129.926 118.654C129.926 116.627 129.027 114.985 127.916 114.985C126.806 114.985 125.906 116.627 125.906 118.654C125.906 120.68 126.806 122.322 127.916 122.322Z"
          fill="#936830"
        />
        <path
          d="M160.299 109.129C161.409 109.129 162.309 107.486 162.309 105.46C162.309 103.434 161.409 101.791 160.299 101.791C159.189 101.791 158.289 103.434 158.289 105.46C158.289 107.486 159.189 109.129 160.299 109.129Z"
          fill="#936830"
        />
        <path
          d="M139.564 141.691L138.259 141.184C141.151 133.739 144.777 129.637 149.038 128.993C153.114 128.377 156.547 131.185 157.793 132.756L156.696 133.626C155.834 132.539 152.818 129.838 149.248 130.378C145.571 130.933 142.223 134.845 139.564 141.691Z"
          fill="#936830"
        />
      </svg>

      <div className="text-center">
        <Typography variant="h1" className="text-typo">
          No Orders Yet
        </Typography>
        <Typography variant="s2" className="text-neutral-400">
          Your order history is looking a bit empty. Start exploring our amazing
          products and make your first purchase!
        </Typography>
      </div>
      <ButtonLink variant="primary" href="/product">
        Shop Now
      </ButtonLink>
    </section>
  );
}
