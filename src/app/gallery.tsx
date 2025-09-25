import fs from "node:fs"
import path from "node:path"

const exts = new Set([".jpg", ".jpeg", ".png"]);
type Img = { src: string; ts: Date; dayKey: string };

export default function getImagesByCreation(subdir: string): Record<string, Img[]> {
    const IMG_DIR = path.join("public", subdir);
    if (!fs.existsSync(IMG_DIR)) return {};

    const formatter = new Intl.DateTimeFormat("en-US", {
        year: "numeric",
        timeZone: "UTC",
    });

   const imgs: Img[] = fs
        .readdirSync(IMG_DIR)
        .filter((f) => exts.has(path.extname(f).toLowerCase()))
        .map((f) => {
        const p = path.join(IMG_DIR, f);
        const st = fs.statSync(p);
            const ts = st.birthtime ? st.birthtime : st.mtime;
            const dayKey = formatter.format(ts);
            return { src: `/art/${f}`, ts, dayKey };
        })
        .sort((a, b) => b.ts.getTime() - a.ts.getTime());

    return imgs.reduce<Record<string, Img[]>>((acc, img) => {
        (acc[img.dayKey] ||= []).push(img);
        return acc;
    }, {});
}