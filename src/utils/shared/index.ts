export const getImageKey = (image: string): string => {
  return image.split("/").pop() as string;
};
