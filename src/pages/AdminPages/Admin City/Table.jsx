import { Table, Button, Modal, Form, Input, message, Popconfirm, Select } from "antd";
import {
    useGetAllCitiesQuery,
    usePostCityMutation,
    usePutCityMutation,
    useDeleteCityMutation,
    useGetAllCountriesQuery,
} from "../../../services/adminApi.jsx";
import { useState, useEffect } from "react";
import { FaRegEdit } from "react-icons/fa";
import { MdDeleteForever } from "react-icons/md";
import showToast from "../../../components/ToastMessage.js";

const CitiesTable = () => {
    const { data: getAllCities, refetch: getAllCitiesRefetch } = useGetAllCitiesQuery();
    const cities = getAllCities?.data;
    const { data: getAllCountries, refetch: getAllBlogsRefetch } = useGetAllCountriesQuery();
    const countries = getAllCountries?.data;
    const [postCity] = usePostCityMutation();
    const [putCity] = usePutCityMutation();
    const [deleteCity] = useDeleteCityMutation();

    const [isModalVisible, setIsModalVisible] = useState(false);
    const [form] = Form.useForm();

    const [isEditModalVisible, setIsEditModalVisible] = useState(false);
    const [editingProduct, setEditingProduct] = useState(null);
    const [editForm] = Form.useForm();

    useEffect(() => {
        if (editingProduct) {
            editForm.setFieldsValue({
                name: editingProduct.name,
                nameEng: editingProduct.nameEng,
                nameRu: editingProduct.nameRu,
                countryId: editingProduct.countryId,
            });
        }
    }, [editingProduct, editForm]);

    const columns = [
        {
            title: "#",
            dataIndex: "id",
            key: "id",
            render: (text, record, index) => <div>{index + 1}</div>,
        },
        {
            title: "Şəhər (AZ)",
            dataIndex: "name",
            key: "name",
        },
        {
            title: "Ölkə ",
            dataIndex: "countryName",
            key: "countryName",
        },
        {
            title: "Əməliyyatlar",
            key: "actions",
            render: (text, record) => (
                <div style={{ display: "flex", gap: "8px", justifyContent: "center" }}>
                    <Button type="primary" onClick={() => showEditModal(record)}>
                        <FaRegEdit />
                    </Button>
                    <Popconfirm
                        title="Silmək istədiyinizə əminsiniz?"
                        onConfirm={() => handleDelete(record.id)}
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

    const expandedRowRender = (record) => (
        <div>
            <p style={{ margin: 0 }}>{record.description}</p>
        </div>
    );

    const showModal = () => {
        setIsModalVisible(true);
    };

    const handleCancel = () => {
        setIsModalVisible(false);
        form.resetFields();
    };

    const handleAddCity = async (values) => {
        const payload = {
            name: values.name,
            nameEng: values.nameEng,
            nameRu: values.nameRu,
            countryId: values.countryId,
        };

        try {
            const response = await postCity(payload).unwrap();
            if (response?.statusCode === 201) {
                showToast("Əlavə olundu!", "success");
                getAllCitiesRefetch();
            } else {
                showToast("Xəta baş verdi!", "error");
            }
        } catch (error) {
            console.error(error);
            showToast("Xəta baş verdi!", "error");
        }
        handleCancel();
    };

    const handleDelete = async (id) => {
        try {
            const response = await deleteCity(id).unwrap();
            if (response?.statusCode === 200) {
                showToast("Silinmə uğurla tamamlandı!", "success");
                getAllCitiesRefetch();
            } else {
                showToast("Silinmə zamanı xəta baş verdi!", "error");
            }
        } catch (error) {
            console.error(error);
            showToast("Silinmə zamanı xəta baş verdi!", "error");
        }
    };

    const showEditModal = (record) => {
        setEditingProduct(record);
        setIsEditModalVisible(true);
    };

    const handleEditCancel = () => {
        setIsEditModalVisible(false);
        editForm.resetFields();
        setEditingProduct(null);
    };

    const handleEditCity = async (values) => {
        const payload = {
            id: editingProduct.id,
            name: values.name,
            nameEng: values.nameEng,
            nameRu: values.nameRu,
            countryId: values.countryId,
        };
        try {
            const response = await putCity(payload).unwrap();
            if (response?.statusCode === 200) {
                showToast("Düzəliş uğurla tamamlandı!", "success");
                getAllCitiesRefetch();
            } else {
                showToast("Düzəliş zamanı xəta baş verdi!", "error");
            }
        } catch (error) {
            console.error(error);
            showToast("Düzəliş zamanı xəta baş verdi!", "error");
        }

        handleEditCancel();
    };

    return (
        <div>
            <Button type="primary" onClick={showModal} style={{ marginBottom: 16 }}>
                +
            </Button>
            <Table
                columns={columns}
                dataSource={cities}
                expandable={{
                    expandedRowRender,
                    rowExpandable: (record) => !!record.description,
                }}
                pagination={{ pageSize: 5 }}
            />

            <Modal
                title="Yeni Şəhər Əlavə Et"
                visible={isModalVisible}
                onCancel={handleCancel}
                footer={null}
                width={1000}
            >
                <Form form={form} layout="vertical" onFinish={handleAddCity}>
                    <div className="row">
                        <div className="col-6">
                            <Form.Item
                                name="name"
                                label="Ad"
                                rules={[{ required: true, message: "Ad daxil edin!" }]}
                            >
                                <Input placeholder="Ad" />
                            </Form.Item>
                            <Form.Item
                                name="nameEng"
                                label="Ad (EN)"
                                rules={[{ required: true, message: "Ad (EN) daxil edin!" }]}
                            >
                                <Input placeholder="Ad (EN)" />
                            </Form.Item>
                            <Form.Item
                                name="nameRu"
                                label="Ad (RU)"
                                rules={[{ required: true, message: "Ad (RU) daxil edin!" }]}
                            >
                                <Input placeholder="Ad (RU)" />
                            </Form.Item>
                        </div>
                        <div className="col-6">
                            <Form.Item
                                name="countryId"
                                label="Ölkə"
                                rules={[{ required: true, message: "Ölkə seçin!" }]}
                            >
                                <Select placeholder="Ölkə seçin">
                                    {countries?.map((country) => (
                                        <Select.Option key={country.id} value={country.id}>
                                            {country.name}
                                        </Select.Option>
                                    ))}
                                </Select>
                            </Form.Item>
                            <Form.Item>
                                <Button type="primary" htmlType="submit" style={{ marginRight: 8 }}>
                                    Əlavə Et
                                </Button>
                                <Button onClick={handleCancel}>İmtina Et</Button>
                            </Form.Item>
                        </div>
                    </div>
                </Form>
            </Modal>

            <Modal
                title="Şəhər Redaktə Et"
                visible={isEditModalVisible}
                onCancel={handleEditCancel}
                footer={null}
                width={1000}
            >
                <Form form={editForm} layout="vertical" onFinish={handleEditCity}>
                    <div className="row">
                        <div className="col-6">
                            <Form.Item
                                name="name"
                                label="Ad"
                                rules={[{ required: true, message: "Ad daxil edin!" }]}
                            >
                                <Input placeholder="Ad daxil edin" />
                            </Form.Item>
                            <Form.Item
                                name="nameEng"
                                label="Ad (EN)"
                                rules={[{ required: true, message: "Ad (EN) daxil edin!" }]}
                            >
                                <Input placeholder="Ad (EN) daxil edin" />
                            </Form.Item>
                        </div>
                        <div className="col-6">
                            <Form.Item
                                name="nameRu"
                                label="Ad (RU)"
                                rules={[{ required: true, message: "Ad (RU) daxil edin!" }]}
                            >
                                <Input placeholder="Ad (RU) daxil edin" />
                            </Form.Item>
                            <Form.Item
                                name="countryId"
                                label="Ölkə"
                                rules={[{ required: true, message: "Ölkə seçin!" }]}
                            >
                                <Select placeholder="Ölkə seçin">
                                    {countries?.map((country) => (
                                        <Select.Option key={country.id} value={country.id}>
                                            {country.name}
                                        </Select.Option>
                                    ))}
                                </Select>
                            </Form.Item>
                        </div>
                    </div>
                    <Form.Item>
                        <Button type="primary" htmlType="submit" style={{ marginRight: 8 }}>
                            Redaktə Et
                        </Button>
                        <Button onClick={handleEditCancel}>İmtina Et</Button>
                    </Form.Item>
                </Form>
            </Modal>
        </div>
    );
};

export default CitiesTable;
