import { memo, useState } from "react";
import {
  IconButton,
  List,
  ListItem,
  ListItemPrefix,
  ListItemSuffix,
  Chip,
  Drawer,
  Card,
} from "@material-tailwind/react";
import {
  UserCircleIcon,
  Cog6ToothIcon,
  PowerIcon,
  VideoCameraIcon,
} from "@heroicons/react/24/solid";
import {
  HomeIcon,
  BriefcaseIcon,
  ChatBubbleLeftRightIcon,
  Bars3Icon,
  XMarkIcon,
} from "@heroicons/react/24/outline";
import { NavLink } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";

import { useLogout } from "../../hooks/useLogout";
import { openModal } from "../../redux/slices/modalSlice";

const RecruiterSidebar = () => {
  const { userInfo } = useSelector((state) => state.user);
  const { handleLogout } = useLogout();
  const [isDrawerOpen, setIsDrawerOpen] = useState(false);
  const dispatch = useDispatch();

  const handleClick = async (e) => {
    if (!userInfo.isPro) {
      e.preventDefault();
      dispatch(openModal());
      return;
    }
  };

  const handleDrawer = () => setIsDrawerOpen((prev) => !prev);

  return (
    <>
      <div className="hidden md:block w-64">
        {" "}
        {/* Hidden on small screens, visible on medium and up */}
        <Card color="transparent" shadow={true} className="h-full p-1 left-0">
          <List>
            <NavItem
              to={"home"}
              text={"Dashboard"}
              icon={<HomeIcon className="h-5 w-5" />}
            />
            <NavItem
              to={"jobs"}
              text={"Jobs"}
              icon={<BriefcaseIcon className="h-5 w-5" />}
            />
            <NavItem
              to={"profile"}
              text={"Profile"}
              icon={<UserCircleIcon className="h-5 w-5" />}
            />
            <NavItem
              to={"chats"}
              text={"Chats"}
              icon={<ChatBubbleLeftRightIcon className="h-5 w-5" />}
            />
            <NavItem
              onClick={handleClick}
              pro={true}
              chipValue={"pro"}
              to={"meetings"}
              text={"Meetings"}
              icon={<VideoCameraIcon className="h-5 w-5" />}
            />

            <ListItem
              className="text-white bg-red-900 hover:bg-red-700 selected:bg-black"
              onClick={handleLogout}
            >
              <ListItemPrefix>
                <PowerIcon className="h-5 w-5" />
              </ListItemPrefix>
              Log Out
            </ListItem>
          </List>
        </Card>
      </div>
      <IconButton
        variant="text"
        size="lg"
        onClick={handleDrawer}
        className="md:hidden"
      >
        {isDrawerOpen ? (
          <XMarkIcon className="h-8 w-8 stroke-2 " />
        ) : (
          <Bars3Icon className="h-8 w-8 stroke-2 " />
        )}
      </IconButton>
      <Drawer
        open={isDrawerOpen}
        onClose={handleDrawer}
        className="w-62 md:hidden"
        overlay={false}
      >
        <Card color="transparent" shadow={false} className="h-auto w-full p-1">
          <List>
            <NavItem
              to={"home"}
              text={"Dashboard"}
              icon={<HomeIcon className="h-5 w-5" />}
            />
            <NavItem
              to={"jobs"}
              text={"Jobs"}
              icon={<BriefcaseIcon className="h-5 w-5" />}
            />
            <NavItem
              to={"profile"}
              text={"Profile"}
              icon={<UserCircleIcon className="h-5 w-5" />}
            />
            <NavItem
              to={"chats"}
              text={"Chats"}
              icon={<ChatBubbleLeftRightIcon className="h-5 w-5" />}
            />
            <NavItem
              onClick={handleClick}
              pro={true}
              chipValue={"pro"}
              to={"meetings"}
              text={"Meetings"}
              icon={<VideoCameraIcon className="h-5 w-5" />}
            />

            <ListItem
              className="text-white bg-red-900 hover:bg-red-700 selected:bg-black"
              onClick={handleLogout}
            >
              <ListItemPrefix>
                <PowerIcon className="h-5 w-5" />
              </ListItemPrefix>
              Log Out
            </ListItem>
          </List>
        </Card>
      </Drawer>
    </>
  );
};

const NavItem = ({ icon, text, to, chipValue, onClick }) => {
  return (
    <NavLink
      to={to}
      className={({ isActive }) =>
        isActive ? "bg-blue-gray-50 text-black rounded-md" : ""
      }
      onClick={onClick}
    >
      <ListItem>
        <ListItemPrefix>{icon}</ListItemPrefix>
        {text}
        {chipValue && (
          <ListItemSuffix>
            <Chip
              value={chipValue}
              size="sm"
              variant="ghost"
              color="blue-gray"
              className="rounded-full bg-red-200 text-gray-50"
            />
          </ListItemSuffix>
        )}
      </ListItem>
    </NavLink>
  );
};

export default RecruiterSidebar;
