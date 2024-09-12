import { useState } from "react";
import {
  IconButton,
  Typography,
  List,
  ListItem,
  ListItemPrefix,
  ListItemSuffix,
  Chip,
  Accordion,
  AccordionHeader,
  AccordionBody,
  Alert,
  Input,
  Drawer,
  Card,
} from "@material-tailwind/react";
import {
  UserCircleIcon,
  Cog6ToothIcon,
  InboxIcon,
  PowerIcon,
} from "@heroicons/react/24/solid";
import {
  HomeIcon,
  BriefcaseIcon,
  ChatBubbleLeftRightIcon,
  Bars3Icon,
  XMarkIcon,
} from "@heroicons/react/24/outline";
import { Link, NavLink, useLocation, useNavigate } from "react-router-dom";

export default function RecruiterSidebar() {
  const [open, setOpen] = useState(0);
  const [openAlert, setOpenAlert] = useState(true);
  const [isDrawerOpen, setIsDrawerOpen] = useState(false);

  const handleOpen = (value) => {
    setOpen(open === value ? 0 : value);
  };

  const openDrawer = () => setIsDrawerOpen(true);
  const closeDrawer = () => setIsDrawerOpen(false);

  const NavItem = ({ icon, text, to, chipValue }) => {
    return (
      <NavLink
        to={to}
        className={({ isActive }) =>
          isActive ? "bg-blue-gray-50 text-black rounded-md" : ""
        }
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
                className="rounded-full"
              />
            </ListItemSuffix>
          )}
        </ListItem>
      </NavLink>
    );
  };

  return (
    <>
      <IconButton
        variant="text"
        size="lg"
        onClick={openDrawer}
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
        onClose={closeDrawer}
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
              to={"hello"}
              text={"Inbox"}
              icon={<ChatBubbleLeftRightIcon className="h-5 w-5" />}
              chipValue={14}
            />
            <ListItem>
              <ListItemPrefix>
                <Cog6ToothIcon className="h-5 w-5" />
              </ListItemPrefix>
              Settings
            </ListItem>
            <ListItem>
              <ListItemPrefix>
                <PowerIcon className="h-5 w-5" />
              </ListItemPrefix>
              Log Out
            </ListItem>
          </List>
        </Card>
      </Drawer>
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
              text={"Chat"}
              icon={<ChatBubbleLeftRightIcon className="h-5 w-5" />}
              chipValue={14}
            />
            <ListItem>
              <ListItemPrefix>
                <Cog6ToothIcon className="h-5 w-5" />
              </ListItemPrefix>
              Settings
            </ListItem>
            <ListItem className="text-white bg-red-900 hover:bg-red-700 selected:bg-black">
              <ListItemPrefix>
                <PowerIcon className="h-5 w-5" />
              </ListItemPrefix>
              Log Out
            </ListItem>
          </List>
        </Card>
      </div>
    </>
  );
}
