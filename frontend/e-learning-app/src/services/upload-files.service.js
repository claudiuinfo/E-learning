import http from "../http-common";

class UploadFilesService {
  upload(ownerId, ownerRole, file, onUploadProgress) {
    let formData = new FormData();

    formData.append("file", file);

    /*let metadata = {
      ownerName: "marian",
      ownerRole: "student",
      postDate: "'2021-09-28 00:45:00'"
    }*/

    //formData.append("metadata", metadata);

    return http.post("/upload?ownerId=" + ownerId + "&ownerRole=" + ownerRole, formData, {
      headers: {
        "Content-Type": "multipart/form-data",
      },
      onUploadProgress,
    });
  }

  getFiles() {
    return http.get("/files");
  }
}

export default new UploadFilesService();
