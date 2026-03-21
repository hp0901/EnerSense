// utils/getAvatar.js

export const getAvatar = (user) => {
  if (user?.profileImage && user.profileImage.trim() !== "") {
    return user.profileImage;
  }

  if (user?.image && user.image.trim() !== "") {
    return user.image;
  }

  const first = user?.firstName || "User";
  const last = user?.lastName || "";

  return `https://ui-avatars.com/api/?name=${first}+${last}&background=0f172a&color=fff`;
};