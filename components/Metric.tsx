//icon numbers of votes answer and views
import Image from "next/image";
import Link from "next/link";
import React from "react";
interface Props {
   imgUrl: string;
   alt: string;
   value: string | number; //value can be both string and number type
   title: string;
   href?: string;
   textStyles: string;
   imgStyles?: string;
   isAuthor?: boolean;
}
const Metric = ({
   imgUrl,
   alt,
   value,
   title,
   href,
   textStyles,
   imgStyles,
   isAuthor,
}: Props) => {
   const metricContent = (
      <>
         <Image
            src={imgUrl}
            alt={alt}
            width={16}
            height={16}
            className={`rounded-full object-contain ${imgStyles}`}
         />
         <p className={`${textStyles} flex items-center gap-1`}>
            {value}
            <span
               className={`small-regular ${isAuthor ? "max-sm:hidden" : ""}`}
            >
               {title}
            </span>
         </p>
      </>
   );
   //if there's href then it's a clickable element
   return href ? (
      <Link href={href} className="flex-center gap-1">
         {metricContent}
      </Link>
   ) : (
      <div className="flex-center gap-1">{metricContent}</div>
   );
};

export default Metric;
