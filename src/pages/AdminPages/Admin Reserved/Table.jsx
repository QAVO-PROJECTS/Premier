import {
    Table,
    Button,
    Modal,
    Form,
    Input,
    Upload,
    message,
    Popconfirm, Select,
} from "antd";
import { PlusOutlined } from "@ant-design/icons";
import { CheckCircleOutlined, CloseCircleOutlined } from "@ant-design/icons";

import {
    useDeleteCountryMutation, useDeleteReservedMutation,
    useGetAllCountriesQuery, useGetAllReservedQuery,
    usePostCountryMutation,
    usePutCountryMutation,
} from "../../../services/adminApi.jsx";
import { useState, useEffect } from "react";
import { COUNTRY_IMG_URL} from "../../../constants.js";
import {FaRegEdit} from "react-icons/fa";
import {MdDeleteForever} from "react-icons/md";
import showToast from "../../../components/ToastMessage.js";

const ReservedTable = () => {
    const { data: getAllReserved, refetch: getAllBlogsRefetch } = useGetAllReservedQuery();
    const reserv = getAllReserved?.data;
    const [deleteReserved] = useDeleteReservedMutation();
    const columns = [
        {
            title: "#",
            dataIndex: "id",
            key: "id",
            render: (text, record, index) => <div>{index + 1}</div>,
        },
        {
            title: "Ad",
            dataIndex: "name",
            key: "name",
        },
        {
            title: "Soyad",
            dataIndex: "surname",
            key: "surname",
        },
        {
            title: "Email",
            dataIndex: "email",
            key: "email",
        },
        {
            title: "Tur",
            dataIndex: "tourName",
            key: "tourName",
        },

        {
            title: "Əməliyyatlar",
            key: "actions",
            render: (text, record) => (
                <div style={{ display: "flex", gap: "8px" ,justifyContent:"center"}}>

                    <Popconfirm
                        title="Silmək istədiyinizə əminsiniz?"
                        onConfirm={() => {
                            handleDelete(record.id);
                        }}
                        okText="Bəli"
                        cancelText="Xeyr"
                    >
                        <Button type="default" danger>
                            <MdDeleteForever />
                        </Button>
                    </Popconfirm>
                </div>
            ),
        },
    ];

    const handleDelete = async (id) => {
        try {
            // id-nin "requestId" açarı altında göndərilməsi
            const response = await deleteReserved({ requestId: id }).unwrap();
            if (response?.statusCode === 200) {
                showToast("Silinmə uğurla tamamlandı!", "success");
                getAllBlogsRefetch();
            } else {
                showToast("Silinmə zamanı xəta baş verdi!", "error");
            }
        } catch (error) {
            console.error(error);
            showToast("Silinmə zamanı xəta baş verdi!", "error");
        }
    };


    return (
        <div>
            <Table
                rowKey="id"
                columns={columns}
                dataSource={reserv}
                expandable={{
                    expandedRowRender: (record) => (
                        <div>
                            {record.description && <p>AZ: {record.description}</p>}
                            {record.descriptionRu && <p>RU: {record.descriptionRu}</p>}
                            {record.descriptionEng && <p>EN: {record.descriptionEng}</p>}
                        </div>
                    ),
                    rowExpandable: (record) =>
                        !!record.description || !!record.descriptionRu || !!record.descriptionEng,
                }}
                pagination={{ pageSize: 5 }}
            />

        </div>
    );
};

export default ReservedTable;
