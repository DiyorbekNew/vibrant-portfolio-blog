import React from "react";
import { Helmet } from "react-helmet-async";

interface SEOProps {
  title?: string;
  description?: string;
  image?: string;
  url?: string;
  type?: string;
}

const SEO: React.FC<SEOProps> = ({
  title = "Diyorbek Xazratqulov - Python Backend Dasturchi",
  description = "Python orqali ishonchli va kengayadigan backend yechimlarni yarataman. Django, Flask, FastAPI va ma'lumotlar bazasini boshqarish tizimlarida tajribam bilan, zamonaviy veb-ilovalarni quvvatlaydigan samarali backend yechimlarini yarataman.",
  image = "/placeholder.svg",
  url = typeof window !== "undefined" ? window.location.href : "",
  type = "website",
}) => {
  const fullTitle = title.includes("Diyorbek") ? title : `${title} | Diyorbek Xazratqulov`;
  const siteUrl = typeof window !== "undefined" ? window.location.origin : "https://xazratqulov.uz";
  const fullUrl = url.startsWith("http") ? url : `${siteUrl}${url}`;
  const fullImage = image.startsWith("http") ? image : `${siteUrl}${image}`;

  return (
    <Helmet>
      {/* Primary Meta Tags */}
      <title>{fullTitle}</title>
      <meta name="title" content={fullTitle} />
      <meta name="description" content={description} />
      <meta name="viewport" content="width=device-width, initial-scale=1" />
      <meta name="theme-color" content="#000000" />

      {/* Open Graph / Facebook */}
      <meta property="og:type" content={type} />
      <meta property="og:url" content={fullUrl} />
      <meta property="og:title" content={fullTitle} />
      <meta property="og:description" content={description} />
      <meta property="og:image" content={fullImage} />
      <meta property="og:locale" content="uz_UZ" />
      <meta property="og:site_name" content="Diyorbek Xazratqulov Portfolio" />

      {/* Twitter */}
      <meta property="twitter:card" content="summary_large_image" />
      <meta property="twitter:url" content={fullUrl} />
      <meta property="twitter:title" content={fullTitle} />
      <meta property="twitter:description" content={description} />
      <meta property="twitter:image" content={fullImage} />

      {/* Additional */}
      <meta name="author" content="Diyorbek Xazratqulov" />
      <meta name="language" content="Uzbek" />
      <link rel="canonical" href={fullUrl} />
    </Helmet>
  );
};

export default SEO;

