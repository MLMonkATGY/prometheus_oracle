import JobPostRaw from "../table/JobPostRaw.js";
import JobStreet from "../table/JobStreet.js";

const GetTableEntity = () => {
	return [JobStreet, JobPostRaw];
};
export default GetTableEntity;
