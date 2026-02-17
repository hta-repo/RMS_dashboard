
// Live URLs
// export const baseURL = "http://dev.nexrupt.com:5000/";
// export const imageBaseUrl = "http://dev.nexrupt.com:5000/";

// Live URLs
export const baseURL = "https://api.reelmyskill.com/";
export const imageBaseUrl = "https://api.reelmyskill.com/";

//   Local URL
// export const baseURL = "http://192.168.100.62:5000/";
// export const imageBaseUrl = "http://192.168.100.62:5000/";

export const commaSeparated = (value) => {
  return value
    ? value.toLocaleString(undefined, { minimumFractionDigits: 0 })
    : // ? value.toLocaleString(undefined, { minimumFractionDigits: 2 })
    0.0;
};

export const FirstLetterCapital = (str) => {
  return str.charAt(0).toUpperCase() + str.slice(1);
};

export const profilePic = (image, defaultImage) => {
  let url;
  if (image) {
    url = imageBaseUrl + image;
  }
  else {
    url = defaultImage;
  }
  return url;
};

export const CapitalWord = (value) => {
  if (!value) {
    return '';
  }
  return value.split(' ').map(word => word.charAt(0).toUpperCase() + word.slice(1)).join(' ');
};

export const StatusesArray = [
  { label: 'Pending', value: 'pending' },
  { label: 'Approved', value: 'approved' },
  { label: 'Rejected', value: 'rejected' },
];

export const TypeArray = [
  { label: 'Company', value: 'company' },
  { label: 'User', value: 'user' },
];

export const priceArray = [
  { label: 'Percent', value: 'percent' },
  { label: 'Price', value: 'price' },
];

export const genderArray = [
  { label: 'Male', value: 'male' },
  { label: 'Female', value: 'female' },
];

export const userTypeArray = [
  { label: 'Company', value: 'company' },
  { label: 'User', value: 'user' },
  { label: 'Moderator', value: 'moderator' },
];