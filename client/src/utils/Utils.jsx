import { getStorage, ref, getDownloadURL } from "firebase/storage";

function treatAsUTC(date) {
  var result = new Date(date);
  result.setMinutes(result.getMinutes() - result.getTimezoneOffset());
  return result;
}

export function daysBetween(startDate, endDate) {
  var millisecondsPerDay = 24 * 60 * 60 * 1000;
  return (treatAsUTC(endDate) - treatAsUTC(startDate)) / millisecondsPerDay;
}

export async function getImageURL(uri) {
  let url;
  const storage = getStorage();

  try {
    url = await getDownloadURL(ref(storage, uri));
  } catch (err) {
    console.error(err);
  }

  return url;
}
