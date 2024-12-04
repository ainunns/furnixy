import Typography from "@/Components/Typography";
import Layout from "@/Layouts/Layout";
import { Head } from "@inertiajs/react";
import { A11y, Autoplay } from "swiper/modules";

import { Swiper, SwiperSlide } from "swiper/react";

import "swiper/css";

export default function Welcome() {
  return (
    <Layout>
      <Head title="Welcome" />
      <section className="relative h-screen overflow-hidden">
        <div className="absolute inset-0">
          <img
            src="/images/landing-1.png"
            alt="kursi"
            className="w-full h-full object-cover"
          />
        </div>
        <div className="absolute right-0 top-20 flex items-center justify-end p-8 z-10">
          <Typography variant="j1" className="text-right text-primary-700">
            Elevate Your Space, <br /> Redefine Your Comfort
          </Typography>
        </div>
      </section>

      <div className="px-6">
        <Swiper
          modules={[A11y, Autoplay]}
          spaceBetween={50}
          slidesPerView={1}
          navigation
          pagination={{ clickable: true }}
          loop={true}
          autoplay={{ delay: 2500, disableOnInteraction: false }}
          className="w-full rounded-lg py-[96px!important]"
        >
          <SwiperSlide>
            <div className="flex flex-col justify-center w-full bg-secondary-400 h-[250px] rounded-lg">
              <div className="px-16">
                <Typography variant="j1" className="text-primary-400">
                  Enjoy Discounts Up to 70%!
                </Typography>
                <Typography className="text-secondary-900">
                  Shop now and grab special prices on selected items. Don’t miss
                  out—promo ends this month!
                </Typography>
              </div>
            </div>
          </SwiperSlide>
          <SwiperSlide>
            <div className="flex flex-col justify-center w-full bg-secondary-400 h-[250px] rounded-lg">
              <div className="px-16">
                <Typography variant="j1" className="text-primary-400">
                  New Arrivals Are Here
                </Typography>
                <Typography className="text-secondary-900">
                  Explore our newest designs made just for you. Limited
                  stock—get yours before they’re gone!
                </Typography>
              </div>
            </div>
          </SwiperSlide>
          <SwiperSlide>
            <div className="flex flex-col justify-center w-full bg-secondary-400 h-[250px] rounded-lg">
              <div className="px-16">
                <Typography variant="j1" className="text-primary-400">
                  Today's Flash Sale!
                </Typography>
                <Typography className="text-secondary-900">
                  Prices start at Rp99.999 on top-selling products. Available
                  for a few hours only—shop now!
                </Typography>
              </div>
            </div>
          </SwiperSlide>
        </Swiper>
      </div>
      <section className="flex flex-col py-8">
        {/* 1 */}
        <div className="flex flex-col lg:flex-row items-center justify-center">
          <div className="lg:w-1/2 flex justify-center">
            <img
              src="/images/jumbotron-2.png"
              alt="kursi"
              width={960}
              height={1200}
              className="w-1/2"
            />
          </div>
          <div className="lg:w-1/2 px-8 flex flex-col justify-center items-center">
            <Typography variant="h1" className="text-primary-500">
              Modern Designs
            </Typography>
            <Typography>
              Redefine your style with contemporary elegance.
            </Typography>
          </div>
        </div>
        {/* 2 */}
        <div className="flex flex-col-reverse lg:flex-row items-center justify-center">
          <div className="lg:w-1/2 px-8 flex flex-col justify-center items-center">
            <Typography variant="h1" className="text-primary-500">
              Top-Quality Craftsmanship
            </Typography>
            <Typography>Experience perfection in every detail.</Typography>
          </div>
          <div className="lg:w-1/2 flex justify-center">
            <img
              src="/images/jumbotron.png"
              alt="kursi"
              width={960}
              height={1200}
              className="w-1/2"
            />
          </div>
        </div>
        {/* 3 */}
        <div className="flex flex-col lg:flex-row items-center justify-center">
          <div className="lg:w-1/2 flex justify-center">
            <img
              src="/images/jumbotron-3.png"
              alt="kursi"
              width={960}
              height={1200}
              className="w-1/2"
            />
          </div>
          <div className="lg:w-1/2 px-8 flex flex-col justify-center items-center">
            <Typography variant="h1" className="text-primary-500">
              Free Shipping & Easy Returns
            </Typography>
            <Typography>
              Shop with confidence, we’ve got you covered.
            </Typography>
          </div>
        </div>
      </section>

      <div className="my-8 flex justify-center space-x-2">
        <span className="w-1 h-1 bg-primary-300 rounded-full"></span>
        <span className="w-1 h-1 bg-primary-300 rounded-full"></span>
        <span className="w-1 h-1 bg-primary-300 rounded-full"></span>
      </div>

      <section className="flex flex-col justify-center items-center px-12 py-8 gap-6 mb-20">
        <div>
          <Typography variant="h1" className="text-primary-500">
            What Our Customer Says
          </Typography>
        </div>
        <div className="flex flex-col lg:flex-row gap-6">
          <div className="rounded-lg bg-primary-700 p-4 h-[150px] flex flex-col justify-center">
            <Typography className="text-white">
              "The quality of the furniture is outstanding! My living room has
              never looked better. The delivery was smooth, and the assembly was
              so easy. Highly recommend this store!"
            </Typography>
            <Typography className="text-white">- Emily J.</Typography>
          </div>
          <div className="rounded-lg bg-secondary-500 p-4 h-[150px] flex flex-col justify-center">
            <div>
              <Typography>
                "I love my new dining table set! It’s sturdy, elegant, and fits
                perfectly in my home. The customer service team was super
                helpful with my queries."
              </Typography>
              <Typography>- James T.</Typography>
            </div>
          </div>
          <div className="rounded-lg bg-primary-700 p-4 h-[150px] flex flex-col justify-center">
            <div>
              <Typography className="text-white">
                "Affordable prices, premium quality, and excellent designs. The
                minimalist chair I bought exceeded my expectations. Will
                definitely shop here again!"
              </Typography>
              <Typography className="text-white">- Shopia L.</Typography>
            </div>
          </div>
        </div>
      </section>
    </Layout>
  );
}
