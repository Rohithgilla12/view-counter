export const getCommonCSS = () => {
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
    }
`;
};
