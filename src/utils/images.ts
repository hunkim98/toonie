export const urlToObject = async (image: string) => {
  const response = await fetch(image);
  // here image is url/location of image
  const blob = await response.blob();
  const file = new File([blob], "file.extension", { type: blob.type });
  return file;
};
