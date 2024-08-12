import React, { useState } from "react";
import Title from "../components/common/Title";
import Button from "../components/common/Button";
import { IoMdAdd } from "react-icons/io";
import { getInitials } from "../utils";
import { toast } from "react-hot-toast";
import clsx from "clsx";
//import ConfirmatioDialog, { UserAction } from "../components/ConfirmatioDialog";

import {
  useDeleteUserMutation,
  useGetAllUsersQuery,
  useUserActionMutation,
} from "../redux/slices/userApiSlice";
import { FaTrashAlt, FaEdit } from "react-icons/fa";


//import AddUser from "../components/AddUser";

const UserPage = () => {
  const [openDialog, setOpenDialog] = useState(false);
  const [open, setOpen] = useState(false);
  const [openAction, setOpenAction] = useState(false);
  const [selected, setSelected] = useState(null);
  const [userAction] = useUserActionMutation();
  const [deleteUser] = useDeleteUserMutation();
  const { data, refetch } = useGetAllUsersQuery();

  //paginate
  const [currentPage, setCurrentPage] = useState(1);
  const usersPerPage = 10;
  const indexOfLastUser = currentPage * usersPerPage;
  const indexOfFirstUser = indexOfLastUser - usersPerPage;
  const currentUsers = data?.slice(indexOfFirstUser, indexOfLastUser);
  const paginate = (pageNumber) => setCurrentPage(pageNumber);

  //delete user
  const deleteClick = (id) => {
    setSelected(id);
    deleteHandler(id);
  };
  const deleteHandler = async (id) => {
    try {
      const result = await deleteUser(id);
      refetch();
      window.location.reload();
      toast.success("Deleted Successfully");
      setTimeout(() => {
        setOpenDialog(false);
      }, 1500);
    } catch (error) {
      console.error("Error during deletion:", error);
      toast.error("Failed to delete user. Please try again.");
    }
  };

  const userActionHandler = async () => {
    try {
      const result = await userAction({
        isActive: !selected?.isActive,
        id: selected?._id,
      });
      refetch();
      toast.success("Updated Successfully");
      setSelected(null);
      setTimeout(() => {
        setOpenAction(false);
      }, 1500);
    } catch (err) {
      console.log(err);
      toast.error(err?.data?.message || err.error);
    }
  };

  const editClick = (el) => {
    setSelected(el);
    setOpen(true);
  };

  const userStatusClick = (el) => {
    setSelected(el);
    setOpenAction(true);
  };

  const TableHeader = () => (
    <thead className="border-b border-gray-300">
      <tr className="text-black text-center">
        <th className="py-2">Full Name</th>
        <th className="py-2">Title</th>
        <th className="py-2">Email</th>
        <th className="py-2">Role</th>
        <th className="py-2">Active</th>
      </tr>
    </thead>
  );

  const TableRow = ({ user }) => (
    <tr className="border-b border-gray-200 text-gray-600 hover:bg-gray-400/10">
      <td className="p-2">
        <div className="flex items-center gap-4">
          <div className="w-9 h-9 rounded-full text-white flex items-center justify-center text-sm bg-emerald-500">
            <span className="text-xs md:text-sm text-center">
              {getInitials(user.name)}
            </span>
          </div>
          {user.name}
        </div>
      </td>

      <td className="p-2">{user.title}</td>
      <td className="p-2">{user.email || "user.email.com"}</td>
      <td className="p-2">{user.role}</td>

      <td>
        <button
          onClick={() => userStatusClick(user)}
          className={clsx(
            "w-fit px-4 py-1 rounded-full",
            user?.isActive ? "bg-green-300" : "bg-yellow-100"
          )}
        >
          {user?.isActive ? "Active" : "Disabled"}
        </button>
      </td>

      <td className="p-2 flex gap-4 justify-end">
        <Button
          className="text-blue-600 hover:text-blue-500 font-semibold sm:px-0"
          type="button"
          onClick={() => editClick(user)}
          icon={<FaEdit />}
        />
        <Button
          className="text-red-700 hover:text-red-500 font-semibold sm:px-0"
          type="button"
          onClick={() => deleteClick(user?._id)}
          icon={<FaTrashAlt />}
        />
      </td>
    </tr>
  );

  return (
    <>
      <div className="w-full md:px-1 px-0 mb-6">
        <div className="flex items-center justify-between mb-8">
          <Title title="  Team Members" />
          <Button
            label="Add New User"
            icon={<IoMdAdd className="text-lg" />}
            className="flex flex-row-reverse gap-1 items-center bg-emerald-500 text-white rounded-md 2xl:py-2.5"
            onClick={() => setOpen(true)}
          />
        </div>

        <div className="bg-white px-2 md:px-4 py-4 shadow-md rounded">
          <div className="overflow-x-auto">
            <table className="w-full mb-5">
              <TableHeader />
              <tbody className="text-center">
                {data &&
                  data.map((user, index) => (
                    <TableRow key={index} user={user} />
                  ))}
              </tbody>
            </table>
            <div className="flex justify-center mt-4">
              {data &&
                Array.from(
                  { length: Math.ceil(data.length / usersPerPage) },
                  (_, i) => (
                    <button
                      key={i}
                      onClick={() => paginate(i + 1)}
                      className={clsx(
                        "px-3 py-1 mx-1 rounded-full text-sm",
                        currentPage === i + 1 ? "bg-blue-200" : "bg-gray-200"
                      )}
                    >
                      {i + 1}
                    </button>
                  )
                )}
            </div>
          </div>
        </div>
      </div>
      {/*<AddUser
        open={open}
        setOpen={setOpen}
        userData={selected}
        key={new Date().getTime().toString()}
      />

      <UserAction
        open={openAction}
        setOpen={setOpenAction}
        onClick={userActionHandler}
      />

      <ConfirmatioDialog
        open={openDialog}
        setOpen={setOpenDialog}
        onClick={deleteHandler}
      />*/}
    </>
  );
};

export default UserPage;
