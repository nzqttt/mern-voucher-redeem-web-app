import { Navigate } from 'react-router-dom'; // at top if not already
import HowItWorksPage from '../components/app_components/HowItWorksPage/HowItWorksPage';
import AdminPage from '../components/app_components/Admin/AdminPage';
import AdminCategoryPage from '../components/app_components/Admin/AdminCategoryPage';
import AdminVoucherPage from '../components/app_components/Admin/AdminVoucherPage';
import AdminUserPage from '../components/app_components/Admin/AdminUserPage';
import AdminDashboard from '../components/app_components/Admin/AdminDashboard';
import RegisterPage from "../components/app_components/UserAuth/RegisterPage";



import MyVouchersPage from "../components/app_components/MyVouchers/MyVouchersPage";
import React from 'react';
import { Route, Routes } from 'react-router-dom';
import { connect } from 'react-redux';
import ProtectedRoute from './ProtectedRoute';
import NoMatch from './NoMatch';

import LoginPage from '../components/LoginPage/LoginPage';
import SignUpPage from '../components/LoginPage/signUp/SignUpPage';
import ResetPage from '../components/LoginPage/ResetPage';
import Dashboard from '../components/Dashboard/Dashboard';
import MaintenancePage from '../components/common/MaintenancePage';
import LoginFaqPage from '../components/LoginPage/LoginFaqPage';
import DashboardAdminControl from '../components/Dashboard/DashboardAdminControl';
import DashboardCompanyData from '../components/Dashboard/DashboardCompanyData';
import DashboardDataManagement from '../components/Dashboard/DashboardDataManagement';
import DashboardErrors from '../components/Dashboard/DashboardErrors';
import DashboardMessaging from '../components/Dashboard/DashboardMessaging';
import DashboardUserManagement from '../components/Dashboard/DashboardUserManagement';

import SingleUsersPage from '../components/cb_components/UsersPage/SingleUsersPage';
import UserProjectLayoutPage from '../components/cb_components/UsersPage/UserProjectLayoutPage';
import SingleUserChangePasswordPage from '../components/cb_components/UserChangePasswordPage/SingleUserChangePasswordPage';
import ChataiProjectLayoutPage from '../components/cb_components/ChatAiProjectLayout/ChataiProjectLayoutPage';
import PromptsUserLayoutPage from '../components/cb_components/ChatAiPromptsPage/UserLayoutPage';
import SinglePromptsPage from '../components/cb_components/ChatAiPromptsPage/SinglePromptsPage';
import ChatAiUsageLayoutPage from '../components/cb_components/ChatAiUsagePage/ChatAiUsageLayoutPage';

