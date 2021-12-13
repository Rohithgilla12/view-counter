// import core from "puppeteer-core";
// import { getOptions } from "./options";

// let _page: core.Page | null;

// export type FileType = "png" | "jpeg";

// async function getPage(isDev: boolean) {
//   if (_page) {
//     return _page;
//   }
//   const options = await getOptions(isDev);
//   const browser = await core.launch(options);
//   _page = await browser.newPage();
//   return _page;
// }

// const MAINFRAME_SELECTOR = "body > div";

// export async function getScreenshot(
//   html: string,
//   type: FileType,
//   isDev: boolean
// ) {
//   const page = await getPage(isDev);
//   await page.setViewport({ width: 140, height: 120 });
//   await page.setContent(html);
//   const element = await page.$(MAINFRAME_SELECTOR);
//   const file = await element.screenshot({ type });
//   return file;
// }

export async function gitKeep() {}
