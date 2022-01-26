export class GenericTaskErrorDTO extends Error {
	public errId: string;
	constructor() {
		super();
		this.errId = this.constructor.name;
	}
	public handler() {
		throw new Error("Not implemented handler at GenericTaskErrorDTO");
	}
}