import Account from '../components/cb_components/Account/Account';
import SingleUserInvitesPage from '../components/cb_components/UserInvitesPage/SingleUserInvitesPage';
import UserInvitesProjectLayoutPage from '../components/cb_components/UserInvitesPage/UserInvitesProjectLayoutPage';
import SingleCompaniesPage from '../components/cb_components/CompaniesPage/SingleCompaniesPage';
import CompanyProjectLayoutPage from '../components/cb_components/CompaniesPage/CompanyProjectLayoutPage';
import SingleBranchesPage from '../components/cb_components/BranchesPage/SingleBranchesPage';
import BranchProjectLayoutPage from '../components/cb_components/BranchesPage/BranchProjectLayoutPage';
import SingleDepartmentsPage from '../components/cb_components/DepartmentsPage/SingleDepartmentsPage';
import DepartmentProjectLayoutPage from '../components/cb_components/DepartmentsPage/DepartmentProjectLayoutPage';
import SingleSectionsPage from '../components/cb_components/SectionsPage/SingleSectionsPage';
import SectionProjectLayoutPage from '../components/cb_components/SectionsPage/SectionProjectLayoutPage';
import SingleRolesPage from '../components/cb_components/RolesPage/SingleRolesPage';
import RoleProjectLayoutPage from '../components/cb_components/RolesPage/RoleProjectLayoutPage';
import SinglePositionsPage from '../components/cb_components/PositionsPage/SinglePositionsPage';
import PositionProjectLayoutPage from '../components/cb_components/PositionsPage/PositionProjectLayoutPage';
import SingleTemplatesPage from '../components/cb_components/TemplatesPage/SingleTemplatesPage';
import TemplateProjectLayoutPage from '../components/cb_components/TemplatesPage/TemplateProjectLayoutPage';
import SingleMailsPage from '../components/cb_components/MailsPage/SingleMailsPage';
import MailProjectLayoutPage from '../components/cb_components/MailsPage/MailProjectLayoutPage';
import SingleUserAddressesPage from '../components/cb_components/UserAddressesPage/SingleUserAddressesPage';
import UserAddressProjectLayoutPage from '../components/cb_components/UserAddressesPage/UserAddressProjectLayoutPage';
import SingleCompanyAddressesPage from '../components/cb_components/CompanyAddressesPage/SingleCompanyAddressesPage';
import CompanyAddressProjectLayoutPage from '../components/cb_components/CompanyAddressesPage/CompanyAddressProjectLayoutPage';
import SingleCompanyPhonesPage from '../components/cb_components/CompanyPhonesPage/SingleCompanyPhonesPage';
import CompanyPhoneProjectLayoutPage from '../components/cb_components/CompanyPhonesPage/CompanyPhoneProjectLayoutPage';
import SingleUserPhonesPage from '../components/cb_components/UserPhonesPage/SingleUserPhonesPage';
import UserPhoneProjectLayoutPage from '../components/cb_components/UserPhonesPage/UserPhoneProjectLayoutPage';
import StaffinfoProjectLayoutPage from '../components/cb_components/StaffinfoPage/StaffinfoProjectLayoutPage';
import SingleProfilesPage from '../components/cb_components/ProfilesPage/SingleProfilesPage';
import ProfileProjectLayoutPage from '../components/cb_components/ProfilesPage/ProfileProjectLayoutPage';
import SinglePermissionServicesPage from '../components/cb_components/PermissionServicesPage/SinglePermissionServicesPage';
import PermissionServiceProjectLayoutPage from '../components/cb_components/PermissionServicesPage/PermissionServiceProjectLayoutPage';
import SinglePermissionFieldsPage from '../components/cb_components/PermissionFieldsPage/SinglePermissionFieldsPage';
import PermissionFieldProjectLayoutPage from '../components/cb_components/PermissionFieldsPage/PermissionFieldProjectLayoutPage';
import SingleDynaLoaderPage from '../components/cb_components/DynaLoaderPage/SingleDynaLoaderPage';
import DynaLoaderProjectLayoutPage from '../components/cb_components/DynaLoaderPage/DynaLoaderProjectLayoutPage';
import DynaFieldsProjectLayoutPage from '../components/cb_components/DynaFieldsPage/DynaFieldsProjectLayoutPage';
import SingleStaffinfoPage from '../components/cb_components/StaffinfoPage/SingleStaffinfoPage';

import JobQueProjectLayoutPage from '../components/cb_components/JobQuesPage/JobQueProjectLayoutPage';
import SingleEmployeesPage from '../components/cb_components/EmployeesPage/SingleEmployeesPage';
import EmployeeProjectLayoutPage from '../components/cb_components/EmployeesPage/EmployeeProjectLayoutPage';
import SingleMailQuesPage from '../components/cb_components/MailQuesPage/SingleMailQuesPage';
import MailQueProjectLayoutPage from '../components/cb_components/MailQuesPage/MailQueProjectLayoutPage';
import SingleSuperiorPage from '../components/cb_components/SuperiorPage/SingleSuperiorPage';
import SuperiorProjectLayoutPage from '../components/cb_components/SuperiorPage/SuperiorProjectLayoutPage';

import SingleDepartmentAdminPage from '../components/cb_components/DepartmentAdminPage/SingleDepartmentAdminPage';
import DepartmentAdminProjectLayoutPage from '../components/cb_components/DepartmentAdminPage/DepartmentAdminProjectLayoutPage';
import SingleDepartmentHODPage from '../components/cb_components/DepartmentHODPage/SingleDepartmentHODPage';
import DepartmentHODProjectLayoutPage from '../components/cb_components/DepartmentHODPage/DepartmentHODProjectLayoutPage';
import SingleDepartmentHOSPage from '../components/cb_components/DepartmentHOSPage/SingleDepartmentHOSPage';
import DepartmentHOProjectLayoutPage from '../components/cb_components/DepartmentHOSPage/DepartmentHOProjectLayoutPage';
import SingleInboxPage from '../components/cb_components/InboxPage/SingleInboxPage';
import InboxProjectLayoutPage from '../components/cb_components/InboxPage/InboxProjectLayoutPage';
import SingleNotificationsPage from '../components/cb_components/NotificationsPage/SingleNotificationsPage';
import NotificationProjectLayoutPage from '../components/cb_components/NotificationsPage/NotificationProjectLayoutPage';

