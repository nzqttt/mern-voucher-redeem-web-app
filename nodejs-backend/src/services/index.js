// company data
const companies = require("./companies/companies.service.js");
const branches = require("./branches/branches.service.js");
const departments = require("./departments/departments.service.js");
const sections = require("./sections/sections.service.js");
const companyAddresses = require("./companyAddresses/companyAddresses.service.js");
const companyPhones = require("./companyPhones/companyPhones.service.js");

// User data
const roles = require("./roles/roles.service.js");
const profiles = require("./profiles/profiles.service.js");
const positions = require("./positions/positions.service.js");
const departmentAdmin = require("./departmentAdmin/departmentAdmin.service.js");
const departmentHOD = require("./departmentHOD/departmentHOD.service.js");
const departmentHOS = require("./departmentHOS/departmentHOS.service.js");
const employees = require("./employees/employees.service.js");
const superior = require("./superior/superior.service.js");
const permissionServices = require("./permissionServices/permissionServices.service.js");
const permissionFields = require("./permissionFields/permissionFields.service.js");
const userChangePassword = require("./userChangePassword/userChangePassword.service.js");
const userInvites = require("./userInvites/userInvites.service.js");
const userLogin = require("./userLogin/userLogin.service.js");
const users = require("./users/users.service.js");
const loginHistory = require("./loginHistory/loginHistory.service.js");
// sample staff info
const staffinfo = require("./staffinfo/staffinfo.service.js");

// mail que and templates
const mailQues = require("./mailQues/mailQues.service.js");
const mails = require("./mails/mails.service.js");
const templates = require("./templates/templates.service.js");
const mailWH = require("./mailWH/mailWH.service.js");

// dynaloader
const dynaLoader = require("./dynaLoader/dynaLoader.service.js");
const dynaFields = require("./dynaFields/dynaFields.service.js");
const jobQues = require("./jobQues/jobQues.service.js");

// gen ai
const prompts = require("./prompts/prompts.service.js");
const config = require("./config/config.service.js");
const chatai = require("./chatai/chatai.service.js");

// documents and guides
const documentStorages = require("./documentStorages/documentStorages.service.js");
const userGuide = require("./userGuide/userGuide.service.js");
const steps = require("./steps/steps.service.js");

// messaging
const inbox = require("./inbox/inbox.service.js");
const notifications = require("./notifications/notifications.service.js");
const comments = require("./comments/comments.service.js");

// errors and bugs
const errorLogs = require("./errorLogs/errorLogs.service.js");
const errorsWH = require("./errorsWH/errorsWH.service.js");
const tickets = require("./tickets/tickets.service.js");
const tests = require("./tests/tests.service.js");

// audit update, delete
const audits = require("./audits/audits.service.js");

// data loader for all services
const uploader = require("./uploader/uploader.service.js");
// 230924

const vouchers = require("./vouchers/vouchers.service.js");
const category = require("./category/category.service.js");
const cartItems = require("./cartItems/cartItems.service.js");
const cartItemHistory = require("./cartItemHistory/cartItemHistory.service.js");
// ~cb-add-require-service-name~

// eslint-disable-next-line no-unused-vars
module.exports = function (app) {
  app.configure(users);
  app.configure(companies);
  app.configure(branches);
  app.configure(departments);
  app.configure(sections);
  app.configure(roles);
  app.configure(positions);
  app.configure(profiles);
  app.configure(templates);
  app.configure(mails);
  app.configure(permissionServices);
  app.configure(permissionFields);
  app.configure(companyAddresses);
  app.configure(companyPhones);
  app.configure(userInvites);
  app.configure(staffinfo);
  app.configure(dynaLoader);
  app.configure(dynaFields);
  app.configure(mailQues);
  app.configure(employees);
  app.configure(jobQues);
  app.configure(superior);
  // gen ai
  app.configure(prompts);
  app.configure(config);
  app.configure(chatai);

  app.configure(departmentAdmin);
  app.configure(departmentHOD);
  app.configure(departmentHOS);
  app.configure(mailWH);
  app.configure(inbox);
  app.configure(notifications);
  app.configure(documentStorages);
  app.configure(errorLogs);
  app.configure(errorsWH);
  app.configure(userLogin);
  app.configure(userChangePassword);
  app.configure(tickets);
  app.configure(tests);
  app.configure(userGuide);
  app.configure(steps);
  app.configure(audits);
  app.configure(uploader);
  app.configure(comments);
  app.configure(loginHistory);

  app.configure(vouchers);
  app.configure(category);
  app.configure(cartItems);
  app.configure(cartItemHistory);
  // ~cb-add-configure-service-name~
};
