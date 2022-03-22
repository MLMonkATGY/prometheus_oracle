import { JobStreetCrawler } from "./jobStreetCrawler.js";
import {
	BrowserContext,
	BrowserType,
	chromium,
	firefox,
	webkit,
	Browser,
} from "playwright";

async function  start(){
    const launchSettings = { headless: false };

    const browser = await chromium.launch(launchSettings);
    const page = await browser.newPage();
    
    const a = new JobStreetCrawler()
    
    a.scrape(page).then((result:any) => {
        
    }).catch((err:any) => {
        console.log(err);
        
    });
}
start();
