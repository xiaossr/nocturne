import fs, { readFile } from "node:fs"
import path from "node:path"
import Image from "next/image";
import exifr from "exifr";

const IMG_DIR = path.join(process.cwd(), "public", "art");
const exts = new Set([".jpg", ".jpeg", ".png"]);

type Img = { src: string; ts: Date; dayKey: string };

async function getImagesByCreation(): Promise<Record<string, Img[]>> {
    if (!fs.existsSync(IMG_DIR)) return {};

    const formatter = new Intl.DateTimeFormat("en-US", {
        year: "numeric",
        timeZone: "UTC",
    });

    const files = fs.readdirSync(IMG_DIR).filter((f) => exts.has(path.extname(f).toLowerCase()));
    const imgs: Img[] = [];
    for (const f of files) {
        const filepath = path.join(IMG_DIR, f);

        let ts: Date;
        try {
            const buf = fs.readFileSync(filepath);
            const meta = await exifr.parse(buf, ["DateTimeOriginal", "CreateDate"]);
            ts =
                meta?.DateTimeOriginal ??
                meta?.CreateDate;
        } catch (error: unknown) {
            if (error instanceof Error) { // Type guard: checks if 'error' is an instance of the built-in Error class
                console.error("Caught a standard Error:", error.message);
            } else if (typeof error === 'string') { // Type guard: checks if 'error' is a string
                console.error("Caught a string error:", error);
            } else {
                console.error("Caught an unknown error type:", error);
            }
            ts = fs.statSync(filepath).birthtime;
        }
        ts = fs.statSync(filepath).birthtime;

        imgs.push({
            src: `/art/${f}`,
            ts,
            dayKey: formatter.format(ts),
        });
    }
    imgs.sort((a, b) => b.ts.getTime() - a.ts.getTime());

    return imgs.reduce<Record<string, Img[]>>((acc, img) => {
        (acc[img.dayKey] ||= []).push(img);
        return acc;
    }, {});
}

export default async function ArtPage() {
    const images = await getImagesByCreation();
    const dateKeys = Object.keys(images).reverse();

    return (
    <div className="font-sans grid grid-rows-[20px_1fr_20px] items-center justify-items-center min-h-screen p-8 pb-20 gap-16 sm:p-20">
        <header className="text-7xl font-title font-bold text-left">my art.</header>
        <div>
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