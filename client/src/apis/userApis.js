import axiosInstance from '../config/axios';

const getMyUsers = async () => {
  const { data, status, statusText } = await axiosInstance.get(`user/myUsers`);

  return { data, status, statusText };
};

const updateUser = async ({ id, updatedData }) => {
  const { data, status, statusText } = await axiosInstance.put(
    `user/update/${id}`,
    updatedData
  );

  return { data, status, statusText };
};

const deleteUser = async (id) => {
  const { data, status, statusText } = await axiosInstance.delete(
    `user/delete/${id}`
  );

  return { data, status, statusText };
};

export { getMyUsers, updateUser, deleteUser };
