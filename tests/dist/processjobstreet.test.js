"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __generator = (this && this.__generator) || function (thisArg, body) {
    var _ = { label: 0, sent: function() { if (t[0] & 1) throw t[1]; return t[1]; }, trys: [], ops: [] }, f, y, t, g;
    return g = { next: verb(0), "throw": verb(1), "return": verb(2) }, typeof Symbol === "function" && (g[Symbol.iterator] = function() { return this; }), g;
    function verb(n) { return function (v) { return step([n, v]); }; }
    function step(op) {
        if (f) throw new TypeError("Generator is already executing.");
        while (_) try {
            if (f = 1, y && (t = op[0] & 2 ? y["return"] : op[0] ? y["throw"] || ((t = y["return"]) && t.call(y), 0) : y.next) && !(t = t.call(y, op[1])).done) return t;
            if (y = 0, t) op = [op[0] & 2, t.value];
            switch (op[0]) {
                case 0: case 1: t = op; break;
                case 4: _.label++; return { value: op[1], done: false };
                case 5: _.label++; y = op[1]; op = [0]; continue;
                case 7: op = _.ops.pop(); _.trys.pop(); continue;
                default:
                    if (!(t = _.trys, t = t.length > 0 && t[t.length - 1]) && (op[0] === 6 || op[0] === 2)) { _ = 0; continue; }
                    if (op[0] === 3 && (!t || (op[1] > t[0] && op[1] < t[3]))) { _.label = op[1]; break; }
                    if (op[0] === 6 && _.label < t[1]) { _.label = t[1]; t = op; break; }
                    if (t && _.label < t[2]) { _.label = t[2]; _.ops.push(op); break; }
                    if (t[2]) _.ops.pop();
                    _.trys.pop(); continue;
            }
            op = body.call(thisArg, _);
        } catch (e) { op = [6, e]; y = 0; } finally { f = t = 0; }
        if (op[0] & 5) throw op[1]; return { value: op[0] ? op[1] : void 0, done: true };
    }
};
exports.__esModule = true;
var test_1 = require("@playwright/test");
var ConnectionManager_js_1 = require("../src/repo/postgres/ConnectionManager.js");
var JobPostRaw_js_1 = require("../src/repo/table/JobPostRaw.js");
var contentCat = function (content) {
    var defaultContent = {
        jobName: "",
        company: "",
        location: "",
        salary: "",
        careerLevel: "",
        qualification: "",
        yearOfExperience: "",
        jobType: "",
        jobSpecializations: "",
        companyOverview: "",
        companySize: "",
        averageProcessingTime: "",
        industry: "",
        benefits: "",
        jobDescription: "",
        url: "",
        version: 1,
        postedTime: ""
    };
    if (content.jobName) {
        defaultContent.jobName = content.jobName;
    }
    if (content.company) {
        defaultContent.company = content.company;
    }
    if (content.location) {
        defaultContent.location = content.location;
    }
    if (content.salary) {
        defaultContent.salary = content.salary;
    }
    if (content.careerLevel) {
        defaultContent.careerLevel = content.careerLevel;
    }
    if (content.qualification) {
        defaultContent.qualification = content.qualification;
    }
    if (content.yearOfExperience) {
        defaultContent.yearOfExperience = content.yearOfExperience;
    }
    if (content.jobType) {
        defaultContent.jobType = content.jobType;
    }
    if (content.jobSpecializations) {
        defaultContent.jobSpecializations = content.jobSpecializations;
    }
    if (content.companyOverview) {
        defaultContent.companyOverview = content.companyOverview;
    }
    if (content.companySize) {
        defaultContent.companySize = content.companySize;
    }
    if (content.averageProcessingTime) {
        defaultContent.averageProcessingTime = content.averageProcessingTime;
    }
    if (content.industry) {
        defaultContent.industry = content.industry;
    }
    else if (content.benefits) {
        defaultContent.benefits = content.benefits;
    }
    if (content.jobDescription) {
        defaultContent.jobDescription = content.jobDescription;
    }
    if (content.url) {
        defaultContent.url = content.url;
    }
    if (content.postedTime) {
        defaultContent.postedTime = content.postedTime;
    }
    return defaultContent;
};
var getPostedTime = function (time) {
    var condition = 'on';
    if (time.includes(condition)) {
        var postedTime = time.split('Posted on ');
        return postedTime[1];
    }
    else {
        return "asd";
    }
};
test_1.test.only("process job street", function (_a) {
    var page = _a.page;
    return __awaiter(void 0, void 0, void 0, function () {
        var ptime;
        return __generator(this, function (_b) {
            switch (_b.label) {
                case 0: return [4 /*yield*/, getAllFromJobPostRow()];
                case 1:
                    _b.sent();
                    ptime = getPostedTime("Posted on 11-Feb-22");
                    return [2 /*return*/];
            }
        });
    });
});
var getAllFromJobPostRow = function () { return __awaiter(void 0, void 0, void 0, function () {
    var em, getAll, index, raw, getRawContent, contents, cat, cont;
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0: return [4 /*yield*/, ConnectionManager_js_1.ConnectionManager(true)];
            case 1:
                em = _a.sent();
                return [4 /*yield*/, em.find(JobPostRaw_js_1["default"], {})];
            case 2:
                getAll = _a.sent();
                for (index = 0; index < getAll.length; index++) {
                    raw = getAll[index];
                    getRawContent = raw.rawContent;
                    contents = getRawContent.split('\n');
                    for (cat = 0; cat < contents.length; cat++) {
                        cont = contentCat({
                            jobName: contents[0],
                            company: contents[1],
                            location: contents[2],
                            salary: "",
                            postTime: "",
                            careerLevel: "",
                            qualification: "",
                            yearOfExperience: "",
                            jobType: "",
                            jobSpecializations: "",
                            companyOverview: " ",
                            companySize: " ",
                            averageProcessingTime: " ",
                            industry: "",
                            benefits: "",
                            jobDescription: "",
                            url: "",
                            version: 1,
                            postedTime: ""
                        });
                        console.log(cont);
                    }
                }
                return [2 /*return*/];
        }
    });
}); };
