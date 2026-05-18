import Link from "next/link";
import Image from "next/image";

export default function BannerMobile({ data }) {
  if (!data || data.length === 0) return null;

  return (
    <section className="w-full relative h-screen sm:hidden z-0 before:absolute before:top-0 before:content-[''] before:bottom-0 before:w-full before:h-full before:bg-gradient-to-t before:from-black before:to-black/0 before:opacity-[0.5]">
      <Image
        src={data[0]?.image_mobile}
        className="w-full h-full object-cover absolute top-0 left-0 -z-1 "
        width="440"
        height="930"
        alt="mobileBanner"
        priority
        fetchPriority="high"
      />
      <div className="container flex items-end h-full py-[60px]">
        <div className="relative z-1 w-full">
          <div className="text-[40px] xs:text-[50px] text-white font-medium mb-[10px] uppercase leading-[45px] xs:leading-[55px]">
            {data[0]?.title?.split(" ")[0]}
            <br />
            {data[0]?.title?.split(" ")[1]}
          </div>
          <p className="text-[16px] xs:text-[20px] text-white max-w-[90%] mb-[25px] xs:mb-[35px]">
            {data[0]?.description}
          </p>

          {data[0]?.action_type && data[0]?.action_url && (
            <Link
              href={data[0]?.action_url}
              className="text-[16px] xs:text-[18px] text-white font-medium w-fit flex items-center justify-center h-[40px] xs:h-[50px] min-w-[160px] xs:min-w-[180px] p-[8px] border border-white"
            >
              {data[0]?.action_title}
              <div className="w-[14px] xs:w-[17px] h-[14px] flex items-center mx-[10px]">
                <svg
                  className="w-full h-full object-contain"
                  viewBox="0 0 18 14"
                >
                  <g clipPath="url(#clip0_1342_4984)">
                    <path
                      d="M9.38156 13.4279C9.27201 13.43 9.16155 13.4034 9.0641 13.3431C8.78295 13.17 8.69731 12.7942 8.86648 12.5133C8.8807 12.4885 10.6478 9.53965 14.0209 7.68392H0.907875C0.574073 7.68392 0.302612 7.41246 0.302612 7.07865C0.302612 6.74485 0.574073 6.47339 0.907875 6.47339H14.0209C10.6665 4.62824 8.87949 1.66639 8.86194 1.63673C8.6964 1.35407 8.7881 0.977903 9.07045 0.810547C9.35674 0.640771 9.73382 0.739126 9.90481 1.02693C10.1799 1.46574 12.7595 5.39965 17.3865 6.48822C17.6634 6.55631 17.8552 6.79872 17.8552 7.07896C17.8552 7.35919 17.6646 7.60221 17.3916 7.66848C12.745 8.76098 10.1742 12.7 9.89634 13.1458C9.78739 13.3204 9.58584 13.4239 9.38156 13.4279Z"
                      fill="white"
                    />
                  </g>
                  <defs>
                    <clipPath id="clip0_1342_4984">
                      <rect width="18" height="14" fill="white" />
                    </clipPath>
                  </defs>
                </svg>
              </div>
            </Link>
          )}
        </div>
      </div>
    </section>
  );
}
