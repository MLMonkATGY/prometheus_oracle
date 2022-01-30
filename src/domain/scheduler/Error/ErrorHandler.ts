import { IntendedTaskError } from "./IntendedTaskError.js";
import { GenericTaskErrorDTO } from "./GenericTaskErrorDTO.js";
import { logger } from "../../Logger.js";
let GlobalErrHandlerMap: Map<string, (inputMsg: any) => void> = new Map<
	string,
	(inputMsg: any) => void
>();
const GetRegistredError = () => {
	return [new IntendedTaskError(), new GenericTaskErrorDTO()];
};
export const GenErrorHandlerMap = () => {
	const allError: GenericTaskErrorDTO[] = GetRegistredError();
	allError.forEach((elem) => {
		GlobalErrHandlerMap.set(elem.errId, (inputMsg: any) => {
			logger.info(`${inputMsg} caught at map`);
		});
	});
	return GlobalErrHandlerMap;
};
