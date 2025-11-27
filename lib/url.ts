import qs from "query-string";

interface UrlQueryParams {
   params: string;
   key: string;
   value: string;
}

interface RemoveUrlQueryParams {
   params: string;
   //arrays of String
   keysToRemove: string[];
}
// update URL query params with a new value
// accept a key and value
// params is for knowing existong params it has so we can append the new key and value to it
export const formUrlQuery = ({ params, key, value }: UrlQueryParams) => {
   //What parse does is parse the params to an object {query:"Really hard react"}
   const queryString = qs.parse(params);
   //updating with new key and value which we're appending to the query string
   queryString[key] = value;

   return qs.stringifyUrl({
      //taking the base url
      url: window.location.pathname,
      //appending it on the new URL to form a new url
      query: queryString,
   });
};

export const removeKeysFromUrlQuery = ({
   params,
   keysToRemove,
}: RemoveUrlQueryParams) => {
   //What parse does is parse the params to an object {query:"Really hard react"}
   const queryString = qs.parse(params);
   //delete queryString's key for each key in keysToRemove
   keysToRemove.forEach((key) => {
      delete queryString[key];
   });

   return qs.stringifyUrl(
      {
         //taking the base url
         url: window.location.pathname,
         //appending it on the new URL to form a new url
         query: queryString,
      },
      { skipNull: true } //prevent filter=null happens
   );
};
