import {
    Table,
    Button,
    Modal,
    Form,
    Input,
    Upload,
    message,
    Popconfirm,
    Select,
    Radio,
    Row,
    Col,
} from "antd";
import {
    CheckCircleOutlined, CloseCircleOutlined,
    PlusOutlined,
} from "@ant-design/icons";
import {
    useDeleteTourMutation, useGetAllCountriesQuery,
    useGetAllToursQuery,
    usePostTourMutation,
    usePutTourMutation,
} from "../../../services/adminApi.jsx";
import {useState, useEffect} from "react";
import {TOUR_CARD_IMG_URL, TOUR_IMG_URL} from "../../../constants.js";
import {FaRegEdit} from "react-icons/fa";
import {MdDeleteForever} from "react-icons/md";
import showToast from "../../../components/ToastMessage.js";

const TourTable = () => {
    const {data: getAllTours, refetch: getAllToursRefetch} = useGetAllToursQuery();
    const tours = getAllTours?.data;

    const {data: getAllCountries} = useGetAllCountriesQuery();
    const countries = getAllCountries?.data;

    const [postTour] = usePostTourMutation();
    const [putTour] = usePutTourMutation();
    const [deleteTour] = useDeleteTourMutation();

    const [isModalVisible, setIsModalVisible] = useState(false);
    const [form] = Form.useForm();
    const [isEditModalVisible, setIsEditModalVisible] = useState(false);
    const [editingProduct, setEditingProduct] = useState(null);
    const [editForm] = Form.useForm();
    const [cardFileList, setCardFileList] = useState([]);
    const [tourFileList, setTourFileList] = useState([]);
    const [cityOptions, setCityOptions] = useState([]);
    const [selectedCountry, setSelectedCountry] = useState(null);

    useEffect(() => {
        // Fetch and filter cities for each country
        if (countries?.length > 0) {
            const cities = countries.map(country => ({
                countryId: country.id,
                cities: country.cities,
            }));
            setCityOptions(cities);
        }
    }, [countries]);

    // Handle country change and filter cities
    const handleCountryChange = (countryIds) => {
        setSelectedCountry(countryIds);
    };

    // Get cities for the selected countries
    const getCityOptionsForSelectedCountries = () => {
        if (!selectedCountry || selectedCountry.length === 0) {
            return [];
        }

        const selectedCities = [];
        selectedCountry.forEach((countryId) => {
            const country = cityOptions.find(option => option.countryId === countryId);
            if (country) {
                selectedCities.push(...country.cities);
            }
        });

        return selectedCities;
    };

    const uploadProps = {
        listType: 'picture-card',
        multiple: true,
        beforeUpload: (file) => false,  // Prevent auto upload
        onChange: ({fileList: newFileList}) => setTourFileList(newFileList),
        onRemove: (file) => setTourFileList(tourFileList.filter((f) => f.uid !== file.uid)),
    };

    const handleAddTours = async (values) => {
        if (cardFileList.length === 0) {
            message.error("Zəhmət olmasa ən azı 1 card şəkil seçin!");
            return;
        }
        const formData = new FormData();
        formData.append("cardImage", cardFileList[0].originFileObj);

        tourFileList.forEach((file) => {
            formData.append("tourImages", file.originFileObj);
        });

        const {exchangeRate, startDate, endDate, ...restValues} = values;
        Object.keys(restValues).forEach((key) => {
            if (key !== "countryIds" && key !== "cityIds") {
                formData.append(key, restValues[key]);
            }
        });
        formData.append("startDate", startDate ? startDate : "null");
        formData.append("endDate", endDate ? endDate : "null");
        formData.append("exchangeRate", exchangeRate ? exchangeRate : "AZN");

        if (values.countryIds && values.countryIds.length > 0) {
            values.countryIds.forEach((id) => formData.append("countryIds", id));
        }
        if (values.cityIds && values.cityIds.length > 0) {
            values.cityIds.forEach((id) => formData.append("cityIds", id));
        }

        try {
            const response = await postTour(formData).unwrap();
            if (response?.statusCode === 201) {
                message.success("Əlavə olundu!");
                getAllToursRefetch();
            } else {
                message.error("Xəta baş verdi!");
            }
        } catch (error) {
            console.error(error);
            message.error("Xəta baş verdi!");
        }
        handleCancel(); // Modal post zamanı bütün datanı təmizləyir
    };

    const handleCancel = () => {
        setIsModalVisible(false);
        form.resetFields();
        setCardFileList([]);
        setTourFileList([]);
    };

    const [tourId, setTourId] = useState("");

    const showEditModal = (record) => {
        setTourId(record?.id);
        // Set selectedCountry state from record countries for proper city filtering in edit modal
        const countryIds = record?.countries?.length ? record.countries.map(country => country.id) : [];
        setSelectedCountry(countryIds);

        editForm.setFieldsValue({
            id: record.id,
            title: record.title,
            titleEng: record.titleEng,
            titleRu: record.titleRu,
            description: record.description,
            descriptionEng: record.descriptionEng,
            descriptionRu: record.descriptionRu,
            startDate: record.startDate,
            endDate: record.endDate,
            exchangeRate: record.exchangeRate,
            isOvernighStay: record.isOvernighStay,
            isTicket: record.isTicket,
            isInsurance: record.isInsurance,
            isVisa: record.isVisa,
            isPopular: record.isPopular,
            tourType: record.tourType,
            countryIds: countryIds,
            cityIds: record?.cities?.length ? record.cities.map(city => city.id) : [],
        });

        // Card resmini state'e yüklə
        if (record.cardImageUrl) {
            setCardFileList([{
                uid: '-1',
                name: 'cardImage.png',
                status: 'done',
                url: TOUR_CARD_IMG_URL + record.cardImageUrl,
            }]);
        } else {
            setCardFileList([]);
        }

        // Tour resimlərini state'e yüklə
        if (record.tourImageUrls && record.tourImageUrls.length > 0) {
            setTourFileList(
                record.tourImageUrls.map((url, index) => ({
                    uid: index.toString(),
                    name: `tourImage${index}.png`,
                    status: 'done',
                    url: TOUR_IMG_URL + url,
                }))
            );
        } else {
            setTourFileList([]);
        }

        setEditingProduct(record);
        setIsEditModalVisible(true);
    };

    const handleDelete = async (id) => {
        try {
            const response = await deleteTour(id).unwrap();
            if (response?.statusCode === 200) {
                showToast("Silinmə uğurla tamamlandı!", "success");
                getAllToursRefetch();
            } else {
                message.error("Silinmə zamanı xəta baş verdi!");
            }
        } catch (error) {
            console.error(error);
            message.error("Silinmə zamanı xəta baş verdi!");
        }
    };

    const handleEditTour = async (values) => {
        const formData = new FormData();
        formData.append("id", tourId);

        // Əvvəlcə digər sahələri əlavə edirik (countryIds və cityIds istisna olmaqla)
        Object.keys(values).forEach((key) => {
            if (key !== "countryIds" && key !== "cityIds") {
                formData.append(key, values[key]);
            }
        });

        // Orijinal və yeni ölkə & şəhər ID-lərini müqayisə edirik
        const originalCountryIds = editingProduct?.countries?.map(country => country.id) || [];
        const originalCityIds = editingProduct?.cities?.map(city => city.id) || [];
        const newCountryIds = values.countryIds || [];
        const newCityIds = values.cityIds || [];

        // Yalnız yeni əlavə olunan ölkə ID-lərini göndəririk
        const addCountryIds = newCountryIds.filter(id => !originalCountryIds.includes(id));
        addCountryIds.forEach(id => formData.append("countryIds", id));

        // Əgər silinmiş ölkə varsa, deleteCountryIds array-ına əlavə edirik
        const deleteCountryIds = originalCountryIds.filter(id => !newCountryIds.includes(id));
        deleteCountryIds.forEach(id => formData.append("deleteCountryIds", id));

        // Yalnız yeni əlavə olunan şəhər ID-lərini göndəririk
        const addCityIds = newCityIds.filter(id => !originalCityIds.includes(id));
        addCityIds.forEach(id => formData.append("cityIds", id));

        // Silinmiş şəhər ID-lərini deleteCityIds array-ına əlavə edirik
        const deleteCityIds = originalCityIds.filter(id => !newCityIds.includes(id));
        deleteCityIds.forEach(id => formData.append("deleteCityIds", id));

        try {
            const response = await putTour(formData).unwrap();
            if (response?.statusCode === 200) {
                showToast("Düzəliş uğurla tamamlandı!", 'success');
                getAllToursRefetch(); // Turlar siyahısını yenilə
            } else {
                showToast("Düzəliş zamanı xəta baş verdi!", "error");
            }
        } catch (error) {
            console.error(error);
            message.error("Düzəliş zamanı xəta baş verdi!");
        }

        handleEditCancel(); // Yaddaşı təmizlə və modalı bağla
    };

    const handleEditCancel = () => {
        setIsEditModalVisible(false);
        editForm.resetFields();
        setCardFileList([]); // Card şəkil siyahısını sıfırla
        setTourFileList([]); // Tour şəkil siyahısını sıfırla
    };

    const columns = [
        {
            title: "#",
            dataIndex: "id",
            key: "id",
            render: (text, record, index) => <div>{index + 1}</div>,
        },
        {
            title: "Şəkil",
            dataIndex: "cardImageUrl",
            key: "cardImageUrl",
            render: (cardImageUrl) => {
                if (!cardImageUrl || cardImageUrl.length === 0) return <span>No Image</span>;
                return (
                    <img
                        src={TOUR_CARD_IMG_URL + cardImageUrl}
                        alt="Şəkil"
                        style={{width: 50, height: 50, borderRadius: '5px', objectFit: "cover"}}
                    />
                );
            },
        },
        {
            title: "Tur Adı",
            dataIndex: "title",
            key: "title",
        },
        {
            title: "Başlama",
            dataIndex: "startDate",
            key: "startDate",
        },
        {
            title: "Son",
            dataIndex: "endDate",
            key: "endDate",
        },
        {
            title: "Tur Tipi",
            dataIndex: "tourType",
            key: "tourType",
            render: (type) => <span>{type}</span>,
        },
        {
            title: "Şəhər",
            dataIndex: "cityNames",
            key: "cityNames",
            render: (cityNames) =>
                Array.isArray(cityNames)
                    ? cityNames.join(" , ")
                    : cityNames,
        },
        {
            title: "Ölkə",
            dataIndex: "countryNames",
            key: "countryNames",
            render: (countryNames) =>
                Array.isArray(countryNames)
                    ? countryNames.join(" , ")
                    : countryNames,
        },
        {
            title: "Geceleme",
            dataIndex: "isOvernighStay",
            key: "isOvernighStay",
            render: (flag) =>
                flag ? (
                    <CheckCircleOutlined style={{color: "green", fontSize: "18px"}}/>
                ) : (
                    <CloseCircleOutlined style={{color: "red", fontSize: "18px"}}/>
                ),
        },
        {
            title: "Ticket",
            dataIndex: "isTicket",
            key: "isTicket",
            render: (flag) =>
                flag ? (
                    <CheckCircleOutlined style={{color: "green", fontSize: "18px"}}/>
                ) : (
                    <CloseCircleOutlined style={{color: "red", fontSize: "18px"}}/>
                ),
        },
        {
            title: "Sigorta",
            dataIndex: "isInsurance",
            key: "isInsurance",
            render: (flag) =>
                flag ? (
                    <CheckCircleOutlined style={{color: "green", fontSize: "18px"}}/>
                ) : (
                    <CloseCircleOutlined style={{color: "red", fontSize: "18px"}}/>
                ),
        },
        {
            title: "Viza",
            dataIndex: "isVisa",
            key: "isVisa",
            render: (flag) =>
                flag ? (
                    <CheckCircleOutlined style={{color: "green", fontSize: "18px"}}/>
                ) : (
                    <CloseCircleOutlined style={{color: "red", fontSize: "18px"}}/>
                ),
        },
        {
            title: "Popular",
            dataIndex: "isPopular",
            key: "isPopular",
            render: (flag) =>
                flag ? (
                    <CheckCircleOutlined style={{color: "green", fontSize: "18px"}}/>
                ) : (
                    <CloseCircleOutlined style={{color: "red", fontSize: "18px"}}/>
                ),
        },
        {
            title: "Əməliyyatlar",
            key: "actions",
            render: (text, record) => (
                <div style={{display: "flex", gap: "8px", justifyContent: "center"}}>
                    <Button type="primary" onClick={() => showEditModal(record)}>
                        <FaRegEdit/>
                    </Button>
                    <Popconfirm
                        title="Silmək istədiyinizə əminsiniz?"
                        onConfirm={() => handleDelete(record.id)}
                        okText="Bəli"
                        cancelText="Xeyr"
                    >
                        <Button type="default" danger>
                            <MdDeleteForever/>
                        </Button>
                    </Popconfirm>
                </div>
            ),
        },
    ];

    return (
        <div>
            <Button type="primary" onClick={() => setIsModalVisible(true)} style={{marginBottom: 16}}>
                +
            </Button>
            <Table
                rowKey="id"
                columns={columns}
                dataSource={tours}
                pagination={{pageSize: 6}}
            />

            {/* Add Tour Modal */}
            <Modal
                title="Yeni Tur Əlavə Et"
                visible={isModalVisible}
                onCancel={handleCancel}
                footer={null}
                width={1000}
            >
                <Form form={form} layout="vertical" onFinish={handleAddTours}>
                    <Row gutter={16}>
                        {/* Sol Sütun */}
                        <Col span={12}>
                            <Form.Item
                                name="title"
                                label="Tur Adı (AZ)"
                                rules={[{required: true, message: "Tur adını daxil edin!"}]}>
                                <Input placeholder="Tur adını daxil edin"/>
                            </Form.Item>

                            <Form.Item
                                name="titleEng"
                                label="Tur Adı (EN)"
                                rules={[{required: true, message: "Tur adını daxil edin!"}]}>
                                <Input placeholder="Tur adını daxil edin (Eng)"/>
                            </Form.Item>

                            <Form.Item
                                name="titleRu"
                                label="Tur Adı (RU)"
                                rules={[{required: true, message: "Tur adını daxil edin!"}]}>
                                <Input placeholder="Tur adını daxil edin (Ru)"/>
                            </Form.Item>

                            <Form.Item
                                name="description"
                                label="Açıqlama (AZ)"
                                rules={[{required: true, message: "Açıqlama daxil edin!"}]}>
                                <Input.TextArea placeholder="Açıqlama daxil edin"/>
                            </Form.Item>

                            <Form.Item
                                name="descriptionEng"
                                label="Açıqlama (EN)"
                                rules={[{required: true, message: "Açıqlama daxil edin!"}]}>
                                <Input.TextArea placeholder="Açıqlama daxil edin (Eng)"/>
                            </Form.Item>

                            <Form.Item
                                name="descriptionRu"
                                label="Açıqlama (RU)"
                                rules={[{required: true, message: "Açıqlama daxil edin!"}]}>
                                <Input.TextArea placeholder="Açıqlama daxil edin (Ru)"/>
                            </Form.Item>

                            <Form.Item label="Index Şəkil">
                                <Upload
                                    name="cardImage"
                                    listType="picture-card"
                                    fileList={cardFileList}
                                    beforeUpload={() => false}
                                    onChange={({fileList: newFileList}) => setCardFileList(newFileList)}
                                    onRemove={(file) => setCardFileList(cardFileList.filter((f) => f.uid !== file.uid))}
                                >
                                    {cardFileList.length < 1 && (
                                        <div>
                                            <PlusOutlined/>
                                            <div style={{marginTop: 8}}>Şəkil əlavə et</div>
                                        </div>
                                    )}
                                </Upload>
                            </Form.Item>

                            <Form.Item label="Tur Şəkilləri">
                                <Upload {...uploadProps}>
                                    {tourFileList.length < 5 && (
                                        <div>
                                            <PlusOutlined/>
                                            <div style={{marginTop: 8}}>Şəkil əlavə et</div>
                                        </div>
                                    )}
                                </Upload>
                            </Form.Item>
                        </Col>

                        {/* Sağ Sütun */}
                        <Col span={12}>
                            <Form.Item
                                name="startDate"
                                label="Başlama Tarixi"
                                rules={[{required: true, message: "Başlama tarixini daxil edin!"}]}>
                                <Input placeholder="Başlama tarixi seçin"/>
                            </Form.Item>

                            <Form.Item
                                name="endDate"
                                label="Bitmə Tarixi"
                                rules={[{required: true, message: "Bitmə tarixini daxil edin!"}]}>
                                <Input placeholder="Bitmə tarixi seçin"/>
                            </Form.Item>

                            <Form.Item name="isOvernighStay" label="Gecələmə">
                                <Radio.Group>
                                    <Radio value={true}>Var</Radio>
                                    <Radio value={false}>Yox</Radio>
                                </Radio.Group>
                            </Form.Item>

                            <Form.Item name="isTicket" label="Bilet">
                                <Radio.Group>
                                    <Radio value={true}>Var</Radio>
                                    <Radio value={false}>Yox</Radio>
                                </Radio.Group>
                            </Form.Item>

                            <Form.Item name="isInsurance" label="Sığorta">
                                <Radio.Group>
                                    <Radio value={true}>Var</Radio>
                                    <Radio value={false}>Yox</Radio>
                                </Radio.Group>
                            </Form.Item>

                            <Form.Item name="isVisa" label="Viza">
                                <Radio.Group>
                                    <Radio value={true}>Var</Radio>
                                    <Radio value={false}>Yox</Radio>
                                </Radio.Group>
                            </Form.Item>

                            <Form.Item name="isPopular" label="Populyarlıq">
                                <Radio.Group>
                                    <Radio value={true}>Var</Radio>
                                    <Radio value={false}>Yox</Radio>
                                </Radio.Group>
                            </Form.Item>

                            <Form.Item name="countryIds" label="Ölkələr">
                                <Select
                                    mode="multiple"
                                    placeholder="Ölkə seçin"
                                    onChange={handleCountryChange}
                                >
                                    {countries && countries.map((country) => (
                                        <Select.Option key={country.id} value={country.id}>
                                            {country.name}
                                        </Select.Option>
                                    ))}
                                </Select>
                            </Form.Item>

                            <Form.Item name="cityIds" label="Şəhərlər">
                                <Select
                                    mode="multiple"
                                    placeholder="Şəhər seçin"
                                    disabled={!selectedCountry || selectedCountry.length === 0}
                                    dropdownStyle={{ maxHeight: 150, overflow: 'auto' }}
                                >
                                    {getCityOptionsForSelectedCountries()?.map((city) => (
                                        <Select.Option key={city.id} value={city.id}>
                                            {city.name}
                                        </Select.Option>
                                    ))}
                                </Select>
                            </Form.Item>
                            <Form.Item name="tourType" label="Tur Növü">
                                <Select placeholder="Tur növünü seçin">
                                    <Select.Option value="incomming">Ölkədaxili</Select.Option>
                                    <Select.Option value="outgoing">Ölkəxarici</Select.Option>
                                </Select>
                            </Form.Item>
                        </Col>
                    </Row>
                    <Form.Item style={{textAlign: "right"}}>
                        <Button type="primary" htmlType="submit" style={{marginRight: 8}}>
                            Əlavə Et
                        </Button>
                        <Button onClick={handleCancel}>İmtina Et</Button>
                    </Form.Item>
                </Form>
            </Modal>

            {/* Edit Tour Modal */}
            <Modal
                title="Tur Redaktə Et"
                visible={isEditModalVisible}
                onCancel={handleEditCancel}
                footer={null}
                width={1000}
            >
                <Form form={editForm} layout="vertical" onFinish={handleEditTour}>
                    <Row gutter={16}>
                        {/* Sol Sütun */}
                        <Col span={12}>
                            <Form.Item
                                name="title"
                                label="Tur Adı (AZ)"
                                rules={[{required: true, message: "Tur adını daxil edin!"}]}>
                                <Input placeholder="Tur adını daxil edin"/>
                            </Form.Item>
                            <Form.Item
                                name="titleEng"
                                label="Tur Adı (EN)"
                                rules={[{required: true, message: "Tur adını daxil edin!"}]}>
                                <Input placeholder="Tur adını daxil edin (Eng)"/>
                            </Form.Item>
                            <Form.Item
                                name="titleRu"
                                label="Tur Adı (RU)"
                                rules={[{required: true, message: "Tur adını daxil edin!"}]}>
                                <Input placeholder="Tur adını daxil edin (Ru)"/>
                            </Form.Item>
                            <Form.Item
                                name="description"
                                label="Açıqlama (AZ)"
                                rules={[{required: true, message: "Açıqlama daxil edin!"}]}>
                                <Input.TextArea placeholder="Açıqlama daxil edin"/>
                            </Form.Item>
                            <Form.Item
                                name="descriptionEng"
                                label="Açıqlama (EN)"
                                rules={[{required: true, message: "Açıqlama daxil edin!"}]}>
                                <Input.TextArea placeholder="Açıqlama daxil edin (Eng)"/>
                            </Form.Item>
                            <Form.Item
                                name="descriptionRu"
                                label="Açıqlama (RU)"
                                rules={[{required: true, message: "Açıqlama daxil edin!"}]}>
                                <Input.TextArea placeholder="Açıqlama daxil edin (Ru)"/>
                            </Form.Item>
                            <Form.Item label="Index Şəkil">
                                <Upload
                                    name="cardImage"
                                    listType="picture-card"
                                    fileList={cardFileList}
                                    beforeUpload={() => false}
                                    onChange={({fileList: newFileList}) => setCardFileList(newFileList)}
                                    onRemove={(file) => setCardFileList(cardFileList.filter((f) => f.uid !== file.uid))}
                                >
                                    {cardFileList.length < 1 && (
                                        <div>
                                            <PlusOutlined/>
                                            <div style={{marginTop: 8}}>Şəkil əlavə et</div>
                                        </div>
                                    )}
                                </Upload>
                            </Form.Item>
                        </Col>

                        {/* Sağ Sütun */}
                        <Col span={12}>
                            <Form.Item label="Tur Şəkilləri">
                                <Upload
                                    name="tourImages"
                                    listType="picture-card"
                                    multiple
                                    fileList={tourFileList}
                                    beforeUpload={() => false}
                                    onChange={({fileList: newFileList}) => setTourFileList(newFileList)}
                                    onRemove={(file) => setTourFileList(tourFileList.filter((f) => f.uid !== file.uid))}
                                >
                                    {tourFileList.length < 5 && (
                                        <div>
                                            <PlusOutlined/>
                                            <div style={{marginTop: 8}}>Şəkil əlavə et</div>
                                        </div>
                                    )}
                                </Upload>
                            </Form.Item>
                            <Form.Item
                                name="startDate"
                                label="Başlama Tarixi"
                                rules={[{required: true, message: "Başlama tarixini daxil edin!"}]}>
                                <Input placeholder="Başlama tarixi seçin"/>
                            </Form.Item>
                            <Form.Item
                                name="endDate"
                                label="Bitmə Tarixi"
                                rules={[{required: true, message: "Bitmə tarixini daxil edin!"}]}>
                                <Input placeholder="Bitmə tarixi seçin"/>
                            </Form.Item>
                            <Form.Item name="isOvernighStay" label="Gecələmə">
                                <Radio.Group>
                                    <Radio value={true}>Var</Radio>
                                    <Radio value={false}>Yox</Radio>
                                </Radio.Group>
                            </Form.Item>
                            <Form.Item name="isTicket" label="Bilet">
                                <Radio.Group>
                                    <Radio value={true}>Var</Radio>
                                    <Radio value={false}>Yox</Radio>
                                </Radio.Group>
                            </Form.Item>
                            <Form.Item name="isInsurance" label="Sığorta">
                                <Radio.Group>
                                    <Radio value={true}>Var</Radio>
                                    <Radio value={false}>Yox</Radio>
                                </Radio.Group>
                            </Form.Item>
                            <Form.Item name="isVisa" label="Viza">
                                <Radio.Group>
                                    <Radio value={true}>Var</Radio>
                                    <Radio value={false}>Yox</Radio>
                                </Radio.Group>
                            </Form.Item>
                            <Form.Item name="isPopular" label="Populyarlıq">
                                <Radio.Group>
                                    <Radio value={true}>Var</Radio>
                                    <Radio value={false}>Yox</Radio>
                                </Radio.Group>
                            </Form.Item>
                            <Form.Item name="tourType" label="Tur Növü">
                                <Select placeholder="Tur növünü seçin">
                                    <Select.Option value="incomming">Incomming</Select.Option>
                                    <Select.Option value="outgoing">Outgoing</Select.Option>
                                </Select>
                            </Form.Item>
                            <Form.Item name="countryIds" label="Ölkələr">
                                <Select
                                    mode="multiple"
                                    placeholder="Ölkə seçin"
                                    onChange={handleCountryChange}
                                >
                                    {countries && countries.map((country) => (
                                        <Select.Option key={country.id} value={country.id}>
                                            {country.name}
                                        </Select.Option>
                                    ))}
                                </Select>
                            </Form.Item>
                            <Form.Item name="cityIds" label="Şəhərlər">
                                <Select
                                    mode="multiple"
                                    placeholder="Şəhər seçin"
                                    disabled={!selectedCountry || selectedCountry.length === 0}
                                >
                                    {getCityOptionsForSelectedCountries()?.map((city) => (
                                        <Select.Option key={city.id} value={city.id}>
                                            {city.name}
                                        </Select.Option>
                                    ))}
                                </Select>
                            </Form.Item>
                        </Col>
                    </Row>
                    <Form.Item style={{textAlign: "right"}}>
                        <Button type="primary" htmlType="submit" style={{marginRight: 8}}>
                            Düzəliş Et
                        </Button>
                        <Button onClick={handleEditCancel}>İmtina Et</Button>
                    </Form.Item>
                </Form>
            </Modal>
        </div>
    );
};

export default TourTable;
