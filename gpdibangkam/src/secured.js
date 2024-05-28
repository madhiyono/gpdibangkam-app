import CryptoJS from "crypto-js";

export function encryptKey(data, key) {
  const dataHasBeenEncrypt = CryptoJS.AES.encrypt(data, key);
  return dataHasBeenEncrypt.toString();
}

export function decryptKey(encryptedData, key) {
  const dataHasBeenDecrypt = CryptoJS.AES.decrypt(encryptedData, key);
  return dataHasBeenDecrypt.toString(CryptoJS.enc.Utf8);
}
