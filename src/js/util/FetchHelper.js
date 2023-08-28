export default class FetchHelper {
    static async fetch(method, targetIP, bodyObject) {
      try {
        if(method == "POST") {
          const response = await fetch(targetIP, {
            method: method,
            mode: "cors", // no-cors, *cors, same-origin
            headers: {
              "Content-Type": "application/x-www-form-urlencoded", // Set the Content-Type header for URL-encoded form data
            },
            credentials: 'include', // Make fetch() use cookies
            body: new URLSearchParams(Object.entries(bodyObject)).toString(), // Convert the object to a string using urlSearchParam format
          });
          const result = await response.json();
          return result;
        }
        if(method == "GET") {
          const response = await fetch(targetIP, {
            method: method,
            mode: "cors", // no-cors, *cors, same-origin
            headers: {
              "Content-Type": "application/x-www-form-urlencoded", // Set the Content-Type header for URL-encoded form data
            },
            credentials: 'include', // Make fetch() use cookies
          });
          const result = await response.json();
          return result;
        }
      } catch(error) {
        console.log("Catch an exception when fetching:");
        console.log(error.message);
      }
      
        
    }
}