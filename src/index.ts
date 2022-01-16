import "reflect-metadata";
export interface Type<T> {
	new (...args: any[]): T;
}
export function Injectable() {
	return function <T>(target: Type<T>) {
		console.log(target);
		// do something with `target`, e.g. some kind of validation or passing it to the Injector and store them
	};
}

export class Injector {
	private static container = new Map<string, any>();

	static resolve<T>(constructorThisArg: Type<T>): T {
		if (Injector.container.has(constructorThisArg.name)) {
			return Injector.container.get(constructorThisArg.name);
		}
		const tokens =
			Reflect.getMetadata("design:paramtypes", constructorThisArg) || [];
		const injections = tokens.map((token: Type<any>): any =>
			Injector.resolve(token)
		);
		const instance = new constructorThisArg(...injections);
		Injector.container.set(constructorThisArg.name, instance);
		return instance;
	}
}
@Injectable()
class Service1 {
	doService1Staff() {
		console.log("Service1");
	}
}

@Injectable()
class Service2 {
	doService2Staff() {
		console.log("Service2");
	}
	constructor(public service1: Service1) {}
}

@Injectable()
class Example {
	constructor(public service1: Service1, public service2: Service2) {}
}

const example = Injector.resolve(Example);
example.service1.doService1Staff();
example.service2.doService2Staff();

const catchError = (
	constructorThisArg: any,
	methodName: any,
	methodDescriptor: any
) => {
	const method = methodDescriptor.value;

	methodDescriptor.value = (...args: any) => {
		try {
			return method.apply(constructorThisArg, args);
		} catch (error: any) {
			throw new Error(`Special error message: ${error.message}`);
		}
	};
};
class Foo {
	@catchError
	public bar(message: string): string {
		if (message === "x") {
			throw new Error("x not valid");
		}

		return message;
	}
}

const foo = new Foo();
const result = foo.bar("x");

console.log(result);
