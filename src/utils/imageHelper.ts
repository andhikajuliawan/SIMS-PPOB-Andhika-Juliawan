import defaultProfile from '/assets/account/profile.png';

export const getValidProfileImage = (apiImage: string) => {
  if (!apiImage || apiImage.includes('/null') || apiImage.includes('undefined')) {
    return defaultProfile;
  }
  return apiImage;
};