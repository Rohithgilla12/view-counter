import { NextApiRequest, NextApiResponse } from "next";
import { supabase } from "../../../utils/supabase";

const getCommonCSS = () => {
  return `
    @import url('https://fonts.googleapis.com/css2?family=Inter:wght@400;700&display=swap');

    html{
      width: 120px;
      height:120px;
    }

    body {
        color: white;
        // background-size: 100px 100px;
        display: flex;
        text-align: center;
        align-items: center;
        justify-content: center;
        font-family: 'Inter', sans-serif;
        font-weight: 400;
        font-size: 24px;
        margin: 0;
        padding: 0;
    }
    * {
        box-sizing: border-box;
    }
    h1, h2, h3, h4, h5, p {
      margin: 0;
    }
    code {
        color: #D400FF;
        font-family: 'Vera';
        white-space: pre-wrap;
        letter-spacing: -5px;
    }
    code:before, code:after {
        content: '\`';
    }

    .mainFrame{
      background : #093145;
      padding: 8px;
      // border-radius: 8px;
    }
`;
};

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  const { id } = req.query;

  let html = "";

  const { error } = await supabase.from("analytics").insert([
    {
      asset: id,
    },
  ]);

  if (error) {
    console.log(error);
    let errorMessage = error.message;
    if (error.code === "23503") {
      errorMessage =
        "Can you please check the URL?, it looks like you are trying to access the asset which is not available.\nIf the error still persists contact the Dev";
    }
    html = `<!DOCTYPE html>
<html>
	<meta charset="utf-8">
	<meta name="viewport" content="width=device-width">
    <style>
        ${getCommonCSS()}
    </style>
    <body>
      <code>${errorMessage}</code>      
    </body>
</html>`;
  } else {
    const { count } = await supabase
      .from("analytics")
      .select("asset", { count: "exact" })
      .eq("asset", id);

    const viewString = count === 1 ? "View" : "Views";

    html = `<!DOCTYPE html>
  <html>
   <meta charset="utf-8">
   <meta name="viewport" content="width=device-width">
     <style>
         ${getCommonCSS()}
     </style>
     <body>
      <div class="mainFrame">
       <p>${viewString} ${count}</p>
      </div>
     </body>
  </html>`;
  }

  // send html string as response
  res.statusCode = 200;
  res.setHeader("Content-Type", "text/html");
  res.end(html);
}
