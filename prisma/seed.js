"use strict";
var __assign = (this && this.__assign) || function () {
    __assign = Object.assign || function(t) {
        for (var s, i = 1, n = arguments.length; i < n; i++) {
            s = arguments[i];
            for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p))
                t[p] = s[p];
        }
        return t;
    };
    return __assign.apply(this, arguments);
};
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
    var _ = { label: 0, sent: function() { if (t[0] & 1) throw t[1]; return t[1]; }, trys: [], ops: [] }, f, y, t, g = Object.create((typeof Iterator === "function" ? Iterator : Object).prototype);
    return g.next = verb(0), g["throw"] = verb(1), g["return"] = verb(2), typeof Symbol === "function" && (g[Symbol.iterator] = function() { return this; }), g;
    function verb(n) { return function (v) { return step([n, v]); }; }
    function step(op) {
        if (f) throw new TypeError("Generator is already executing.");
        while (g && (g = 0, op[0] && (_ = 0)), _) try {
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
Object.defineProperty(exports, "__esModule", { value: true });
var client_1 = require("@prisma/client");
var prisma = new client_1.PrismaClient();
function main() {
    return __awaiter(this, void 0, void 0, function () {
        var i, i, subjectData, _i, subjectData_1, subject, i, i, i, i, i, i, i, i, i, i;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0: 
                // ADMIN
                return [4 /*yield*/, prisma.admin.create({
                        data: {
                            id: "admin1",
                            username: "admin1",
                        },
                    })];
                case 1:
                    // ADMIN
                    _a.sent();
                    return [4 /*yield*/, prisma.admin.create({
                            data: {
                                id: "admin2",
                                username: "admin2",
                            },
                        })];
                case 2:
                    _a.sent();
                    i = 1;
                    _a.label = 3;
                case 3:
                    if (!(i <= 6)) return [3 /*break*/, 6];
                    return [4 /*yield*/, prisma.grade.create({
                            data: {
                                level: i,
                            },
                        })];
                case 4:
                    _a.sent();
                    _a.label = 5;
                case 5:
                    i++;
                    return [3 /*break*/, 3];
                case 6:
                    i = 1;
                    _a.label = 7;
                case 7:
                    if (!(i <= 6)) return [3 /*break*/, 10];
                    return [4 /*yield*/, prisma.class.create({
                            data: {
                                name: "".concat(i, "A"),
                                gradeId: i,
                                capacity: Math.floor(Math.random() * (20 - 15 + 1)) + 15,
                            },
                        })];
                case 8:
                    _a.sent();
                    _a.label = 9;
                case 9:
                    i++;
                    return [3 /*break*/, 7];
                case 10:
                    subjectData = [
                        { name: "Mathematics" },
                        { name: "Science" },
                        { name: "English" },
                        { name: "History" },
                        { name: "Geography" },
                        { name: "Physics" },
                        { name: "Chemistry" },
                        { name: "Biology" },
                        { name: "Computer Science" },
                        { name: "Art" },
                    ];
                    _i = 0, subjectData_1 = subjectData;
                    _a.label = 11;
                case 11:
                    if (!(_i < subjectData_1.length)) return [3 /*break*/, 14];
                    subject = subjectData_1[_i];
                    return [4 /*yield*/, prisma.subject.create({ data: subject })];
                case 12:
                    _a.sent();
                    _a.label = 13;
                case 13:
                    _i++;
                    return [3 /*break*/, 11];
                case 14:
                    i = 1;
                    _a.label = 15;
                case 15:
                    if (!(i <= 15)) return [3 /*break*/, 18];
                    return [4 /*yield*/, prisma.teacher.create({
                            data: {
                                id: "teacher".concat(i), // Unique ID for the teacher
                                username: "teacher".concat(i),
                                name: "TName".concat(i),
                                surname: "TSurname".concat(i),
                                email: "teacher".concat(i, "@example.com"),
                                phone: "123-456-789".concat(i),
                                address: "Address".concat(i),
                                bloodType: "A+",
                                sex: i % 2 === 0 ? client_1.UserSex.MALE : client_1.UserSex.FEMALE,
                                subjects: { connect: [{ id: (i % 10) + 1 }] },
                                classes: { connect: [{ id: (i % 6) + 1 }] },
                                birthday: new Date(new Date().setFullYear(new Date().getFullYear() - 30)),
                            },
                        })];
                case 16:
                    _a.sent();
                    _a.label = 17;
                case 17:
                    i++;
                    return [3 /*break*/, 15];
                case 18:
                    i = 1;
                    _a.label = 19;
                case 19:
                    if (!(i <= 30)) return [3 /*break*/, 22];
                    return [4 /*yield*/, prisma.lesson.create({
                            data: {
                                name: "Lesson".concat(i),
                                day: client_1.Day[Object.keys(client_1.Day)[Math.floor(Math.random() * Object.keys(client_1.Day).length)]],
                                startTime: new Date(new Date().setHours(new Date().getHours() + 1)),
                                endTime: new Date(new Date().setHours(new Date().getHours() + 3)),
                                subjectId: (i % 10) + 1,
                                classId: (i % 6) + 1,
                                teacherId: "teacher".concat((i % 15) + 1),
                            },
                        })];
                case 20:
                    _a.sent();
                    _a.label = 21;
                case 21:
                    i++;
                    return [3 /*break*/, 19];
                case 22:
                    i = 1;
                    _a.label = 23;
                case 23:
                    if (!(i <= 25)) return [3 /*break*/, 26];
                    return [4 /*yield*/, prisma.parent.create({
                            data: {
                                id: "parentId".concat(i),
                                username: "parentId".concat(i),
                                name: "PName ".concat(i),
                                surname: "PSurname ".concat(i),
                                email: "parent".concat(i, "@example.com"),
                                phone: "123-456-789".concat(i),
                                address: "Address".concat(i),
                            },
                        })];
                case 24:
                    _a.sent();
                    _a.label = 25;
                case 25:
                    i++;
                    return [3 /*break*/, 23];
                case 26:
                    i = 1;
                    _a.label = 27;
                case 27:
                    if (!(i <= 50)) return [3 /*break*/, 30];
                    return [4 /*yield*/, prisma.student.create({
                            data: {
                                id: "student".concat(i),
                                username: "student".concat(i),
                                name: "SName".concat(i),
                                surname: "SSurname ".concat(i),
                                email: "student".concat(i, "@example.com"),
                                phone: "987-654-321".concat(i),
                                address: "Address".concat(i),
                                bloodType: "O-",
                                sex: i % 2 === 0 ? client_1.UserSex.MALE : client_1.UserSex.FEMALE,
                                parentId: "parentId".concat(Math.ceil(i / 2) % 25 || 25),
                                gradeId: (i % 6) + 1,
                                classId: (i % 6) + 1,
                                birthday: new Date(new Date().setFullYear(new Date().getFullYear() - 10)),
                            },
                        })];
                case 28:
                    _a.sent();
                    _a.label = 29;
                case 29:
                    i++;
                    return [3 /*break*/, 27];
                case 30:
                    i = 1;
                    _a.label = 31;
                case 31:
                    if (!(i <= 10)) return [3 /*break*/, 34];
                    return [4 /*yield*/, prisma.exam.create({
                            data: {
                                title: "Exam ".concat(i),
                                startTime: new Date(new Date().setHours(new Date().getHours() + 1)),
                                endTime: new Date(new Date().setHours(new Date().getHours() + 2)),
                                lessonId: (i % 30) + 1,
                            },
                        })];
                case 32:
                    _a.sent();
                    _a.label = 33;
                case 33:
                    i++;
                    return [3 /*break*/, 31];
                case 34:
                    i = 1;
                    _a.label = 35;
                case 35:
                    if (!(i <= 10)) return [3 /*break*/, 38];
                    return [4 /*yield*/, prisma.assignment.create({
                            data: {
                                title: "Assignment ".concat(i),
                                startDate: new Date(new Date().setHours(new Date().getHours() + 1)),
                                dueDate: new Date(new Date().setDate(new Date().getDate() + 1)),
                                lessonId: (i % 30) + 1,
                            },
                        })];
                case 36:
                    _a.sent();
                    _a.label = 37;
                case 37:
                    i++;
                    return [3 /*break*/, 35];
                case 38:
                    i = 1;
                    _a.label = 39;
                case 39:
                    if (!(i <= 10)) return [3 /*break*/, 42];
                    return [4 /*yield*/, prisma.result.create({
                            data: __assign({ score: 90, studentId: "student".concat(i) }, (i <= 5 ? { examId: i } : { assignmentId: i - 5 })),
                        })];
                case 40:
                    _a.sent();
                    _a.label = 41;
                case 41:
                    i++;
                    return [3 /*break*/, 39];
                case 42:
                    i = 1;
                    _a.label = 43;
                case 43:
                    if (!(i <= 10)) return [3 /*break*/, 46];
                    return [4 /*yield*/, prisma.attendance.create({
                            data: {
                                date: new Date(),
                                present: true,
                                studentId: "student".concat(i),
                                lessonId: (i % 30) + 1,
                            },
                        })];
                case 44:
                    _a.sent();
                    _a.label = 45;
                case 45:
                    i++;
                    return [3 /*break*/, 43];
                case 46:
                    i = 1;
                    _a.label = 47;
                case 47:
                    if (!(i <= 5)) return [3 /*break*/, 50];
                    return [4 /*yield*/, prisma.event.create({
                            data: {
                                title: "Event ".concat(i),
                                description: "Description for Event ".concat(i),
                                startTime: new Date(new Date().setHours(new Date().getHours() + 1)),
                                endTime: new Date(new Date().setHours(new Date().getHours() + 2)),
                                classId: (i % 5) + 1,
                            },
                        })];
                case 48:
                    _a.sent();
                    _a.label = 49;
                case 49:
                    i++;
                    return [3 /*break*/, 47];
                case 50:
                    i = 1;
                    _a.label = 51;
                case 51:
                    if (!(i <= 5)) return [3 /*break*/, 54];
                    return [4 /*yield*/, prisma.announcement.create({
                            data: {
                                title: "Announcement ".concat(i),
                                description: "Description for Announcement ".concat(i),
                                date: new Date(),
                                classId: (i % 5) + 1,
                            },
                        })];
                case 52:
                    _a.sent();
                    _a.label = 53;
                case 53:
                    i++;
                    return [3 /*break*/, 51];
                case 54:
                    console.log("Seeding completed successfully.");
                    return [2 /*return*/];
            }
        });
    });
}
main()
    .then(function () { return __awaiter(void 0, void 0, void 0, function () {
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0: return [4 /*yield*/, prisma.$disconnect()];
            case 1:
                _a.sent();
                return [2 /*return*/];
        }
    });
}); })
    .catch(function (e) { return __awaiter(void 0, void 0, void 0, function () {
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0:
                console.error(e);
                return [4 /*yield*/, prisma.$disconnect()];
            case 1:
                _a.sent();
                process.exit(1);
                return [2 /*return*/];
        }
    });
}); });
