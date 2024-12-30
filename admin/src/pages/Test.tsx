function Test() {
    return (
        <form action="https://50f0-171-227-197-104.ngrok-free.app/api/admin/product" method="Post" encType="multipart/form-data">
            <input type="file" name="file"/>
            <button type="submit">Submit</button>
        </form>
      );
}

export default Test;