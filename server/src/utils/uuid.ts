import { v4 as uuidV4 } from "uuid";

export function generateUniqueCode() {
  return uuidV4().replace(/-/g, "").substring(0, 25);
}

export function generateCodeOtp(length:number = 7) {
  let result = "";
  for (let i = 0; i < length; i++) {
    result += Math.floor(Math.random() * 10); // Thêm số từ 0 đến 9
  }
  return result;
}