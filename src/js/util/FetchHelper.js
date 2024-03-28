export default class FetchHelper {
  static backEndIp = "http://localhost:8081/backend";
  static async fetch(method, targetPath, bodyObject) {
    try {
      if (method == "POST") {
        const response = await fetch(FetchHelper.backEndIp + targetPath, {
          method: method,
          mode: "cors", // no-cors, *cors, same-origin
          headers: {
            "Content-Type": "application/x-www-form-urlencoded", // Set the Content-Type header for URL-encoded form data
          },
          credentials: "include", // Make fetch() use cookies
          body: new URLSearchParams(Object.entries(bodyObject)).toString(), // Convert the object to a string using urlSearchParam format
        });
        const result = await response.json();
        return result;
      }
      if (method == "GET") {
        const response = await fetch(FetchHelper.backEndIp + targetPath, {
          method: method,
          mode: "cors", // no-cors, *cors, same-origin
          headers: {
            "Content-Type": "application/x-www-form-urlencoded", // Set the Content-Type header for URL-encoded form data
          },
          credentials: "include", // Make fetch() use cookies
        });
        const result = await response.json();
        return result;
      }
    } catch (error) {
      console.log("Catch an exception when fetching:");
      console.log(error.message);
    }
  }
  static async uploadImg(inputElement) {
    var data = new FormData();
    data.append("file", inputElement.files[0]);

    const response = await fetch(FetchHelper.backEndIp + "/uploadImg", {
      mode: "cors", // no-cors, *cors, same-origin
      credentials: "include", // Make fetch() use cookies
      method: "POST",
      body: data,
    });
    const result = await response.json();
    return result;
  }
}
