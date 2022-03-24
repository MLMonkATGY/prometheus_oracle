import JobPostRaw from "../table/JobPostRaw.js";
import JobStreet from "../table/JobStreetTable.js";
import WobbRaw from "../table/WobbRaw.js";
import WobbTable from "../table/WobbTable.js";

const GetTableEntity = () => {
	return [
		JobStreet, 
		JobPostRaw,
		WobbRaw,
		WobbTable,
	];
};
export default GetTableEntity;
