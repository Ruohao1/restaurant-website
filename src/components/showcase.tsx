import Image from "next/image";

export default function Showcase() {
  return (
    <div className="mt-96">
      <h1>Image Showcase</h1>
      <Image
        src="/android-chrome-512x512.png" // Le chemin relatif depuis le dossier public
        alt="Image Showcase"
        width={100}
        height={100}
      />
      <Image
        src="/1.png" // Le chemin relatif depuis le dossier public
        alt="Image Showcase"
        width={100}
        height={100}
        unoptimized
      />
      <Image
        src="/images/1.png" // Le chemin relatif depuis le dossier public
        alt="Image Showcase"
        width={100}
        height={100}
        unoptimized
      />
    </div>
  );
}
