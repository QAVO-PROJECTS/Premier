import {
    Table,
    Button,
    Modal,
    Form,
    Input,
    Upload,
    message,
    Popconfirm,
} from "antd";
import { PlusOutlined } from "@ant-design/icons";
import {
    useGetAllBlogsQuery,
    usePostBlogMutation,
    usePutBlogMutation,
    useDeleteBlogMutation,
} from "../../services/adminApi.jsx";
import { useState, useEffect } from "react";
import { BLOG_IMG_URL } from "../../constants.js";

const BlogsTable = () => {
    const { data: getAllBlogs, refetch: getAllBlogsRefetch } = useGetAllBlogsQuery();
    const blogs = getAllBlogs?.data;
    const [postBlog] = usePostBlogMutation();
    const [putBlog] = usePutBlogMutation();
    const [deleteBlog] = useDeleteBlogMutation();

    const [isModalVisible, setIsModalVisible] = useState(false);
    const [form] = Form.useForm();
    const [fileList, setFileList] = useState([]);
    const [deletedImages, setDeletedImages] = useState([]);

    const [isEditModalVisible, setIsEditModalVisible] = useState(false);
    const [editingProduct, setEditingProduct] = useState(null);
    const [editForm] = Form.useForm();
    const [editFileList, setEditFileList] = useState([]);

    useEffect(() => {
        if (editingProduct) {
            editForm.setFieldsValue({
                title: editingProduct.title,
                titleRu: editingProduct.titleRu,
                titleEng: editingProduct.titleEng,
                subTitle: editingProduct.subTitle,
                subTitleRu: editingProduct.subTitleRu,
                subTitleEng: editingProduct.subTitleEng,
                context: editingProduct.context,
                contextRu: editingProduct.contextRu,
                contextEng: editingProduct.contextEng,
            });
            const initialFileList = editingProduct.imageNames.map((img, idx) => ({
                uid: `-1-${idx}`,
                name: img.split('/').pop(),
                status: "done",
                url: BLOG_IMG_URL + img,
            }));
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
            dataIndex: "imageNames",
            key: "imageNames",
            render: (images) => {
                if (!images || images.length === 0) return <span>No Image</span>;
                return (
                    <img
                        src={BLOG_IMG_URL + images[0]}
                        alt="Şəkil"
                        style={{ width: 50, height: 50, objectFit: "cover" }}
                    />
                );
            },
        },
        {
            title: "Başlıq (AZ)",
            dataIndex: "title",
            key: "title",
        },
        {
            title: "Alt Başlıq (AZ)",
            dataIndex: "subTitle",
            key: "subTitle",
        },
        {
            title: "Kontekst (AZ)",
            dataIndex: "context",
            key: "context",
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

    const handleAddBLog = async (values) => {
        if (fileList.length === 0) {
            message.error("Zəhmət olmasa ən azı 1 şəkil seçin!");
            return;
        }
        const formData = new FormData();
        fileList.forEach((file) => {
            formData.append("images", file.originFileObj);
        });
        Object.keys(values).forEach((key) => {
            formData.append(key, values[key]);
        });
        for (const a of formData.entries()) {
            console.log(a);
        }
        try {
            const response = await postBlog(formData).unwrap();
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
            const response = await deleteBlog(id).unwrap();
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
        setDeletedImages([]);
    };

    const handleEditBlog = async (values) => {
        if (editFileList.length === 0) {
            message.error("Zəhmət olmasa ən azı 1 şəkil seçin!");
            return;
        }
        const formData = new FormData();

        editFileList.forEach((file) => {
            if (file.originFileObj) {
                formData.append("imageNames", file.originFileObj);
            }
        });

        deletedImages.forEach((imgName) => {
            formData.append("deleteImageNames", imgName);
        });

        Object.keys(values).forEach((key) => {
            formData.append(key, values[key]);
        });
        formData.append("id", editingProduct.id);

        for (const a of formData.entries()) {
            console.log(a);
        }

        try {
            const response = await putBlog(formData).unwrap();
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
                dataSource={blogs}
                expandable={{
                    expandedRowRender,
                    rowExpandable: (record) => !!record.description,
                }}
                pagination={{ pageSize: 5 }}
            />

            {/** Yeni Blog Əlavə Et Modalı **/}
            <Modal
                title="Yeni Blog Əlavə Et"
                visible={isModalVisible}
                onCancel={handleCancel}
                footer={null}
                width={1000}
            >
                <Form form={form} layout="vertical" onFinish={handleAddBLog}>
                    <div className={"row"}>
                        <div className={"col-6"}>
                            <Form.Item
                                name="title"
                                label="Ad (AZ)"
                                rules={[{ required: true, message: "Ad (AZ) daxil edin!" }]}
                            >
                                <Input placeholder="Ad (AZ)" />
                            </Form.Item>
                            <Form.Item
                                name="titleRu"
                                label="Ad (RU)"
                                rules={[{ required: true, message: "Ad (RU) daxil edin!" }]}
                            >
                                <Input placeholder="Ad (RU)" />
                            </Form.Item>
                            <Form.Item
                                name="titleEng"
                                label="Ad (EN)"
                                rules={[{ required: true, message: "Ad (EN) daxil edin!" }]}
                            >
                                <Input placeholder="Ad (EN)" />
                            </Form.Item>
                            <Form.Item
                                name="subTitle"
                                label="Alt Başlıq (AZ)"
                                rules={[{ required: true, message: "Alt Başlıq (AZ) daxil edin!" }]}
                            >
                                <Input placeholder="Alt Başlıq (AZ)" />
                            </Form.Item>
                            <Form.Item
                                name="subTitleRu"
                                label="Alt Başlıq (RU)"
                                rules={[{ required: true, message: "Alt Başlıq (RU) daxil edin!" }]}
                            >
                                <Input placeholder="Alt Başlıq (RU)" />
                            </Form.Item>
                            <Form.Item
                                name="subTitleEng"
                                label="Alt Başlıq (EN)"
                                rules={[{ required: true, message: "Alt Başlıq (EN) daxil edin!" }]}
                            >
                                <Input placeholder="Alt Başlıq (EN)" />
                            </Form.Item>
                        </div>
                        <div className={"col-6"}>
                            <Form.Item
                                name="context"
                                label="Kontekst (AZ)"
                                rules={[{ required: true, message: "Kontekst (AZ) daxil edin!" }]}
                            >
                                <Input placeholder="Kontekst (AZ)" />
                            </Form.Item>
                            <Form.Item
                                name="contextRu"
                                label="Kontekst (RU)"
                                rules={[{ required: true, message: "Kontekst (RU) daxil edin!" }]}
                            >
                                <Input placeholder="Kontekst (RU)" />
                            </Form.Item>
                            <Form.Item
                                name="contextEng"
                                label="Kontekst (EN)"
                                rules={[{ required: true, message: "Kontekst (EN) daxil edin!" }]}
                            >
                                <Input placeholder="Kontekst (EN)" />
                            </Form.Item>
                            <Form.Item label="Şəkillər">
                                <Upload
                                    name="images"
                                    listType="picture-card"
                                    multiple
                                    fileList={fileList}
                                    beforeUpload={() => false}
                                    onChange={handleUploadChange}
                                    onRemove={(file) => {
                                        const updatedList = fileList.filter((f) => f.uid !== file.uid);
                                        setFileList(updatedList);
                                    }}
                                >
                                    {fileList.length < 5 && uploadButton}
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
                title="Blog Redaktə Et"
                visible={isEditModalVisible}
                onCancel={handleEditCancel}
                footer={null}
                width={1000}
            >
                <Form form={editForm} layout="vertical" onFinish={handleEditBlog}>
                    <div className={"row"}>
                        <div className={"col-6"}>
                            <Form.Item name="title" label="Başlıq (AZ)" rules={[{ required: true }]}>
                                <Input placeholder="Başlıq daxil edin" />
                            </Form.Item>
                            <Form.Item name="titleRu" label="Başlıq (RU)" rules={[{ required: true }]}>
                                <Input placeholder="Başlıq daxil edin" />
                            </Form.Item>
                            <Form.Item name="titleEng" label="Başlıq (EN)" rules={[{ required: true }]}>
                                <Input placeholder="Başlıq daxil edin" />
                            </Form.Item>
                            <Form.Item name="subTitle" label="Alt Başlıq (AZ)" rules={[{ required: true }]}>
                                <Input placeholder="Alt başlıq daxil edin" />
                            </Form.Item>
                            <Form.Item name="subTitleRu" label="Alt Başlıq (RU)" rules={[{ required: true }]}>
                                <Input placeholder="Alt başlıq daxil edin" />
                            </Form.Item>
                            <Form.Item name="subTitleEng" label="Alt Başlıq (EN)" rules={[{ required: true }]}>
                                <Input placeholder="Alt başlıq daxil edin" />
                            </Form.Item>
                        </div>
                        <div className={"col-6"}>
                            <Form.Item name="context" label="Kontekst (AZ)" rules={[{ required: true }]}>
                                <Input placeholder="Kontekst daxil edin" />
                            </Form.Item>
                            <Form.Item name="contextRu" label="Kontekst (RU)" rules={[{ required: true }]}>
                                <Input placeholder="Kontekst daxil edin" />
                            </Form.Item>
                            <Form.Item name="contextEng" label="Kontekst (EN)" rules={[{ required: true }]}>
                                <Input placeholder="Kontekst daxil edin" />
                            </Form.Item>
                            <Form.Item label="Şəkillər">
                                <Upload
                                    name="images"
                                    listType="picture-card"
                                    multiple
                                    fileList={editFileList}
                                    beforeUpload={() => false}
                                    onChange={handleEditUploadChange}
                                    onRemove={(file) => {
                                        setDeletedImages([...deletedImages, file.name]);
                                        setEditFileList(editFileList.filter((f) => f.uid !== file.uid));
                                    }}
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

export default BlogsTable;
