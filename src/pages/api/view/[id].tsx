import { NextApiRequest, NextApiResponse } from "next";

const getCommonCSS = () => {
  return `
    @import url('https://fonts.googleapis.com/css2?family=Inter:wght@400;700&display=swap');
    himport { NextApiRequest } from 'next';
tml{
        height: 128px;
        width: 128px;
    }
    body {
        background: white;
        color: black;
        background-size: 100px 100px;
        display: flex;
        text-align: center;
        align-items: center;
        justify-content: center;
        font-family: 'Inter', sans-serif;
        font-weight: 400;
        font-size: 100px;
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
`;
};

export default function handler(req: NextApiRequest, res: NextApiResponse) {
  const { id } = req.query;
  const html = `<!DOCTYPE html>
<html>
    <meta charset="utf-8">
    <title>Generated Image</title>
    <meta name="viewport" content="width=device-width, initial-scale=1">
    <style>
        ${getCommonCSS()}
    </style>
    <body>
      <p> ${id} </p>
    </body>
</html>`;
  res.send(html);
}
