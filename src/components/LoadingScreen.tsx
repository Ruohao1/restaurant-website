// src/components/LoadingScreen.tsx
import Image from "next/image";

const LoadingScreen = () => {
  return (
    <div className="fixed inset-0 z-50 flex flex-col items-center justify-center bg-gray-50">
      <Image
        src="/logo.svg"
        alt="Loading..."
        width={80}
        height={80}
        className="mb-4"
      />
      <div className="animate-spin rounded-full h-16 w-16 border-t-4 border-blue-500"></div>
      <p className="mt-4 text-gray-600">Loading...</p>
    </div>
  );
};

export default LoadingScreen;
