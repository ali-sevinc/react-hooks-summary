import Ingredient from "../models/ingredient";
import { URL } from "./consts";

export async function getData(searchValue?: string) {
  let error: string | boolean = false;
  let isLoading: boolean = true;
  const convertedData: Ingredient[] = [];
  const query =
    searchValue?.length === 0
      ? ""
      : `?orderBy="title"&equalTo="${searchValue}"`;
  try {
    const res = await fetch(URL + ".json" + query);
    if (!res.ok) throw new Error("Something went wrong");
    const resData = await res.json();

    for (const key in resData) {
      convertedData.push({
        id: key,
        title: resData[key].title,
        amount: resData[key].amount,
      });
    }
  } catch (err) {
    error = "Something went wrong";
  } finally {
    isLoading = false;
  }
  return { isLoading, error, convertedData };
}

export async function addData(data: { title: string; amount: number }) {
  let error: string | boolean = false;
  let fetchData: string = "";
  try {
    const res = await fetch(URL + ".json", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(data),
    });
    if (!res.ok) throw new Error("Something went wrong");
    const resData = await res.json();
    fetchData = resData.name;
  } catch (err) {
    error = "Something went wrong";
  }
  return { error, fetchData };
}
export async function deleteData(id: string) {
  let error: string | false = false;
  try {
    const res = await fetch(URL + "/" + id + ".json", {
      method: "DELETE",
      headers: {
        "Content-Type": "application/json",
      },
    });
    if (!res.ok) throw new Error("Something went wrong");
  } catch (err) {
    error = "Deleting ingredient failed";
  }
  return error;
}

/*all requests in single function*/
interface HttpValueType {
  id?: string;
  method: string;
  body?: { title: string; amount: number };
  searchValue?: string;
}
export async function https({ id, method, body, searchValue }: HttpValueType) {
  let error: boolean = false;
  let data: Ingredient[] | string = [];

  let url = URL;
  if (method === "DELETE") url += "/" + id + ".json";
  if (method === "POST" || method === "GET") url += ".json";

  const query =
    searchValue === undefined
      ? ""
      : `?orderBy="title"&equalTo="${searchValue}"`;
  url += query;

  try {
    const response = await fetch(url, {
      method: method,
      body: body ? JSON.stringify(body) : null,
      headers: {
        "Content-Type": "application/json",
      },
    });
    if (!response.ok) throw new Error("Ops...");
    const resData = await response.json();

    const convertedData: Ingredient[] = [];
    if (method === "GET") {
      for (const key in resData) {
        convertedData.push({
          id: key,
          title: resData[key].title,
          amount: resData[key].amount,
        });
      }
      data = convertedData;
    }
    if (method === "POST") {
      data = resData.name;
    }
    if (method === "DELETE") {
      data = id!;
    }
  } catch (err) {
    error = true;
  }

  return { data, error };
}
