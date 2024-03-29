import Axios, { AxiosRequestConfig } from "axios";

type Props = {
  method: string;
  url: string;
  req?: any;
  token?: string;
  customeHeader?: Record<string, string>;
};

const NextApiCaller = async ({
  method,
  url,
  req,
  token,
  customeHeader,
}: Props): Promise<any> => {
  try {
    if (
      method == null ||
      method == undefined ||
      method == "" ||
      method.length == 0
    ) {
      throw new Error("Method is not defined");
    }

    let headers: Record<string, string> =
      customeHeader != undefined
        ? customeHeader
        : {
            "Content-Type": "application/json",
          };

    if (token) headers["Authorization"] = `Bearer ${token}`;

    let config: AxiosRequestConfig<any> = {
      method: method,
      headers: headers,
      url: process.env.NEXT_PUBLIC_BASE_URL_LOCAL_API + url,
      data: req,
      timeout: 30000,
    };

    var response = await Axios.request(config);
    if (response.status == 200) {
      return response.data;
    }

    if (response.status == 401) {
      throw new Error("Unauthorized");
    }

    throw new Error(response.data.message);
  } catch (error) {
    throw error;
  }
};

export { NextApiCaller };
