import {usePostBlogMutation} from "../services/adminApi.jsx";
import BlogsTable from "../components/Table/Table.jsx";

function Admin() {

    const [postBlog] = usePostBlogMutation()

    const handleAddBlog = async (blog) => {
        try {
            const response = await postBlog(blog).unwrap()
            if (response.status === 201) {
                alert("ugurlu")
            } else {
                alert("error")
            }
        } catch (error) {
            console.error(error)
        }

    }

    return (
        <div>
            <div className={"container"}>
                Admin
            </div>
        </div>
    );
}

export default Admin;