// Get image URL from Marvel's thumbnail object
export const getImageUrl = (
  thumbnail: { path: string; extension: string },
  size: string = "standard_xlarge"
) => {
  // Ensure we're not using a "not available" image
  if (thumbnail.path.includes("image_not_available")) {
    return null;
  }

  // Marvel API returns http URLs but we want https
  const securedPath = thumbnail.path.replace("http://", "https://");
  return `${securedPath}/${size}.${thumbnail.extension}`;
};
