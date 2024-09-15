import Image from "next/image";
import fs from "fs";
import path from "path";
import sizeOf from "image-size";

// Showcase height in rem units
const showcaseHeight = 12;

const getStaticProps = async () => {
  // Path to the images folder
  const imagesDirectory = path.join(process.cwd(), "public/showcase");

  // Read all files in the images folder
  const filenames = fs.readdirSync(imagesDirectory);

  // Get the width and height of each image
  const images = filenames.map((filename) => {
    const filePath = path.join(imagesDirectory, filename);
    const dimensions = sizeOf(filePath); // Get image dimensions

    return {
      fileName: filename, // Image filename
      filePath: `/showcase/${filename}`, // Image file path
      width: dimensions.width, // Image width
      height: dimensions.height, // Image height
    };
  });

  // Return images with dimensions as props
  return images;
};

import "@/assets/styles/autoscrolling.css";

const Showcase: React.FC = async () => {
  const images = await getStaticProps();
  const speed = 50000;

  return (
    <div className="flex items-center h-[16rem]">
      <div className="flex h-full overflow-hidden">
        {/* Auto-scrolling section */}
        <section
          className="autoscroll h-full flex items-center"
          style={{ "--speed": `${speed}ms` } as React.CSSProperties}
        >
          {images.map((image) => {
            // Calculate dynamic width based on aspect ratio
            const calculatedWidth =
              ((image.width ? image.width : 0) * showcaseHeight) /
              (image.height ?? 1);

            return (
              <div
                key={image.fileName}
                style={{
                  width: `${calculatedWidth}rem`,
                  height: `${showcaseHeight}rem`,
                  margin: "0 1rem",
                  position: "relative",
                }}
              >
                <Image
                  src={image.filePath}
                  alt={image.fileName}
                  fill
                  sizes={`${calculatedWidth}rem`}
                  style={{
                    objectFit: "contain",
                  }}
                />
              </div>
            );
          })}
        </section>
        <section
          className="autoscroll-end h-full flex items-center"
          style={{ "--speed": `${speed}ms` } as React.CSSProperties}
        >
          {images.map((image) => {
            // Calculate dynamic width based on aspect ratio
            const calculatedWidth =
              ((image.width ? image.width : 0) * showcaseHeight) /
              (image.height ?? 1);

            return (
              <div
                key={image.fileName}
                style={{
                  width: `${calculatedWidth}rem`,
                  height: `${showcaseHeight}rem`,
                  margin: "0 1rem",
                  position: "relative",
                }}
              >
                <Image
                  src={image.filePath}
                  alt={image.fileName}
                  fill
                  sizes={`${calculatedWidth}rem`}
                  style={{
                    objectFit: "contain",
                  }}
                />
              </div>
            );
          })}
        </section>
      </div>
    </div>
  );
};

export default Showcase;
