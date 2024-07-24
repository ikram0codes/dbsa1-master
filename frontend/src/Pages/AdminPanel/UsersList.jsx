import React, { useEffect, useState } from "react";
import { FaCheck } from "react-icons/fa";
import { MdDelete } from "react-icons/md";
import { FaRegEdit } from "react-icons/fa";
import { ImCross } from "react-icons/im";
// import AdminPanel from "../../components/AdminPanel";
import { toast } from "react-toastify";
import {
  useDeleteUserMutation,
  useUpdateUserMutation,
  useUserListQuery,
} from "../../Redux/Api/userApiSlice";
import Message from "../../Components/Message";
import Loader from "../../Components/Loader";

const UsersList = () => {
  const [page, setPage] = useState(1);
  const { data, isLoading, refetch, error } = useUserListQuery({ page });
  const [deleteUser] = useDeleteUserMutation();
  const [updateUser] = useUpdateUserMutation();
  // console.log(users);
  //   const [userDetails] = useUserDetailsQuery();
  const [editableUsername, setEditableUsername] = useState("");
  const [editableEmail, setEditableEmail] = useState("");
  const [editableUserId, setEditableUserId] = useState("");
  const [editableAdmin, setEditableAdmin] = useState(false);
  // console.log(data?.users);
  const updateHandler = async (_id) => {
    try {
      await updateUser({
        _id,
        username: editableUsername,
        email: editableEmail,
        isAdmin: editableAdmin,
      }).unwrap();
      setEditableUserId("");
      toast.success("user update successfully");
    } catch (error) {
      toast.error(error?.data?.error || error.error);
    }
  };
  const deleteHandler = async (_id) => {
    if (window.confirm("Are you sure ?")) {
      try {
        await deleteUser(_id).unwrap();
        toast.success("user deleted successfully");
      } catch (error) {
        toast.error(error?.data?.error || error.error);
      }
    }
  };
  const toggleEdit = (_id, email, username, isAdmin) => {
    setEditableUserId(_id);
    setEditableEmail(email);
    setEditableUsername(username);
    setEditableAdmin(isAdmin);
  };

  const increaseHandler = () => {
    if (data?.numOfUsers / 10 + 1 > page) {
      setPage(page + 1);
    } else {
      toast.error("no more items");
    }
  };

  const descreaseHandler = () => {
    console.log(page);
    if (page > 1) {
      setPage(page - 1);
    } else {
      toast.error("first page");
    }
  };

  useEffect(() => {
    refetch();
  }, [refetch, data?.users]);

  return (
    <div className="flex justify-center">
      {isLoading ? (
        <Loader />
      ) : error ? (
        <Message variant="error">{error.data.error || error.error}</Message>
      ) : (
        <div className="w-full flex flex-col overflow-x-auto justify-center items-start p-4 sm:p-0">
          {/* <AdminPanel /> */}
          <table className="mt-8 font2 w-full">
            <thead>
              <tr className="mb-[5rem] text-[14px] font-[700] ">
                {/* <th className="uppercase text-left px-3 py-2">Id</th> */}
                <th className="uppercase  px-3 py-2">Username</th>
                <th className="uppercase  px-3 py-2">Email</th>
                <th className="uppercase  px-3 py-2">Admin</th>
                <th className="uppercase  px-3 py-2"></th>
                <th className="uppercase px-3 py-2"></th>
              </tr>
            </thead>
            <tbody className="text-[16px] font-[400] font2">
              {data?.users.map((user) => {
                const { _id, username, email, isAdmin } = user;
                return (
                  <tr key={_id}>
                    {/* <td className="text-left px-3 py-2">{_id}</td> */}
                    <td data-cell="Username" className="px-3 py-2">
                      {editableUserId !== _id ? (
                        <div className="min-w-[125px] text-[#525CEB] capitalize">
                          {username}
                        </div>
                      ) : (
                        <div className="flex justify-between bg-gray-500 rounded">
                          <input
                            type="text"
                            className="bg-transparent w-full  text-white text-center px-2 py-2 focus:outline-none "
                            placeholder="Username"
                            value={editableUsername}
                            onChange={(e) => {
                              setEditableUsername(e.target.value);
                            }}
                          />
                          <button
                            className="bg-[#525CEB] text-white px-3 py-2 rounded-r"
                            onClick={() => {
                              updateHandler(_id);
                            }}
                          >
                            <FaCheck />
                          </button>
                        </div>
                      )}
                    </td>
                    <td data-cell="Email" className="px-3 py-2">
                      {editableUserId !== _id ? (
                        <div>{email}</div>
                      ) : (
                        <div className="flex justify-between bg-gray-500 rounded">
                          <input
                            type="text"
                            placeholder="Username"
                            className="bg-transparent w-full  text-white text-center px-2 py-2 focus:outline-none "
                            value={editableEmail}
                            onChange={(e) => {
                              setEditableEmail(e.target.value);
                            }}
                          />
                          <button
                            className="bg-[#525CEB] text-white px-3 py-2 rounded-r"
                            onClick={() => {
                              updateHandler(_id);
                            }}
                          >
                            <FaCheck />
                          </button>
                        </div>
                      )}
                    </td>
                    <td data-cell="IsAdmin" className="text-center px-3 py-2">
                      {editableUserId !== _id ? (
                        isAdmin ? (
                          <div className="flex justify-center">
                            <span className="text-green-400 text-xl text-center">
                              <FaCheck />
                            </span>
                          </div>
                        ) : (
                          <div className="flex justify-center">
                            <span className="text-red-400 text-xl">
                              <ImCross />
                            </span>
                          </div>
                        )
                      ) : (
                        <div className="flex justify-between bg-gray-500 rounded">
                          <input
                            type="checkbox"
                            className="bg-transparent w-full  text-white text-center px-2 py-2 focus:outline-none "
                            defaultChecked={editableAdmin}
                            // checked={isAdmin}
                            onChange={(e) => {
                              setEditableAdmin(e.target.checked);
                            }}
                          />
                          <button
                            className="bg-[#525CEB] text-white px-3 py-2 rounded-r"
                            onClick={() => {
                              updateHandler(_id);
                            }}
                          >
                            <FaCheck />
                          </button>
                        </div>
                      )}
                      {}
                    </td>
                    <td className="text-center px-3 py-2 space-x-6">
                      <div className="flex w-full justify-between sm:justify-center">
                        {!isAdmin && (
                          <div className="flex justify-center">
                            <button
                              className="text-red-400 text-2xl"
                              onClick={() => {
                                deleteHandler(_id);
                              }}
                            >
                              <MdDelete />
                            </button>
                          </div>
                        )}
                        <div className="flex w-full justify-end">
                          <button
                            className="text-[#525CEB] text-xl"
                            onClick={() => {
                              toggleEdit(_id, email, username, isAdmin);
                            }}
                          >
                            <FaRegEdit />
                          </button>
                        </div>
                      </div>
                    </td>
                    {/* <td className="text-center px-3 py-2"></td> */}
                  </tr>
                );
              })}
            </tbody>
          </table>
          <div className="w-full flex justify-between items-center gap-4 mt-6 p-8 flex-wrap">
            <div className="uppercase text-gray-400 font2 font-[500] ">
              total {data?.numOfUsers} Products in{" "}
              {Math.ceil(data?.numOfUsers / 10)} pages{" "}
            </div>
            <div className="gap-3 px-2 flex justify-end">
              <button
                onClick={descreaseHandler}
                className="rounded-md bg-[#525CEB] text-white p-2"
              >
                Prev
              </button>

              <button
                className={`w-[40px] text-[white] p-2 h-[40px] rounded-md bg-[#525CEB]`}
              >
                {page}
              </button>
              <button
                onClick={increaseHandler}
                className="rounded-md bg-[#525CEB] text-white p-2"
              >
                Next
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default UsersList;
