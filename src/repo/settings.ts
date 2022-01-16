interface DbSettings {
	host: string;
}
interface EnvSettings {
	dbSettings: DbSettings;
}
interface EnvManager {
	dev: EnvSettings;
	ci: EnvSettings;
}
const globalEnvManager: EnvManager = {
	dev: {
		dbSettings: {
			host: "172.78.0.44",
		},
	},
	ci: {
		dbSettings: {
			host: "prometheus_oracle_postgres",
		},
	},
};

const getSettings = () => {
	if (process.env.CI == "true" && process.env.DRONE == "true") {
		return globalEnvManager.ci;
	} else {
		return globalEnvManager.dev;
	}
};
export default getSettings;
