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
    useDeleteCountryMutation, useDeleteReservedMutation, useGetAllContactQuery,
    useGetAllCountriesQuery, useGetAllReservedQuery,
    usePostCountryMutation,
    usePutCountryMutation,
} from "../../../services/adminApi.jsx";
import { useState, useEffect } from "react";
import { COUNTRY_IMG_URL} from "../../../constants.js";
import {FaRegEdit} from "react-icons/fa";
import {MdDeleteForever} from "react-icons/md";
import showToast from "../../../components/ToastMessage.js";

const ContactTable = () => {
    const { data: getAllContact } = useGetAllContactQuery();
    const contact = getAllContact?.data;
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
          title: "Telefon",
            dataIndex: "phoneNumber",
            key: "phoneNumber",

        },
        {
            title: "Not",
            dataIndex: "note",
            key: "note",
        },
    ];

    return (
        <div>
            <Table
                rowKey="id"
                columns={columns}
                dataSource={contact}
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

export default ContactTable;
