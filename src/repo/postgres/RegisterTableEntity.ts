import JobPostRaw from "../table/JobPostRaw.js";
import JobStreet from "../table/JobStreetTable.js";

const GetTableEntity = () => {
	return [JobStreet, JobPostRaw];
};
export default GetTableEntity;
