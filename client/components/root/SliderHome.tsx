"use client";
import React from "react";
import {
  Carousel,
  CarouselApi,
  CarouselContent,
  CarouselItem,
} from "@/components/ui/carousel";
import Autoplay from "embla-carousel-autoplay";
import { cn } from "@/lib/utils";

const SliderHome = () => {
  const [api, setApi] = React.useState<CarouselApi>();
  const [current, setCurrent] = React.useState(0);
  React.useEffect(() => {
    if (!api) {
      return;
    }
    setCurrent(api.selectedScrollSnap() + 1);
    api.on("select", () => {
      setCurrent(api.selectedScrollSnap() + 1);
    });
  }, [api]);
  return (
    <div>
      <Carousel
        opts={{
          align: "start",
          loop: true,
        }}
        plugins={[
          Autoplay({
            delay: 3000,
          }),
        ]}
        setApi={setApi}
        className="w-full"
      >
        <CarouselContent className="w-full">
          <CarouselItem className="w-full">
            <div className="slider-home  bg-gradient-to-r from-[#fd225c] to-[#fd9004]">
              <div className="flex flex-col justify-center flex-shrink-0 w-full md:w-2/3 lg:w-1/2 max-w-full px-2 sm:px-4 md:px-9 text-white leading-4">
                <h2 className="mb-4 text-3xl leading-5 font-bold">
                  Đa dạng bài học4
                </h2>
                <p className="max-w-[600px] mb-6 leading-6">
                  Áo Polo F8 với thiết kế tối giản, lịch sự, phù hợp mặc mọi
                  lúc, mọi nơi. Chất áo mềm mại, thoáng mát, ngực và tay áo in
                  logo F8 - Fullstack.
                </p>
              </div>
            </div>
          </CarouselItem>
          <CarouselItem className="w-full">
            <div className="slider-home  bg-gradient-to-r from-[#6828fa] to-[#ffbaa4]">
              <div className="flex flex-col justify-center flex-shrink-0 w-full md:w-2/3 lg:w-1/2 max-w-full px-2 sm:px-4 md:px-9 text-white leading-4">
                <h2 className="mb-4 text-3xl leading-5 font-bold">
                  Đa dạng bài học4
                </h2>
                <p className="max-w-[600px] mb-6 leading-6">
                  Áo Polo F8 với thiết kế tối giản, lịch sự, phù hợp mặc mọi
                  lúc, mọi nơi. Chất áo mềm mại, thoáng mát, ngực và tay áo in
                  logo F8 - Fullstack.
                </p>
              </div>
            </div>
          </CarouselItem>
          <CarouselItem className="w-full">
            <div className="slider-home  bg-gradient-to-r from-[#007efe] to-[#06c3fe]">
              <div className="flex flex-col justify-center flex-shrink-0 w-full md:w-2/3 lg:w-1/2 max-w-full px-2 sm:px-4 md:px-9 text-white leading-4">
                <h2 className="mb-4 text-3xl leading-5 font-bold">
                  Đa dạng bài học4
                </h2>
                <p className="max-w-[600px] mb-6 leading-6">
                  Áo Polo F8 với thiết kế tối giản, lịch sự, phù hợp mặc mọi
                  lúc, mọi nơi. Chất áo mềm mại, thoáng mát, ngực và tay áo in
                  logo F8 - Fullstack.
                </p>
              </div>
            </div>
          </CarouselItem>
          <CarouselItem className="w-full">
            <div className="slider-home  bg-gradient-to-r from-[#2877fa] to-[#6717cd]">
              <div className="flex flex-col justify-center flex-shrink-0 w-full md:w-2/3 lg:w-1/2 max-w-full px-2 sm:px-4 md:px-9 text-white leading-4">
                <h2 className="mb-4 text-3xl leading-5 font-bold">
                  Đa dạng bài học4
                </h2>
                <p className="max-w-[600px] mb-6 leading-6">
                  Áo Polo F8 với thiết kế tối giản, lịch sự, phù hợp mặc mọi
                  lúc, mọi nơi. Chất áo mềm mại, thoáng mát, ngực và tay áo in
                  logo F8 - Fullstack.
                </p>
              </div>
            </div>
          </CarouselItem>
        </CarouselContent>
      </Carousel>

      <div className="w-full h-8 flex items-center justify-center px-4 gap-2">
        {Array.from({ length: 4 }).map((item, index) => (
          <div
            key={index}
            className={cn(
              "w-12 h-3 bg-gray-100 rounded-md cursor-pointer",
              index + 1 === current && "bg-gray-200"
            )}
            onClick={() => {
              api?.scrollTo(index);
            }}
          ></div>
        ))}
      </div>
    </div>
  );
};

export default SliderHome;
