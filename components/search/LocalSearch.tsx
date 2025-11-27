"use client";

import React, { useEffect, useRef, useState } from "react";
import { Input } from "../ui/input";
import Image from "next/image";
import { useSearchParams, useRouter, usePathname } from "next/navigation";
import { formUrlQuery, removeKeysFromUrlQuery } from "@/lib/url";

interface Props {
   route: string;
   imgSrc: string;
   placeholder: string;
   iconPosition: "left" | "right";
   otherClasses?: string;
}
const LocalSearch = ({
   route,
   imgSrc,
   placeholder,
   iconPosition,
   otherClasses,
}: Props) => {
   const pathname = usePathname();
   //useRouter comes from next/navigation not from next router
   const router = useRouter();
   // catch the query from the url and put it into searchQuery
   const searchParams = useSearchParams();
   const query = searchParams.get("query") || "";

   //store a reference to a previous Local Search results
   //to solve infinite re-renders on the Home Page
   const [search, setSearch] = useState(query || "");
   const previousSearchRef = useRef(search);

   //whenever we change the search query this function will be recalled
   //3.觸發useEffect
   useEffect(() => {
      // 如果當前 search 的值與上次成功處理的值一樣
      // （例如，在元件重新渲染或依賴項不變時），則立即退出 useEffect
      if (previousSearchRef.current === search) return;

      // 儲存當前值，為下一次渲染做準備
      previousSearchRef.current = search;

      //settimeout for avoiding deboucing
      // 當使用者 停止輸入超過 300 毫秒 時，setTimeout 裡面的路由更新程式碼才會被執行
      const delayDebounceFn = setTimeout(() => {
         if (search) {
            const newUrl = formUrlQuery({
               params: searchParams.toString(),
               key: "query",
               value: search,
            });

            router.push(newUrl, { scroll: false });
         } else {
            if (pathname === route) {
               const newUrl = removeKeysFromUrlQuery({
                  params: searchParams.toString(),
                  keysToRemove: ["query"],
               });
               //將瀏覽器 URL 更新為包含新 query 參數的 URL
               // { scroll: false } 避免了在更新 URL 時頁面跳回頂部
               router.push(newUrl, { scroll: false });
            }
         }
      }, 300);
      //useEffect 的清理函式 (Cleanup Function) 必須要有!!!。
      // 當 search 依賴項發生變化時，在執行新的 setTimeout 之前，
      // React 會先執行這個清理函式，取消前一次設定的計時器，計時器結束才會執行裡面的邏輯判斷
      return () => clearTimeout(delayDebounceFn);
   }, [searchParams, search, route, pathname, router]);
   return (
      <div
         className={`background-light800_darkgradient flex min-h-[56px] grow items-center gap-4 rounded-[10px] px-4 ${otherClasses}`}
      >
         <Image
            src={imgSrc}
            width={24}
            height={24}
            alt="Search"
            className="cursor-pointer"
         />
         {/* 1.使用者的每一次按鍵操作都會觸發<Input> 上的 onChange 事件*/}
         <Input
            type="text"
            placeholder={placeholder}
            value={search}
            //2.立即將 search 狀態更新為輸入框的新值
            onChange={(e) => setSearch(e.target.value)}
            className="paragraph-regular no-focus placeholder text-dark400_light700 border-none shadow-none outline-none"
         />
         {iconPosition === "right" && (
            <Image
               src={imgSrc}
               alt="search"
               width={15}
               height={15}
               className="cursor-pointer"
            />
         )}
      </div>
   );
};

export default LocalSearch;
