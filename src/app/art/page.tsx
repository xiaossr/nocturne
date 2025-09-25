import Navbar from "@/app/navbar";
import Image from "next/image";
import getImagesByCreation from "@/app/gallery";

export default function ArtPage() {
    const images = getImagesByCreation("art");
    const dateKeys = Object.keys(images).reverse();

    return (
    <div className="font-sans min-h-screen mx-auto p-8 pb-20 gap-16 sm:p-20">
    <Navbar />
    <header className="text-7xl font-title font-bold text-left">my art.</header>
    <div className="justify-left items-left">
            {dateKeys.map((day) => (
                <section key={day}>
                <h2 className="mt-8 mb-4 text-lg font-semibold">{day}</h2>
                <div className="flex flex-wrap gap-3 mx-5">
                    {images[day].map((img) => (
                        <Image
                        key={img.src}
                        src={img.src}
                        alt=""
                        width={450} // required by next/image but ignored when class sets size
                        height={0}
                        className="max-h-[250px] w-auto object-contain rounded-lg"
                        />
                    ))}
                </div>
                </section>
            ))}
        </div>
    </div>
    );
}