import axiosInstance from '../config/axios';

const getMyClients = async () => {
  const { data, status, statusText } = await axiosInstance.get(`client/all`);

  return { data, status, statusText };
};

const updateClient = async ({ id, updatedData }) => {
  const { data, status, statusText } = await axiosInstance.put(
    `client/update/${id}`,
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

export { getMyClients, updateClient, deleteUser };
