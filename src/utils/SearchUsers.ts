// import { Op } from "sequelize";
// // @ts-ignore
// import models = require("../models");
// import Fuse from "fuse.js";

// export const searchUsers = async (query: string, userType: string) => {
//     const queryOptions = !userType || userType === "all" ? {} : {
//         where: {
//             userType: {
//                 [Op.eq]: userType
//             }
//         }
//     };
//     const data = await models.users.findAll({
//         ...queryOptions,
//         attributes: {
//             exclude: ["password", "verificationToken"]
//         },
//         order: [
//             ["createdAt", "DESC"]
//         ]
//     });

//     const fuseInstance = new Fuse(data, {
//         keys: ["firstName", "lastName", "userName", "email", "phone"]
//     });

//     const fuseResult = fuseInstance.search(query);
//     const results = fuseResult.map(data => data.item);
//     return results;
// };

// export const searchPatients = async (query: string) => {
//     const data = await models.patient.findAll({
//         raw: true,
//         order: [
//             ["createdAt", "DESC"]
//         ]
//     });

//     const fuseInstance = new Fuse(data, {
//         shouldSort: true,
//         keys: ["firstName", "lastName", "userName", "email", "phone"]
//     });

//     const fuseResult = fuseInstance.search(query);
//     const results = fuseResult.map(data => data.item);
//     return results;
// };


// export const searchServices = async (query: string) => {

//     const data = await models.service.findAll({
//         raw: true,
//         order: [
//             ["createdAt", "DESC"]
//         ]
//     });

//     const fuseInstance = new Fuse(data, {
//         shouldSort: true,
//         keys: ["service"]
//     });

//     const fuseResult = fuseInstance.search(query);
//     const results = fuseResult.map(data => data.item);
//     return results;
// };


// export const searchAppointments = async (query: string) => {
//     const data = await models.appointment.findAll({
//         raw: true,
//         include:[models.patient, {model: models.users, as:'appointedDoctor'}],
//         order: [
//             ["createdAt", "DESC"]
//         ]
//     });

//     const fuseInstance = new Fuse(data, {
//         shouldSort: true,
//         keys: ["scheduleDate", 'patient.firstName', 'patient.firstName', 'appointedDoctor.firstName', 'appointedDoctor.lastName']
//     });

//     const fuseResult = fuseInstance.search(query);
//     console.log(fuseResult)
//     const results = fuseResult.map(data => data.item);
//     return results;
// };

// export const searchVisits = async (query: string) => {
//     const data = await models.visit.findAll({
//         raw: true,
//         order: [
//             ["createdAt", "DESC"]
//         ]
//     });

//     const fuseInstance = new Fuse(data, {
//         shouldSort: true,
//         keys: ["reason", "checkInTime"]
//     });

//     const fuseResult = fuseInstance.search(query);
//     const results = fuseResult.map(data => data.item);
//     return results;
// };

// export const searchAllergies = async (query: string) => {
//     const data = await models.allergy.findAll({

//         raw: true,
//         include:[models.masterallergy],
//         order: [
//             ["createdAt", "DESC"]
//         ]
//     });
//     // return data

//     const fuseInstance = new Fuse(data, {
//         shouldSort: true,
//         keys: ["severity", "reaction", ["masterallergy.allergyName"]]
//     });

//     const fuseResult = fuseInstance.search(query);
//     const results = fuseResult.map(data => data.item);
//     return results;
// };