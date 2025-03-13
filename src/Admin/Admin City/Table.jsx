import {
    Table,
    Button,
    Modal,
    Form,
    Input,
    message,
    Popconfirm,
} from "antd";
import {

    useGetAllCitiesQuery, usePostCityMutation, usePutCityMutation, useDeleteCityMutation,
} from "../../services/adminApi.jsx";
import {useState, useEffect} from "react";

const CitiesTable = () => {
    const {data: getAllCities, refetch: getAllCitiesRefetch} = useGetAllCitiesQuery();
    const cities = getAllCities?.data;
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
                <div style={{display: "flex", gap: "8px"}}>
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
            <p style={{margin: 0}}>{record.description}</p>
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

        console.log(payload);

        try {
            const response = await postCity(payload).unwrap();
            if (response?.statusCode === 201) {
                message.success("Əlavə olundu!");
                getAllCitiesRefetch();
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
            const response = await deleteCity(id).unwrap();
            if (response?.statusCode === 200) {
                message.success("Silinmə uğurla tamamlandı!");
                getAllCitiesRefetch();
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

        console.log(payload);

        try {
            const response = await putCity(payload).unwrap();
            if (response?.statusCode === 200) {
                message.success("Düzəliş uğurla tamamlandı!");
                getAllCitiesRefetch();
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
            <Button type="primary" onClick={showModal} style={{marginBottom: 16}}>
                Yeni Məhsul Əlavə Et
            </Button>
            <Table
                columns={columns}
                dataSource={cities}
                expandable={{
                    expandedRowRender,
                    rowExpandable: (record) => !!record.description,
                }}
                pagination={{pageSize: 5}}
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
                                rules={[{required: true, message: "Ad daxil edin!"}]}
                            >
                                <Input placeholder="Ad"/>
                            </Form.Item>
                            <Form.Item
                                name="nameEng"
                                label="Ad (EN)"
                                rules={[{required: true, message: "Ad (EN) daxil edin!"}]}
                            >
                                <Input placeholder="Ad (EN)"/>
                            </Form.Item>
                            <Form.Item
                                name="nameRu"
                                label="Ad (RU)"
                                rules={[{required: true, message: "Ad (RU) daxil edin!"}]}
                            >
                                <Input placeholder="Ad (RU)"/>
                            </Form.Item>
                        </div>
                        <div className="col-6">
                            <Form.Item
                                name="countryId"
                                label="Ölkə ID"
                                rules={[{required: true, message: "Ölkə ID daxil edin!"}]}
                            >
                                <Input placeholder="Ölkə ID"/>
                            </Form.Item>
                            <Form.Item>
                                <Button type="primary" htmlType="submit" style={{marginRight: 8}}>
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
                                rules={[{required: true, message: "Ad daxil edin!"}]}
                            >
                                <Input placeholder="Ad daxil edin"/>
                            </Form.Item>
                            <Form.Item
                                name="nameEng"
                                label="Ad (EN)"
                                rules={[{required: true, message: "Ad (EN) daxil edin!"}]}
                            >
                                <Input placeholder="Ad (EN) daxil edin"/>
                            </Form.Item>
                        </div>
                        <div className="col-6">
                            <Form.Item
                                name="nameRu"
                                label="Ad (RU)"
                                rules={[{required: true, message: "Ad (RU) daxil edin!"}]}
                            >
                                <Input placeholder="Ad (RU) daxil edin"/>
                            </Form.Item>
                            <Form.Item
                                name="countryId"
                                label="Ölkə ID"
                                rules={[{required: true, message: "Ölkə ID daxil edin!"}]}
                            >
                                <Input placeholder="Ölkə ID"/>
                            </Form.Item>
                        </div>
                    </div>
                    <Form.Item>
                        <Button type="primary" htmlType="submit" style={{marginRight: 8}}>
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
