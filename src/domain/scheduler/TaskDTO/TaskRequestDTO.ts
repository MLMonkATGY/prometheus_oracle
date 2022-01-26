import { SupportedBrowserType } from "./SupportedBrowerType.js";
export interface TaskRequestDTO {
	browserType: SupportedBrowserType;
	taskData: number;
}
