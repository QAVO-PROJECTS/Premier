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
    useDeleteCountryMutation,
    useGetAllCountriesQuery,
    usePostCountryMutation,
    usePutCountryMutation,
} from "../../services/adminApi.jsx";
import { useState, useEffect } from "react";
import { COUNTRY_IMG_URL} from "../../constants.js";

const CountriesTable = () => {
    const { data: getAllCountries, refetch: getAllBlogsRefetch } = useGetAllCountriesQuery();
    const countries = getAllCountries?.data;
    const [postCountry] = usePostCountryMutation();
    const [putCountry] = usePutCountryMutation();
    const [deleteCountry] = useDeleteCountryMutation();

    const [isModalVisible, setIsModalVisible] = useState(false);
    const [form] = Form.useForm();
    const [fileList, setFileList] = useState([]);

    const [isEditModalVisible, setIsEditModalVisible] = useState(false);
    const [editingProduct, setEditingProduct] = useState(null);
    const [editForm] = Form.useForm();
    const [editFileList, setEditFileList] = useState([]);

    useEffect(() => {
        if (editingProduct) {
            editForm.setFieldsValue({
                name: editingProduct.name,
                nameEng: editingProduct.nameEng,
                nameRu: editingProduct.nameRu,
                description: editingProduct.description,
                descriptionEng: editingProduct.descriptionEng,
                descriptionRu: editingProduct.descriptionRu,
                isPopular: editingProduct.isPopular,
            });
            const initialFileList = editingProduct.countryImage
                ? [{
                    uid: `-1-0`,
                    name: editingProduct.countryImage.split('/').pop(),
                    status: "done",
                    url: COUNTRY_IMG_URL + editingProduct.countryImage,
                }]
                : [];
            setEditFileList(initialFileList);
        }
    }, [editingProduct, editForm]);


    const handleUploadChange = ({ fileList: newFileList }) => {
        setFileList(newFileList);
    };

    const handleEditUploadChange = ({ fileList: newFileList }) => {
        setEditFileList(newFileList);
    };

    const uploadButton = (
        <div>
            <PlusOutlined />
            <div style={{ marginTop: 8 }}>Şəkil əlavə et</div>
        </div>
    );

    const columns = [
        {
            title: "#",
            dataIndex: "id",
            key: "id",
            render: (text, record, index) => <div>{index + 1}</div>,
        },
        {
            title: "Şəkil",
            dataIndex: "countryImage",
            key: "imageNames",
            render: (countryImage) => {
                if (!countryImage || countryImage.length === 0) return <span>No Image</span>;
                return (
                    <img
                        src={COUNTRY_IMG_URL + countryImage}
                        alt="Şəkil"
                        style={{ width: 50, height: 50, objectFit: "cover" }}
                    />
                );
            },
        },
        {
            title: "Ölkə (AZ)",
            dataIndex: "name",
            key: "name",
        },
        {
            title: "Popular",
            dataIndex: "isPopular",
            key: "isPopular",
            render: (isPopular) =>
                isPopular ? (
                    <CheckCircleOutlined style={{ color: "green", fontSize: "18px" }} />
                ) : (
                    <CloseCircleOutlined style={{ color: "red", fontSize: "18px" }} />
                ),
        },

        {
            title: "Əməliyyatlar",
            key: "actions",
            render: (text, record) => (
                <div style={{ display: "flex", gap: "8px" }}>
                    <Button type="primary" onClick={() => showEditModal(record)}>
                        Düzəliş et
                    </Button>
                    <Popconfirm
                        title="Silmək istədiyinizə əminsiniz?"
                        onConfirm={() => handleDelete(record.id)}
                        okText="Bəli"
                        cancelText="Xeyr"
                    >
                        <Button type="default" danger>
                            Sil
                        </Button>
                    </Popconfirm>
                </div>
            ),
        },
    ];



    const showModal = () => {
        setIsModalVisible(true);
    };

    const handleCancel = () => {
        setIsModalVisible(false);
        form.resetFields();
        setFileList([]);
    };
    const expandedRowRender = (record) => {
        if (!record.description && !record.descriptionRu && !record.descriptionEng) {
            return null;
        }
        return (
            <div>
                {record.description && <p style={{ margin: 0 }}>AZ: {record.description}</p>}
                {record.descriptionRu && <p style={{ margin: 0 }}>RU: {record.descriptionRu}</p>}
                {record.descriptionEng && <p style={{ margin: 0 }}>EN: {record.descriptionEng}</p>}
            </div>
        );
    };

    const handleAddCountry = async (values) => {
        if (fileList.length === 0) {
            message.error("Zəhmət olmasa ən azı 1 şəkil seçin!");
            return;
        }

        const formData = new FormData();
        formData.append("countryImage", fileList[0].originFileObj);

        Object.keys(values).forEach((key) => {
            formData.append(key, values[key]);
        });

        for (const a of formData.entries()) {
            console.log(a);
        }

        try {
            const response = await postCountry(formData).unwrap();
            if (response?.statusCode === 201) {
                message.success("Əlavə olundu!");
                getAllBlogsRefetch();
            } else {
                message.error("Xəta baş verdi!");
            }
        } catch (error) {
            console.error(error);
            message.error("Xəta baş verdi!");
        }

        handleCancel();
    };


    const handleDelete = async (id) => {
        console.log(id)
        try {
            const response = await deleteCountry(id).unwrap();
            if (response?.statusCode === 200) {
                message.success("Silinmə uğurla tamamlandı!");
                getAllBlogsRefetch();
            } else {
                message.error("Silinmə zamanı xəta baş verdi!");
            }
        } catch (error) {
            console.error(error);
            message.error("Silinmə zamanı xəta baş verdi!");
        }
    };

    const showEditModal = (record) => {
        setEditingProduct(record);
        setIsEditModalVisible(true);
    };

    const handleEditCancel = () => {
        setIsEditModalVisible(false);
        editForm.resetFields();
        setEditFileList([]);
        setEditingProduct(null);
    };

    const handleEditCountry = async (values) => {
        if (editFileList.length === 0) {
            message.error("Zəhmət olmasa ən azı 1 şəkil seçin!");
            return;
        }
        const formData = new FormData();

        editFileList.forEach((file) => {
            if (file.originFileObj) {
                formData.append("countryImage", file.originFileObj);
            }
        });

        Object.keys(values).forEach((key) => {
            formData.append(key, values[key]);
        });
        formData.append("id", editingProduct.id);

        for (const a of formData.entries()) {
            console.log(a);
        }

        try {
            const response = await putCountry(formData).unwrap();
            if (response?.statusCode === 200) {
                message.success("Düzəliş uğurla tamamlandı!");
                getAllBlogsRefetch();
            } else {
                message.error("Düzəliş zamanı xəta baş verdi!");
            }
        } catch (error) {
            console.error(error);
            message.error("Düzəliş zamanı xəta baş verdi!");
        }

        handleEditCancel();
    };

    return (
        <div>
            <Button type="primary" onClick={showModal} style={{ marginBottom: 16 }}>
                Yeni Məhsul Əlavə Et
            </Button>
            <Table
                columns={columns}
                dataSource={countries}
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

            <Modal
                title="Yeni Ölkə Əlavə Et"
                visible={isModalVisible}
                onCancel={handleCancel}
                footer={null}
                width={1000}
            >
                <Form form={form} layout="vertical" onFinish={handleAddCountry}>
                    <div className="row">
                        <div className="col-6">
                            <Form.Item
                                name="name"
                                label="Ad (AZ)"
                                rules={[{ required: true, message: "Ad (AZ) daxil edin!" }]}
                            >
                                <Input placeholder="Ad (AZ)" />
                            </Form.Item>
                            <Form.Item
                                name="nameRu"
                                label="Ad (RU)"
                                rules={[{ required: true, message: "Ad (RU) daxil edin!" }]}
                            >
                                <Input placeholder="Ad (RU)" />
                            </Form.Item>
                            <Form.Item
                                name="nameEng"
                                label="Ad (EN)"
                                rules={[{ required: true, message: "Ad (EN) daxil edin!" }]}
                            >
                                <Input placeholder="Ad (EN)" />
                            </Form.Item>
                        </div>
                        <div className="col-6">
                            <Form.Item
                                name="description"
                                label="Təsvir (AZ)"
                                rules={[{ required: true, message: "Təsvir (AZ) daxil edin!" }]}
                            >
                                <Input placeholder="Təsvir (AZ)" />
                            </Form.Item>
                            <Form.Item
                                name="descriptionRu"
                                label="Təsvir (RU)"
                                rules={[{ required: true, message: "Təsvir (RU) daxil edin!" }]}
                            >
                                <Input placeholder="Təsvir (RU)" />
                            </Form.Item>
                            <Form.Item
                                name="descriptionEng"
                                label="Təsvir (EN)"
                                rules={[{ required: true, message: "Təsvir (EN) daxil edin!" }]}
                            >
                                <Input placeholder="Təsvir (EN)" />
                            </Form.Item>
                            <Form.Item
                                name="isPopular"
                                label="Popular"
                                rules={[{ required: true, message: "Popular seçin!" }]}
                            >
                                <Select placeholder="Popular seçin">
                                    <Select.Option value={true}>True</Select.Option>
                                    <Select.Option value={false}>False</Select.Option>
                                </Select>
                            </Form.Item>

                            <Form.Item label="Şəkil">
                                <Upload
                                    name="countryImage"
                                    listType="picture-card"
                                    fileList={fileList}
                                    beforeUpload={() => false}
                                    onChange={handleUploadChange}
                                    onRemove={(file) => {
                                        const updatedList = fileList.filter((f) => f.uid !== file.uid);
                                        setFileList(updatedList);
                                    }}
                                >
                                    {fileList.length < 1 && uploadButton}
                                </Upload>
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
                title="Blog Redaktə Et"
                visible={isEditModalVisible}
                onCancel={handleEditCancel}
                footer={null}
                width={1000}
            >
                <Form form={editForm} layout="vertical" onFinish={handleEditCountry}>
                    <div className={"row"}>
                        <div className={"col-6"}>
                            <Form.Item name="name" label="Başlıq (AZ)" rules={[{ required: true }]}>
                                <Input placeholder="Başlıq daxil edin" />
                            </Form.Item>
                            <Form.Item name="nameEng" label="Başlıq (RU)" rules={[{ required: true }]}>
                                <Input placeholder="Başlıq daxil edin" />
                            </Form.Item>
                            <Form.Item name="nameRu" label="Başlıq (EN)" rules={[{ required: true }]}>
                                <Input placeholder="Başlıq daxil edin" />
                            </Form.Item>
                            <Form.Item name="description" label="Alt Başlıq (AZ)" rules={[{ required: true }]}>
                                <Input placeholder="Alt başlıq daxil edin" />
                            </Form.Item>
                            <Form.Item name="descriptionEng" label="Alt Başlıq (RU)" rules={[{ required: true }]}>
                                <Input placeholder="Alt başlıq daxil edin" />
                            </Form.Item>
                            <Form.Item name="descriptionRu" label="Alt Başlıq (EN)" rules={[{ required: true }]}>
                                <Input placeholder="Alt başlıq daxil edin" />
                            </Form.Item>
                        </div>
                        <div className={"col-6"}>
                            <Form.Item
                                name="isPopular"
                                label="Popular"
                                rules={[{ required: true, message: "Popular seçin!" }]}
                            >
                                <Select placeholder="Popular seçin">
                                    <Select.Option value={true}>True</Select.Option>
                                    <Select.Option value={false}>False</Select.Option>
                                </Select>
                            </Form.Item>
                            <Form.Item label="Şəkillər">
                                <Upload
                                    name="countryImage"
                                    listType="picture-card"
                                    fileList={editFileList}
                                    beforeUpload={() => false}
                                    onChange={handleEditUploadChange}
                                >
                                    {editFileList.length < 5 && (
                                        <div>
                                            <PlusOutlined />
                                            <div style={{ marginTop: 8 }}>Şəkil əlavə et</div>
                                        </div>
                                    )}
                                </Upload>
                            </Form.Item>
                            <Form.Item>
                                <Button type="primary" htmlType="submit" style={{ marginRight: 8 }}>
                                    Redaktə Et
                                </Button>
                                <Button onClick={handleEditCancel}>İmtina Et</Button>
                            </Form.Item>
                        </div>
                    </div>
                </Form>
            </Modal>
        </div>
    );
};

export default CountriesTable;
