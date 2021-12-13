// import { NextApiRequest, NextApiResponse } from "next";
// import { supabase } from "../../../../utils/supabase";
// import { getScreenshot } from "../../_lib/chromium";
// import { getCommonCSS } from "../../_lib/constants";

import { supabase } from "../../../../utils/supabase";

// const isDev = !process.env.AWS_REGION;

// export default async function handler(
//   req: NextApiRequest,
//   res: NextApiResponse
// ) {
//   const { id } = req.query;

//   let html = "";

//   const { error } = await supabase.from("analytics").insert([
//     {
//       asset: id,
//     },
//   ]);

//   if (error) {
//     console.log(error);
//     let errorMessage = error.message;
//     if (error.code === "23503") {
//       errorMessage =
//         "Can you please check the URL?, it looks like you are trying to access the asset which is not available.\nIf the error still persists contact the Dev";
//     }
//     html = `<!DOCTYPE html>
// <html>
// 	<meta charset="utf-8">
// 	<meta name="viewport" content="width=device-width">
//     <style>
//         ${getCommonCSS()}
//     </style>
//     <body>
//       <code>${errorMessage}</code>
//     </body>
// </html>`;
//   } else {
//     const { count } = await supabase
//       .from("analytics")
//       .select("asset", { count: "exact" })
//       .eq("asset", id);

//     const viewString = count === 1 ? "View" : "Views";

//     html = `<!DOCTYPE html>
//   <html>
//    <meta charset="utf-8">
//    <meta name="viewport" content="width=device-width">
//      <style>
//          ${getCommonCSS()}
//      </style>
//      <body>
//       <div class="mainFrame">
//        <p>${viewString} ${count}</p>
//       </div>
//      </body>
//   </html>`;
//   }

//   const fileType = "png";
//   try {
//     const file = await getScreenshot(html, fileType, isDev);
//     res.statusCode = 200;
//     res.setHeader("Content-Type", `image/${fileType}`);
//     res.setHeader(
//       "Cache-Control",
//       `public, immutable, no-transform, s-maxage=31536000, max-age=31536000`
//     );
//     res.end(file);
//   } catch (e) {
//     res.statusCode = 500;
//     res.setHeader("Content-Type", "text/html");
//     res.end("<h1>Internal Error</h1><p>Sorry, there was a problem</p>");
//     console.error(e);
//   }
// }

const handler = async (req, res) => {
  supabase.auth.api.setAuthCookie(req, res);
};

export default handler;
