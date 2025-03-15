import {
    Table,
    Button,
    Modal,
    Form,
    Input,
    Upload,
    message,
    Popconfirm, InputNumber,
} from "antd";
import { PlusOutlined } from "@ant-design/icons";
import {
    useDeleteCustomerViewMutation,
    useGetAllCustomerViewsQuery,
    usePostCustomerViewMutation,
    usePutCustomerViewMutation,
} from "../../../services/adminApi.jsx";
import { useState, useEffect } from "react";
import { CUSTOMER_IMG_URL} from "../../../constants.js";
import { Rate } from "antd";
import {MdDeleteForever} from "react-icons/md";
import {FaRegEdit} from "react-icons/fa";
import showToast from "../../../components/ToastMessage.js";

const CustomerViewsTable = () => {
    const { data: getAllCustomerViews, refetch: getAllCustomerViewsRefetch } = useGetAllCustomerViewsQuery();
    const views = getAllCustomerViews?.data;
    const [postCustomerView] = usePostCustomerViewMutation();
    const [putCustomerView] = usePutCustomerViewMutation();
    const [deleteCustomerView] = useDeleteCustomerViewMutation();

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
                customerName: editingProduct.customerName,
                reviewText: editingProduct.reviewText,
                rating: editingProduct.rating,
            });

            // Profil şəklini fileList üçün hazırlayırıq (əgər varsa)
            const initialFileList = editingProduct.profilImage
                ? [{
                    uid: `-1-0`,
                    name: editingProduct.profilImage.split('/').pop(),
                    status: "done",
                    url: CUSTOMER_IMG_URL + editingProduct.profilImage,
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
            dataIndex: "profilImage",
            key: "profilImage",
            render: (profilImage) => {
                if (!profilImage || profilImage.length === 0) return <span>No Image</span>;
                return (
                    <img
                        src={CUSTOMER_IMG_URL + profilImage}
                        alt="Şəkil"
                        style={{ width: 50, height: 50,borderRadius: '5px', objectFit: "cover" }}
                    />
                );
            },
        },
        {
            title: "Ad",
            dataIndex: "customerName",
            key: "customerName",
        },
        {
            title: "Review",
            dataIndex: "reviewText",
            key: "reviewText",
        },
        {
            title: "Raiting",
            dataIndex: "rating",
            key: "rating",
            render: (rating) => <Rate disabled defaultValue={rating} />,
        },
        {
            title: "Əməliyyatlar",
            key: "actions",
            render: (text, record) => (
                <div style={{ display: "flex", gap: "8px" ,justifyContent:"center"}}>
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
        setFileList([]);
    };

    const handleAddCustomerViews = async (values) => {
        if (fileList.length === 0) {
            message.error("Zəhmət olmasa ən azı 1 şəkil seçin!");
            return;
        }
        const formData = new FormData();
        // Yalnız ilk seçilmiş şəkli "profilImage" olaraq əlavə edirik
        formData.append("profilImage", fileList[0].originFileObj);

        // Form dəyərləri: customerName, reviewText və rating
        Object.keys(values).forEach((key) => {
            formData.append(key, values[key]);
        });

        // Debug üçün FormData-nı konsola çıxardırıq
        for (const a of formData.entries()) {
            console.log(a);
        }

        try {
            const response = await postCustomerView(formData).unwrap();
            if (response?.statusCode === 201) {
                showToast("Əlavə olundu!","success");
                getAllCustomerViewsRefetch();
            } else {
                showToast("Xəta baş verdi!","error");
            }
        } catch (error) {
            console.error(error);
            showToast("Xəta baş verdi!","error");
        }
        handleCancel();
    };


    const handleDelete = async (id) => {
        console.log(id)
        try {
            const response = await deleteCustomerView(id).unwrap();
            if (response?.statusCode === 200) {
                showToast("Silinmə uğurla tamamlandı!","success");
                getAllCustomerViewsRefetch();
            } else {
                showToast("Silinmə zamanı xəta baş verdi!",'error');
            }
        } catch (error) {
            console.error(error);
            showToast("Silinmə zamanı xəta baş verdi!","error");
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

    const handleEditCustomerView = async (values) => {
        if (editFileList.length === 0) {
            message.error("Zəhmət olmasa ən azı 1 şəkil seçin!");
            return;
        }
        const formData = new FormData();

        editFileList.forEach((file) => {
            if (file.originFileObj) {
                formData.append("profilImage", file.originFileObj);
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
            const response = await putCustomerView(formData).unwrap();
            if (response?.statusCode === 200) {
                showToast("Düzəliş uğurla tamamlandı!","success");
                getAllCustomerViewsRefetch();
            } else {
                showToast("Düzəliş zamanı xəta baş verdi!","error");
            }
        } catch (error) {
            console.error(error);
            showToast("Düzəliş zamanı xəta baş verdi!","error");
        }

        handleEditCancel();
    };

    return (
        <div>
            <Button type="primary" onClick={showModal} style={{ marginBottom: 16 }}>
               +
            </Button>
            <Table
                rowKey="id"
                columns={columns}
                dataSource={views}
                expandable={{
                    expandedRowRender,
                    rowExpandable: (record) => !!record.description,
                }}
                pagination={{ pageSize: 5 }}
            />

            <Modal
                title="Yeni Müştəri Görüşü Əlavə Et"
                visible={isModalVisible}
                onCancel={handleCancel}
                footer={null}
                width={1000}
            >
                <Form form={form} layout="vertical" onFinish={handleAddCustomerViews}>
                    <div className="row">
                        <div className="col-6">
                            <Form.Item
                                name="customerName"
                                label="Müştəri Adı"
                                rules={[{ required: true, message: "Müştəri adını daxil edin!" }]}
                            >
                                <Input placeholder="Müştəri adını daxil edin" />
                            </Form.Item>
                            <Form.Item
                                name="reviewText"
                                label="Review"
                                rules={[{ required: true, message: "Review daxil edin!" }]}
                            >
                                <Input placeholder="Review daxil edin" />
                            </Form.Item>
                            <Form.Item
                                name="rating"
                                label="Rating"
                                rules={[{ required: true, message: "Rating daxil edin!" }]}
                            >
            <InputNumber min={1} max={5} style={{ width: '100%' }} placeholder="Məsələn, 3"/>
                            </Form.Item>
                        </div>
                        <div className="col-6">
                            <Form.Item label="Profil Şəkil">
                                <Upload
                                    name="images"
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

            {/** Blog Redaktə Et Modalı **/}
            <Modal
                title="Müştəri Görüşü Redaktə Et"
                visible={isEditModalVisible}
                onCancel={handleEditCancel}
                footer={null}
                width={1000}
            >
                <Form form={editForm} layout="vertical" onFinish={handleEditCustomerView}>
                    <div className="row">
                        <div className="col-6">
                            <Form.Item
                                name="customerName"
                                label="Müştəri Adı"
                                rules={[{ required: true, message: "Müştəri adını daxil edin!" }]}
                            >
                                <Input placeholder="Müştəri adını daxil edin" />
                            </Form.Item>
                            <Form.Item
                                name="reviewText"
                                label="Review"
                                rules={[{ required: true, message: "Review daxil edin!" }]}
                            >
                                <Input placeholder="Review daxil edin" />
                            </Form.Item>
                            <Form.Item
                                name="rating"
                                label="Rating"
                                rules={[{ required: true, message: "Rating daxil edin!" }]}
                            >
                                <Input placeholder="Rating daxil edin" />
                                {/*
            Alternativ olaraq, Antd-nin Rate komponentindən istifadə edib ulduzlarla da göstərə bilərsiniz:
            <Rate disabled defaultValue={values.rating} />
          */}
                            </Form.Item>
                        </div>
                        <div className="col-6">
                            <Form.Item label="Profil Şəkil">
                                <Upload
                                    name="images"
                                    listType="picture-card"
                                    fileList={editFileList}
                                    beforeUpload={() => false}
                                    onChange={handleEditUploadChange}

                                >
                                    {editFileList.length < 1 && (
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

export default CustomerViewsTable;
