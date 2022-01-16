import "reflect-metadata";

// export interface Type<T> {
// 	new (...args: any[]): T;
// }
// export function Injectable() {
// 	return function <T>(target: Type<T>) {
// 		// do something with `target`, e.g. some kind of validation or passing it to the Injector and store them
// 	};
// }

// export class Injector {
// 	private static container = new Map<string, any>();

// 	static resolve<T>(target: Type<T>): T {
// 		if (Injector.container.has(target.name)) {
// 			return Injector.container.get(target.name);
// 		}
// 		const tokens = Reflect.getMetadata("design:paramtypes", target) || [];
// 		const injections = tokens.map((token: Type<any>): any =>
// 			Injector.resolve(token)
// 		);
// 		const instance = new target(...injections);
// 		Injector.container.set(target.name, instance);
// 		return instance;
// 	}
// }
// @Injectable()
// class Service1 {
// 	doService1Staff() {
// 		console.log("Service1");
// 	}
// }

// @Injectable()
// class Service2 {
// 	doService2Staff() {
// 		console.log("Service2");
// 	}
// 	constructor(public service1: Service1) {}
// }

// @Injectable()
// class Example {
// 	constructor(public service1: Service1, public service2: Service2) {}
// }

// const example = Injector.resolve(Example);

// example.service1.doService1Staff();
// example.service2.doService2Staff();

class Foo {
	@catchError
	public bar(message: string): string {
		if (message === "x") {
			throw new Error("x not valid");
		}

		return message;
	}
}
function catchError(target: any, propertyName: any, descriptor: any) {
	const method = descriptor.value;

	descriptor.value = function (...args: any) {
		try {
			return method.apply(target, args);
		} catch (error: any) {
			throw new Error(`Special error message: ${error.message}`);
		}
	};
}

const foo = new Foo();
const result = foo.bar("x");

console.log(result);
