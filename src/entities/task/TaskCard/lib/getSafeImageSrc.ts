import noImage from "@/shared/assets/images/no-image.jpeg";

export const getSafeImageSrc = (src?: string) => {
  if (!src) return noImage;
  if (src.includes("undefined") || src.includes("null")) return noImage;
  return src.startsWith("http") ? src : noImage;
};