import SingleDocumentStoragesPage from '../components/cb_components/DocumentStoragesPage/SingleDocumentStoragesPage';
import DocumentStorageProjectLayoutPage from '../components/cb_components/DocumentStoragesPage/DocumentStorageProjectLayoutPage';
import SingleErrorLogsPage from '../components/cb_components/ErrorLogsPage/SingleErrorLogsPage';
import ErrorLogProjectLayoutPage from '../components/cb_components/ErrorLogsPage/ErrorLogProjectLayoutPage';

import SingleUserLoginPage from '../components/cb_components/UserLoginPage/SingleUserLoginPage';
import UserLoginProjectLayoutPage from '../components/cb_components/UserLoginPage/UserLoginProjectLayoutPage';
import UserChangePasswordProjectLayoutPage from '../components/cb_components/UserChangePasswordPage/UserChangePasswordProjectLayoutPage';
import TestProjectLayoutPage from '../components/cb_components/TestsPage/TestProjectLayoutPage';
import SingleTestsPage from '../components/cb_components/TestsPage/SingleTestsPage';

import SingleVouchersPage from "../components/app_components/HomePage/SingleVouchersPage";
import VoucherProjectLayoutPage from "../components/app_components/HomePage/VoucherProjectLayoutPage";
import SingleCategoryPage from "../components/app_components/CategoryPage/SingleCategoryPage";
import CategoryProjectLayoutPage from "../components/app_components/CategoryPage/CategoryProjectLayoutPage";
import SingleCartItemHistoryPage from "../components/app_components/MyVouchers/SingleCartItemHistoryPage";
import CartItemHistoryProjectLayoutPage from "../components/app_components/MyVouchers/CartItemHistoryProjectLayoutPage";
import HomePage from "../components/app_components/HomePage/HomePage";
import VoucherDetailsModal from "../components/app_components/VoucherDetails/VoucherDetailsModal";
import CartPage from "../components/app_components/CartPage/CartPage";
import ProfilePage from "../components/app_components/ProfilePage/ProfilePage";
//  ~cb-add-import~

