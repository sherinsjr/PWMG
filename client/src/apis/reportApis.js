import axiosInstance from '../config/axios';

const updateReport = async ({ id, updatedData }) => {
  console.log(id);

  const { data, status, statusText } = await axiosInstance.put(
    `report/update/${id}`,
    updatedData
  );

  return { data, status, statusText };
};

const deleteReport = async (id) => {
  const { data, status, statusText } = await axiosInstance.delete(
    `report/delete/${id}`
  );

  return { data, status, statusText };
};

export { updateReport, deleteReport };
