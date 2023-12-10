import express from "express";

import RoleController from "../controllers/RoleController.js";
import UserController from "../controllers/UserController.js";
import MasterMenuController from "../controllers/MasterMenuController.js";
import SubmenuController from "../controllers/SubmenuController.js";
import RoleMenuAccessController from "../controllers/RoleMenuAccessController.js";

import UserValidation from "../middleware/validation/UserValidation.js";
import Authorization from "../middleware/Authorization.js";
import MenuValidation from "../middleware/validation/MenuValidation.js";
import ArisanController from "../controllers/ArisanController.js";
import ParticipantController from "../controllers/ParticipantController.js";
import EventController from "../controllers/EventController.js";
import PembayaranController from "../controllers/PembayaranController.js";
import WordController from "../controllers/WordController.js";

const router = express.Router();

//role router
router.get("/role", Authorization.Authenticated,  RoleController.GetRole);
router.post("/role", Authorization.Authenticated, RoleController.CreateRole);
router.post("/role/:id", Authorization.Authenticated, RoleController.UpdateRole);
router.delete("/role/:id", Authorization.Authenticated, RoleController.DeleteRole);
router.get("/role/:id", Authorization.Authenticated, RoleController.GetRoleById);

//user router
router.post("/user/signup",UserValidation.RegisterValidation, UserController.Register);
router.post("/user/login", UserController.UserLogin);
router.get("/user/refresh-token", UserController.RefreshToken);
router.get("/user/current-user", Authorization.Authenticated, UserController.UserDetail);
router.get("/user/logout", Authorization.Authenticated, UserController.UserLogout);
router.post("/user/signup-google",UserController.RegisterGoogle);
router.post("/user/login-google", UserController.UserLoginGoogle);


// Master Menu Router
router.post("/menu", MenuValidation.CreateMenuValidation, Authorization.Authenticated, Authorization.AdminRole, MasterMenuController.CreateMenu);
router.get("/menu", Authorization.Authenticated, Authorization.AdminRole, MasterMenuController.GetListMenu);
router.get("/menu/get/all", Authorization.Authenticated, Authorization.AdminRole, MasterMenuController.GetAllMenu);
router.get("/menu/:id", Authorization.Authenticated, Authorization.AdminRole, MasterMenuController.GetDetailMenu);
router.patch("/menu/:id", MenuValidation.CreateMenuValidation, Authorization.Authenticated, Authorization.AdminRole, MasterMenuController.UpdateMenu);
router.delete("/menu/:id", Authorization.Authenticated, Authorization.AdminRole, MasterMenuController.SoftDeleteMenu);
router.delete("/menu/permanent/:id", Authorization.Authenticated, Authorization.AdminRole, MasterMenuController.DeletePermanent);

// Submenu router
router.post("/sub-menu", MenuValidation.CreateSubmenuValidation, Authorization.Authenticated, Authorization.AdminRole, SubmenuController.CreateSubmenu);
router.get("/sub-menu", Authorization.Authenticated, Authorization.AdminRole, SubmenuController.GetListSubmenu);
router.get("/sub-menu/get/all", Authorization.Authenticated, Authorization.AdminRole, SubmenuController.GetAllSubmenu);
router.get("/sub-menu/:id", Authorization.Authenticated, Authorization.AdminRole, SubmenuController.GetDetailSubmenu);
router.patch("/sub-menu/:id", MenuValidation.CreateSubmenuValidation, Authorization.Authenticated, Authorization.AdminRole, SubmenuController.UpdateSubmenu);
router.delete("/sub-menu/:id", Authorization.Authenticated, Authorization.AdminRole, SubmenuController.SoftDelete);
router.delete("/sub-menu/permanent/:id", Authorization.Authenticated, Authorization.AdminRole, SubmenuController.DeletePermanent);

// Role Menu Access router
router.post("/role-menu-access", MenuValidation.CreateRoleMenuAccess , Authorization.Authenticated, Authorization.AdminRole, RoleMenuAccessController.CreateAccess);
router.get("/role-menu-access", Authorization.Authenticated, Authorization.AdminRole, RoleMenuAccessController.GetList);
router.get("/role-menu-access/get/all", Authorization.Authenticated, Authorization.AdminRole, RoleMenuAccessController.GetAll);
router.get("/role-menu-access/:id", Authorization.Authenticated, Authorization.AdminRole, RoleMenuAccessController.GetDetail);
router.patch("/role-menu-access/:id", MenuValidation.CreateRoleMenuAccess, Authorization.Authenticated, Authorization.AdminRole, RoleMenuAccessController.UpdateAccess);
router.delete("/role-menu-access/:id", Authorization.Authenticated, Authorization.AdminRole, RoleMenuAccessController.SoftDelete);

//arisan
router.post("/api/arisan/create", ArisanController.Create);
router.get("/api/arisan/detail", ArisanController.Detail);
router.get("/api/arisan/view", ArisanController.View);
router.put("/api/arisan/delete", ArisanController.Delete);

// Word
router.post("/api/word/create", WordController.Create);
router.get("/api/word/view", WordController.View);
router.delete("/api/word/delete", WordController.Delete);



//participant router
router.post("/api/participant/create", ParticipantController.Create);
router.get("/api/participant/view", ParticipantController.View);    

//event router
router.post("/api/event/create", EventController.Create);
router.get("/api/event/view", EventController.View);  
router.get("/api/event/detail", EventController.Detail);
router.put("/api/event/set-winner", EventController.SetWinner);
router.put("/api/event/delete", EventController.Delete);

//pembayaran router
router.post("/api/pembayaran/create", PembayaranController.Create);
router.put("/api/pembayaran/remove", PembayaranController.Remove);
router.get("/api/pembayaran/view", PembayaranController.View);    
router.get("/api/pembayaran/viewpaid", PembayaranController.ViewPaid);    



export default router;