const MyRouter = (props) => {
    return (
        <Routes>
        <Route path="/signup" element={<RegisterPage />} />
        <Route path="/" exact element={ 
            props.isLoggedIn ? <Navigate to="/home" replace /> : <LoginPage />
        } />
        <Route path="/login" exact element={
  props.isLoggedIn ? <Navigate to="/home" replace /> : <LoginPage />
} />
            <Route path="/reset/:singleChangeForgotPasswordId" exact element={<ResetPage />} />
            <Route path="/maintenance" exact element={<MaintenancePage />} />
            <Route path="/login-faq" exact element={<LoginFaqPage />} />

            <Route path="/how-it-works" exact element={<HowItWorksPage />} />
            <Route element={<ProtectedRoute redirectPath={'/login'} />}>
                {/* Admin Panel Layout and Nested Routes */}
                <Route path="/admin" element={<AdminPage />}>
                  <Route path="categories" element={<AdminCategoryPage />} />
                  <Route path="vouchers" element={<AdminVoucherPage />} />
                  {/* ✅ Index route for /admin */}
                <Route index element={<AdminDashboard />} />
                 <Route path="users" element={<AdminUserPage />} />
  
                  {/* Add more nested admin routes here, e.g. <Route path="users" element={<AdminUsersPage />} /> */}
                </Route>
           
                <Route path="/account" exact element={<Account />} />
                <Route path="/users/:singleUsersId" exact element={<SingleUsersPage />} />
                <Route path="/users" exact element={<UserProjectLayoutPage />} />

                // myapp
<Route path="/home" exact element={<HomePage />} />
<Route path="/vouchers/:singleVouchersId" exact element={<SingleVouchersPage />} />
<Route path="/vouchers" exact element={<VoucherProjectLayoutPage />} />
<Route path="/category/:singleCategoryId" exact element={<SingleCategoryPage />} />
<Route path="/category" exact element={<CategoryProjectLayoutPage />} />
<Route path="/cartItemHistory/:singleCartItemHistoryId" exact element={<SingleCartItemHistoryPage />} />
<Route path="/cartItemHistory" exact element={<CartItemHistoryProjectLayoutPage />} />
<Route path="/my-vouchers" exact element={<MyVouchersPage />} />
<Route path="/cart" exact element={<CartPage />} />
<Route path="/profile" exact element={<ProfilePage />} />
                {/* ~cb-add-protected-route~ */}

                // dashboards
                <Route path="/dashboard" exact element={<Dashboard />} />
                <Route path="/DashboardAdminControl" exact element={<DashboardAdminControl />} />
                <Route path="/DashboardCompanyData" exact element={<DashboardCompanyData />} />
                <Route path="/DashboardDataManagement" exact element={<DashboardDataManagement />} />
                <Route path="/DashboardErrors" exact element={<DashboardErrors />} />
                <Route path="/DashboardMessaging" exact element={<DashboardMessaging />} />
                <Route path="/DashboardUserManagement" exact element={<DashboardUserManagement />} />

                // user details
                <Route path="/users/:singleUsersId" exact element={<SingleUsersPage />} />
                <Route path="/users" exact element={<UserProjectLayoutPage />} />
                <Route path="/userInvites/:singleUserInvitesId" exact element={<SingleUserInvitesPage />} />
                <Route path="/userInvites" exact element={<UserInvitesProjectLayoutPage />} />
                <Route path="/userLogin/:singleUserLoginId" exact element={<SingleUserLoginPage />} />
                <Route path="/userLogin" exact element={<UserLoginProjectLayoutPage />} />
                <Route path="/userAddresses/:singleUserAddressesId" exact element={<SingleUserAddressesPage />} />
                <Route path="/userAddresses" exact element={<UserAddressProjectLayoutPage />} />
                <Route path="/userPhones/:singleUserPhonesId" exact element={<SingleUserPhonesPage />} />
                <Route path="/userPhones" exact element={<UserPhoneProjectLayoutPage />} />
                <Route path="/userChangePassword/:singleUserChangePasswordId" exact element={<SingleUserChangePasswordPage />} />
                <Route path="/userChangePassword" exact element={<UserChangePasswordProjectLayoutPage />} />
                // user management
                <Route path="/roles/:singleRolesId" exact element={<SingleRolesPage />} />
                <Route path="/roles" exact element={<RoleProjectLayoutPage />} />
                <Route path="/positions/:singlePositionsId" exact element={<SinglePositionsPage />} />
                <Route path="/positions" exact element={<PositionProjectLayoutPage />} />
                <Route path="/profiles/:singleProfilesId" exact element={<SingleProfilesPage />} />
                <Route path="/profiles" exact element={<ProfileProjectLayoutPage />} />
                // company data
                <Route path="/companies/:singleCompaniesId" exact element={<SingleCompaniesPage />} />
                <Route path="/companies" exact element={<CompanyProjectLayoutPage />} />
                <Route path="/branches/:singleBranchesId" exact element={<SingleBranchesPage />} />
                <Route path="/branches" exact element={<BranchProjectLayoutPage />} />
                <Route path="/departments/:singleDepartmentsId" exact element={<SingleDepartmentsPage />} />
                <Route path="/departments" exact element={<DepartmentProjectLayoutPage />} />
                <Route path="/sections/:singleSectionsId" exact element={<SingleSectionsPage />} />
                <Route path="/sections" exact element={<SectionProjectLayoutPage />} />
                <Route path="/companyAddresses/:singleCompanyAddressesId" exact element={<SingleCompanyAddressesPage />} />
                <Route path="/companyAddresses" exact element={<CompanyAddressProjectLayoutPage />} />
                <Route path="/companyPhones/:singleCompanyPhonesId" exact element={<SingleCompanyPhonesPage />} />
                <Route path="/companyPhones" exact element={<CompanyPhoneProjectLayoutPage />} />
                // admin controls
                <Route path="/permissionServices/:singlePermissionServicesId" exact element={<SinglePermissionServicesPage />} />
                <Route path="/permissionServices" exact element={<PermissionServiceProjectLayoutPage />} />
                <Route path="/permissionFields/:singlePermissionFieldsId" exact element={<SinglePermissionFieldsPage />} />
                <Route path="/permissionFields" exact element={<PermissionFieldProjectLayoutPage />} />
                <Route path="/superior/:singleSuperiorId" exact element={<SingleSuperiorPage />} />
                <Route path="/superior" exact element={<SuperiorProjectLayoutPage />} />
                <Route path="/departmentAdmin/:singleDepartmentAdminId" exact element={<SingleDepartmentAdminPage />} />
                <Route path="/departmentAdmin" exact element={<DepartmentAdminProjectLayoutPage />} />
                <Route path="/departmentHOD/:singleDepartmentHODId" exact element={<SingleDepartmentHODPage />} />
                <Route path="/departmentHOD" exact element={<DepartmentHODProjectLayoutPage />} />
                <Route path="/departmentHOS/:singleDepartmentHOSId" exact element={<SingleDepartmentHOSPage />} />
                <Route path="/departmentHOS" exact element={<DepartmentHOProjectLayoutPage />} />
                <Route path="/employees/:singleEmployeesId" exact element={<SingleEmployeesPage />} />
                <Route path="/employees" exact element={<EmployeeProjectLayoutPage />} />
                <Route path="/staffinfo/:singleStaffinfoId" exact element={<SingleStaffinfoPage />} />
                <Route path="/staffinfo" exact element={<StaffinfoProjectLayoutPage />} />
                <Route path="/tests/:singleTestsId" exact element={<SingleTestsPage />} />
                <Route path="/tests" exact element={<TestProjectLayoutPage />} />
                // notifications and messaging
                <Route path="/notifications/:singleNotificationsId" exact element={<SingleNotificationsPage />} />
                <Route path="/notifications" exact element={<NotificationProjectLayoutPage />} />
                <Route path="/inbox/:singleInboxId" exact element={<SingleInboxPage />} />
                <Route path="/inbox" exact element={<InboxProjectLayoutPage />} />
                <Route path="/templates/:singleTemplatesId" exact element={<SingleTemplatesPage />} />
                <Route path="/templates" exact element={<TemplateProjectLayoutPage />} />
                <Route path="/mails/:singleMailsId" exact element={<SingleMailsPage />} />
                <Route path="/mails" exact element={<MailProjectLayoutPage />} />
                // document storage
                <Route path="/documentStorages/:singleDocumentStoragesId" exact element={<SingleDocumentStoragesPage />} />
                <Route path="/documentStorages" exact element={<DocumentStorageProjectLayoutPage />} />
                // data loader
                <Route path="/dynaLoader/:singleDynaLoaderId" exact element={<SingleDynaLoaderPage />} />
                <Route path="/dynaLoader" exact element={<DynaLoaderProjectLayoutPage />} />
                <Route path="/dynaFields" exact element={<DynaFieldsProjectLayoutPage />} />
                // jobs and ques
                <Route path="/jobQues" exact element={<JobQueProjectLayoutPage />} />
                <Route path="/mailQues/:singleMailQuesId" exact element={<SingleMailQuesPage />} />
                <Route path="/mailQues" exact element={<MailQueProjectLayoutPage />} />
                // gen ai
                <Route path="/chataiProject" element={<ChataiProjectLayoutPage />} />
                <Route path="/chataiProject/:promptId" element={<ChataiProjectLayoutPage />} />
                <Route path="/prompts" exact element={<PromptsUserLayoutPage />} />
                <Route path="/prompts/:singlePromptsId" exact element={<SinglePromptsPage />} />
                <Route path="/chataiUsage" exact element={<ChatAiUsageLayoutPage />} />
                // bugs and errors
                <Route path="/errorLogs/:singleErrorLogsId" exact element={<SingleErrorLogsPage />} />
                <Route path="/errorLogs" exact element={<ErrorLogProjectLayoutPage />} />

            </Route>
            {/* ~cb-add-route~ */}

            <Route path="*" element={<NoMatch />} />
        </Routes>
    );
};

const mapState = (state) => {
    const { isLoggedIn } = state.auth;
    return { isLoggedIn };
};
const mapDispatch = (dispatch) => ({
    alert: (data) => dispatch.toast.alert(data)
});

export default connect(mapState, mapDispatch)(MyRouter);
